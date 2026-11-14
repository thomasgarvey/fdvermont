import { useEffect, useRef, useState } from 'preact/hooks';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import 'leaflet.markercluster';
import photosData from '../../data/photos.json';
import { stations as stationRecords } from '../../lib/stations';
import { towns, apart } from '../../lib/towns';
import { telHref } from '../../lib/tel';
import photoFocus from '../../data/photo-focus.json';

// Slugs come from the same module that generates /stations/[slug], so a popup
// link can never point at a page that was not built.
const SLUG_BY_ESITEID = new Map(stationRecords.map((s) => [s.esiteid, s.slug]));

// Fix broken default marker icons — reference PNGs from public/ to avoid Vite resolution issues
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: '/marker-icon.png',
  iconRetinaUrl: '/marker-icon-2x.png',
  shadowUrl: '/marker-shadow.png',
});

const OSM_TILE = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const OSM_ATTR = '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> contributors';

// Photo-to-station matching lives in lib/stations.ts; this component reads the
// resolved result so the map, the station pages and the search cannot disagree.

type Photo = (typeof photosData)[number];

/**
 * The photograph in a popup: a fixed 16:9 crop, so the popup stays short enough
 * to sit inside the map with its heading in view. At full height a portrait
 * photo made the popup taller than the map, and Leaflet could only show it with
 * the station's name cut off above the top edge.
 *
 * @param href Where the photo should lead. Pass the station's record so a tap
 *   keeps the visitor on the site; omitted (supplemental pins, which have no
 *   page) the image is shown but not linked — opening a bare JPEG in a new tab
 *   just strands people outside the archive.
 */
// Where to crop a photograph: its set focus point, else toward the top third for a
// portrait shot (station signs sit above the bay doors), else the centre.
const cropAt = (p: Photo) =>
  (photoFocus as Record<string, string>)[p.id] ?? ((p.height ?? 0) > (p.width ?? 0) ? '50% 28%' : '50% 50%');

function photoBlockHtml(p: Photo, href?: string): string {
  const credit = p.photographer
    ? `<div style="color:var(--fdvt-faint,#888);font-size:11px;margin-top:3px">Photograph by ${p.photographer}</div>`
    : '';
  // Portrait photographs get a taller window, and every photo is cropped at its
  // focus point (photo-focus.json) or, for portraits, toward the sign above the doors.
  const portrait = (p.height ?? 0) > (p.width ?? 0);
  const pos = cropAt(p);
  const img = `<img src="${p.thumb}" alt="${p.caption || 'Station photo'}" style="width:100%;aspect-ratio:${portrait ? '4/3' : '16/9'};object-fit:cover;object-position:${pos};border-radius:4px;display:block" />`;
  const block = href
    ? `<a href="${href}" style="display:block;margin-top:8px">${img}</a>`
    : `<div style="margin-top:8px">${img}</div>`;
  return `${block}${credit}`;
}

/** Heading and the address beneath it: what the popup is about, first. */
function headHtml(name: string, line: string): string {
  const sub = line ? `<div style="color:var(--fdvt-muted,#555);font-size:12.5px;margin-top:1px">${line}</div>` : '';
  return `<strong style="display:block;font-size:15px;line-height:1.3">${name}</strong>${sub}`;
}


type StationRecord = (typeof stationRecords)[number];

function buildPopup(st: StationRecord): string {
  const p = st.photo;
  // Straight to the station on its department page; /stations/<slug> only
  // redirects there.
  const page = `/departments/${st.page}#${st.slug}`;
  const more = `<a href="${page}" style="display:inline-block;margin-top:7px;font-weight:600;color:var(--fdvt-link,#8B211E)">Station record →</a>`;
  const tel = deptsOf(st)
    .map((d) => [d, phoneOf(d)] as const)
    .filter(([, ph]) => ph)
    .map(([d, ph], _, all) => {
      const href = telHref(ph!);
      const num = href ? `<a href="${href}" style="color:var(--fdvt-link,#8B211E);font-weight:600;white-space:nowrap">${ph}</a>` : ph;
      return `<div style="margin-top:4px;font-size:13px">${all.length > 1 ? `${d.name}: ` : ''}${num}${all.length > 1 ? '' : ' <span style="color:var(--fdvt-muted,#555)">· not for emergencies</span>'}</div>`;
    })
    .join('');
  return `${headHtml(st.name, [st.address, st.town].filter(Boolean).join(', '))}${tel}${p ? photoBlockHtml(p, page) : ''}${more}`;
}

