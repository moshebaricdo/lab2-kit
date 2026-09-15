---
name: add-level-type
description: Graduates a new Lab2 level type onto Level Types with the correct route, component, data, hook, styling, and documentation patterns. Use only when the user explicitly wants a new canonical lab beyond Chat, Web, Python, or Sketch. First-pass prototypes, demos, and explorations use add-experiment.
---

# Add Level Type

Prototype a new lab with `.cursor/skills/add-experiment/SKILL.md` first. Use this skill only when the user asks to make it a canonical Level Type (or to graduate an experiment).

## Required Reading

1. `src/guidelines/Guidelines.md`
2. `src/ARCHITECTURE.md`
3. `.cursor/rules/design-system.mdc`
4. `.cursor/skills/cads-prototyping/SKILL.md`
5. `src/guidelines/level-types/README.md`
6. The closest existing level-type guide

## Workflow

1. Add `src/components/ide/<labname>/views/` for workspace chrome. Reuse `src/components/ide/shared/` for editor primitives.

2. Add `src/pages/<labname>/` and one canonical route in `App.tsx`.

3. Add a Level Types card via `levelTypeLinks.ts` + `LevelsIndexPage.tsx`. Remove the prototype from `EXPERIMENT_LINKS` if it started as an experiment.

4. Add fixtures under `src/data/<labname>/` if needed.

5. Document in `src/guidelines/level-types/<labname>.md` and update `src/ARCHITECTURE.md` / `Guidelines.md` if placement changes.

6. New UI uses CADS + Foundations. Wire Tutor only if the lab should have live AI (see `tutor-harness.md`).

7. Verify: `npm run typecheck`, `npm run build`, smoke the route.
