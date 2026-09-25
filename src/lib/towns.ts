// Towns: the unit a fire department is organised around, and the only place
// where the boundary, the department and the buildings meet. Kept beside
// lib/stations.ts and built from the same roster so the two cannot disagree
// about which towns exist.
import townsData from '../data/towns.json';
import departmentsData from '../data/departments.json';
import waterData from '../data/water.json';
import { boxOf, boxesOverlap, clipToBox, pathOf, pointInRing, simplify, type Point } from './geo';
import { normTown, stations, titleCase, type Station } from './stations';

export type Department = (typeof departmentsData)[number];

export interface Boundary {
  name: string;
  /**
   * VCGI's FIPS6, and null where their own layer carries none. One town of the
   * 256 has none: Essex Junction.
   */
  fips: number | null;
  /** Learned from the roster at sync time; null for a town we have no station in. */
  county: string | null;
  /** Whether any station in the roster sits in this town. */
  onRoster: boolean;
  /**
   * Everything inside the town line, water included. A Vermont boundary runs
   * out into the lake, so for a lakeside town this is well over its land.
   */
  totalAcres: number;
  totalSqmi: number;
  /**
   * Land only, from the Census, with the water that makes up the difference.
   * Null for a town the Census does not carry under a name we can match — see
   * scripts/sync-town-boundaries.mjs.
   */
  landAcres: number | null;
  landSqmi: number | null;
  waterSqmi: number | null;
  /** An interior point on the town's land, where its label sits — see scripts/geo.mjs. */
  centre: number[];
  rings: number[][][];
}

export interface Town {
  slug: string;
  name: string;
  county: string;
  boundary: Boundary | null;
  departments: Department[];
  stations: Station[];
  photographed: number;
  /** Departments working from this town that are not its own, each on a page of its own. */
  apart: Apart[];
}

/**
 * A department that is not its town's own, with the stations linked to it —
 * the Vermont Air National Guard's, at the airport in South Burlington. It has
 * a page to itself, and its stations are off the town's page. Which departments
 * these are is decided at sync time; see scripts/sync-airtable.mjs.
 */
export interface Apart {
  slug: string;
  department: Department;
  /** The town it works from, which is not the same as the ground it covers. */
  town: string;
  county: string;
  stations: Station[];
  photographed: number;
}

const slugify = (s: string) =>
  s.toLowerCase().normalize('NFKD').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

const boundaryByTown = new Map<string, Boundary>();
for (const [town, b] of Object.entries(townsData as Record<string, Boundary>)) {
  boundaryByTown.set(normTown(town), b);
}

/**
 * Which boundary a town on the roster is drawn from. The roster files two of
 * them under a longer name than VCGI does — "Essex Town" for Essex, "Essex
 * Junction City" for Essex Junction — and neither found a boundary, so both
 * pages drew a county with no town of their own in it and stated no area.
 * The name itself is tried first, which leaves Barre City, Barre Town, Rutland
 * City, Rutland Town and both Newports matching themselves: VCGI carries those
 * under exactly the names the roster uses, and they are genuinely separate
 * towns from the ones they are named after.
 */
const boundaryKey = (name: string) => {
  const key = normTown(name);
  if (boundaryByTown.has(key)) return key;
  const bare = key.replace(/ (CITY|TOWN|VILLAGE)$/, '');
  return boundaryByTown.has(bare) ? bare : key;
};

// A department's City is sometimes the village it sits in ("Highgate Center")
// rather than the town the roster files it under. Match on the normalised name
// and fall back to the leading word, which is what village names share with
// their parent town.
const deptsByTown = new Map<string, Department[]>();
for (const d of departmentsData as Department[]) {
  const key = normTown(d.town);
  if (!key || d.ownPage) continue;
  if (!deptsByTown.has(key)) deptsByTown.set(key, []);
  deptsByTown.get(key)!.push(d);
}

const townNames = [...new Set(stations.map((s) => s.town).filter(Boolean))].sort();

// Placed by its stations rather than by the department's own City field: the
// station is where the building is, and City is sometimes a village name.
export const apart: Apart[] = (departmentsData as Department[])
  .filter((d) => d.ownPage)
  .map((d) => {
    const own = stations.filter((s) => s.page === d.ownPage);
    return {
      slug: d.ownPage!,
      department: d,
      town: own[0]?.town ?? d.town,
      county: own.find((s) => s.county)?.county ?? '',
      stations: own,
      photographed: own.filter((s) => s.photo).length,
    };
  })
  .filter((a) => a.stations.length);

