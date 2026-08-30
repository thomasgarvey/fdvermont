// One place that turns the two data files into the station records the
// per-station pages are built from. Kept out of the pages themselves so the
// index and the detail pages cannot drift apart.
import locationsData from '../data/locations.geojson';
import photosData from '../data/photos.json';
import excludedStations from '../data/excluded-stations.json';

export type Photo = (typeof photosData)[number];

export interface Station {
  slug: string;
  esiteid: number;
  address: string;      // title-cased
  town: string;         // title-cased
  county: string;       // title-cased, no "County" suffix
  zip: string;
  lat: number;
  lng: number;
  mapped: string;
  updated: string;
  /** Department name from Airtable when we have a photo linked to it. */
  department: string | null;
  photo: Photo | null;
  /** What to call the station in a heading. */
  name: string;
}

const EXCLUDED = new Set(excludedStations.excluded.map((e) => e.esiteid));

export const titleCase = (s: string | null | undefined) =>
  (s ?? '').toLowerCase()
    .replace(/\b[a-z]/g, (c) => c.toUpperCase())
    .replace(/\bVt\b/g, 'VT')
    .replace(/\bUs\b/g, 'US');

// Address normaliser shared with LocationMap — E911 and Airtable spell
// streets differently ("Avenue"/"AVE", "VT-12"/"VT ROUTE 12").
const ADDR_TOKENS: Record<string, string> = {
  SOUTH: 'S', NORTH: 'N', EAST: 'E', WEST: 'W',
  AVENUE: 'AVE', STREET: 'ST', ROAD: 'RD', DRIVE: 'DR', LANE: 'LN',
  TURNPIKE: 'TPKE', PARKWAY: 'PKWY', HIGHWAY: 'HWY', ROUTE: '', RTE: '', RT: '',
};
const normAddr = (s: string | null | undefined) =>
  (s ?? '').toUpperCase().replace(/[^A-Z0-9 ]/g, ' ')
    .split(/\s+/).map((w) => (w in ADDR_TOKENS ? ADDR_TOKENS[w] : w))
    .filter(Boolean).join(' ');

const slugify = (s: string) =>
  s.toLowerCase().normalize('NFKD').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

const features = (locationsData as GeoJSON.FeatureCollection).features.filter(
  (f) => f.geometry?.type === 'Point' && !EXCLUDED.has((f.properties as any)?.ESITEID),
);

// photos indexed by normalised street address, the same join the map uses
const photoByAddr = new Map<string, Photo>();
const townPhotos = new Map<string, Photo[]>();
const stationsPerTown = new Map<string, number>();
for (const f of features) {
  const t = (f.properties as any)?.TOWNNAME;
  if (t) stationsPerTown.set(t, (stationsPerTown.get(t) ?? 0) + 1);
}
for (const p of photosData) {
  const a = normAddr(p.stationAddress);
  if (a && !photoByAddr.has(a)) photoByAddr.set(a, p);
  if (p.town) {
    if (!townPhotos.has(p.town)) townPhotos.set(p.town, []);
    townPhotos.get(p.town)!.push(p);
  }
}

function photoFor(townRaw: string, addrRaw: string): Photo | null {
  const exact = photoByAddr.get(normAddr(addrRaw));
  if (exact) return exact;
  // town-wide only where it cannot be ambiguous
  if ((stationsPerTown.get(townRaw) ?? 0) > 1) return null;
  return townPhotos.get(townRaw)?.[0] ?? null;
}

const seen = new Set<string>();
export const stations: Station[] = features.map((f) => {
  const p = (f.properties ?? {}) as Record<string, any>;
  const [lng, lat] = (f.geometry as GeoJSON.Point).coordinates;
  const town = titleCase(p.TOWNNAME);
  const address = titleCase(p.PRIMARYADD);
  const photo = photoFor(p.TOWNNAME, p.PRIMARYADD);

  let slug = slugify(`${town} ${address}`);
  if (seen.has(slug)) slug = `${slug}-${p.ESITEID}`; // ESITEID guarantees uniqueness
  seen.add(slug);

  const department = photo?.department?.name ?? null;
  return {
    slug,
    esiteid: p.ESITEID,
    address,
    town,
    county: titleCase((p.COUNTY ?? '').replace(/ County$/i, '')),
    zip: p.ZIP ?? '',
    lat, lng,
    mapped: p.MAPYEAR ?? '',
    updated: p.UPDATEDATE ?? '',
    department,
    photo,
    name: department ?? `${town} Fire Station`,
  };
}).sort((a, b) => a.town.localeCompare(b.town) || a.address.localeCompare(b.address));

export const photographedCount = stations.filter((s) => s.photo).length;