/**
 * The departments a station's page lists: a department with a page of its own for
 * its stations; else the town department the station is linked to in Airtable;
 * else every department in the station's town, since most stations are not linked.
 */
type Dept = (typeof towns)[number]['departments'][number];
const deptsByStation = new Map<string, Dept[]>();
for (const a of apart) for (const s of a.stations) deptsByStation.set(s.id, [a.department]);
for (const t of towns)
  for (const s of t.stations) {
    if (deptsByStation.has(s.id)) continue;
    // A station linked to one of its town's departments shows only that one.
    const own = t.departments.filter((d) => d.name === s.department);
    deptsByStation.set(s.id, own.length ? own : t.departments);
  }
const deptsOf = (st: StationRecord): Dept[] => deptsByStation.get(st.id) ?? [];
// Each department's number as its page shows it (lib/phone.ts), set from the
// component's props; Airtable's field alone misses the ones written into profiles.
let PHONES: Record<string, string> = {};
const phoneOf = (d: Dept): string | null => PHONES[d.id] ?? d.phone ?? null;

/** What hovering a pin shows: whose station it is and the department's phone. */
function tipHtml(st: StationRecord): string {
  const ds = deptsOf(st);
  const rows = ds.length
    ? ds.map((d) => `<div style="margin-top:2px"><strong>${d.name}</strong><br>${phoneOf(d) ?? '<span style="opacity:.7">No phone on record</span>'}</div>`).join('')
    : '<div style="opacity:.7">No department on record</div>';
  return `<div style="font-size:12px;opacity:.75">${st.name}</div>${rows}`;
}

const titleCase = (s: string) =>
  s.toLowerCase().replace(/\b[a-z]/g, (c) => c.toUpperCase()).replace(/\bVt\b/g, 'VT');

// Firehouse red = we have a photograph of this station, slate = still needs one.
// Kept in step with the map key on the homepage.
const PHOTO_GREEN = '#8B211E';
const NEEDS_BLUE = '#5C6469';
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
// Leaflet caps popups at 300px and otherwise shrinks to fit its content, so an
// image set to width:100% cannot widen it — on a phone that left the photograph
// at ~208px though the thumbnail we ship is 512px. Where there is a photograph,
// pin min and max together to force the width; plain popups still shrink.
const POPUP_W = Math.min(360, Math.max(240, Math.round(window.innerWidth * 0.86)));
// Auto-pan keeps a margin inside the map, and the bottom one clears the search pill.
const POPUP_PAN: L.PopupOptions = { autoPanPaddingTopLeft: [16, 16], autoPanPaddingBottomRight: [16, 80] };
const POPUP_OPTS_PHOTO: L.PopupOptions = { ...POPUP_PAN, maxWidth: POPUP_W, minWidth: POPUP_W };
const POPUP_OPTS_PLAIN: L.PopupOptions = { ...POPUP_PAN, maxWidth: POPUP_W };

const ICON_WITH_PHOTO = pinIcon(PHOTO_GREEN);
const ICON_NO_PHOTO = pinIcon(NEEDS_BLUE);

/** A town with more than one station, offered as "show them all". */
interface TownHit {
  town: string;      // raw TOWNNAME
  markers: L.Marker[];
  /** The town's department page, under /departments. */
  page?: string;
}

interface SearchEntry {
  town: string;      // raw TOWNNAME
  address: string;   // raw PRIMARYADD
  haystack: string;  // uppercase text to match against
  hasPhoto: boolean;
  marker: L.Marker;
  page?: string;
}

interface Props {
  height?: string;
  /** Department id -> phone, from lib/phone.ts at build time. */
  phones?: Record<string, string>;
  zoom?: number;
  tileUrl?: string;
  attribution?: string;
  /**
   * For a map embedded in a long page. A one-finger drag or a plain scroll
   * wheel moves the page past the map instead of trapping the visitor in it;
   * two fingers (touch) or Ctrl/Cmd + scroll (mouse and trackpad) move and zoom
   * the map, with a short hint when someone tries the wrong way.
   */
  cooperative?: boolean;
}

