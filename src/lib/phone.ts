import { profiles } from '../data/profiles';
import { towns, apart, type Department } from './towns';

/**
 * The number shown for each department, the same one its page shows: Airtable's
 * Phone Number, else the written profile's. A town profile's number stands for a
 * department only when the town has just the one; with several it could be any of
 * theirs. Build-time only — profiles.ts is far too big to ship to the browser, so
 * the map is handed this as a plain object.
 */
export const phoneById: Record<string, string> = {};
for (const t of towns) {
  const p = profiles[t.slug]?.contact?.phone;
  for (const d of t.departments) {
    const v = d.phone || (t.departments.length === 1 ? p : null);
    if (v) phoneById[d.id] = v;
  }
}
for (const a of apart) {
  const v = a.department.phone || profiles[a.slug]?.contact?.phone;
  if (v) phoneById[a.department.id] = v;
}

export const phoneFor = (d: Department): string | null => phoneById[d.id] ?? null;
