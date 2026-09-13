/**
 * Lakes and ponds, from VCGI's open FeatureServer.
 *
 * A town boundary in Vermont does not stop at the shoreline — Burlington's runs
 * out into Lake Champlain to the New York line, and a third of the city's
 * 15.3 square miles is water. Drawing the towns alone therefore produced a
 * county with no lake in it: Burlington was not on the water, Malletts Bay and
 * Shelburne Bay were not there, and the shape did not read as Chittenden. It
 * also put Burlington's and Colchester's labels out in the lake, west of every
 * station in either town, so their stations looked like they belonged to the
 * next town along.
 *
 * So the water is its own layer, drawn over the towns. The boundaries stay as
 * VCGI files them, and the lake covers the part of each town that is lake.
 *
 *   node scripts/sync-water.mjs
 *
 * Run this before sync-town-boundaries.mjs: that script reads the output to
 * keep town labels out of the water.
 */
import { writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { bbox, labelPoint, round } from './geo.mjs';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const SERVICE =
  'https://services1.arcgis.com/BkFxaEFNwHqX3tAw/arcgis/rest/services' +
  '/FS_VCGI_OPENDATA_Water_VHDCARTO_poly_SP_v1/FeatureServer/0/query';

// Anything smaller than this is a pond that draws as a dot at county scale.
const MIN_SQKM = 1;

// Roughly half a pixel on a county map, which is drawn at about 1,050 pixels to
// the degree. Asking the server to generalise saves downloading a shoreline at
// a precision no one will ever see.
const OFFSET_DEG = 0.0005;

// Islands and inlets below ~165m across are under two pixels at county scale.
const MIN_SPAN_DEG = 0.0015;

/**
 * VCGI carries the whole Vermont side of Lake Champlain as one feature, and the
 * GNIS name on it is "Narrows, The" — the name of one reach in the middle of
 * it, not of the lake. It is the only name in the layer that is wrong for a map
 * of the whole body, and it is the one name most worth getting right.
 */
const RENAME = new Map([['Narrows, The', 'Lake Champlain']]);

// GNIS files a few names inverted for alphabetising. Reading "Memphremagog,
// Lake" off a map is a small stumble that is cheap to remove.
const uninvert = (s) => s.replace(/^(.+), (Lake|Pond|Reservoir|Brook|River)$/, '$2 $1');

const url = new URL(SERVICE);
url.searchParams.set('where', `AREASQKM>${MIN_SQKM}`);
url.searchParams.set('outFields', 'GNIS_NAME,AREASQKM');
url.searchParams.set('returnGeometry', 'true');
url.searchParams.set('outSR', '4326');
url.searchParams.set('maxAllowableOffset', String(OFFSET_DEG));
url.searchParams.set('f', 'json');

const res = await fetch(url);
if (!res.ok) throw new Error(`VCGI ${res.status} ${res.statusText}`);
const data = await res.json();
if (data.error) throw new Error(`VCGI: ${JSON.stringify(data.error)}`);
if (data.exceededTransferLimit) throw new Error('VCGI truncated the response; page the query');

const span = (ring) => {
  const [minX, minY, maxX, maxY] = bbox([ring]);
  return Math.max(maxX - minX, maxY - minY);
};

const bodies = [];
let dropped = 0;
for (const f of data.features ?? []) {
  const raw = (f.attributes.GNIS_NAME ?? '').trim();
  // The unnamed features in this layer are wide reaches of river — the
  // Connecticut, the Winooski, Otter Creek — carried as polygons. They are the
  // most expensive shapes in the layer and the least use for orientation, so
  // they are left out and the layer stays lakes and ponds.
  if (!raw) {
    dropped++;
    continue;
  }
  const name = uninvert(RENAME.get(raw) ?? raw);

  const rings = f.geometry.rings
    .filter((r) => span(r) > MIN_SPAN_DEG)
    .map((r) => r.map(([x, y]) => [round(x), round(y)]));
  if (!rings.length) continue;

  bodies.push({
    name,
    sqkm: Math.round(f.attributes.AREASQKM * 10) / 10,
    // Somewhere inside the water to write the name. Lake Champlain is long and
    // thin and full of islands, so the centroid is no good and this has to be
    // the furthest-from-any-edge search.
    centre: labelPoint(rings),
    rings,
  });
}

bodies.sort((a, b) => b.sqkm - a.sqkm);
writeFileSync(`${ROOT}/src/data/water.json`, JSON.stringify(bodies, null, 0) + '\n');

const rings = bodies.reduce((a, b) => a + b.rings.length, 0);
const pts = bodies.reduce((a, b) => a + b.rings.reduce((c, r) => c + r.length, 0), 0);
const bytes = JSON.stringify(bodies).length;
console.log(
  `Water: ${bodies.length} named bodies over ${MIN_SQKM} km2 ` +
    `(${rings} rings, ${pts} points) -> src/data/water.json (${(bytes / 1024).toFixed(0)} KB)`,
);
if (dropped) console.log(`Skipped ${dropped} unnamed features — river reaches, not lakes.`);
const noCentre = bodies.filter((b) => !b.centre);
if (noCentre.length) {
  console.warn(`  !! no interior label point for: ${noCentre.map((b) => b.name).join(', ')}`);
}
console.log(`Largest: ${bodies.slice(0, 5).map((b) => `${b.name} (${b.sqkm} km2)`).join(', ')}`);
