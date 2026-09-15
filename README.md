# CodeAI Lab2 Prototype Kit

**Welcome!** This repo serves as a template for the Lab2 UI framework and our existing labs (Web Lab, Python Lab, AI Chat Lab, and Sketch Lab). You can use this as a starting point to explore changes to existing labs and to spin up new labs using the framework. This is not a production repo, nor is tied to our production code in anyway.

**CADS (CodeAI Design System)** is the source of truth for UI in this sandbox. Note that it uses a design-led version of the CADS library and is fully powered by MUI (production lags behind the components/styles you see here). 

**Building AI-powered Lab experiences?** Web Lab and Python Lab already include a functioning **live Tutor** harness (just add an OpenAI key in Lab Settings) which you can extend to explore more AI features in labs.

## Start from this template

This repo is a [GitHub template](https://github.com/moshebaricdo/lab2-kit). Use **Use this template** on GitHub, or:

```bash
gh repo create my-lab --template moshebaricdo/lab2-kit --clone
cd my-lab
npm install
npm run dev
```

---

## Quick start

```bash
npm install
npm run dev
```

Dev server: **http://localhost:3000** → `/levels`.

CADS installs from public npm (`@moshebari/cads-react` and `@moshebari/cads-variables`). No GitHub Packages token.

### Try live AI

1. Open `/levels/weblab2-level`
2. Resource panel → Lab Settings → paste an OpenAI API key (sessionStorage only)
3. Ask Tutor to change the page and accept a proposal

Python Lab (`/levels/pythonlab`) is guidance-only: it reads files but never proposes edits. Without a key, mock Tutor still demos the chrome.

---

## What's in the box

| Lab | Canonical routes | Live AI |
|-----|------------------|---------|
| **AI Chat Lab** | `/levels/aichatlab` (chat only), `/levels/aichatlab-model-card` (configure chatbot) | Workspace chat is mocked; CADS `AiChat*` chrome |
| **Web Lab 2** | `/levels/weblab2-level` (in-curriculum), `/levels/weblab2-demo-project-blank` (standalone) | Functional Tutor: chat + propose/accept/reject |
| **Python Lab** | `/levels/pythonlab` (in-curriculum), `/levels/pythonlab-blank` (standalone) | Guidance-only Tutor |
| **Sketch Lab** | `/levels/sketchlab` (in-curriculum), `/levels/sketchlab-blank` (standalone) | No Tutor |

CADS catalog: `/design-system/cads`.

---

## How to prototype

**Iterate, demo, or prototype** — extra route + named card in `src/pages/experimentLinks.ts` (Experiments on `/levels`). Do not edit a canonical Level Types page for a one-off. Skill: `add-experiment`.

**New lab route** — compose from the closest existing page after deciding experiment vs canonical. Skill: `add-lab-route`.

**Graduate a new lab type** — prototype as an experiment first; if it wins, fold it into Level Types (`ide/<lab>/views`, `pages/<lab>`, fixture data, card) and drop the experiment. The `add-experiment` skill covers graduation.

**Save a config try** — Dev Panel → save variant on `/levels` → Promote to code when it should become a real page.

### Agent skills

Workflows for Claude Code, the Claude app, and Cursor live in `.claude/skills/`:

- `add-experiment` — extra route + Experiments card
- `add-lab-route` — compose a lab page
- `prepare-commits` — split the working tree into reviewable commits (invoke explicitly)

See `AGENTS.md` (playbook) and `CLAUDE.md` (Claude Code / Claude app entry).

---

## Verify

```bash
npm run typecheck
npm run build
npm run test:tutor   # Tutor harness unit tests
```
