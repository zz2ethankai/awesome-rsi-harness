# Contributing

Suggest surveys, methods, benchmarks, and verification work on agent self-improvement. Embodied methods follow the L0–L4 capability map; general methods keep update-target groups.

Please include:

- Full title and original paper URL.
- Proposed section and, for methods, update-target category.
- Official implementation URL, if checked, and any partial-release limitations.
- First-publication date, checked revision, and verified venue status.
- A short explanation of what is updated, what feedback is used, and what later runs inherit.
- An evidence limitation: budget, independent evaluation, transfer, regression, or reproducibility.

Do not infer strict RSI from the title, equate workshop acceptance with main-conference acceptance, or replace unknown information with a negative claim. Short original annotations are preferred to copied abstracts.

## Local Maintenance

Node 18 or newer is sufficient; no packages are needed.

1. Update `data/papers.json` and the matching record in `data/content-audit.json`. Place embodied methods in `data/capability-map.json`; other papers use `data/taxonomy.json`. The map takes precedence over legacy update-target placement and also supplies the PPT points.
2. Run `node scripts/generate-readme.mjs`.
3. Run `node scripts/generate-readme.mjs --check`.

The script regenerates the marked paper-table block in README, the CSV/RIS exports, catalog audit fields, and the evidence matrix. It checks unique IDs, exact taxonomy/audit coverage, local links, navigation anchors, and export freshness. It does not verify every external URL or reproduce experiments.

Each paper has one primary table position; mention other update targets in its annotation. Section captions are intentionally omitted. Keep first publication, revision, and HF inclusion dates separate. Do not upload private reading materials, credentials, author correspondence, or paper PDFs without appropriate redistribution rights.

When embodied entries change, update and visually validate the editable map, then synchronize `assets/RSI_Capability_Map.pptx` and its PNG. L0/L4 can remain empty. L3 means orchestration and execution capability can both change; it does not certify recursive improvement of the improver. Retain the CaP-Agent0 branch at L1. Do not restore STEPS.
