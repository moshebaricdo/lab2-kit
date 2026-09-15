---
name: add-experiment
description: Adds a Lab2 experiment — extra route plus a named card on /levels Experiments. Use when the user wants to explore changes to an existing lab, create a demo/sample/test/sandbox level, prototype a new lab or level type, try a variant, spike, or one-off. Do not use when they explicitly ask to edit a canonical Level Types page or to graduate an experiment.
---

# Add Experiment

Default home for prototyping. Canonical Level Types stay the stable product surface.

## When

Start here for:

- explore / try / prototype changes to an existing lab
- a demo, sample, test, or sandbox level
- a new lab or level-type prototype
- a variant, spike, or one-off

Skip only if the user explicitly asks to change a canonical Level Types page or to graduate an experiment (`add-level-type`).

## Required reading

1. `src/guidelines/Guidelines.md`
2. `.cursor/rules/design-system.mdc`
3. `.cursor/skills/cads-prototyping/SKILL.md` when the experiment adds UI
4. The closest `src/guidelines/level-types/<lab>.md` (or the nearest existing lab if this is a new type)

## Checklist

1. **Name the card.** Short unique title + one-sentence description of what this explores.
2. **Add a page.** Copy the closest canonical page (or wrap it and pass different props) into `src/pages/<lab>/`. A new-lab prototype may also add `src/components/ide/<lab>/views/` and fixtures under `src/data/<lab>/`.
3. **Register the route** in `src/App.tsx` as `/levels/<lab>-<slug>` (example: `/levels/weblab2-split-preview`). Never reuse a canonical path.
4. **Give it a card.** Append one `ExperimentLink` to `EXPERIMENT_LINKS` in `src/pages/experimentLinks.ts`. The index renders the card; do not hand-edit empty-state JSX or add the route to `levelTypeLinks.ts`.
5. **Scope session state** with a unique `currentLevelPath` (or equivalent storage key) so the experiment does not clobber a canonical lab.
6. **Style** with CADS + Foundations. Keep live Tutor wiring if the parent lab has it.

### Card entry

```ts
{
  name: "Split preview",
  description: "Persistent side-by-side code and preview in Web Lab 2.",
  lab: "Web Lab 2",
  pages: [{ name: "Split preview", path: "/levels/weblab2-split-preview" }],
}
```

`lab` is the parent lab name, or the proposed lab name for a new type. Related routes for the same idea share one card (`pages` has multiple bubbles).

## Do not

- Edit canonical pages (`/levels/weblab2-level`, `weblab2-demo-project-blank`, `pythonlab`, `sketchlab`, `aichatlab`, and their Level Types siblings) for a one-off.
- Add an experiment-only flag to a shared level page unless several routes need the same knob **and** it is clearly a shared product control.
- Put the route on a Level Types card or in `levelTypeLinks.ts`.

## Graduate

If the experiment wins: fold it into the canonical lab (or follow `add-level-type` for a new official type), delete the experiment route, and remove it from `EXPERIMENT_LINKS`.

## Verify

- `npm run typecheck`
- `npm run build`
- Open `/levels` → Experiments → the new card → the URL
