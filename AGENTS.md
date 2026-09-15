# Lab2 Prototype Kit — Agent Playbook

This is a **starter Lab2 frame** for Chat Lab, Web Lab 2, Python Lab, and Sketch Lab. It is not the kitchen-sink research garden.

Canonical routes are the product surface. Exploring changes, demo levels, and new-lab prototypes belong under **Experiments** — extra routes plus a named card in `src/pages/experimentLinks.ts`. Do not add flags to a canonical page for a single demo.

Skills live in `.claude/skills/` so Claude Code, Cursor, and other Agent Skills clients all pick them up.

---

## Required Reading (every task)

Read these **before writing any code**:

| Doc | Path | Why |
|-----|------|-----|
| Development Guidelines | `src/guidelines/Guidelines.md` | Folder structure, placement, implementation checklist |
| Architecture | `src/ARCHITECTURE.md` | Composition flow, state ownership, hooks |
| Design system | `.cursor/rules/design-system.mdc` | **CADS is the source of truth** for Lab2 UI |

---

## Skills

| Skill | Use when |
|-------|----------|
| `add-experiment` | Explore a lab, demo level, or prototype a new lab |
| `add-lab-route` | Compose a page after deciding experiment vs canonical |
| `prepare-commits` | Split the working tree into reviewable local commits (invoke explicitly) |

---

## Conditional Reading

| Task | Doc |
|------|-----|
| Web Lab 2 | `src/guidelines/level-types/weblab2.md` |
| Python Lab | `src/guidelines/level-types/pythonlab.md` |
| Sketch Lab | `src/guidelines/level-types/sketchlab.md` |
| AI Chat Lab | `src/guidelines/level-types/aichatlab.md` |
| Tutor / live AI | `src/guidelines/tutor-harness.md` |

---

## Quick Placement Guide

| I need to… | Put it in… |
|------------|-----------|
| Reuse a CADS control | `@moshebari/cads-react` (never invent `App*` for new UI) |
| Add a sidebar tab or panel view | `src/components/lab2/resource-panel/views` |
| Add shared editor features | `src/components/ide/shared` |
| Add Web / Python / Sketch / Chat chrome | `src/components/ide/<lab>/views` |
| Add a **canonical** lab route | `src/pages/<lab>/` + Level Types on `/levels` |
| Add an **experiment** | `src/pages/<lab>/` thin wrapper + card in `experimentLinks.ts` |
| Add mock data | `src/data/<lab>/` |
| Tune live Tutor | `src/lib/tutor/` + `tutor-harness.md` |

---

## Styling Rules (summary)

- **CADS components** from `cadsManifest` + **Foundations** variables (`--background-*`, `--text-*`, `--shape-*`, …).
- Do **not** add new `--ds-*` or `App*` usage on Lab2 surfaces.
- SCSS modules colocated with components. No hex literals. No utility-class-heavy Tailwind for new UI.

---

## Live AI

Web Lab 2 and Python Lab use the client-side Tutor harness. A session OpenAI key in Lab Settings enables live chat, classifiers, and (Web Lab only) propose/accept/reject edits. Without a key, mock Tutor still runs.

Do not strip `tutorClient()` / `pythonTutorClient()` wiring from canonical pages.

---

## Verification

```bash
npm run typecheck
npm run build
```