export const apartBySlug = new Map(apart.map((a) => [a.slug, a]));

/**
 * Which boundaries the roster actually has a station in. towns.json carries a
 * flag of its own for this, written at sync time by a name match with no
 * fallback, so it says no station is recorded in Essex or Essex Junction — the
 * two the roster spells longer than VCGI does. Both were drawn on every
 * Chittenden map with the dashed edge that means exactly that, while their own
 * pages listed the station standing in them. Answering from the roster the
 * pages are built from is the only way the two cannot drift apart again.
 */
const rosterBoundaries = new Set(townNames.map(boundaryKey));

export const towns: Town[] = townNames
  .map((name) => {
    const key = normTown(name);
    const slug = slugify(name);
    // Only the stations listed here: a station belonging to a department with a
    // page of its own is in the town but is not the town's.
    const inTown = stations.filter((s) => s.town === name && s.page === slug);
    return {
      slug,
      name,
      county: inTown.find((s) => s.county)?.county ?? '',
      boundary: boundaryByTown.get(boundaryKey(name)) ?? null,
      departments: deptsByTown.get(key) ?? [],
      stations: inTown,
      photographed: inTown.filter((s) => s.photo).length,
      apart: apart.filter((a) => a.town === name),
    };
  })
  // A town whose every station belongs to a department with its own page has
  // nothing left to show here.
  .filter((t) => t.stations.length);

export const townBySlug = new Map(towns.map((t) => [t.slug, t]));

// Both kinds of page live under /departments, so a department named like a
// town would take the town's address. Fail the build rather than let one page
// silently replace the other.
for (const a of apart) {
  if (townBySlug.has(a.slug)) {
    throw new Error(`/departments/${a.slug} is both a town and ${a.department.name}`);
  }
}

/** The town page a station belongs to, for linking from the building. */
export const townSlugForStation = (station: Station) => slugify(station.town);

/** Members across the departments given, or null when none are recorded. */
export const memberCount = (t: { departments: Department[] }) => {
  const each = t.departments.flatMap((d) =>
    [d.members.volunteer, d.members.paidPerCall, d.members.career].filter(
      (n): n is number => typeof n === 'number',
    ),
  );
  return each.length ? each.reduce((a, b) => a + b, 0) : null;
};

/**
 * The burn rule is set by state law, not by the town, so every town page can
 * state it truthfully. Only the local contact varies, and that is the part
 * that has to be typed in per department.
 */
export const BURN_RULE =
  'Vermont requires a Permit to Kindle Fire from the town’s Forest Fire Warden for ' +
  'anything larger than a campfire — except where snow covers the ground at the burn ' +
  'site, or the fire is at least 200 feet from anything that will carry flame. Wardens ' +
  'can suspend burning outright when fire danger is high. Who to ask locally is recorded ' +
  'department by department; where it is blank below, the fire department itself is the ' +
  'place to start.';

interface WaterBody {
  name: string;
  sqkm: number;
  centre: number[] | null;
  rings: number[][][];
}

/**
 * How wide a town name draws, per character, at the 8px the county map labels
 * towns in. Measured across all 256 names in the page's own font: 3.9px on
 * average and 4.7 at the widest, so this sits at the wide end — which is what
 * both the callers want, one deciding whether a name fits inside its town and
 * the other whether a station dot has landed on it.
 */
const NAME_PX = 4.6;

/**
 * A town drawn inside its county, which is the context a town outline on its
 * own cannot give: who the neighbours are, where the next station is, and how
 * far away it sits. Equirectangular with a cos(lat) correction on x — at the
 * width of a Vermont county that is indistinguishable from a real projection
 * and needs no dependency.
 *
 * The lake is drawn over the towns. A Vermont town boundary does not stop at
 * the shoreline — Burlington's runs out into Lake Champlain, and a third of the
 * city is water — so towns alone drew a Chittenden County with no lake in it,
 * which is not a county anyone here would recognise. Covering the wet part of
 * each boundary puts the shoreline back without editing the boundaries.
 */
