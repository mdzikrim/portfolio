---
title: "Keystroke Dynamics Authentication"
summary: "A behavioral-biometrics login that verifies who is typing, not just what they typed. Per-user Random Forest models score typing rhythm as an invisible second factor."
category: "Cybersecurity"
year: "2025"
role: "Research Team Lead · ML Engineer"
tags: ["Python", "Flask", "scikit-learn", "Random Forest", "SQLite", "JavaScript"]
cover: ""
featured: true
draft: false
order: 1
links:
  repo: "https://github.com/mdzikrim/Keystroke-Dynamics-Authentication"
  demo: ""
  article: ""
highlights:
  - label: "Per-user F1"
    value: "99–100%"
  - label: "Training samples"
    value: "10 → 1,000"
  - label: "Timing features"
    value: "H · DD · UD"
---

## The problem

A stolen password is indistinguishable from a legitimate one. Classic 2FA fixes this, but it also
adds friction: another device, another code, another thing to lose.

This research asked a narrower question: **can the way a person types their own password act as a
second factor, without the user doing anything extra?** Typing rhythm is a behavioral biometric —
it is hard to observe over someone's shoulder and hard to replay, because it lives in milliseconds
rather than characters.

I led this project as a research team lead at the Security Laboratory, Telkom University, from
April to June 2025.

## What I built

A working web application, not a notebook. A user registers, types their password ten times, and
the system trains a model that belongs only to them. On every later login the same keystrokes are
scored against that model before access is granted.

### Feature extraction

Every keypress contributes three timing measurements:

| Feature | Meaning |
| --- | --- |
| **Hold time (H)** | How long a key stays pressed |
| **Down–Down (DD)** | Interval between two consecutive key presses |
| **Up–Down (UD)** | Interval between releasing one key and pressing the next |

Together they describe the *rhythm* of a password rather than its content. Two people typing
`s3cur3P@ss` produce very different vectors.

### Registration pipeline

```plaintext
10 typing samples
  → feature extraction (H, DD, UD)
  → augmentation to ~1,000 samples
  → Random Forest trained for this user only
  → model persisted to user_models/<user>.pkl
```

Ten samples is all a person will tolerate typing, and ten samples is nowhere near enough to train
a classifier. Augmentation bridged that gap by perturbing the timing vectors within realistic
bounds.

### Login decision

At login the system extracts features once, loads that user's model, and combines two signals:

```python
total_score = 0.4 * confidence + 0.6 * similarity
```

- **Confidence** — the Random Forest's class probability.
- **Cosine similarity** — how close this attempt sits to the user's enrolled typing pattern.

Similarity is weighted higher on purpose. The forest can be overconfident on augmented data;
cosine similarity keeps the decision anchored to the real enrolled samples. Every attempt is
written to `login_logs.json` for later analysis.

## Architecture

```plaintext
[ User ] ⇄ [ HTML/CSS/JS frontend ] ⇄ [ Flask + scikit-learn ] ⇄ [ SQLite + per-user .pkl models ]
```

The admin dashboard exposes the parts a researcher actually needs: recent login attempts with
their status, confidence, and similarity scores, plus per-user statistics on sample count and
success/failure rate.

## Results

Evaluated with Group K-Fold cross-validation, per user:

| User | Accuracy | Precision | Recall | F1 |
| --- | --- | --- | --- | --- |
| user01 | 100% | 100% | 100% | 100% |
| hebat12 | 99% | 99% | 99% | 99% |
| halo | 100% | 100% | 100% | 100% |

## Being honest about those numbers

Near-perfect scores are a warning sign, not a victory. The augmented samples were generated from
a small set of real ones, so training and validation folds share too much structure — this is
**overfitting to the augmentation, not proof of real-world accuracy**. A genuine evaluation needs
many more respondents and impostor attempts collected in the wild.

I would rather write that down than let a 100% in a table do work it hasn't earned.

## What I'd do next

- Replace uniform augmentation with perturbations modeled on observed human timing variance.
- Add real impostor data so False Acceptance Rate and False Rejection Rate can be measured properly.
- Try an ensemble or one-class model instead of a per-user binary classifier.
- Make the decision threshold adaptive — a user typing on a laptop keyboard behaves differently
  than the same user on a mechanical one.

## What I took away

Owning the whole loop — recruiting respondents, collecting the dataset, training, debugging, and
then testing the login screen against brute-force attempts — taught me more about ML than any
single model would have. Especially the part where the metric looks great and the method doesn't.
