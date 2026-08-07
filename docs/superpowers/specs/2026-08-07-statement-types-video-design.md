# Statement Types — video explainer, index page, deployment

**Date:** 2026-08-07
**Subject:** Cambridge IGCSE Global Perspectives 0457, Year 10, Term 1, Weeks 2–3
**Status:** Approved, implemented

## Goal

Add a NotebookLM-generated video explainer to the existing Types of Statements self-study notes, give the three-file resource suite a landing page, and publish the whole thing to a public URL students can reach.

## Decisions

| Decision | Choice | Reasoning |
|---|---|---|
| Number of videos | **One overview video** covering all eight terms | NotebookLM video generation runs 15–45 min and is rate-limit prone. One video is the lowest-risk path to a working deliverable; eight per-term videos risked failing partway through. |
| Video hosting | **Committed to the repo**, served by Netlify | Self-contained: the repo alone reproduces the site. No third-party dependency, no manual upload step. Constrained by GitHub's hard 100MB per-file limit — verified after download. |
| Embed target | **Statement-Types tool only** | It is the main self-study document. The diagnostic tool and teacher dashboard serve different jobs and don't need the video inline. |
| Repo | `wmsi-gp0457-statement-types`, **public** | Public avoids auth friction for students and simplifies Netlify. Contains only original teaching material. |

## Architecture

Four independent pieces, each replaceable without touching the others:

**1. `video-source.md` — the video's input**
A ~1,200-word brief distilled from Tabs 1 and 2 of the existing tool: eight definitions, paired ✓/✗ examples, signal words, the commonly-confused pairs, and the Q1(b) mark breakdown.

Distilled rather than feeding the raw HTML, because that file is 69KB of which roughly 60KB is CSS and JavaScript. Passing it whole would have flooded NotebookLM's index with styling noise and diluted the video's content.

The file stays in the repo so the video is regenerable rather than a one-off artifact.

**2. The video artifact**
Generated with `--format explainer --style whiteboard`. Whiteboard over the kawaii/anime/watercolor options: it reads as a teaching aid rather than entertainment, and keeps text legible when projected at 1080p.

Generation instructions specify Year 10 IGCSE 0457 audience, roughly a third of runtime on generalisation, the youth-mental-health/social-media strand as the running example so it matches the written notes, and British English spelling (`generalisation`, not `generalization`).

**3. The embed**
Native `<video controls preload="metadata">` with a relative `assets/` path. No external player, no JavaScript, nothing that breaks without a network beyond the media file itself.

Positioned in Tab 1 directly beneath the 🎯 priority banner and above "The eight terms at a glance" — so a student gets the exam framing, then the video, then the reference material. `preload="metadata"` rather than `auto` so opening the page doesn't pull the whole file.

Includes a download link and an explicit note that everything in the video is also written out in Tab 2. The video is a shortcut, not a dependency — a student on a poor connection loses nothing.

**4. `index.html`**
Built per the `wmsi-html-resource-builder` skill: Type D (bespoke), Academy palette, selective bilingual annotation. Reuses the exact token set already in the three tools (Playfair Display / DM Sans / JetBrains Mono / Noto Sans SC; navy–gold–cream) so the suite reads as one system.

Student resources are numbered and ordered; the Teacher Dashboard sits below a dashed rule under a "Staff only" label so students don't wander into the answer keys.

Pure HTML/CSS with keyframe entrance animations and a `prefers-reduced-motion` guard. The skill's heuristic points to React+GSAP for splash pages, but a three-card index that Joshua will edit as he adds resources is better served by plain HTML.

## Deployment

`git init` → `gh repo create --public` → push → `netlify deploy --prod`.

Direct CLI deploy rather than a Netlify–GitHub app connection, because authorising that app needs an interactive OAuth flow. Trade-off: pushes to GitHub do not auto-deploy; re-running the deploy command is a manual step.

## Constraints checked, not assumed

- **File size.** GitHub hard-fails any file over 100MB, and Git LFS is not a fallback here — Netlify does not resolve LFS pointers on deploy, so it would ship a silently broken video.
- **Filenames.** The existing three files contain no spaces, so they are URL-safe unchanged. Kept verbatim rather than renamed so any links already shared with students keep working.

## Out of scope

- Per-term videos for each of the eight concept cards
- Embedding video in the diagnostic tool or teacher dashboard
- Auto-deploy on push
- Captions/subtitles as a separate WebVTT track (NotebookLM burns its own captions into the video)
