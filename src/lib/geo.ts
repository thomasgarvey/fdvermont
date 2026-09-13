/**
 * Thinning an outline down to what the drawing can actually show.
 *
 * The boundaries in src/data are stored at about a metre, which is far finer
 * than a county map drawn at a thousand pixels to the degree can resolve. The
 * detail costs nothing to keep in the repo and a great deal to ship: every
 * point that survives is thirteen or so bytes in the HTML of every page that
 * draws it. Simplifying in projected pixels — after the projection, not before
 * — means the tolerance is stated in the units that matter.
 */

export type Point = [number, number];

/**
 * Douglas-Peucker, in whatever units the ring is already in.
 *
 * A ring closes on itself, so the first and last point are the same and the
 * usual "keep the two ends" seed is a single degenerate point that every other
 * point is measured against. Seed with the point furthest from the start
 * instead and simplify the two halves, which is the standard fix and keeps a
 * lake from collapsing to a triangle.
 *
 * Returns [] for a ring with no shape left, so the caller can drop it rather
 * than draw a sliver.
 */
export function simplify(points: Point[], tolerance: number): Point[] {
  if (points.length < 4 || tolerance <= 0) return points;

  const perp = (p: Point, a: Point, b: Point) => {
    const dx = b[0] - a[0];
    const dy = b[1] - a[1];
    const len = Math.hypot(dx, dy);
    if (!len) return Math.hypot(p[0] - a[0], p[1] - a[1]);
    return Math.abs(dy * p[0] - dx * p[1] + b[0] * a[1] - b[1] * a[0]) / len;
  };

  const last = points.length - 1;
  const closed = points[0][0] === points[last][0] && points[0][1] === points[last][1];

  const keep = new Array(points.length).fill(false);
  keep[0] = true;
  keep[last] = true;

  if (closed) {
    let far = 0;
    let farD = -1;
    for (let i = 1; i < last; i++) {
      const d = Math.hypot(points[i][0] - points[0][0], points[i][1] - points[0][1]);
      if (d > farD) {
        farD = d;
        far = i;
      }
    }
    keep[far] = true;
  }

  const stack: [number, number][] = [];
  let prev = 0;
  for (let i = 1; i <= last; i++) {
    if (keep[i]) {
      stack.push([prev, i]);
      prev = i;
    }
  }

  while (stack.length) {
    const [a, b] = stack.pop()!;
    if (b <= a + 1) continue;
    let mid = -1;
    let midD = -1;
    for (let i = a + 1; i < b; i++) {
      const d = perp(points[i], points[a], points[b]);
      if (d > midD) {
        midD = d;
        mid = i;
      }
    }
    if (midD > tolerance) {
      keep[mid] = true;
      stack.push([a, mid], [mid, b]);
    }
  }

  const out = points.filter((_, i) => keep[i]);
  return out.length >= 4 ? out : [];
}

/** Crossing test against a single ring. */
export const pointInRing = (x: number, y: number, ring: Point[]) => {
  let inside = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const [xi, yi] = ring[i];
    const [xj, yj] = ring[j];
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) inside = !inside;
  }
  return inside;
};

/** Whether two [minX, minY, maxX, maxY] boxes overlap at all. */
export const boxesOverlap = (a: number[], b: number[]) =>
  !(a[2] < b[0] || a[0] > b[2] || a[3] < b[1] || a[1] > b[3]);

export const boxOf = (points: Point[]): number[] => {
  const xs = points.map((p) => p[0]);
  const ys = points.map((p) => p[1]);
  return [Math.min(...xs), Math.min(...ys), Math.max(...xs), Math.max(...ys)];
};

/**
 * Sutherland-Hodgman against the drawing rectangle.
 *
 * Lake Champlain is one ring a hundred miles long. A county sees a few miles of
 * it, and without this the other ninety-five ship in the HTML of every page in
 * that county. The rectangle is convex, which is the only case this algorithm
 * handles and the only case needed here.
 */
export function clipToBox(points: Point[], box: number[]): Point[] {
  const [minX, minY, maxX, maxY] = box;
  const inside = (p: Point, edge: number) =>
    edge === 0 ? p[0] >= minX : edge === 1 ? p[0] <= maxX : edge === 2 ? p[1] >= minY : p[1] <= maxY;
  const cross = (a: Point, b: Point, edge: number): Point => {
    const t =
      edge === 0
        ? (minX - a[0]) / (b[0] - a[0])
        : edge === 1
          ? (maxX - a[0]) / (b[0] - a[0])
          : edge === 2
            ? (minY - a[1]) / (b[1] - a[1])
            : (maxY - a[1]) / (b[1] - a[1]);
    return [a[0] + t * (b[0] - a[0]), a[1] + t * (b[1] - a[1])];
  };

  let out = points;
  for (let edge = 0; edge < 4 && out.length; edge++) {
    const input = out;
    out = [];
    for (let i = 0; i < input.length; i++) {
      const cur = input[i];
      const prev = input[(i + input.length - 1) % input.length];
      const curIn = inside(cur, edge);
      const prevIn = inside(prev, edge);
      if (curIn) {
        if (!prevIn) out.push(cross(prev, cur, edge));
        out.push(cur);
      } else if (prevIn) {
        out.push(cross(prev, cur, edge));
      }
    }
  }
  if (out.length < 3) return [];
  // Sutherland-Hodgman drops the closing repeat; put it back so the ring still
  // reads as closed to simplify().
  const first = out[0];
  const last = out[out.length - 1];
  if (first[0] !== last[0] || first[1] !== last[1]) out.push([first[0], first[1]]);
  return out;
}

/** An SVG path from already-projected rings. */
export const pathOf = (rings: Point[][]) =>
  rings
    .map(
      (r) =>
        r.map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`).join('') + 'Z',
    )
    .join('');