export interface MapSubject {
  county: string;
  /** What to draw when there is no county on record. */
  boundary: Boundary | null;
  /**
   * The town whose outline is the subject, or null. A department that is not
   * its town's own draws none: the Guard works from South Burlington but does
   * not cover it, and a red South Burlington on its page would say it did.
   */
  town: string | null;
  /** The name written large over the subject, or null for none. */
  label: string | null;
  /** The stations drawn as the page's own. */
  stations: Station[];
}

export function countyMap(subject: MapSubject, width = 680, maxHeight = 620, pad = 14) {
  const all = Object.values(townsData) as Boundary[];
  // Fall back to the subject's own boundary when we have no county for it, so a
  // page still renders rather than disappearing.
  const inCounty = subject.county
    ? all.filter((t) => t.county === subject.county)
    : subject.boundary
      ? [subject.boundary]
      : [];
  if (!inCounty.length) return null;

  const pts = inCounty.flatMap((t) => t.rings.flat());
  const lat0 = (Math.min(...pts.map((p) => p[1])) + Math.max(...pts.map((p) => p[1]))) / 2;
  const k = Math.cos((lat0 * Math.PI) / 180);
  const xs = pts.map((p) => p[0] * k);
  const ys = pts.map((p) => p[1]);
  const [minX, maxX] = [Math.min(...xs), Math.max(...xs)];
  const [minY, maxY] = [Math.min(...ys), Math.max(...ys)];
  // Fit the width, then let the height follow the county's real shape rather
  // than padding a fixed box — a tall county like Chittenden otherwise renders
  // as a small shape stranded in white space.
  const wSpan = maxX - minX || 1;
  const hSpan = maxY - minY || 1;
  const scale = Math.min((width - pad * 2) / wSpan, (maxHeight - pad * 2) / hSpan);
  const height = Math.round(hSpan * scale + pad * 2);
  const offX = pad + (width - pad * 2 - wSpan * scale) / 2;
  const offY = pad;
  const project = (lng: number, lat: number): [number, number] => [
    offX + (lng * k - minX) * scale,
    offY + (maxY - lat) * scale,
  ];
  const projectRings = (rings: number[][][]): Point[][] =>
    rings.map((r) => r.map(([lng, lat]) => project(lng, lat)));

  // Two different matches, because the roster's name for a town and VCGI's are
  // not always the same string: a station is the subject's when the page lists
  // it, a shape is when it is the boundary the subject's town resolves to.
  const own = new Set(subject.stations.map((s) => s.slug));
  const shapeKey = subject.town ? boundaryKey(subject.town) : null;
  // Kept alongside the path string: the water label has to know where the
  // county actually is, since the lake is drawn clipped to it.
  const landRings: Point[][] = [];
  const shapes = inCounty.map((t) => {
    const [cx, cy] = project(t.centre[0], t.centre[1]);
    const xsT = t.rings.flat().map((p) => p[0] * k);
    const widthPx = (Math.max(...xsT) - Math.min(...xsT)) * scale;
    const projected = projectRings(t.rings);
    landRings.push(...projected);
    return {
      name: t.name,
      isSubject: normTown(t.name) === shapeKey,
      onRoster: rosterBoundaries.has(normTown(t.name)),
      d: pathOf(projected),
      cx,
      cy,
      // Where the name is drawn. The town's own point to begin with; the pass
      // below moves it off any station dot that lands on the text.
      lx: cx,
      ly: cy,
      // Around Burlington the towns are small and the labels collide. Only
      // label a town wide enough to hold its own name at 8px.
      labelled: widthPx > t.name.length * NAME_PX,
      slug: slugify(t.name),
    };
  });

  // Every station in the county, so mutual aid has a shape on the page.
  const points = stations
    .filter((s) => !subject.county || s.county === subject.county)
    .map((s) => {
      const [x, y] = project(s.lng, s.lat);
      return {
        x, y,
        mine: own.has(s.slug),
        photo: !!s.photo,
        label: `${s.name} — ${s.address}, ${s.town}`,
        slug: s.slug,
      };
    });

  // Station dots are drawn over the town labels, so a dot that lands on a name
  // takes a letter out of it: around Burlington three sat across the city's own
  // label, and one on the C of Charlotte. Lift the name off the dot instead.
  // The move is the shortest one that clears, so the label stays plainly on the
  // town it names, and where nothing within reach is clear the label goes — the
  // same answer the width test above gives a town with no room for its name.
  //
  // How far a name may be slid, in either direction. 16px: at 12 the four dots
  // around Pittsford boxed its name in and Rutland County lost it off 24 of its
  // 25 maps, and past 16 a name is further from its town than it is tall.
  // Almost every move is far shorter — half are 5px or less.
  const REACH = 16;
  // The dots as the page draws them: r=3, or 5.5 for a station in the subject
  // town, each ringed by a stroke in the surface colour that reads as part of
  // the dot.
  const onDot = (box: number[], p: { x: number; y: number; mine: boolean }) => {
    const r = p.mine ? 6.25 : 3.5;
    const dx = Math.max(box[0] - p.x, 0, p.x - box[2]);
    const dy = Math.max(box[1] - p.y, 0, p.y - box[3]);
    return dx * dx + dy * dy < r * r;
  };
  // What a name covers, drawn centred on (x, y) with y the baseline: the ink
  // runs about 6px above that baseline at 8px and 2px below it, and a pixel is
  // added all round so a dot grazing the edge still counts as touching.
  const labelBox = (name: string, x: number, y: number, px = 8): number[] => {
    const half = (name.length * NAME_PX * px) / 8 / 2 + 1;
    return [x - half, y - (6.5 * px) / 8, x + half, y + (3 * px) / 8];
  };

  // Where the subject's own name is written: over its town, a little above the
  // point the town is labelled from. Five departments on the roster are
  // villages with no boundary of their own — Bellows Falls and Saxtons River
  // are in Rockingham, Orleans in Barton, North Bennington in Bennington, West
  // Pawlet in Pawlet — and for those there is no shape to write over, so the
  // name goes above the department's own station, which is the one thing on the
  // map that is certainly theirs. Before this it fell back to (0, -12) and the
  // name was drawn half off the top left corner of every one of those maps.
  const subjectShape = shapes.find((s) => s.isSubject);
  const ownPoints = points.filter((p) => p.mine);
  const label = !subject.label
    ? null
    : subjectShape
      ? { x: subjectShape.cx, y: subjectShape.cy - 12, text: subject.label }
      : ownPoints.length
        ? {
            x: ownPoints.reduce((sum, p) => sum + p.x, 0) / ownPoints.length,
            y: Math.min(...ownPoints.map((p) => p.y)) - 12,
            text: subject.label,
          }
        : null;

  // The subject's own label is drawn last and over everything else, so a
  // neighbour under it is as unreadable as one under a dot, and a neighbour
  // nudged under it would simply disappear. Same measure, at the 15px it is
  // drawn in.
  const subjectBox = label ? labelBox(label.text, label.x, label.y, 15) : null;
  const placed = subjectBox ? [subjectBox] : [];
  // Labels nothing touches stay on their town's own point, and are fixed before
  // anything moves, so a nudge has somewhere real to avoid.
  const toMove: typeof shapes = [];
  for (const s of shapes) {
    if (!s.labelled || s.isSubject) continue;
    const box = labelBox(s.name, s.cx, s.cy);
    if (points.some((p) => onDot(box, p)) || (subjectBox && boxesOverlap(subjectBox, box))) {
      toMove.push(s);
    } else {
      placed.push(box);
    }
  }

  // Up before down at each distance: the box reaches further above the baseline
  // than below it, so a dot sitting on the text clears sooner upwards.
  const offsets = Array.from({ length: REACH }, (_, i) => i + 1).flatMap((d) => [-d, d]);
  const free = ({ box }: { box: number[] }) =>
    !points.some((p) => onDot(box, p)) && !placed.some((b) => boxesOverlap(b, box));
  for (const s of toMove) {
    // Vertically first, and only then sideways. A name that has moved up or
    // down is still centred on its town and still reads as that town's; one
    // slid sideways has to be read against the boundary it sits in. Sideways is
    // what is left for a name hemmed in above and below — on the West Pawlet
    // page the village's own 15px label lies across the middle of Pawlet with
    // the station just under it, and 15px to the right is the only way out.
    const clear =
      offsets.map((dy) => ({ dx: 0, dy, box: labelBox(s.name, s.cx, s.cy + dy) })).find(free) ??
      offsets.map((dx) => ({ dx, dy: 0, box: labelBox(s.name, s.cx + dx, s.cy) })).find(free);
    if (!clear) {
      s.labelled = false;
      continue;
    }
    s.lx = s.cx + clear.dx;
    s.ly = s.cy + clear.dy;
    placed.push(clear.box);
  }

  // The lake, cut to the drawing and thinned to it. Stored shorelines are
  // metre-accurate, which at this scale is a thousand points nobody can see and
  // thirteen bytes each in the HTML of every page in the county; half a pixel
  // is the most detail the page can show.
  const view = [0, 0, width, height];
  // Where the county actually is, for the water labels below. Boxes first, so
  // testing a candidate point only walks the rings that could contain it.
  const landBoxes = landRings.map(boxOf);
  const onLand = (x: number, y: number) =>
    landRings.some(
      (r, i) =>
        x >= landBoxes[i][0] && x <= landBoxes[i][2] &&
        y >= landBoxes[i][1] && y <= landBoxes[i][3] &&
        pointInRing(x, y, r),
    );
  const waterRings: Point[][] = [];
  const waterLabels: { name: string; cx: number; cy: number; vertical: boolean }[] = [];
  for (const body of waterData as WaterBody[]) {
    const drawn = projectRings(body.rings)
      .filter((r) => boxesOverlap(boxOf(r), view))
      .map((r) => simplify(clipToBox(r, view), 0.5))
      .filter((r) => r.length);
    if (!drawn.length) continue;
    waterRings.push(...drawn);

    // Name the water where the page can hold the name. It has to sit in the
    // water the reader can see, which is the water inside the county — the rest
    // is clipped away, and a label floating in the blank beyond the county line
    // is worse than no label. Sampling is over the largest visible piece.
    const biggest = drawn.reduce((a, b) => (b.length > a.length ? b : a));
    const [x0, y0, x1, y1] = boxOf(biggest);
    if (x1 - x0 < body.name.length * 5.6 || y1 - y0 < 26) continue;

    // Room to write in, measured out from a candidate until it leaves the
    // visible water. Lake Champlain inside one county is a north-south strip
    // far too narrow for its own name across it, and far longer than it needs
    // down it, so the name turns to follow the water the way an atlas turns it.
    const visible = (x: number, y: number) => pointInRing(x, y, biggest) && onLand(x, y);
    const reach = (cx: number, cy: number, dx: number, dy: number, limit: number) => {
      let d = 0;
      while (d < limit && visible(cx + dx * (d + 4), cy + dy * (d + 4))) d += 4;
      return d;
    };

    const textW = body.name.length * 5.6;
    const N = 24;
    let best: { cx: number; cy: number; vertical: boolean; fit: number } | null = null;
    for (let i = 1; i < N; i++) {
      for (let j = 1; j < N; j++) {
        const cx = x0 + ((x1 - x0) * i) / N;
        const cy = y0 + ((y1 - y0) * j) / N;
        if (!visible(cx, cy)) continue;
        const half = textW / 2;
        const across = Math.min(reach(cx, cy, -1, 0, half), reach(cx, cy, 1, 0, half)) * 2;
        const down = Math.min(reach(cx, cy, 0, -1, half), reach(cx, cy, 0, 1, half)) * 2;
        // Needs depth as well as length, or the name sits half on the shore.
        const thickAcross = Math.min(reach(cx, cy, 0, -1, 7), reach(cx, cy, 0, 1, 7)) * 2;
        const thickDown = Math.min(reach(cx, cy, -1, 0, 7), reach(cx, cy, 1, 0, 7)) * 2;
        const h = thickAcross >= 8 ? across / textW : 0;
        const v = thickDown >= 8 ? down / textW : 0;
        const fit = Math.max(h, v);
        if (fit >= 1 && (!best || fit > best.fit)) best = { cx, cy, vertical: v > h, fit };
      }
    }
    if (best) {
      waterLabels.push({ name: body.name, cx: best.cx, cy: best.cy, vertical: best.vertical });
    }
  }

  // A scale bar in whole miles: one degree of latitude is 69.0 miles, and y is
  // projected from raw latitude, so pixels-per-mile falls straight out.
  const pxPerMile = scale / 69.0;
  const miles = [1, 2, 5, 10, 20, 50].find((m) => m * pxPerMile > width * 0.15) ?? 50;

  return {
    width, height, shapes, points, label,
    // One path for every ring, filled even-odd so an island in the lake reads
    // as land without having to know which rings VCGI meant as holes.
    water: waterRings.length ? pathOf(waterRings) : null,
    waterLabels,
    scale: { miles, px: miles * pxPerMile },
    county: subject.county,
  };
}

export { titleCase };
