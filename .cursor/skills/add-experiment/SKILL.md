---
name: add-experiment
description: Adds a one-off experiment route for an existing lab without changing the canonical Level Types page. Use when iterating on Chat Lab, Web Lab, Python Lab, or Sketch Lab via a prototype variant.
---

# Add Experiment

Experiments are extra routes. Canonical Level Types pages stay the stable product surface.

## Required reading

1. `src/guidelines/Guidelines.md`
2. `.cursor/rules/design-system.mdc`
3. `.cursor/skills/cads-prototyping/SKILL.md` when the experiment adds UI
4. The lab's `src/guidelines/level-types/<lab>.md`

## Do

1. Copy the **closest canonical page** (or wrap it and pass different props), into `src/pages/<lab>/`.
2. Give it a slug route: `/levels/<lab>-<slug>` (example: `/levels/weblab2-split-preview`).
3. Register the route in `src/App.tsx`.
4. List it under **Experiments** on `/levels` (add a card or bubble in `LevelsIndexPage.tsx`; do not add it to the Level Types arrays in `levelTypeLinks.ts` unless it graduates).
5. Style with CADS + Foundations. Keep live Tutor wiring if the parent lab has it.

## Do not

- Edit the canonical `/levels/weblab2-level`, `weblab2-demo-project`, `pythonlab`, `sketchlab`, or `aichatlab` pages for a one-off.
- Add a new experiment flag to `WebLab2LevelPage` unless several routes need the same knob **and** it is clearly a shared product control.
- Put the route on the Level Types card.

## Graduate

If the experiment wins, fold the behavior into the canonical lab page (or workspace), delete the experiment route, and update the level-type doc.

## Verify

- `npm run typecheck`
- `npm run build`
- Open `/levels` → Experiments → the new URL
