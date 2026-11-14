import { towns, apart } from './towns';

interface Spot { slug: string; name: string; lat: number; lng: number }

const centroid = (ss: { lat?: number | null; lng?: number | null }[]) => {
  const p = ss.filter((s) => Number.isFinite(s.lat) && Number.isFinite(s.lng) && s.lat != null && s.lng != null);
  if (!p.length) return null;
  return {
    lat: p.reduce((a, s) => a + s.lat!, 0) / p.length,
    lng: p.reduce((a, s) => a + s.lng!, 0) / p.length,
  };
};

const spots: Spot[] = [];
for (const t of towns) {
  const c = centroid(t.stations);
  if (c) spots.push({ slug: t.slug, name: t.name, ...c });
}
for (const a of apart) {
  const c = centroid(a.stations);
  if (c) spots.push({ slug: a.slug, name: a.department.name, ...c });
}

const rad = (d: number) => (d * Math.PI) / 180;
const miles = (a: Spot, b: Spot) => {
  const h =
    Math.sin(rad(b.lat - a.lat) / 2) ** 2 +
    Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.sin(rad(b.lng - a.lng) / 2) ** 2;
  return 3958.8 * 2 * Math.asin(Math.sqrt(h));
};

const ranked = new Map<string, { slug: string; name: string; miles: number }[]>();
for (const a of spots) {
  ranked.set(
    a.slug,
    spots
      .filter((b) => b.slug !== a.slug)
      .map((b) => ({ slug: b.slug, name: b.name, d: miles(a, b) }))
      .sort((x, y) => x.d - y.d)
      .slice(0, 10)
      .map((b) => ({ slug: b.slug, name: b.name, miles: Math.round(b.d) })),
  );
}

export function nearby(slug: string, n = 5) {
  return (ranked.get(slug) ?? []).slice(0, n);
}
