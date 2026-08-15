# FDVT Data Sources

Documented per the project brief's requirement to record data-source research and
reasoning for key decisions. Last updated: 2026-08-14.

## The core distinction: departments vs. stations

Vermont fire data comes in two shapes, and conflating them caused the count
discrepancies noted in the project brief (ExpertGPS 292 vs. FEMA 206):

- A **department** is an administrative organization (e.g. "Brighton Fire
  Department") — it has a chief, a roster, an FDID, and may operate more than
  one station building.
- A **station** is a physical building with coordinates. Vermont has more
  stations than departments.

FDVT models **departments** as the primary content entity (Airtable), and uses
**station** point data (E911) for map coordinates.

## Sources in use

### 1. VT E911 Site Locations (ESITE) — coordinate source

- File: `src/data/locations.geojson` (277 features, `SITETYPE = FIRE STATION`)
- Origin: Vermont Center for Geographic Information (VCGI), the state's
  official E911 address-point database.
  - Dataset: <https://geodata.vermont.gov/datasets/VCGI::vt-data-e911-site-locations-address-points-1/>
  - Metadata: <https://maps.vcgi.vermont.gov/gisdata/metadata/EmergencyE911_ESITE.htm>
- Update dates in the snapshot run through 2023-01-27.
- Why we trust it: it is the operational database Vermont dispatch actually
  uses, and the authoritative import source OpenStreetMap uses for Vermont
  address points (<https://wiki.openstreetmap.org/wiki/VCGI_E911_address_points_import>).
  Strongest available coordinate accuracy for station buildings.

### 2. Airtable base "Vermont Fire Departments" — content source of truth

- 231 department records; linked Photos table (captions, photographer,
  featured flag, attachments).
- Believed derived from the USFA/FEMA National Fire Department Registry
  (signature columns: FDID, career/volunteer/paid-per-call counts), then
  extended by hand. <!-- TODO: confirm provenance with base author -->
- Latitude/Longitude columns were empty as of 2026-08-14; they are being
  backfilled from source 1 (see decision below).
- Editable by the site admin — this is the layer that changes over time.

### 3. OpenStreetMap — gap-filler for 13 towns

- The E911 fire-station layer covers only 194 of Vermont's towns; 13
  departments (St. Johnsbury, Stowe, Wilmington, Fair Haven, Highgate,
  Craftsbury, Swanton, Richford, Stockbridge, Sheffield-Wheelock, Plymouth,
  Montgomery, Walden) sit in towns whose stations E911 classifies under some
  other SITETYPE. Their coordinates were taken from OSM `amenity=fire_station`
  points (Overpass API, fetched 2026-08-14), each matched by station name.
- The backfill CSV's "Coordinate Source" column records E911 vs. OSM per row.

## Sources evaluated but not used

- **USFA/FEMA registry** (<https://apps.usfa.fema.gov/registry/>): 206 VT
  departments. Registration is voluntary, so it undercounts; likely already
  the seed of the Airtable base. HQ addresses only, no coordinates.
- **ExpertGPS** (<https://www.expertgps.com/data/vt/fire-stations.asp>): 292
  waypoints. Aggregated/scraped, unknown update cadence and accuracy;
  superseded by the official VCGI data.
- **NERIS** (<https://neris.fsri.org/>): the national system replacing NFIRS.
  Worth revisiting later for department metadata enrichment.

## Key decision: coordinate backfill (2026-08-14)

Airtable department records are matched to E911 station points (by department
name → town name, falling back to mailing city, then street address within a
town) and the resulting coordinates are imported into Airtable's
Latitude/Longitude fields **once**, by the site admin, after manual review of
the generated CSV.

Rationale: Airtable stays the single source of truth the admin can edit (a
wrong pin is fixed by editing the record, not code), while coordinates start
from the most authoritative source available. The alternative — joining the
two datasets in code on every build — was rejected because it maintains two
sources forever and makes mismatches invisible to the admin.

Safety: the import touches only the previously-empty Latitude/Longitude
columns; the site's Airtable token is read-only (`data.records:read`,
`schema.bases:read`).
