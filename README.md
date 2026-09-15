# Lab2 Prototype Kit

A **starter Lab2 frame** for prototyping Chat Lab, Web Lab 2, Python Lab, and Sketch Lab. It is not the kitchen-sink research garden.

CADS (`@moshebari/cads-react` + `@moshebari/cads-variables`) is the source of truth for UI. Web Lab and Python Lab include a working **live Tutor** harness (OpenAI key in Lab Settings).

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

1. Open `/levels/weblab2-demo-project`
2. Resource panel → Lab Settings → paste an OpenAI API key (sessionStorage only)
3. Ask Tutor to change the page and accept a proposal

Python Lab (`/levels/pythonlab`) is guidance-only: it reads files but never proposes edits. Without a key, mock Tutor still demos the chrome.

---

## What's in the box

| Lab | Canonical routes | Live AI |
|-----|------------------|---------|
| **AI Chat Lab** | `/levels/aichatlab`, `-setup`, `-model-card` | Workspace chat is mocked; CADS `AiChat*` chrome |
| **Web Lab 2** | `/levels/weblab2-level`, `weblab2-demo-project`, `weblab2-demo-project-blank` | Functional Tutor: chat + propose/accept/reject |
| **Python Lab** | `/levels/pythonlab`, `pythonlab-blank` | Guidance-only Tutor |
| **Sketch Lab** | `/levels/sketchlab`, `sketchlab-blank` | No Tutor |

CADS catalog: `/design-system/cads`.

---

## How to prototype

**Iterate on an existing lab** — copy a canonical page, add `/levels/<lab>-<slug>`, list it under **Experiments** on `/levels`. Do not edit the canonical page for a one-off. Cursor skill: `add-experiment`.

**Add a new lab type** — `ide/<lab>/views`, `pages/<lab>`, fixture data, Level Types card. Skill: `add-level-type`.

**Save a config try** — Dev Panel → save variant on `/levels` → Promote to code when it should become a real page.

---

## Verify

```bash
npm run typecheck
npm run build
npm run test:tutor   # Tutor harness unit tests
```
