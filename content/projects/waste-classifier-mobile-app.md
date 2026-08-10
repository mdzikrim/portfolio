---
title: "Smart Waste Classifier"
summary: "An Android app that photographs household waste and sorts it into organic/inorganic plus 17 subcategories, backed by a MobileNetV2 model served over a Flask API."
category: "Computer Vision"
year: "2025"
role: "AI Engineer Intern @ ProCodeCG"
tags: ["Kotlin", "Android", "TensorFlow", "MobileNetV2", "Flask", "Room", "OkHttp"]
cover: ""
featured: true
draft: false
order: 3
links:
  repo: "https://github.com/mdzikrim/Waste-Classifier-Mobile-App"
  demo: ""
  article: ""
highlights:
  - label: "Prediction levels"
    value: "2"
  - label: "Subcategories"
    value: "17"
  - label: "Model input"
    value: "224 × 224"
---

## The problem

Household waste sorting fails at the moment of decision. Standing over a bin, most people cannot
confidently say whether a given item is organic or not, let alone which recycling stream it
belongs to. Guidance exists — it just isn't available at arm's length.

Built during my AI Engineer internship at **ProCodeCG** (July–September 2025), this project puts
a classifier in the one device that is always in the user's hand.

## What it does

Point the camera at a piece of waste, or pick a photo from the gallery. The app returns a
two-level answer:

1. **Level 1** — Organic or Inorganic.
2. **Level 2** — one of 17 subcategories (plastic, glass, wood, food scraps, and so on).

Every result is stored locally, so the app doubles as a personal record of what a household
throws away.

## How it works

```plaintext
Camera / Gallery
  → Bitmap → JPEG compression
  → multipart/form-data POST to /predict
  → MobileNetV2 inference (resize 224×224, normalize)
  → { "kategori": "Organik", "subkategori": "Sisa makanan" }
  → render result → save to Room → update history + charts
```

### Android side

Kotlin with Activity + XML layouts. `OkHttp` handles the multipart upload; `Room` persists each
classification as a `SampahEntity(id, labelLevel1, labelLevel2, timestamp, imageUri)`. Because the
image path is stored alongside the labels, history entries stay meaningful instead of becoming a
list of bare words.

Three screens tied together by a bottom navigation bar:

- **Identify** — capture or pick an image, send it, show the prediction.
- **Result** — image preview, both labels, timestamp, and the save action.
- **Profile** — a pie chart of organic vs inorganic, a bar chart of daily totals, and the five
  most recent entries in a `RecyclerView`.

### Backend

A small Flask service exposing a single `POST /predict` endpoint that accepts a `file` field. The
model is a **MobileNetV2** — chosen because inference has to feel instant on a phone-to-server
round trip, and because transfer learning gets useful accuracy out of a modest dataset.

My work on the ML side covered the whole pipeline: dataset collection, preprocessing and
augmentation to keep performance stable across categories, training and tuning in TensorFlow and
PyTorch, and finally integrating the model into a system a non-engineer could actually operate.

## Deployment notes

The API is designed to run behind Gunicorn + Nginx with HTTPS, with the Android base URL pointing
at a real host rather than a LAN IP. Rate limiting and file-size validation on `/predict` are
listed as required before any public deployment — an image upload endpoint with no limits is an
invitation.

## Honest limitations

This is an internship-scale project and it shows in places:

- Accuracy across all 17 subcategories is uneven; visually similar materials (clear plastic vs
  glass) get confused.
- Inference is server-side, so the app is useless offline. On-device TFLite is the obvious fix.
- The dataset is small relative to the number of classes.

## What I'd do next

- Convert the model to **TFLite** and run it on-device — no network, no latency, no server bill.
- Expand and rebalance the dataset, especially the weaker subcategories.
- Return a confidence score to the UI so users know when the model is guessing.
- Add a correction flow, turning user disagreement into new training data.
