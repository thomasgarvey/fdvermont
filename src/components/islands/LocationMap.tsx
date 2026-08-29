import { useEffect, useRef, useState } from 'preact/hooks';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import 'leaflet.markercluster';
import locationsData from '../../data/locations.geojson';
import photosData from '../../data/photos.json';

// Fix broken default marker icons — reference PNGs from public/ to avoid Vite resolution issues
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: '/marker-icon.png',
  iconRetinaUrl: '/marker-icon-2x.png',
  shadowUrl: '/marker-shadow.png',
});

const OSM_TILE = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const OSM_ATTR = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

const DISPLAY_KEYS = ['PRIMARYADD', 'SITETYPE', 'TOWNNAME', 'COUNTY', 'STATE', 'ZIP'];

// Photos are synced from Airtable keyed by E911 town name (see scripts/sync-airtable.mjs).
// A photo's optional stationAddress pins it to one building; without it, the
// photo applies town-wide — but only in towns with a single station, so a
// photo is never shown on a building it might not depict.
const ADDR_TOKENS: Record<string, string> = {
  SOUTH: 'S', NORTH: 'N', EAST: 'E', WEST: 'W',
  AVENUE: 'AVE', STREET: 'ST', ROAD: 'RD', DRIVE: 'DR', LANE: 'LN',
  TURNPIKE: 'TPKE', PARKWAY: 'PKWY', HIGHWAY: 'HWY', ROUTE: '', RTE: '', RT: '',
};
const normAddr = (s: string | null | undefined) =>
  (s ?? '')
    .toUpperCase()
    .replace(/[^A-Z0-9 ]/g, ' ')
    .split(/\s+/)
    .map((w) => (w in ADDR_TOKENS ? ADDR_TOKENS[w] : w))
    .filter(Boolean)
    .join(' ');

const photosByTown = new Map<string, typeof photosData>();
const stationsPerTown = new Map<string, number>();
for (const p of photosData) {
  if (!p.town) continue;
  if (!photosByTown.has(p.town)) photosByTown.set(p.town, []);
  photosByTown.get(p.town)!.push(p);
}
for (const f of (locationsData as GeoJSON.FeatureCollection).features) {
  const t = (f.properties as any)?.TOWNNAME;
  if (t) stationsPerTown.set(t, (stationsPerTown.get(t) ?? 0) + 1);
}

// The one place that decides which photo (if any) belongs to a station.
// Used for both the popup and the marker colour so the two can't disagree.
function findPhoto(town: string | undefined, address: string | undefined) {
  const townPhotos = town ? photosByTown.get(town) : undefined;
  if (!townPhotos?.length) return null;
  const addr = normAddr(address);
  // Exact building match wins; otherwise town-wide only if unambiguous
  const exact = townPhotos.find((x) => x.stationAddress && normAddr(x.stationAddress) === addr);
  if (exact) return exact;
  if ((stationsPerTown.get(town!) ?? 0) > 1) return null;
  return townPhotos[0]; // featured-first order from the sync
}

type Photo = (typeof photosData)[number];

function photoBlockHtml(p: Photo): string {
  const credit = p.photographer ? `<div style="color:#888;font-size:11px;margin-top:2px">📷 ${p.photographer}</div>` : '';
  const caption = p.caption && p.caption !== p.department?.name
    ? `<div style="color:#555;font-size:12px;margin-top:2px">${p.caption}</div>` : '';
  return `
    <a href="${p.src}" target="_blank" rel="noopener" style="display:block;margin-top:6px">
      <img src="${p.thumb}" alt="${p.caption || 'Station photo'}" style="width:240px;max-width:100%;border-radius:8px;display:block" />
    </a>${caption}${credit}`;
}

function photoHtml(town: string | undefined, address: string | undefined): string {
  const p = findPhoto(town, address);
  return p ? photoBlockHtml(p) : '';
}

function buildPopup(props: Record<string, any>): string {
  const title = props.name ?? props.PRIMARYADD ?? 'Location';
  const rows = DISPLAY_KEYS
    .filter((k) => props[k] != null && typeof props[k] === 'string')
    .map((k) => `<tr><td style="padding:2px 6px 2px 0;color:#555">${k}</td><td style="padding:2px 0">${props[k]}</td></tr>`)
    .join('');
  return `<strong>${title}</strong>${photoHtml(props.TOWNNAME, props.PRIMARYADD)}${rows ? `<table style="margin-top:4px;border-collapse:collapse">${rows}</table>` : ''}`;
}

const titleCase = (s: string) =>
  s.toLowerCase().replace(/\b[a-z]/g, (c) => c.toUpperCase()).replace(/\bVt\b/g, 'VT');