export default function LocationMap({
  height = '500px',
  zoom = 13,
  tileUrl = OSM_TILE,
  attribution = OSM_ATTR,
  phones = {},
  cooperative = false,
}: Props) {
  PHONES = phones;
  const containerRef = useRef<HTMLDivElement>(null);
  const clusterRef = useRef<any>(null);
  const mapRef = useRef<L.Map | null>(null);
  // Stops the map re-fitting itself to Vermont as the page settles; see below.
  const releaseRef = useRef<() => void>(() => {});
  const indexRef = useRef<SearchEntry[]>([]);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchEntry[]>([]);
  const [towns, setTowns] = useState<TownHit[]>([]);
  const [gestureHint, setGestureHint] = useState('');

  // Returns the results it just rendered, so callers outside the input (the
  // homepage hero search) can act on the top hit without waiting for state.
  // A town with several stations comes first as one row that frames them all:
  // searching "South Burlington" should show South Burlington, not open
  // whichever of its stations happened to sort first.
  const townsFor = (needle: string): TownHit[] => {
    const byTown = new Map<string, L.Marker[]>();
    const pageOf = new Map<string, string>();
    for (const e of indexRef.current) {
      if (!e.town.startsWith(needle)) continue;
      if (!byTown.has(e.town)) byTown.set(e.town, []);
      byTown.get(e.town)!.push(e.marker);
      if (e.page && !pageOf.has(e.town)) pageOf.set(e.town, e.page);
    }
    return [...byTown]
      .filter(([, m]) => m.length > 1)
      .sort(([a], [b]) => (a === needle ? -1 : b === needle ? 1 : a.localeCompare(b)))
      .slice(0, 2)
      .map(([town, markers]) => ({ town, markers, page: pageOf.get(town) }));
  };

  const runSearch = (q: string): SearchEntry[] => {
    setQuery(q);
    const needle = q.toUpperCase().trim();
    if (needle.length < 2) { setResults([]); setTowns([]); return []; }
    setTowns(townsFor(needle));
    const scored = indexRef.current
      .filter((e) => e.haystack.includes(needle))
      .sort((a, b) => {
        const aTown = a.town.startsWith(needle) ? 0 : 1;
        const bTown = b.town.startsWith(needle) ? 0 : 1;
        return aTown - bTown || a.town.localeCompare(b.town);
      });
    const top = scored.slice(0, 8);
    setResults(top);
    return top;
  };

  const goTo = (e: SearchEntry) => {
    setQuery('');
    setResults([]);
    setTowns([]);
    releaseRef.current();
    clusterRef.current?.zoomToShowLayer(e.marker, () => e.marker.openPopup());
  };

  // Frame every station in the town, then zoom in until none of them is still
  // folded into a cluster — in Burlington five stations sit within two miles.
  const goToTown = (t: TownHit) => {
    setQuery('');
    setResults([]);
    setTowns([]);
    releaseRef.current();
    const map = mapRef.current;
    const cluster = clusterRef.current;
    if (!map || !cluster) return;
    map.closePopup();
    const unfold = () => {
      const folded = t.markers.some((m) => cluster.getVisibleParent(m) !== m);
      if (folded && map.getZoom() < map.getMaxZoom()) {
        map.once('moveend', unfold);
        map.zoomIn(1);
      }
    };
    map.once('moveend', unfold);
    map.fitBounds(L.latLngBounds(t.markers.map((m) => m.getLatLng())), {
      paddingTopLeft: [40, 70],
      paddingBottomRight: [40, 100],
      maxZoom: 15,
    });
  };

  // Enter (or the homepage search) on a town's exact name frames the town;
  // anything else goes to the best single match.
  const goToBest = (q: string, top: SearchEntry[]) => {
    const needle = q.toUpperCase().trim();
    const town = townsFor(needle).find((t) => t.town === needle);
    if (town) goToTown(town);
    else if (top[0]) goTo(top[0]);
  };

  // The homepage hero search is the page's primary entry point; it hands the
  // query here rather than keeping a second copy of the station index.
  // detail.go means "jump to the best match", not just list the results.
  useEffect(() => {
    const onExternalSearch = (e: Event) => {
      const { q = '', go = false } = (e as CustomEvent).detail ?? {};
      const top = runSearch(q);
      if (go) goToBest(q, top);
    };
    window.addEventListener('fdvt:search', onExternalSearch);
    return () => window.removeEventListener('fdvt:search', onExternalSearch);
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    // Leaflet snaps to whole zoom levels, so fitting Vermont into a phone-sized
    // box lands on 7 when it wants about 7.6 — and 7 frames Montreal and
    // Massachusetts around a small Vermont. Fractional zoom lets the fit be
    // exact; zoomDelta keeps the +/- buttons stepping a whole level at a time.
    // On a touch screen a cooperative map starts with dragging off, so a
    // one-finger swipe scrolls the page; see the gesture block below.
    const touchScreen = cooperative && window.matchMedia('(pointer: coarse)').matches;
    const map = L.map(containerRef.current, {
      zoomControl: false,
      zoomSnap: 0,
      zoomDelta: 1,
      dragging: !touchScreen,
    });
    // The search pill sits bottom-centre and spans nearly the full width on a
    // phone, which puts it straight over a bottom-left zoom control.
    L.control
      .zoom({ position: window.innerWidth < 700 ? 'topleft' : 'bottomleft' })
      .addTo(map);

    // A photo popup runs ~460px tall: thumbnail, caption, credit, the six-row
    // table and two links. The homepage panel is only clamp(380px, 58vh, 560px),
    // so on a phone the popup is as tall as the map that has to hold it. Leaflet
    // then auto-pans to fit a popup that can never fit, panning hard against the
    // container edge — and every pan re-clusters the markers, which takes the
    // popup's own marker out from under it and closes it. Capping the popup to
    // part of the map's height makes Leaflet scroll the content instead, so the
    // pan settles and the popup stays put. Measured on open, because the panel
    // is a flex child whose height only resolves after mount.
    map.on('popupopen', (e: any) => {
      const max = Math.max(160, Math.round(map.getSize().y * 0.62));
      if (e.popup.options.maxHeight !== max) {
        e.popup.options.maxHeight = max;
        e.popup.update();
      }
    });
    L.tileLayer(tileUrl, { attribution }).addTo(map);
    mapRef.current = map;

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
          html: `<div style="width:${size}px;height:${size}px;border-radius:50%;background:conic-gradient(${PHOTO_GREEN} 0 ${pct}%, ${NEEDS_BLUE} ${pct}% 100%);display:flex;align-items:center;justify-content:center;box-shadow:0 1px 4px rgba(0,0,0,.35)"><div style="width:${inner}px;height:${inner}px;border-radius:50%;background:#242526;color:#F3EBDD;display:flex;align-items:center;justify-content:center;font-family:'Source Serif 4',Georgia,serif;font-weight:600;font-size:${size < 44 ? 13 : 15}px">${count}</div></div>`,
          className: '',
          iconSize: [size, size],
          iconAnchor: [size / 2, size / 2],
        });
      },
    });

    const nonPointLayers: L.Layer[] = [];

    const placed = new Set<string>();

    // One pin per active station in Airtable's Fire Stations table. lib/stations
    // has already resolved which photograph belongs to each, so the map does not
    // repeat that matching and cannot disagree with the station pages.
    for (const st of stationRecords) {
      const photo = st.photo;
      if (photo) placed.add(photo.id);
      const marker = L.marker([st.lat, st.lng], {
        icon: photo ? ICON_WITH_PHOTO : ICON_NO_PHOTO,
      }).bindPopup(buildPopup(st), photo ? POPUP_OPTS_PHOTO : POPUP_OPTS_PLAIN);
      // Hover only exists with a mouse; on a touch screen a tooltip would fight
      // the popup for the same tap, and the popup already carries the phone.
      if (!L.Browser.mobile) marker.bindTooltip(tipHtml(st), { direction: 'top', offset: [0, -10], opacity: 0.95 });
      cluster.addLayer(marker);
      indexRef.current.push({
        town: st.town.toUpperCase(),
        address: st.address,
        haystack: `${st.town} ${st.address} ${st.zip} ${st.name}`.toUpperCase(),
        hasPhoto: !!photo,
        marker,
        page: st.page,
      });
    }

    // Photos whose department has no row in Fire Stations (rescue squads, and
    // towns the E911 import missed) get their own pin from the department's
    // coordinates, so a photograph is never stranded off the map.
    for (const p of photosData as Photo[]) {
      if (placed.has(p.id) || p.lat == null || p.lng == null) continue;
      const name = p.department?.name || p.caption || 'Station';
      const marker = L.marker([p.lat, p.lng], { icon: ICON_WITH_PHOTO })
        .bindPopup(`${headHtml(name, p.stationAddress ?? '')}${photoBlockHtml(p)}`, POPUP_OPTS_PHOTO);
      cluster.addLayer(marker);
      // These pins sit outside the E911 town list, so fall back to the
      // department's city for the label the search results show.
      const label = p.town ?? p.department?.city ?? '';
      indexRef.current.push({
        town: label.toUpperCase(),
        address: p.stationAddress ?? '',
        haystack: `${label} ${p.stationAddress ?? ''} ${name}`.toUpperCase(),
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
      if (cluster.getLayers().length === 1 && stationRecords[0]) {
        map.setView([stationRecords[0].lat, stationRecords[0].lng], zoom);
        return;
      }
      const bounds = cluster.getBounds();
      // Markers are pins anchored at their tip, so they need headroom above;
      // and the search pill covers the bottom ~60px of the map.
      if (bounds.isValid()) {
        // Keep this modest: on a phone the map is only ~470px tall, so every
        // 40px of padding costs most of a zoom level and pushes Vermont back
        // into a view of the whole north-east.
        // fitBounds pads marker *positions*, but a pin is drawn 38px above its
        // anchor and a cluster circle straddles its centre, so both overflow
        // the padded box. Top clears a pin; bottom clears the search pill.
        map.fitBounds(bounds, {
          paddingTopLeft: [10, 44],
          paddingBottomRight: [10, 72],
        });
      }
    };

    fitToStations();
    const raf = requestAnimationFrame(fitToStations);

    // Two frames is not enough: the panel is a flex child whose height settles
    // after fonts and the hero image land. Fitting early against a shorter box
    // yields a lower zoom — the whole north-east instead of Vermont — and
    // nothing corrected it. Refit whenever the container resizes, until the
    // visitor takes control of the view themselves.
    // A search counts as taking control too: the homepage search lands while the
    // page is still settling, and a late refit zoomed back out to Vermont and
    // pushed the open popup off the top of the map.
    let userHasMoved = false;
    const release = () => { userHasMoved = true; ro.disconnect(); };
    releaseRef.current = release;
    map.once('zoomstart dragstart', release);
    const ro = new ResizeObserver(() => { if (!userHasMoved) fitToStations(); });
    ro.observe(containerRef.current);

    // Cooperative gestures. Listeners sit on the wrapper so they run before
    // Leaflet's own on the map container.
    let undoGestures = () => {};
    const frame = containerRef.current.parentElement;
    if (cooperative && frame) {
      let hintTimer = 0;
      const hint = (text: string) => {
        setGestureHint(text);
        clearTimeout(hintTimer);
        hintTimer = window.setTimeout(() => setGestureHint(''), 1600);
      };
      const mac = /Mac|iPhone|iPad/.test(navigator.platform);
      const onWheel = (e: WheelEvent) => {
        // A trackpad pinch arrives as a wheel event with ctrlKey set.
        if (e.ctrlKey || e.metaKey) return;
        e.stopPropagation();
        hint(`Hold ${mac ? '⌘' : 'Ctrl'} and scroll to zoom the map`);
      };
      frame.addEventListener('wheel', onWheel, { capture: true, passive: true });

      let startX = 0, startY = 0, warned = false;
      const onStart = (e: TouchEvent) => {
        warned = false;
        if (e.touches.length === 1) { startX = e.touches[0].clientX; startY = e.touches[0].clientY; }
        if (e.touches.length >= 2) map.dragging.enable();
      };
      const onMove = (e: TouchEvent) => {
        if (e.touches.length >= 2) {
          // Claim the gesture before the browser decides it is a page scroll.
          if (e.cancelable) e.preventDefault();
        } else if (!warned && Math.hypot(e.touches[0].clientX - startX, e.touches[0].clientY - startY) > 12) {
          warned = true;
          hint('Use two fingers to move the map');
        }
      };
      const onEnd = (e: TouchEvent) => {
        if (touchScreen && e.touches.length < 2) map.dragging.disable();
      };
      if (touchScreen) {
        frame.addEventListener('touchstart', onStart, { capture: true, passive: true });
        frame.addEventListener('touchmove', onMove, { capture: true, passive: false });
        frame.addEventListener('touchend', onEnd, { capture: true, passive: true });
        frame.addEventListener('touchcancel', onEnd, { capture: true, passive: true });
      }
      undoGestures = () => {
        clearTimeout(hintTimer);
        frame.removeEventListener('wheel', onWheel, true);
        frame.removeEventListener('touchstart', onStart, true);
        frame.removeEventListener('touchmove', onMove, true);
        frame.removeEventListener('touchend', onEnd, true);
        frame.removeEventListener('touchcancel', onEnd, true);
      };
    }

    return () => {
      undoGestures();
      ro.disconnect();
      cancelAnimationFrame(raf);
      map.remove();
      indexRef.current = [];
      clusterRef.current = null;
      mapRef.current = null;
    };
  }, []);

  return (
    <div style={{ position: 'relative', height, width: '100%' }}>
      <div ref={containerRef} style={{ height: '100%', width: '100%' }} />
      {gestureHint && (
        <div
          role="status"
          style={{
            position: 'absolute', inset: 0, zIndex: 1100, pointerEvents: 'none',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'rgba(0,0,0,.45)', color: '#fff', textAlign: 'center',
            font: '600 16px system-ui, sans-serif', padding: '0 24px',
          }}
        >
          {gestureHint}
        </div>
      )}
      <div
        style={{
          position: 'absolute', bottom: '18px', left: '50%', transform: 'translateX(-50%)',
          zIndex: 1000, width: 'min(340px, calc(100% - 24px))',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        {(results.length > 0 || towns.length > 0) && (
          <ul
            style={{
              listStyle: 'none', margin: '0 0 -1px', padding: '4px 0',
              background: 'var(--fdvt-panel, #fff)', color: 'var(--fdvt-panel-ink, #2b2b2b)',
              borderRadius: '12px 12px 0 0', boxShadow: '0 -2px 8px rgba(0,0,0,.2)',
              maxHeight: '300px', overflowY: 'auto',
            }}
          >
            {towns.map((tw) => (
              <li key={`town-${tw.town}`} style={{ display: 'flex', alignItems: 'stretch', borderBottom: '1px solid var(--fdvt-panel-rule, rgba(0,0,0,.08))' }}>
                <button
                  onClick={() => goToTown(tw)}
                  style={{
                    display: 'block', flex: 1, textAlign: 'left', border: 'none',
                    background: 'none', color: 'inherit', padding: '8px 14px', fontSize: '14px', cursor: 'pointer',
                  }}
                  onMouseOver={(e) => ((e.currentTarget as HTMLElement).style.background = 'var(--fdvt-panel-hover, #f6efe7)')}
                  onMouseOut={(e) => ((e.currentTarget as HTMLElement).style.background = 'none')}
                >
                  <strong>{titleCase(tw.town)}</strong>
                  <span style={{ color: 'var(--fdvt-muted, #777)' }}> — all {tw.markers.length} stations</span>
                </button>
                {tw.page && (
                  <a
                    href={`/departments/${tw.page}`}
                    style={{
                      display: 'flex', alignItems: 'center', padding: '8px 14px', fontSize: '13px',
                      fontWeight: 600, color: 'var(--fdvt-link, #8B211E)', textDecoration: 'none', whiteSpace: 'nowrap',
                    }}
                  >
                    Department page →
                  </a>
                )}
              </li>
            ))}
            {results.map((r) => (
              <li key={`${r.town}-${r.address}`}>
                <button
                  onClick={() => goTo(r)}
                  style={{
                    display: 'block', width: '100%', textAlign: 'left', border: 'none',
                    background: 'none', color: 'inherit', padding: '8px 14px', fontSize: '14px', cursor: 'pointer',
                  }}
                  onMouseOver={(e) => ((e.target as HTMLElement).style.background = 'var(--fdvt-panel-hover, #f6efe7)')}
                  onMouseOut={(e) => ((e.target as HTMLElement).style.background = 'none')}
                >
                  <strong>{titleCase(r.town)}</strong>
                  {r.hasPhoto ? ' 📸' : ''}
                  <span style={{ color: 'var(--fdvt-muted, #777)' }}> — {titleCase(r.address)}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
        <form
          action=""
          onSubmit={(e) => {
            e.preventDefault();
            goToBest(query, results);
          }}
        >
        <input
          type="search"
          placeholder="🔍 Search a town or address…"
          value={query}
          onInput={(e) => runSearch((e.target as HTMLInputElement).value)}
          style={{
            width: '100%', padding: '10px 14px', fontSize: '15px', border: 'none',
            borderRadius: results.length || towns.length ? '0 0 12px 12px' : '999px',
            boxShadow: '0 2px 8px rgba(0,0,0,.25)', outline: 'none', boxSizing: 'border-box',
          }}
        />
        </form>
      </div>
    </div>
  );
}
