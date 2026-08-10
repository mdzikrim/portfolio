---
# ⚠️ DRAFT — hidden from the site until you set `draft: false`.
# Fill in the TODOs below, then flip the flag.
title: "Hydroponic Plant Maintenance & Growth Monitoring System"
summary: "TODO — one or two sentences: what the system does and who it is for. Example: 'An IoT system that monitors nutrient, pH, and growth conditions in a hydroponic greenhouse and turns raw sensor readings into maintenance decisions.'"
category: "IoT & Data"
year: "2026"
role: "Final-Year Research Project"
tags: ["Python", "Django REST Framework", "IoT", "Sensors", "PostgreSQL"]
cover: ""
featured: true
draft: true
order: 3
links:
  repo: "https://github.com/mdzikrim/TA_Hidroponic-Monitoring"
  demo: ""
  article: ""
highlights:
  - label: "TODO metric"
    value: "e.g. 6 sensors"
  - label: "TODO metric"
    value: "e.g. 5s interval"
  - label: "TODO metric"
    value: "e.g. 3 months"
---

## The problem

TODO — Why does hydroponic maintenance need monitoring? What goes wrong without it (nutrient
drift, pH swings, late detection of stunted growth)? Who feels that pain — a farm, a greenhouse
operator, a researcher?

Two or three paragraphs. Write it as a story, not a spec.

## What I built

TODO — Describe the system in plain language before any tech names appear. What does a user see?
What decision does the system help them make?

### Hardware

TODO — Which sensors and microcontroller? (pH, EC/TDS, water temperature, humidity, light?)
How are they wired, powered, and how often do they sample?

### Data pipeline

```plaintext
TODO — sketch the flow, e.g.:
Sensors → ESP32 → MQTT/HTTP → Django REST API → PostgreSQL → dashboard
```

### Dashboard / application

TODO — What does the interface show? Live readings, historical charts, alerts, growth logging?
Who logs in and what can they do?

## Method

TODO — If there is analysis or a model involved (growth prediction, anomaly detection, threshold
tuning), explain it here: the data you collected, how you processed it, and what technique you
chose and why.

## Results

TODO — Numbers if you have them, honest description if you don't. Examples of what to report:
- How long the system ran without failure
- Sensor accuracy against a manual reference measurement
- Any measurable improvement in plant growth or in how fast problems were caught

| Metric | Result |
| --- | --- |
| TODO | TODO |

## Limitations

TODO — Be specific and honest. Calibration drift, network dropouts, small sample of plants,
short observation window — these do not weaken a portfolio, they show judgment.

## What I'd do next

TODO — Three or four concrete improvements.

## What I took away

TODO — One short paragraph. What did building this teach you that a course could not?