// Green = we have a photo of this station, blue = still needs one.
const PHOTO_GREEN = '#2e7d32';
const NEEDS_BLUE = '#2563eb';
const pinIcon = (color: string) =>
  L.divIcon({
    html: `<svg width="26" height="38" viewBox="0 0 26 38" xmlns="http://www.w3.org/2000/svg">
      <path d="M13 0.6C6.1 0.6 0.6 6.1 0.6 13c0 8.9 12.4 24.4 12.4 24.4S25.4 21.9 25.4 13C25.4 6.1 19.9 0.6 13 0.6z"
        fill="${color}" stroke="#fff" stroke-width="1.2"/>
      <circle cx="13" cy="13" r="4.6" fill="#fff"/>
    </svg>`,
    className: '',
    iconSize: [26, 38],
    iconAnchor: [13, 38],
    popupAnchor: [0, -34],
  });
const ICON_WITH_PHOTO = pinIcon(PHOTO_GREEN);
const ICON_NO_PHOTO = pinIcon(NEEDS_BLUE);

interface SearchEntry {
  town: string;      // raw TOWNNAME
  address: string;   // raw PRIMARYADD
  haystack: string;  // uppercase text to match against
  hasPhoto: boolean;
  marker: L.Marker;
}

interface Props {
  height?: string;
  zoom?: number;
  tileUrl?: string;
  attribution?: string;
}

