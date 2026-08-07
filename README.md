# Types of Statements — IGCSE Global Perspectives 0457

Self-study resources for **Year 10, Term 1, Weeks 2–3** at Wesley Methodist School International, Ipoh.

Covers the eight statement types named in the Cambridge IGCSE Global Perspectives (0457) syllabus — **bias, claim, fact, generalisation, opinion, prediction, value, vested interest** — with the heaviest weighting on **generalisation**, the term tested directly in exam **Question 1(b)** for 3 marks.

## Contents

| File | Audience | Purpose |
|---|---|---|
| `index.html` | Everyone | Landing page and entry point |
| `WMSI_GP0457_Y10_T1_W2-3_Statement-Types-and-Generalisation_TOOL.html` | Students | Main self-study notes — video explainer, eight terms, sorting drill, generalisation hunter, mixed arena, exit check |
| `WMSI_GP0457_Y10_T1_W2-3_Find-Your-Gap_Diagnostic-Targeted-Practice_TOOL.html` | Students | Diagnostic that identifies confused pairs and routes to targeted practice |
| `WMSI_GP0457_Y10_T1_W2-3_Teacher-Dashboard.html` | Staff | Lesson sequencing, timings, answer keys |
| `assets/statement-types-overview.mp4` | Students | Video explainer, embedded in the main tool |
| `video-source.md` | — | Source brief the video was generated from |

## Running it

Every file is self-contained HTML. Open `index.html` in a browser — no build step, no server, no install.

Fonts load from Google Fonts on first visit, then cache. The video needs a connection the first time it plays, or can be downloaded for offline use.

## Regenerating the video

The video was produced with [NotebookLM](https://notebooklm.google.com) from `video-source.md` via the [`notebooklm-py`](https://github.com/teng-lin/notebooklm-py) CLI. To rebuild it after editing the source brief:

```bash
notebooklm create "GP0457 Types of Statements" --json
notebooklm source add ./video-source.md --notebook <id> --json
notebooklm generate video "<instructions>" --format explainer --style whiteboard --notebook <id>
notebooklm download video ./assets/statement-types-overview.mp4 -n <id>
```

Editing `video-source.md` alone does **not** update the video — it must be regenerated and re-downloaded.

## Licence

Teaching material for WMSI Ipoh. Reuse for non-commercial educational purposes is welcome.
