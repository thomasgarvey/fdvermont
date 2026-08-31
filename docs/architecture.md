# Architecture: where the data lives, and where it is going

Companion to [`data-sources.md`](./data-sources.md), which covers *provenance* —
where the data originally came from. This covers *flow*: what is the source of
truth, what is a snapshot, and what still needs moving.

Written 2026-08-30.

## The hierarchy

Three real-world things, which the data model should mirror one-to-one:

- A **department** is an organisation. Burlington Fire Department has one chief,
  one roster, one FDID, one phone number.
- A **station** is a building it operates from. Burlington has five.
- A **photograph** is of a building.

So: one department → many stations → many photographs.

**Airtable does not yet mirror this.** The Fire Departments table is doing double
duty, holding both real departments *and* station rows — "Burlington Fire
Department #1" through "#5", "South Burlington Fire Station 1" and "2",
Colchester's four. That single conflation is the root of most of the fragility in
this codebase:

- photos join to pins by *normalising street addresses* ("Avenue"→"AVE",
  "VT-12"→"VT ROUTE 12") because there is no station to link to;
- that fuzzy chain is where a real bug hid — `SAINT ALBANS TOWN` normalised to
  `ST ALBANS TOWN` and matched nothing, silently dropping both St. Albans photos;
- "which of Burlington's five stations is this photo of?" has to be *inferred*
  rather than simply recorded.

## Where each layer sits

| Layer | Role | Notes |
|---|---|---|
| **Airtable** | Source of truth for curated content: which stations exist, departments, photos, captions, credits | The one place a human edits |
| **Repo** (`src/data/photos.json`, `public/photos/`) | Build-time snapshot, committed | The site is static; nothing queries Airtable at runtime |
| **E911 / OSM** | Upstream references | Kept to reconcile against, not read live |

"Source of truth" is not the same as "only source". Three things deliberately do
**not** move into Airtable:

**The photo files.** Airtable attachment URLs expire after roughly two hours, so
`scripts/sync-airtable.mjs` downloads each image into `public/photos/` and those
files are committed. If pages pointed at Airtable URLs every image would be dead
by morning. This is permanent, not a workaround.

**Runtime independence.** Vercel serves plain files. No API call, no token in the
build, nothing to rate-limit, and the site stays up if Airtable is down. Moving
to live queries would be a downgrade.

**The E911 snapshot.** `src/data/locations.geojson` should be *demoted*, not
deleted — see below.

A side benefit worth keeping: because every sync is committed, git history is a
free versioned backup of the Airtable content.

## The problem with locations.geojson

`src/data/locations.geojson` (314 KB, 277 points) was committed in the original
scaffold four months ago and **has never changed since**. Every station fact on
the site traces to that one snapshot. It is read by four places:
`LocationMap.tsx`, `lib/stations.ts`, `index.astro`, `scripts/sync-airtable.mjs`.

Because it is a file rather than a table, changing what appears on the map means
editing code and deploying. Removing three buildings that turned out not to be
fire stations — a food shelf, a former station, a water district — took three
commits and an entire `excluded-stations.json` mechanism invented purely to avoid
hand-editing a generated file.

Once the Fire Stations table drives the map, each of those becomes flipping a
Status cell. `excluded-stations.json` folds into that column and goes away.

Keep the geojson afterwards, but demote it to a reference: it is how we diff
against VCGI's live service and answer "what changed since we imported?" That
matters, because we already know the state's layer misclassifies water districts
(a Vermont "fire district" is a water utility) and omits real stations in 20
towns. The snapshot is also ~19 months stale against the live service.

## Migration

Additive steps first, destructive last, with both join paths alive in between so
the site is never in a broken state.

| # | Step | Whose | Risk |
|---|---|---|---|
| 1 | Convert Fire Stations' `Airtable Department` from text to a **linked record** field | Airtable | None — additive |
| 2 | **Link Photos to Fire Stations**, keeping the existing Department link for now | Airtable | None — additive |
| 3 | Rewrite the sync to prefer the station link, falling back to the current address join | Code | Low — both paths work |
| 4 | **Verify parity**: same photos placed, same pins | Code | — checkpoint |
| 5 | Consolidate Fire Departments; drop the old Photos→Department link | Airtable | Destructive — do last |
| 6 | Add the ~20 stations E911 omits | Either | Independent |

**Step 4 is the checkpoint that makes the rest safe.** Do not start step 5 until
it passes.

**Step 5 is optional.** If Burlington keeps five department rows nothing on the
site breaks once photos hang off stations — they are redundant records that would
look wrong in a future department listing. Data hygiene, not a blocker.

**The cutover is exact, not approximate.** Filtering Fire Stations to Active
should equal the number of pins the map draws. That equality is the parity test.

**Keep the two retirement lists in step.** Retiring a station is currently done
twice — once in `excluded-stations.json` (which the site reads) and once in the
Fire Stations `Status` column (which it does not read yet). They drift: as of
2026-08-30 the repo retires four but Airtable retires three, so Active reads 274
against 273 pins. Reconcile before testing parity, or the check fails by the
count of the drift rather than for any real reason. After the migration only the
Airtable column exists and the problem disappears.

**Ordering matters.** An earlier draft of this plan put step 5 before step 2.
That would have removed the department records photos currently link to *before*
photos hung off stations — the site would have lost its photographs until the
code caught up.

## What this retires

- `src/data/excluded-stations.json` → the Fire Stations `Status` column
- Fuzzy street-address matching in `sync-airtable.mjs` and `LocationMap.tsx` →
  a station link
- Editing code to change what is on the map → editing a cell

Those first two are the most fragile things in the codebase, and both exist only
because Airtable is not the source yet.
