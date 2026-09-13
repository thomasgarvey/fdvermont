/**
 * Ring geometry shared by the sync scripts.
 *
 * Both the town boundaries and the water bodies come back from VCGI as rings of
 * [lng, lat], and both need the same two things done to them: test whether a
 * point is inside, and find somewhere sensible to write a name.
 *
 * Thinning an outline for drawing is a different job at a different scale, and
 * lives with the map that does it, in src/lib/geo.ts.
 */

/** Round coordinates to ~1m, which is all a map at county scale can resolve. */
export const round = (n) => Math.round(n * 1e5) / 1e5;

/**
 * Even-odd containment across a whole ring list. Islands come back from VCGI as
 * their own rings nested inside the water body, so counting crossings over
 * every ring puts a point on Grand Isle outside Lake Champlain without having
 * to know which rings are holes.
 */
export const pointInRings = (x, y, rings) => {
  let inside = false;
  for (const r of rings) {
    for (let i = 0, j = r.length - 1; i < r.length; j = i++) {
      const [xi, yi] = r[i];
      const [xj, yj] = r[j];
      if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) inside = !inside;
    }
  }
  return inside;
};

export const distToEdges = (x, y, rings) => {
  let best = Infinity;
  for (const r of rings) {
    for (let i = 0, j = r.length - 1; i < r.length; j = i++) {
      const [x1, y1] = r[j];
      const [x2, y2] = r[i];
      const dx = x2 - x1;
      const dy = y2 - y1;
      const len = dx * dx + dy * dy;
      const t = len ? Math.max(0, Math.min(1, ((x - x1) * dx + (y - y1) * dy) / len)) : 0;
      const ex = x1 + t * dx - x;
      const ey = y1 + t * dy - y;
      best = Math.min(best, Math.hypot(ex, ey));
    }
  }
  return best;
};

export const bbox = (rings) => {
  const pts = rings.flat();
  const xs = pts.map((p) => p[0]);
  const ys = pts.map((p) => p[1]);
  return [Math.min(...xs), Math.min(...ys), Math.max(...xs), Math.max(...ys)];
};

/**
 * Where a shape's name should sit. The centre of the bounding box is wrong for
 * anything that is not roughly convex — it put South Burlington's label inside
 * Burlington, which reads as the two towns overlapping. Use the area-weighted
 * centroid when it actually falls inside the shape, and otherwise search for
 * the interior point furthest from any edge.
 *
 * `avoid` rejects otherwise-valid points: pass the water rings and a lakeside
 * town's name stays on its land rather than drifting out into the lake, which
 * is where Burlington's and Colchester's labels had been sitting.
 */
export function labelPoint(rings, avoid = () => false) {
  const ok = (x, y) => pointInRings(x, y, rings) && !avoid(x, y);

  const ring = rings.reduce((a, b) => (b.length > a.length ? b : a), rings[0]);
  let a2 = 0;
  let cx = 0;
  let cy = 0;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const f = ring[j][0] * ring[i][1] - ring[i][0] * ring[j][1];
    a2 += f;
    cx += (ring[j][0] + ring[i][0]) * f;
    cy += (ring[j][1] + ring[i][1]) * f;
  }
  if (a2) {
    const c = [cx / (3 * a2), cy / (3 * a2)];
    if (ok(c[0], c[1])) return [round(c[0]), round(c[1])];
  }

  const [minX, minY, maxX, maxY] = bbox(rings);
  // A town whose land is a thin strip beside a big lake needs a finer grid than
  // a square inland town before any sample lands on the strip at all.
  const N = 96;
  let best = null;
  let bestD = -1;
  for (let i = 1; i < N; i++) {
    for (let j = 1; j < N; j++) {
      const x = minX + ((maxX - minX) * i) / N;
      const y = minY + ((maxY - minY) * j) / N;
      if (!ok(x, y)) continue;
      const d = distToEdges(x, y, rings);
      if (d > bestD) {
        bestD = d;
        best = [x, y];
      }
    }
  }
  return best ? [round(best[0]), round(best[1])] : null;
}
