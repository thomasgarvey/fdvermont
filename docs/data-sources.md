# FDVT Data Sources

Documented per the project brief's requirement to record data-source research and
reasoning for key decisions. Last updated: 2026-09-22.

## The core distinction: departments vs. stations

Vermont fire data comes in two shapes, and conflating them caused the count
discrepancies noted in the project brief (ExpertGPS 292 vs. FEMA 206):

- A **department** is an administrative organization (e.g. "Brighton Fire
  Department") — it has a chief, a roster, an FDID, and may operate more than
  one station building.
- A **station** is a physical building with coordinates. Vermont has more
  stations than departments.

FDVT models **departments** as the primary content entity (Airtable), and uses
**station** point data (E911) for map coordinates.

## Sources in use

### 1. VT E911 Site Locations (ESITE) — coordinate source

- File: `src/data/locations.geojson` (277 features, `SITETYPE = FIRE STATION`)
- Origin: Vermont Center for Geographic Information (VCGI), the state's
  official E911 address-point database.
  - Dataset: <https://geodata.vermont.gov/datasets/VCGI::vt-data-e911-site-locations-address-points-1/>
  - Metadata: <https://maps.vcgi.vermont.gov/gisdata/metadata/EmergencyE911_ESITE.htm>
- Update dates in the snapshot run through 2023-01-27.
- Why we trust it: it is the operational database Vermont dispatch actually
  uses, and the authoritative import source OpenStreetMap uses for Vermont
  address points (<https://wiki.openstreetmap.org/wiki/VCGI_E911_address_points_import>).
  Strongest available coordinate accuracy for station buildings.

### 2. Airtable base "Vermont Fire Departments" — content source of truth

- 231 department records; linked Photos table (captions, photographer,
  featured flag, attachments).
- Believed derived from the USFA/FEMA National Fire Department Registry
  (signature columns: FDID, career/volunteer/paid-per-call counts), then
  extended by hand. <!-- TODO: confirm provenance with base author -->
- Latitude/Longitude columns were empty as of 2026-08-14; they are being
  backfilled from source 1 (see decision below).
- Editable by the site admin — this is the layer that changes over time.

### 3. OpenStreetMap — gap-filler for 13 towns

- The E911 fire-station layer covers only 194 of Vermont's towns; 13
  departments (St. Johnsbury, Stowe, Wilmington, Fair Haven, Highgate,
  Craftsbury, Swanton, Richford, Stockbridge, Sheffield-Wheelock, Plymouth,
  Montgomery, Walden) sit in towns whose stations E911 classifies under some
  other SITETYPE. Their coordinates were taken from OSM `amenity=fire_station`
  points (Overpass API, fetched 2026-08-14), each matched by station name.
- The backfill CSV's "Coordinate Source" column records E911 vs. OSM per row.

### 4. VCGI town boundaries — the outline and the total area

- Layer: `FS_VCGI_OPENDATA_Boundary_BNDHASH_poly_towns_SP_v1`, fetched by
  `scripts/sync-town-boundaries.mjs` into `src/data/towns.json` (all 256 towns,
  not only the ones on the roster — a county map needs the neighbours).
- **The boundary does not stop at the shoreline.** A Vermont town's line runs
  out into the lake, so `Shape__Area` is the town's *total* area, water
  included. It is written out as `totalAcres`/`totalSqmi`, named for what it is;
  the land comes from source 6 instead.
- How far off the total is, for "how much ground does this department cover":
  Burlington 15.35 sq mi against 10.31 of land, South Burlington 30.8 against
  16.46, Colchester 60.41 against 36.24, and North Hero 46 against 13.45 — an
  island town is mostly lake by this measure. Water is a twentieth or more of
  33 of the 255 towns the Census carries, 28 of them on the roster, so this was
  never a Champlain-only problem: Westmore is 8% water (Lake Willoughby) and
  Castleton 8% (Lake Bomoseen).

### 5. VCGI hydrography — the lake

- Layer: `FS_VCGI_OPENDATA_Water_VHDCARTO_poly_SP_v1`, fetched by
  `scripts/sync-water.mjs` into `src/data/water.json`: the 41 named bodies over
  1 km², generalised to half a pixel at county scale.
- Drawn over the towns on the county map, which is what puts the shoreline back
  — see the header of `scripts/sync-water.mjs` for why the map needs it. Also
  read by `sync-town-boundaries.mjs`, to keep a lakeside town's label out of the
  water, so **run `sync-water.mjs` first**.
- VCGI carries the Vermont side of Lake Champlain as one feature named
  "Narrows, The" (a reach in the middle of it). The script renames that one.
- The unnamed features in the layer are wide reaches of river carried as
  polygons; they are skipped.

### 6. Census county subdivisions — the land area

- Layer: `TIGERweb/Places_CouSub_ConCity_SubMCD/MapServer/1` on
  `tigerweb.geo.census.gov` — the Census's own host, queried with `STATE='50'`
  by `scripts/sync-town-boundaries.mjs` into the
  `landAcres`/`landSqmi`/`waterSqmi` fields of `src/data/towns.json`.
  Attributes only — no geometry is downloaded; the outline is still VCGI's.
- Why this layer: a county subdivision *is* a Vermont town, and
  `AREALAND`/`AREAWATER` are the Census's own land/water split. The alternative
  — intersecting each boundary with `src/data/water.json` — needs real polygon
  clipping, and would measure only the 41 bodies that file keeps.
- **Why TIGERweb's current view and not a vintage.** This started on
  `FS_Census_County_Subdivision_Boundaries_2020_Vintage`, a 2020-vintage copy on
  VCGI's host. That layer carries 255 Vermont subdivisions where there are 256:
  Essex Junction became a city in 2022, and a vintage does not learn that. So
  the Junction had no land figure at all, and Essex town's *included* it — 38.93
  sq mi of land against a whole-town total of 34.77, which is the tell, since
  land cannot exceed the town. It was wrong on both pages from 2026-09-13 to
  2026-09-22. A pinned vintage fails quietly and on a schedule nobody watches,
  so the sync now asks for whatever the Census currently holds.
- The trade is that a current endpoint can move without notice. The guard is the
  script's own coverage line — `Land area from the Census for N of 256` — plus a
  named warning for any town that comes back unmatched.
- Switching vintages moved every other town by a median of 0.05 sq mi (mean
  0.11, max 0.69 at Avery's Gore): ordinary TIGER refinement of the same lines,
  not a disagreement about where they run. Essex was the only material change,
  at −4.59.
- The join is on the name, normalised the same way the roster is (uppercase,
  `SAINT`/`ST.` collapsed). `BASENAME` is the bare town name, ambiguous for the
  four city/town pairs — Barre, Newport, Rutland and St. Albans — so `NAME`
  ("Barre city") is indexed alongside it; `NAME` is unique across all 256 and is
  how VCGI spells those eight too. A normalised name two subdivisions share is
  dropped rather than guessed at.
- All 256 towns now carry a land figure. The department page still has a
  fallback for one that does not — it states the total and labels it "Area,
  water included" — which no page currently uses. Keep it: the last gap was not
  foreseen either.
- Census totals and VCGI's differ by 0.04 sq mi at the median — different
  generalisation of the same lines — so the water *share* that decides whether a
  page shows both numbers is computed from `AREALAND` and `AREAWATER` together,
  within the one source, rather than by subtracting across the two.

## Stale E911 records

The E911 layer is authoritative for location but not always current on *use* —
some points are still classified `FIRE STATION` after the building changed
hands. Rather than editing `locations.geojson` (which a refresh from VCGI would
undo), such points are listed in `src/data/excluded-stations.json`, keyed by
`ESITEID`, with the reason and who verified it. The map skips them.

Verified so far:

| ESITEID | Address | Why excluded |
|---|---|---|
| 71574 | 245 MAIN ST, COLCHESTER | Now a food shelf; record dates from 1998 |
| 773054 | 318 US ROUTE 2, SOUTH HERO | Former station; department is at 131 COMMUNITY LN |
| 333310 | 838 CHURCH RD, COLCHESTER | Colchester Water Department, Fire District No. 2 |
| 74984 | 282 ETHAN ALLEN AVE, COLCHESTER | Not a fire station; a small single-bay building |

Two things this list has already taught us.

**A recent `UPDATEDATE` means nothing about `SITETYPE`.** South Hero's record was
mapped 2026-02-03 and Ethan Allen Ave was touched 2025-04-18; both are wrong. The
layer can revise a record without anyone rechecking what the building is.

**Colchester is the warning sign.** E911 listed seven fire stations there and
three were wrong — a food shelf, a water utility, and an ordinary outbuilding.
In the one town checked building by building, the error rate is 43%. Two of the
three carry "fire district" or municipal associations, which fits the theory that
some entries are classified by name: in Vermont a *fire district* is a water and
services district, not a fire department.

So the statewide figure of 277 is optimistic, and the layer should not be trusted
for *what a building is* without a visit. Since photographing the stations means
visiting them, expect this list to grow.

## Sources evaluated but not used

- **USFA/FEMA registry** (<https://apps.usfa.fema.gov/registry/>): 206 VT
  departments. Registration is voluntary, so it undercounts; likely already
  the seed of the Airtable base. HQ addresses only, no coordinates.
- **ExpertGPS** (<https://www.expertgps.com/data/vt/fire-stations.asp>): 292
  waypoints. Aggregated/scraped, unknown update cadence and accuracy;
  superseded by the official VCGI data.
- **NERIS** (<https://neris.fsri.org/>): the national system replacing NFIRS.
  Worth revisiting later for department metadata enrichment.

## Key decision: coordinate backfill (2026-08-14)

Airtable department records are matched to E911 station points (by department
name → town name, falling back to mailing city, then street address within a
town) and the resulting coordinates are imported into Airtable's
Latitude/Longitude fields **once**, by the site admin, after manual review of
the generated CSV.

Rationale: Airtable stays the single source of truth the admin can edit (a
wrong pin is fixed by editing the record, not code), while coordinates start
from the most authoritative source available. The alternative — joining the
two datasets in code on every build — was rejected because it maintains two
sources forever and makes mismatches invisible to the admin.

Safety: the import touches only the previously-empty Latitude/Longitude
columns; the site's Airtable token is read-only (`data.records:read`,
`schema.bases:read`).
