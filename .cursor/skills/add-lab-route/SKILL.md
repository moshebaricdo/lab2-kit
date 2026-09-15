---
name: add-lab-route
description: Composes a Lab2 route page using the repository's shell, resource-panel, hook, data, and documentation conventions. Use after deciding experiment vs canonical. Demo, prototype, exploration, and one-off routes use add-experiment. Extra canonical Level Types siblings are rare — confirm before adding to levelTypeLinks.ts.
---

# Add Lab Route

For a **demo, prototype, exploration, or one-off**, stop and follow `.cursor/skills/add-experiment/SKILL.md`.

This skill is only for composing the page after that decision (or for a confirmed extra canonical sibling).

## Required Reading

1. `src/guidelines/Guidelines.md`
2. `src/ARCHITECTURE.md`
3. `.cursor/rules/design-system.mdc`
4. `.cursor/skills/cads-prototyping/SKILL.md` when adding UI
5. The relevant guide in `src/guidelines/level-types/`

## Workflow

1. Determine the route family:
   - `src/pages/weblab2`
   - `src/pages/pythonlab`
   - `src/pages/sketchlab`
   - `src/pages/aichatlab`
   - or `src/pages/<lab>/` for a new-lab experiment

2. Find and read the closest existing route page. Match its composition style, prop naming, dev-panel defaults, session-storage conventions, and data imports.

3. Keep route files responsible for composition only:
   - compose `Lab2Shell`
   - configure `Sidebar` tabs and resource-panel content
   - pass state into the level-specific workspace
   - avoid embedding complex reusable behavior directly in the route

4. Put reusable state in hooks under `src/hooks` and shared contracts in `src/types`.

5. Put lab-specific workspace UI under `src/components/ide/<labname>/views`.

6. Add or reuse fixtures from `src/data/<domain>/`.

7. Register the route in `src/App.tsx`. Experiments go in `src/pages/experimentLinks.ts`. Canonical labs go on Level Types via `levelTypeLinks.ts`.

8. Style with CADS components and Foundations variables. Do not add `App*` or new `--ds-*` on Lab2 surfaces.

9. Update docs when behavior, route lists, or architecture change.

10. Verify: `npm run typecheck`, `npm run build`, smoke the new URL.
