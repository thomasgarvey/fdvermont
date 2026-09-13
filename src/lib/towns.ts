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
  fips: number;
  /** Learned from the roster at sync time; null for a town we have no station in. */
  county: string | null;
  /** Whether any station in the roster sits in this town. */
  onRoster: boolean;
  acres: number;
  sqmi: number;
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
}

const slugify = (s: string) =>
  s.toLowerCase().normalize('NFKD').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

const boundaryByTown = new Map<string, Boundary>();
for (const [town, b] of Object.entries(townsData as Record<string, Boundary>)) {
  boundaryByTown.set(normTown(town), b);
}

// A department's City is sometimes the village it sits in ("Highgate Center")
// rather than the town the roster files it under. Match on the normalised name
// and fall back to the leading word, which is what village names share with
// their parent town.
const deptsByTown = new Map<string, Department[]>();
for (const d of departmentsData as Department[]) {
  const key = normTown(d.town);
  if (!key) continue;
  if (!deptsByTown.has(key)) deptsByTown.set(key, []);
  deptsByTown.get(key)!.push(d);
}

const townNames = [...new Set(stations.map((s) => s.town).filter(Boolean))].sort();

export const towns: Town[] = townNames.map((name) => {
  const key = normTown(name);
  const inTown = stations.filter((s) => s.town === name);
  return {
    slug: slugify(name),
    name,
    county: inTown.find((s) => s.county)?.county ?? '',
    boundary: boundaryByTown.get(key) ?? null,
    departments: deptsByTown.get(key) ?? [],
    stations: inTown,
    photographed: inTown.filter((s) => s.photo).length,
  };
});

export const townBySlug = new Map(towns.map((t) => [t.slug, t]));

/** The town page a station belongs to, for linking from the building. */
export const townSlugForStation = (station: Station) => slugify(station.town);

/** Members across every department in the town, or null when none are recorded. */
export const memberCount = (t: Town) => {
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
export function countyMap(subject: Town, width = 680, maxHeight = 620, pad = 14) {
  const all = Object.values(townsData) as Boundary[];
  // Fall back to the town alone when we have no county for it, so a page still
  // renders rather than disappearing.
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

  const subjectKey = normTown(subject.name);
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
      isSubject: normTown(t.name) === subjectKey,
      onRoster: t.onRoster,
      d: pathOf(projected),
      cx,
      cy,
      // Around Burlington the towns are small and the labels collide. Only
      // label a town wide enough to hold its own name at 8px.
      labelled: widthPx > t.name.length * 4.6,
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
        mine: normTown(s.town) === subjectKey,
        photo: !!s.photo,
        label: `${s.name} — ${s.address}, ${s.town}`,
        slug: s.slug,
      };
    });

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
    width, height, shapes, points,
    // One path for every ring, filled even-odd so an island in the lake reads
    // as land without having to know which rings VCGI meant as holes.
    water: waterRings.length ? pathOf(waterRings) : null,
    waterLabels,
    scale: { miles, px: miles * pxPerMile },
    county: subject.county,
  };
}

export { titleCase };
