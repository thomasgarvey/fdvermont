/**
 * Writes vercel.json.
 *
 * Every station used to have its own page. For the 139 towns with a single
 * station that said the same thing as the department page, so the records now
 * live on the department page and each station keeps its old slug as an anchor
 * there. These redirects are what stop the old URLs breaking.
 *
 * Generated rather than hand-maintained: a station added or renamed in Airtable
 * changes its slug, and a stale hand-written list would send people to a page
 * that no longer has that anchor.
 *
 *   node scripts/build-redirects.mjs
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');

const slugify = (s) =>
  s.toLowerCase().normalize('NFKD').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

const titleCase = (s) =>
  (s ?? '').toLowerCase().replace(/\b[a-z]/g, (c) => c.toUpperCase())
    .replace(/\bVt\b/g, 'VT').replace(/\bUs\b/g, 'US');

// Rebuild the station slugs exactly as src/lib/stations.ts does, including the
// duplicate-suffix rule, or a handful of redirects would point nowhere.
const stations = JSON.parse(readFileSync(`${ROOT}/src/data/stations.json`, 'utf8'))
  .map((f) => ({
    town: titleCase(f.town),
    address: titleCase(f.address),
    esiteid: f.esiteid,
    id: f.id,
  }))
  .sort((a, b) => a.town.localeCompare(b.town) || a.address.localeCompare(b.address));

const seen = new Set();
const redirects = [
  { source: '/towns', destination: '/departments', permanent: true },
  { source: '/towns/:slug', destination: '/departments/:slug', permanent: true },
];

for (const s of stations) {
  let slug = slugify(`${s.town} ${s.address}`);
  if (seen.has(slug)) slug = `${slug}-${s.esiteid ?? s.id}`;
  seen.add(slug);
  redirects.push({
    source: `/stations/${slug}`,
    destination: `/departments/${slugify(s.town)}#${slug}`,
    permanent: true,
  });
}

writeFileSync(
  `${ROOT}/vercel.json`,
  JSON.stringify({ $schema: 'https://openapi.vercel.sh/vercel.json', redirects }, null, 2) + '\n',
);
console.log(`Redirects: ${redirects.length} -> vercel.json  (${redirects.length - 2} stations)`);
if (redirects.length > 1024) {
  console.warn('  !! Vercel caps redirects at 1024. Move to a rewrite rule before this grows.');
}
