# Level Types Overview

This kit includes four Lab2 environments. Use these docs as handoff context.

## Included

- [Web Lab 2](./weblab2.md)
- [Python Lab](./pythonlab.md)
- [Sketch Lab](./sketchlab.md)
- [AI Chat Lab](./aichatlab.md)

## Shared assumptions

- Level pages render inside the Lab2 shell (`TopNavigation` + resource panel + workspace).
- **CADS** (`CadsLabProvider` on `Lab2Shell`) is the UI source of truth. New chrome uses CADS components and Foundations variables.
- AI Chat Lab hides the sidebar Tutor because the workspace *is* the chat stream (mock replies today).
- Python Lab Tutor is guidance-only. Web Lab 2 owns the functional edit/planning flow (`../tutor-harness.md`).
- One-off explorations are extra `/levels/<lab>-<slug>` routes listed in `src/pages/experimentLinks.ts` (**Experiments** on `/levels`), not new flags on canonical pages.

## Canonical routes

- `/levels` — Level Types (four labs) + Experiments (`experimentLinks.ts`)
- `/levels/aichatlab`, `/levels/aichatlab-model-card`
- `/levels/weblab2-level`, `/levels/weblab2-demo-project-blank`
- `/levels/pythonlab`, `/levels/pythonlab-blank`
- `/levels/sketchlab`, `/levels/sketchlab-blank`
- `/design-system/cads` — packaged CADS catalog
