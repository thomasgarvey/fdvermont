import { useEffect, useRef, useState } from 'preact/hooks';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

/**
 * How far every part of Vermont is, in a straight line, from the nearest fire
 * station. The grid is precomputed (public/coverage.json, built by the scripts in
 * ~/Desktop/FDVT/coverage) because the point-in-town tests take minutes.
 *
 * cells: [row, col, miles, town]; stations: [lat, lng, name, source] where source
 * is 'vt' (the site's roster), 'osm' (OpenStreetMap, inside Vermont, missing from
 * E911) or 'out' (OpenStreetMap, across the state line).
 */
type Far = { lat: number; lng: number; mi: number; town: string; near: string; src: string };
type Data = {
  lat0: number; lng0: number; dlat: number; dlng: number;
  cells: [number, number, number, string][];
  stations: [number, number, string, 'vt' | 'osm' | 'out'][];
  far: Far[];
  counts: { vt: number; osm: number; out: number };
};

const BANDS: [number, string, number, string][] = [
  [2, '#fff7d6', 0, 'Under 2 miles'],
  [3, '#fde3a0', 0.35, '2–3 miles'],
  [5, '#f8b55c', 0.5, '3–5 miles'],
  [7, '#e8702f', 0.6, '5–7 miles'],
  [10, '#c0362c', 0.7, '7–10 miles'],
  [99, '#6e0f1a', 0.8, 'Over 10 miles'],
];
const band = (d: number) => BANDS.findIndex((b) => d <= b[0]);
const SRC_COLOUR = { vt: '#8B211E', osm: '#2f6db0', out: '#666' };
const srcNote = (s: string) => (s === 'out' ? ' (out of state)' : s === 'osm' ? ' (OpenStreetMap)' : '');
const VT_BOUNDS: L.LatLngBoundsExpression = [[42.73, -73.43], [45.01, -71.47]];

export default function CoverageMap() {
  const el = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const stLayer = useRef<L.LayerGroup | null>(null);
  const [data, setData] = useState<Data | null>(null);
  const [showSt, setShowSt] = useState(true);

  useEffect(() => {
    fetch('/coverage.json').then((r) => r.json()).then(setData);
  }, []);

  useEffect(() => {
    if (!data || !el.current) return;
    const map = L.map(el.current, { preferCanvas: true, zoomSnap: 0.25 }).fitBounds(VT_BOUNDS);
    mapRef.current = map;
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 15,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> contributors',
    }).addTo(map);
    const r = L.canvas({ padding: 0.3 });
    for (const [iy, ix, d] of data.cells) {
      const b = band(d);
      if (b <= 0) continue;
      const y = data.lat0 + iy * data.dlat, x = data.lng0 + ix * data.dlng;
      L.rectangle([[y, x], [y + data.dlat, x + data.dlng]], {
        renderer: r, stroke: false, fillColor: BANDS[b][1], fillOpacity: BANDS[b][2], interactive: false,
      }).addTo(map);
    }
    stLayer.current = L.layerGroup(
      data.stations.map(([y, x, n, s]) =>
        L.circleMarker([y, x], { renderer: r, radius: 3.5, weight: 1, color: '#fff', fillColor: SRC_COLOUR[s], fillOpacity: 1 })
          .bindTooltip(n + srcNote(s)),
      ),
    ).addTo(map);
    for (const f of data.far) L.circleMarker([f.lat, f.lng], { radius: 7, color: '#000', weight: 2, fill: false, interactive: false }).addTo(map);

    const idx = new Map(data.cells.map((c) => [c[0] + ',' + c[1], c]));
    map.on('click', (e: L.LeafletMouseEvent) => {
      const iy = Math.floor((e.latlng.lat - data.lat0) / data.dlat);
      const ix = Math.floor((e.latlng.lng - data.lng0) / data.dlng);
      const c = idx.get(iy + ',' + ix);
      if (!c) return;
      let best = data.stations[0], bd = Infinity;
      for (const s of data.stations) {
        const dd = Math.hypot((s[1] - e.latlng.lng) * 49.7, (s[0] - e.latlng.lat) * 69.05);
        if (dd < bd) { bd = dd; best = s; }
      }
      L.popup().setLatLng(e.latlng)
        .setContent(`<b>${c[3]}</b><br>${bd.toFixed(1)} miles in a straight line to<br>${best[2]}${srcNote(best[3])}`)
        .openOn(map);
    });
    const fit = () => { map.invalidateSize(); map.fitBounds(VT_BOUNDS); };
    requestAnimationFrame(fit);
    return () => { map.remove(); mapRef.current = null; };
  }, [data]);

  useEffect(() => {
    const m = mapRef.current, s = stLayer.current;
    if (!m || !s) return;
    showSt ? s.addTo(m) : s.remove();
  }, [showSt, data]);

  const over5 = data ? Math.round((100 * data.cells.filter((c) => c[2] > 5).length) / data.cells.length) : null;
  const goTo = (f: Far) => {
    const m = mapRef.current;
    if (!m) return;
    m.setView([f.lat, f.lng], 11);
    L.popup().setLatLng([f.lat, f.lng]).setContent(`<b>${f.town}</b><br>${f.mi} miles from the nearest station`).openOn(m);
  };

  return (
    <div class="cov">
      <aside>
        <a class="home" href="/">Vermont Fire Departments</a>
        <h1>How far is the nearest fire station?</h1>
        <p>
          Every square kilometre of Vermont, shaded by the straight-line distance to the closest fire station, including
          stations just across the state line.
        </p>
        <div class="stat">
          <div><b>{over5 == null ? '…' : `${over5}%`}</b><span>of Vermont's land is more than 5 miles from a station</span></div>
          <div><b>{data ? `${data.far[0].mi} mi` : '…'}</b><span>the furthest point, in {data ? data.far[0].town : '…'}</span></div>
        </div>
        <div class="legend">
          {BANDS.map((b) => (
            <>
              <span class="sw" style={{ background: b[1] }} />
              <span>{b[3]}</span>
            </>
          ))}
        </div>
        <label>
          <input type="checkbox" checked={showSt} onChange={(e) => setShowSt((e.target as HTMLInputElement).checked)} /> Show fire stations
        </label>
        <h2>The furthest places</h2>
        <ol>
          {data?.far.map((f) => (
            <li onClick={() => goTo(f)}>
              <b>{f.town}</b>, {f.mi} miles
              <small>Nearest: {f.near}{srcNote(f.src)}</small>
            </li>
          ))}
        </ol>
        <div class="note">
          <p>
            <b>Straight-line distance, not driving distance.</b> Roads in the mountains and the Northeast Kingdom wind, so
            the real trip is longer, sometimes much longer. Insurers' fire ratings use 5 road miles as the cut-off for
            protection. Click anywhere on the map for the distance there.
          </p>
          <p>
            <b>Stations:</b> {data?.counts.vt ?? '…'} from the site's roster (the state E911 file), {data?.counts.osm ?? '…'} more
            inside Vermont that the E911 file is missing, and {data?.counts.out ?? '…'} in New Hampshire, New York,
            Massachusetts and Quebec; the last two from OpenStreetMap, © OpenStreetMap contributors. A nearby station
            doesn't mean that department answers calls there.
          </p>
          <p>Much of the far-off land is national forest or unorganised gores with few or no homes.</p>
          <p><a href="/map">The full station map</a></p>
        </div>
      </aside>
      <div class="covmap" ref={el} />
    </div>
  );
}
