# Kit allowlist

This file is the extract spec. Paths not listed here should not grow back in as “just in case.”

## Keep

- Lab2 frame: `src/components/lab2`, `src/components/ui`
- IDE: `ide/shared`, `weblab2`, `pythonlab`, `sketchlab`, `aichatlab`
- Canonical pages under `src/pages/{weblab2,pythonlab,sketchlab,aichatlab}` listed in the README
- `/levels` index + empty Experiments section
- `/design-system/cads`
- Tutor: `src/lib/tutor`, `AiTutorPanel`, Lab Settings API key, `tutor-harness.md`
- Validation lib (Check My Work capability) + harness unit-test fixtures under `src/data/weblab2/projects/validation-*` and `feature-roulette` (fixtures only; no experiment routes)
- Backpack + version history
- CADS packages from public npm (`@moshebari/cads-react`, `@moshebari/cads-variables`), `CadsLabProvider`, `.cursor/skills/cads-prototyping`
- Cursor rules/skills for CADS, experiments, and new labs

## Deliberately still in the tree (follow-up)

- `src/components/agentic` and `src/data/agentic` — still imported by `WebLab2LevelPage` when the Dev Panel enables agents. Canonical routes leave agents off. Strip when that page is slimmed.
- Validation/feature-roulette **data** used by Tutor unit tests, not listed on `/levels`

## Dropped (do not restore)

- Assessment types, CFU, quiz, builder, teacher dashboard, AI Lab
- Experiment/progression **routes** (drawer, file-chip, backpack filter, agentic missions, validation levels)
- Color/typography sandboxes
- `docs/status.md` and assessment product docs
