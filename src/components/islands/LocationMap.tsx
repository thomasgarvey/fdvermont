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

// Photos are synced from Airtable keyed by E911 town name (see scripts/sync-airtable.mjs)
const photosByTown = new Map<string, typeof photosData>();
for (const p of photosData) {
  if (!p.town) continue;
  if (!photosByTown.has(p.town)) photosByTown.set(p.town, []);
  photosByTown.get(p.town)!.push(p);
}

function photoHtml(town: string | undefined): string {
  const photos = town ? photosByTown.get(town) : undefined;
  if (!photos?.length) return '';
  const p = photos[0]; // featured-first order from the sync
  const credit = p.photographer ? `<div style="color:#888;font-size:11px;margin-top:2px">📷 ${p.photographer}</div>` : '';
  const caption = p.caption && p.caption !== p.department?.name
    ? `<div style="color:#555;font-size:12px;margin-top:2px">${p.caption}</div>` : '';
  return `
    <a href="${p.src}" target="_blank" rel="noopener" style="display:block;margin-top:6px">
      <img src="${p.thumb}" alt="${p.caption || 'Station photo'}" style="width:240px;max-width:100%;border-radius:8px;display:block" />
    </a>${caption}${credit}`;
}

function buildPopup(props: Record<string, any>): string {
  const title = props.name ?? props.PRIMARYADD ?? 'Location';
  const rows = DISPLAY_KEYS
    .filter((k) => props[k] != null && typeof props[k] === 'string')
    .map((k) => `<tr><td style="padding:2px 6px 2px 0;color:#555">${k}</td><td style="padding:2px 0">${props[k]}</td></tr>`)
    .join('');
  return `<strong>${title}</strong>${photoHtml(props.TOWNNAME)}${rows ? `<table style="margin-top:4px;border-collapse:collapse">${rows}</table>` : ''}`;
}

const titleCase = (s: string) =>
  s.toLowerCase().replace(/\b[a-z]/g, (c) => c.toUpperCase()).replace(/\bVt\b/g, 'VT');

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

    const map = L.map(containerRef.current);
    L.tileLayer(tileUrl, { attribution }).addTo(map);

    const cluster = (L as any).markerClusterGroup({
      chunkedLoading: true,
      iconCreateFunction(c: any) {
        const count = c.getChildCount();
        let size: number;
        let color: string;
        if (count < 10) {
          size = 36; color = '#60a5fa';
        } else if (count < 40) {
          size = 44; color = '#2563eb';
        } else {
          size = 52; color = '#1e3a8a';
        }
        return L.divIcon({
          html: `<div style="width:${size}px;height:${size}px;border-radius:50%;background:${color};display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;font-size:${size < 44 ? 13 : 15}px;box-shadow:0 1px 4px rgba(0,0,0,.4)">${count}</div>`,
          className: '',
          iconSize: [size, size],
          iconAnchor: [size / 2, size / 2],
        });
      },
    });

    const nonPointLayers: L.Layer[] = [];

    for (const feature of (locationsData as GeoJSON.FeatureCollection).features) {
      if (!feature.geometry) continue;
      const popup = buildPopup((feature.properties ?? {}) as Record<string, any>);

      if (feature.geometry.type === 'Point') {
        const [lng, lat] = (feature.geometry as GeoJSON.Point).coordinates;
        const marker = L.marker([lat, lng]).bindPopup(popup);
        cluster.addLayer(marker);
        const props = (feature.properties ?? {}) as Record<string, any>;
        const town = props.TOWNNAME ?? '';
        const deptNames = (photosByTown.get(town) ?? [])
          .map((p) => p.department?.name ?? '')
          .join(' ');
        indexRef.current.push({
          town,
          address: props.PRIMARYADD ?? '',
          haystack: `${town} ${props.PRIMARYADD ?? ''} ${props.ZIP ?? ''} ${deptNames}`.toUpperCase(),
          hasPhoto: photosByTown.has(town),
          marker,
        });
      } else {
        nonPointLayers.push(L.geoJSON(feature).bindPopup(popup));
      }
    }

    map.addLayer(cluster);
    clusterRef.current = cluster;
    nonPointLayers.forEach((l) => l.addTo(map));

    if (cluster.getLayers().length === 1 && (locationsData as GeoJSON.FeatureCollection).features[0]?.geometry?.type === 'Point') {
      const [lng, lat] = ((locationsData as GeoJSON.FeatureCollection).features[0].geometry as GeoJSON.Point).coordinates;
      map.setView([lat, lng], zoom);
    } else if (cluster.getLayers().length > 0) {
      map.fitBounds(cluster.getBounds());
    }

    return () => { map.remove(); indexRef.current = []; clusterRef.current = null; };
  }, []);

  return (
    <div style={{ position: 'relative', height, width: '100%' }}>
      <div ref={containerRef} style={{ height: '100%', width: '100%' }} />
      <div
        style={{
          position: 'absolute', top: '12px', left: '50%', transform: 'translateX(-50%)',
          zIndex: 1000, width: 'min(340px, calc(100% - 24px))',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
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
            borderRadius: results.length ? '12px 12px 0 0' : '999px',
            boxShadow: '0 2px 8px rgba(0,0,0,.25)', outline: 'none', boxSizing: 'border-box',
          }}
        />
        </form>
        {results.length > 0 && (
          <ul
            style={{
              listStyle: 'none', margin: 0, padding: '4px 0', background: '#fff',
              borderRadius: '0 0 12px 12px', boxShadow: '0 2px 8px rgba(0,0,0,.25)',
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
      </div>
    </div>
  );
}