export default function LocationMap({
  height = '500px',
  zoom = 13,
  tileUrl = OSM_TILE,
  attribution = OSM_ATTR,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const clusterRef = useRef<any>(null);
  const indexRef = useRef<SearchEntry[]>([]);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchEntry[]>([]);

  const runSearch = (q: string) => {
    setQuery(q);
    const needle = q.toUpperCase().trim();
    if (needle.length < 2) { setResults([]); return; }
    const scored = indexRef.current
      .filter((e) => e.haystack.includes(needle))
      .sort((a, b) => {
        const aTown = a.town.startsWith(needle) ? 0 : 1;
        const bTown = b.town.startsWith(needle) ? 0 : 1;
        return aTown - bTown || a.town.localeCompare(b.town);
      });
    setResults(scored.slice(0, 8));
  };

  const goTo = (e: SearchEntry) => {
    setQuery('');
    setResults([]);
    clusterRef.current?.zoomToShowLayer(e.marker, () => e.marker.openPopup());
  };

  useEffect(() => {
    if (!containerRef.current) return;

    const map = L.map(containerRef.current, { zoomControl: false });
    L.control.zoom({ position: 'bottomleft' }).addTo(map);
    L.tileLayer(tileUrl, { attribution }).addTo(map);

    const cluster = (L as any).markerClusterGroup({
      chunkedLoading: true,
      // Ring shows the share of stations in this cluster that have a photo,
      // so photo coverage is legible before you zoom in to individual pins.
      iconCreateFunction(c: any) {
        const children = c.getAllChildMarkers();
        const count = children.length;
        const withPhoto = children.filter(
          (m: any) => m.options.icon === ICON_WITH_PHOTO,
        ).length;
        const pct = count ? (withPhoto / count) * 100 : 0;
        const size = count < 10 ? 36 : count < 40 ? 44 : 52;
        const inner = size - 9;
        return L.divIcon({
          html: `<div style="width:${size}px;height:${size}px;border-radius:50%;background:conic-gradient(${PHOTO_GREEN} 0 ${pct}%, ${NEEDS_BLUE} ${pct}% 100%);display:flex;align-items:center;justify-content:center;box-shadow:0 1px 4px rgba(0,0,0,.4)"><div style="width:${inner}px;height:${inner}px;border-radius:50%;background:#2b2b2b;color:#fff;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:${size < 44 ? 13 : 15}px">${count}</div></div>`,
          className: '',
          iconSize: [size, size],
          iconAnchor: [size / 2, size / 2],
        });
      },
    });

    const nonPointLayers: L.Layer[] = [];

    const placed = new Set<string>();

    for (const feature of (locationsData as GeoJSON.FeatureCollection).features) {
      if (!feature.geometry) continue;
      const popup = buildPopup((feature.properties ?? {}) as Record<string, any>);

      if (feature.geometry.type === 'Point') {
        const [lng, lat] = (feature.geometry as GeoJSON.Point).coordinates;
        const props = (feature.properties ?? {}) as Record<string, any>;
        const town = props.TOWNNAME ?? '';
        const photo = findPhoto(town, props.PRIMARYADD);
        if (photo) placed.add(photo.id);
        const marker = L.marker([lat, lng], {
          icon: photo ? ICON_WITH_PHOTO : ICON_NO_PHOTO,
        }).bindPopup(popup);
        cluster.addLayer(marker);
        const deptNames = (photosByTown.get(town) ?? [])
          .map((p) => p.department?.name ?? '')
          .join(' ');
        indexRef.current.push({
          town,
          address: props.PRIMARYADD ?? '',
          haystack: `${town} ${props.PRIMARYADD ?? ''} ${props.ZIP ?? ''} ${deptNames}`.toUpperCase(),
          hasPhoto: !!photo,
          marker,
        });
      } else {
        nonPointLayers.push(L.geoJSON(feature).bindPopup(popup));
      }
    }

    // Photos whose department has no station in the E911 fire-station layer
    // (rescue squads and the like) get their own pin from the department's
    // Airtable coordinates, so a photo is never stranded off the map.
    for (const p of photosData as Photo[]) {
      if (placed.has(p.id) || p.lat == null || p.lng == null) continue;
      const name = p.department?.name || p.caption || 'Station';
      const addr = p.stationAddress ? `<div style="color:#555;margin-top:2px">${p.stationAddress}</div>` : '';
      const marker = L.marker([p.lat, p.lng], { icon: ICON_WITH_PHOTO })
        .bindPopup(`<strong>${name}</strong>${photoBlockHtml(p)}${addr}`);
      cluster.addLayer(marker);
      indexRef.current.push({
        town: (p.town ?? '').toUpperCase(),
        address: p.stationAddress ?? '',
        haystack: `${p.town ?? ''} ${p.stationAddress ?? ''} ${name}`.toUpperCase(),
        hasPhoto: true,
        marker,
      });
    }

    map.addLayer(cluster);
    clusterRef.current = cluster;
    nonPointLayers.forEach((l) => l.addTo(map));

    // The map lives in a flex row between the header and footer, so its final
    // height can resolve after mount. Re-measure before fitting, and again on
    // the next frame, or the initial fitBounds lands on a world view.
    const fitToStations = () => {
      map.invalidateSize();
      if (cluster.getLayers().length === 1 && (locationsData as GeoJSON.FeatureCollection).features[0]?.geometry?.type === 'Point') {
        const [lng, lat] = ((locationsData as GeoJSON.FeatureCollection).features[0].geometry as GeoJSON.Point).coordinates;
        map.setView([lat, lng], zoom);
        return;
      }
      const bounds = cluster.getBounds();
      if (bounds.isValid()) map.fitBounds(bounds, { padding: [20, 20] });
    };

    fitToStations();
    const raf = requestAnimationFrame(fitToStations);

    return () => {
      cancelAnimationFrame(raf);
      map.remove();
      indexRef.current = [];
      clusterRef.current = null;
    };
  }, []);

  return (
    <div style={{ position: 'relative', height, width: '100%' }}>
      <div ref={containerRef} style={{ height: '100%', width: '100%' }} />
      <div
        style={{
          position: 'absolute', bottom: '18px', left: '50%', transform: 'translateX(-50%)',
          zIndex: 1000, width: 'min(340px, calc(100% - 24px))',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        {results.length > 0 && (
          <ul
            style={{
              listStyle: 'none', margin: '0 0 -1px', padding: '4px 0', background: '#fff',
              borderRadius: '12px 12px 0 0', boxShadow: '0 -2px 8px rgba(0,0,0,.2)',
              maxHeight: '300px', overflowY: 'auto',
            }}
          >
            {results.map((r) => (
              <li key={`${r.town}-${r.address}`}>
                <button
                  onClick={() => goTo(r)}
                  style={{
                    display: 'block', width: '100%', textAlign: 'left', border: 'none',
                    background: 'none', padding: '8px 14px', fontSize: '14px', cursor: 'pointer',
                  }}
                  onMouseOver={(e) => ((e.target as HTMLElement).style.background = '#f6efe7')}
                  onMouseOut={(e) => ((e.target as HTMLElement).style.background = 'none')}
                >
                  <strong>{titleCase(r.town)}</strong>
                  {r.hasPhoto ? ' 📸' : ''}
                  <span style={{ color: '#777' }}> — {titleCase(r.address)}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
        <form
          action=""
          onSubmit={(e) => {
            e.preventDefault();
            if (results[0]) goTo(results[0]);
          }}
        >
        <input
          type="search"
          placeholder="🔍 Search a town or address…"
          value={query}
          onInput={(e) => runSearch((e.target as HTMLInputElement).value)}
          style={{
            width: '100%', padding: '10px 14px', fontSize: '15px', border: 'none',
            borderRadius: results.length ? '0 0 12px 12px' : '999px',
            boxShadow: '0 2px 8px rgba(0,0,0,.25)', outline: 'none', boxSizing: 'border-box',
          }}
        />
        </form>
      </div>
    </div>
  );
}
