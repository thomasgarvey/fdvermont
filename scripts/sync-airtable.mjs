// Sync photo content from Airtable into the repo.
//
// Airtable attachment URLs expire after ~2 hours, so images must be
// downloaded and served from the site itself. Run this locally, review the
// diff, and commit the result — the deployed build never needs the token.
//
// Usage:  node scripts/sync-airtable.mjs        (requires .env)
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');

// Minimal .env loader (no dependency needed)
if (existsSync(`${ROOT}/.env`)) {
  for (const line of readFileSync(`${ROOT}/.env`, 'utf8').split('\n')) {
    const m = line.match(/^([A-Z_]+)=(.*)$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].trim();
  }
}
const TOKEN = process.env.AIRTABLE_TOKEN;
const BASE = process.env.AIRTABLE_BASE_ID;
if (!TOKEN || !BASE) {
  console.error('Missing AIRTABLE_TOKEN / AIRTABLE_BASE_ID (set them in .env)');
  process.exit(1);
}

async function fetchAll(table) {
  let recs = [], offset;
  do {
    const u = new URL(`https://api.airtable.com/v0/${BASE}/${encodeURIComponent(table)}`);
    u.searchParams.set('pageSize', '100');
    if (offset) u.searchParams.set('offset', offset);
    const res = await fetch(u, { headers: { Authorization: `Bearer ${TOKEN}` } });
    const d = await res.json();
    if (d.error) throw new Error(`Airtable ${table}: ${JSON.stringify(d.error)}`);
    recs.push(...d.records);
    offset = d.offset;
  } while (offset);
  return recs;
}

const HIDDEN_STATUSES = new Set(['Draft', 'Archived']);

// Town-key derivation — mirrors the coordinate-matching logic so photos can
// be joined to E911 map markers by TOWNNAME.
const norm = (s) => (s ?? '')
  .toUpperCase()
  .replace(/\b(SAINT|ST\.?)\b/g, 'ST')
  .replace(/[^A-Z0-9 ]/g, ' ')
  .replace(/\s+/g, ' ')
  .trim();
const SUFFIX = /\b(VOLUNTEER|VOL|FIRE|DEPARTMENT|DEPT|DISTRICT|DIST|RESCUE|EMS|AND|COMPANY|CO|SERVICES?|VILLAGE|TOWN|CITY|OF|VFD|STATION|CENTRAL|TECHNICAL|TEAM|SQUAD|#?\d+)\b/g;
const VILLAGE_TO_TOWN = {
  ASCUTNEY: 'WEATHERSFIELD',
  MORRISVILLE: 'MORRISTOWN',
  'NEWPORT CENTER': 'NEWPORT TOWN',
  'BEECHER FALLS': 'CANAAN',
};
// E911 towns are the join target — validate keys against the real list
const E911_TOWNS = [...new Set(
  JSON.parse(readFileSync(`${ROOT}/src/data/locations.geojson`, 'utf8'))
    .features.map((f) => f.properties.TOWNNAME),
)];
function townKey(dept) {
  const fromName = norm(dept['Department Name']).replace(SUFFIX, ' ').replace(/\s+/g, ' ').trim();
  const city = norm(dept.City);
  const cands = [];
  for (const c of [fromName, city]) {
    if (!c) continue;
    cands.push(VILLAGE_TO_TOWN[c] ?? c);
    cands.push(...c.split(' ')); // two-town depts, e.g. "Underhill Jericho"
  }
  for (const c of cands) if (E911_TOWNS.includes(c)) return c;
  // Prefix fallback: "ESSEX" -> "ESSEX TOWN", "ESSEX JUNCTION" -> "ESSEX JUNCTION CITY"
  for (const c of cands) {
    const pref = E911_TOWNS.filter((t) => t.startsWith(c + ' ') || c.startsWith(t + ' '));
    if (pref.length) return pref.sort((a, b) => a.length - b.length)[0];
  }
  return null;
}
const ext = (type, filename) =>
  ({ 'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp', 'image/gif': 'gif' }[type]
    ?? filename?.split('.').pop()?.toLowerCase() ?? 'jpg');

const [photos, depts] = await Promise.all([fetchAll('Photos'), fetchAll('Fire Departments')]);
const deptById = new Map(depts.map((r) => [r.id, r.fields]));

mkdirSync(`${ROOT}/public/photos`, { recursive: true });
const out = [];
for (const r of photos) {
  const f = r.fields;
  const att = f.Photo?.[0];
  if (!att) continue;
  if (HIDDEN_STATUSES.has(f['Publication Status'])) continue;

  const e = ext(att.type, att.filename);
  const fullPath = `photos/${r.id}.${e}`;
  const thumbPath = `photos/${r.id}.thumb.${e}`;
  const thumb = att.thumbnails?.large ?? att;

  for (const [url, path] of [[att.url, fullPath], [thumb.url, thumbPath]]) {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`download failed (${res.status}): ${path}`);
    writeFileSync(`${ROOT}/public/${path}`, Buffer.from(await res.arrayBuffer()));
  }

  const dept = deptById.get(f['Fire Department']?.[0]);
  out.push({
    id: r.id,
    src: `/${fullPath}`,
    thumb: `/${thumbPath}`,
    width: att.width ?? null,
    height: att.height ?? null,
    thumbWidth: thumb.width ?? null,
    thumbHeight: thumb.height ?? null,
    caption: f.Caption ?? '',
    photographer: f.Photographer ?? '',
    dateTaken: f['Date Taken'] ?? null,
    featured: !!f.Featured,
    department: dept
      ? { name: dept['Department Name'] ?? '', city: dept.City ?? '', county: dept.County ?? '' }
      : null,
    town: dept ? townKey(dept) : null,
    // Department's own coordinates, when set in Airtable. Used only as a
    // fallback: some departments (rescue squads, say) occupy buildings the
    // state's FIRE STATION layer doesn't include, so there is no pin to
    // attach to. Given a lat/lng the map draws its own pin for them.
    lat: typeof dept?.Latitude === 'number' ? dept.Latitude : null,
    lng: typeof dept?.Longitude === 'number' ? dept.Longitude : null,
    // Pins the photo to one building in multi-station towns. Per-photo
    // "Station Address" (Photos table) wins if present; otherwise the linked
    // department's Street Address (per-station dept records carry these).
    stationAddress: f['Station Address'] ?? dept?.['Street Address'] ?? null,
  });
}

// Featured first, then newest
out.sort((a, b) => (b.featured - a.featured) || String(b.dateTaken).localeCompare(String(a.dateTaken)));
writeFileSync(`${ROOT}/src/data/photos.json`, JSON.stringify(out, null, 2) + '\n');
console.log(`Synced ${out.length} photos (${photos.length} records total) -> src/data/photos.json + public/photos/`);
