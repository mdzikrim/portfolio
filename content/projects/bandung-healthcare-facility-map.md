---
title: "Bandung Healthcare Facility Map"
summary: "A web GIS that maps every hospital, puskesmas, and primary clinic in Bandung — filterable by BPJS acceptance, hospital class, and specialty, with a geolocation-based 'what's near me' search."
category: "Web GIS"
year: "2026"
role: "Full-stack Developer · 2-person team"
tags: ["React", "Leaflet", "Django REST", "PostGIS", "GeoDjango", "Vite", "Tailwind"]
cover: ""
featured: true
draft: false
order: 2
links:
  repo: "https://github.com/mdzikrim/persebaran-faskes-bandung"
  demo: ""
  article: ""
highlights:
  - label: "Facilities mapped"
    value: "262"
  - label: "Districts covered"
    value: "30"
  - label: "GeoJSON endpoints"
    value: "3"
---

## The problem

When someone in Bandung needs care, the questions are immediate and practical: *Where is the
nearest facility? Will they take my BPJS? Do they have an emergency room? Is there a cardiologist?*

The data to answer all of that is public — Open Data Jawa Barat publishes it. But it is published
as spreadsheets: rows of coordinates with no map, no filters, and no way to ask "what is within
two kilometers of where I am standing right now." A CSV is not an answer to a medical question.

This was my final project for **Teknologi Pemetaan Berbasis Web** (Web-Based Mapping Technology)
at Telkom University. It was a two-person team, and I built the system end to end — the PostGIS
schema, the GeoJSON API, the data pipeline, and the React map — alongside Muhammad Ariq Fauzy
Shidqi.

## What I built

A full-stack web GIS covering all three tiers of Indonesian public healthcare:

- **42 hospitals** — with class, ownership, bed count, ER phone, and specialty services
- **160 puskesmas** — community health centers
- **60 primary clinics**

across 30 districts in Bandung. Roughly 262 facilities on one map.

### The map

Leaflet, with a deliberate visual grammar rather than generic pins. Each facility type gets its
own teardrop marker with a distinct glyph inside: an "H" for hospitals, a medical cross for
puskesmas, a dot for clinics. Zoom out and nearby markers collapse into count bubbles coloured
by whichever type dominates that cluster, so the map stays readable at city scale.

### Find Near Me

The feature that turns a map into a tool. Browser geolocation gives a position, a Haversine
calculation gives distances, and the results are sorted nearest-first and cut off at an adjustable
radius (0.5–10 km):

```javascript
const haversineDistance = (lat1, lng1, lat2, lng2) => {
  const R = 6371; // km
  // ...
};
```

The map then auto-flies to the user's location and picks a zoom level matched to the chosen
radius — a 500 m search shouldn't leave you looking at the whole city.

### Filtering

Six dimensions that compose: facility type, district, BPJS acceptance, hospital class, ownership
(public/private), and free-text search that matches facility names *and* specialty services — so
typing "Jantung" surfaces every facility with an active cardiology clinic.

### Statistics

A Recharts panel answering the planner's questions rather than the patient's: facilities per
district (top 10), hospitals by class, hospitals by ownership. This is where the map stops being
a directory and starts showing distribution — which districts are well served and which are not.

## Architecture

```plaintext
React 19 + Vite + Leaflet
        ↓ fetch
Django REST Framework
        ↓ GeoFeatureModelSerializer
PostgreSQL + PostGIS  (GeoDjango PointField, SRID 4326)
```

The choice that mattered most was storing locations as real PostGIS geometry instead of two float
columns:

```python
class Hospital(models.Model):
    name = models.CharField(max_length=255)
    kelas = models.CharField(max_length=10, blank=True, default='')
    has_igd = models.BooleanField(default=False)
    location = models.PointField(srid=4326)
```

Because the models use `PointField`, `djangorestframework-gis` can serialize them straight to
**GeoJSON FeatureCollections**. The API speaks a standard geospatial format that Leaflet
understands natively — no custom parsing on either side, and the door stays open for real spatial
queries (`ST_DWithin`, intersections) if the radius search ever needs to move server-side.

Three read endpoints, one per facility tier: `/api/hospitals/`, `/api/puskesmas/`, `/api/klinik/`.

## Data pipeline

Raw open data is not clean data. Custom Django management commands handle:

- `import_data` — parse the hospital and puskesmas CSVs, build `Point(lon, lat)` geometries, skip
  malformed rows and report the count
- `import_klinik` — load the clinic dataset
- `enrich_data` — attach the detail fields the source data doesn't carry

The last one is worth being honest about: bed counts, specialty lists, and ER phone numbers were
curated by hand, because they simply are not in the open dataset.

## Beyond the assignment

Two things I added that the brief didn't ask for:

**Bilingual UI (Indonesian/English) and a dark theme.** A healthcare map that only works in one
language is a smaller map than it needs to be.

**A submission form.** Any dataset of clinics goes stale within months. `SubmitFaskes` lets a
visitor report a facility the dataset missed, with a map picker for the coordinates.

## Honest limitations

- **Submissions are collected but not stored.** The form validates input and picks coordinates,
  but the backend exposes read-only list views — there is no write endpoint behind it yet. It is
  a designed feature, not a finished one.
- **Manual enrichment goes stale.** The hand-curated detail data has no refresh mechanism.
- **Clinic coverage is a sample.** 60 clinics is not every primary clinic in Bandung.
- **Radius filtering happens in the browser.** Every facility is fetched, then filtered
  client-side. At 262 records that is fine; at 10,000 it would not be, and the PostGIS layer is
  already sitting there ready to do it properly.
- **Never deployed.** PostGIS hosting was out of scope for the course, so it runs locally.

## What I'd do next

- Move the radius search into the database with `ST_DWithin` and add a `?lat=&lng=&radius=`
  query parameter.
- Add the write endpoint behind the submission form, with a moderation queue.
- Code-split the bundle — it ships as one 956 kB chunk, which is a slow first paint on mobile,
  exactly the device someone would use to find an emergency room.
- Deploy the whole thing so the link is something I can hand to a person, not a repo.

## What I took away

This was my first project where the *database* was the interesting technical decision. Choosing
PostGIS over "just store two floats" cost setup time — GeoDjango's GDAL and GEOS discovery on
Windows is genuinely painful — but it meant the API spoke GeoJSON for free and the geometry
column stayed queryable. Picking the right storage shape early made everything downstream easier.
