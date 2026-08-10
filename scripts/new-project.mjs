#!/usr/bin/env node
/**
 * Scaffolds a new project case study.
 *
 *   npm run new:project -- "Fraud Detection with XGBoost"
 *
 * Creates content/projects/<slug>.md pre-filled with the standard structure,
 * marked as a draft so nothing half-written goes live by accident.
 */
import fs from "node:fs";
import path from "node:path";

const title = process.argv.slice(2).join(" ").trim();

if (!title) {
  console.error('Usage: npm run new:project -- "Your Project Title"');
  process.exit(1);
}

const slug = title
  .toLowerCase()
  .normalize("NFKD")
  .replace(/[^\w\s-]/g, "")
  .trim()
  .replace(/\s+/g, "-");

const dir = path.join(process.cwd(), "content", "projects");
const file = path.join(dir, `${slug}.md`);

if (fs.existsSync(file)) {
  console.error(`Already exists: content/projects/${slug}.md`);
  process.exit(1);
}

// Push new drafts to the end of the list by default.
const existing = fs.existsSync(dir) ? fs.readdirSync(dir).filter((f) => f.endsWith(".md")) : [];
const order = existing.length + 1;

const template = `---
# Set draft: false when this is ready to be seen.
title: "${title}"
summary: "One or two sentences. What it does and why it matters."
category: "Machine Learning"   # Machine Learning | Computer Vision | Data Analysis | Cybersecurity | IoT & Data
year: "${new Date().getFullYear()}"
role: "Your role on this project"
tags: ["Python"]
cover: ""                      # e.g. "/projects/${slug}/cover.png"
featured: false                # true = also shown on the homepage
draft: true
order: ${order}
links:
  repo: ""
  demo: ""
  article: ""
highlights:
  - label: "Metric"
    value: "00%"
---

## The problem

What was broken, missing, or unknown? Who felt it?

## What I built

Describe it in plain language first, then the technical shape of it.

## Approach

The method, the model, the architecture. Explain *why* you chose it over the alternatives.

\`\`\`plaintext
input → processing → model → output
\`\`\`

## Results

| Metric | Result |
| --- | --- |
|  |  |

## Limitations

Be honest. Naming your own limits reads as competence, not weakness.

## What I'd do next

Three or four concrete improvements.
`;

fs.mkdirSync(dir, { recursive: true });
fs.writeFileSync(file, template, "utf8");

console.log(`Created content/projects/${slug}.md`);
console.log(`Preview at http://localhost:3000/projects/${slug} once draft: false`);
