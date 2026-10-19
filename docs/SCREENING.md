# Screening and Evidence Policy

Access date: 2026-10-17, Asia/Shanghai.

## Initial Window

Official HF Daily API requests used `https://huggingface.co/api/daily_papers?date=YYYY-MM-DD&limit=100`.

| HF date page | Records returned |
| --- | --- |
| 2026-10-12 | 60 |
| 2026-10-13 | 26 |
| 2026-10-14 | 97 |
| 2026-10-15 | 88 |
| 2026-10-16 | 84 |
| 2026-10-17 | 0 |

The window contains 355 records and 355 unique paper IDs. The initial selection includes 25 from that window and three background or supplemental entries: VLAW, Rethinking the Evaluation of Harness Evolution for Agents, and RSIGym.

The subsequent survey comparison added GDPevo and three surveys (Prism-Shadow, D2I, and The Last AI Built by Humans), bringing the index to 32 entries. These four are supplemental research, not additional HF-window observations. Taxonomy changes do not alter the recorded discovery dates.

The content-system audit then added STOP, Darwin Godel Machine, SEAL, and GEPA as foundational references, bringing the collection to 36 entries. All 36 have scope/mechanism audit records, but not all have full-text review. Twenty-five remain observed in the original HF window. See `data/content-audit.json` for coding rules and per-paper limitations.

The default API limit of 50 would omit relevant papers. All nonempty responses above are below the explicit limit of 100, but the HF collection remains a community-selected subset, not an exhaustive arXiv index. An empty response does not establish that no papers were published on that day.

## Dates and Status

Observed HF Daily dates do not establish first HF submission dates. Publication dates sourced from HF metadata retain that provenance in `data/papers.json`; they are not presented as a full independent audit of arXiv version histories. An old under-review header, keyword, or third-party listing does not establish acceptance. Workshop and main-conference statuses must be checked separately.

## Evidence Depth

- `abstract`: screened by original abstract or metadata; not a full method review.
- `sections`: selected methods, experiments, or appendices checked; not a claim that every part was audited.
- `reproduced: false`: no independent experimental reproduction is claimed.

For stronger improvement claims inspect the retained artifact, feedback source, admission rule, all search/training/retry costs, independent final outcomes, source-level isolation, training seeds, and future-task transfer. A higher reward can reflect grader drift, selection, or additional compute rather than a better reusable system.

Code links in README are checked author-linked implementation repositories. Other author resources remain in metadata. A code link is not a certification of complete release or successful reproduction.
