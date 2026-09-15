# Lab2 Prototype Kit - Development Guidelines

This repository is a **Lab2 starter kit** for Chat Lab, Web Lab 2, Python Lab, and Sketch Lab.

When making changes, optimize for:

- reuse of the shared Lab2 frame
- CADS as the UI source of truth
- experiments as extra routes, not flags on canonical pages

---

## Canonical App Structure

```text
src/
  components/
    ui/                    # Leftover local primitives — do not extend for new Lab2 UI
    ui/header/             # Header chrome (CADS)
    lab2/                  # Lab2 frame — shared by ALL labs
    lab2/resource-panel/   # Left rail + Tutor / backpack / settings
    lab2/dev/              # Dev panel, annotation overlay
    ide/shared/            # Shared editor (CodeEditor, FileManager, EmptyState)
    ide/weblab2/views/     # Web Lab workspace
    ide/pythonlab/views/   # Python Lab workspace + runtime
    ide/sketchlab/views/   # Sketch Lab canvas
    ide/aichatlab/views/   # AI Chat Lab workspace
  pages/                   # Route composition, grouped by lab
  data/                    # Demo project fixtures
  hooks/                   # App-level state
  lib/tutor/               # Functional Tutor harness
  styles/                  # Tokens + globals
  types/
  guidelines/
```

`Lab2Shell` wraps levels in `CadsLabProvider`. New UI on Lab2 surfaces uses CADS primitives and Foundations CSS variables. Catalog: `/design-system/cads`. Handoff: [`cads-migration.md`](cads-migration.md).

As new IDE labs are introduced, add `ide/<labname>/views/` and reuse `ide/shared/`.

Tutor: see `src/guidelines/tutor-harness.md`.

---

## Styling System (SCSS-First)

### Source of Truth

Design tokens and globals are layered:

1. `src/styles/tokens.css` (generated design token variables; do not hand-edit)
2. `src/styles/globals.css` (semantic aliases, typography, global base styles, brand theme experiments)
3. SCSS module files (`*.module.scss`) for component-level styling
4. SCSS helpers (`src/styles/_tokens.scss`, `src/styles/_mixins.scss`)

For brand themes (Code.org vs CodeAI), sandbox preview, active-state remaps, and token pipeline details, read **`src/guidelines/color-theming.md`**.

### Required Rules

- Prefer **SCSS modules** for new component styling.
- Use **CADS Foundations** variables (`var(--background-…)`, `var(--text-…)`, `var(--shape-…)`, …) on Lab2 surfaces. Do not add new `--ds-*` or `App*` usage there. Never hard-code color literals.
- Keep styles colocated with components (`Component.tsx` + `Component.module.scss`).
- Use shared mixins where appropriate (for example `focus-ring` from `_mixins.scss`).

### Tailwind Guidance

- Tailwind is part of the toolchain and still exists for base/theme plumbing.
- For **new component UI styling**, do not rely on long utility-class composition as the primary approach.
- If touching legacy utility-heavy markup, prefer incremental migration to module classes instead of large risky rewrites.

---

## Typography & Interaction Standards

### Typography

Prefer **CADS text styles** via `AppText` (JSX) or `_typography.scss` mixins (SCSS). Full catalog: [`src/guidelines/typography.md`](typography.md). Sandbox: `/design-system/typography`.

- Heading font: `var(--font-heading)` (Space Grotesk; H1–H2)
- Body font: `var(--font-body)` (Geist; H3–H6, body, label, overline, link)
- Mono/code font: `var(--font-mono)` (Google Sans Code)
- Weights: `var(--font-weight-normal|medium|semibold|bold)` — H1/H2 “Semi Bold” maps to **medium (500)**
- Sizes / leadings / tracking: tokens in `globals.css`; do not hard-code px or unitless line-heights when a CADS style exists
- Interactive links: `AppLink`; underlined specimen style: `AppText variant="link-*"`

### Focus and Accessibility

- Every interactive element must expose a visible focus style.
- Preferred ring color is tokenized via `var(--ring)`.
- Ensure keyboard behavior is preserved for buttons, menus, dialogs, and list interactions.

### Control height scale (L–XS)

`AppButton`, `AppDropdown` field triggers, and `AppTextField` single-line controls share the same heights so they align in rows:

| Size | Height |
|---|---|
| L | 48px |
| M | 40px |
| S | 32px |
| XS | 24px |

Do not size these with padding + line-height alone — use the fixed height tokens so borders and content box match across components.

### Icons

- Use FontAwesome-based patterns already established in the repo.
- Reusable custom icons belong under `src/components/ui/icons`.

---

## Component Architecture Rules

### Shared vs Lab-Specific

- Universal primitives:
  - `src/components/ui` (buttons, icon buttons, links, text fields, slider, tooltips, panel headers, ResizableHandle)
  - `src/components/ui/header` (top navigation, level progress)
  - `src/components/ui/icons` (FaIcon, AiTutorIcon, Logo)
- Lab2 frame (shared by ALL level types):
  - `src/components/lab2` (Lab2Shell)
  - `src/components/lab2/resource-panel` (sidebar, panel views)
  - `src/components/lab2/dev` (dev panel, annotation overlay)
- IDE shared components:
  - `src/components/ide/shared` (code editor, file manager, empty state)
- Lab-specific workspace views:
  - `src/components/ide/weblab2/views` (Web Lab 2)
  - `src/components/ide/pythonlab/views` (Python Lab)
  - `src/components/ide/sketchlab/views` (Sketch Lab)
  - `src/components/ide/aichatlab/views` (AI Chat Lab)

New Lab2 UI uses CADS components, not new `App*` atoms.

1. Could this be used by multiple Lab2 environments?
2. If yes, place in shared directories and keep APIs generic.
3. If no, keep it within lab-specific folders and avoid leaking assumptions into shared primitives.

### State Management

Keep `App.tsx` focused on routing. Put level composition in route pages, and move reusable behavior into hooks:

- `useLayoutState`
- `useFileWorkspaceState`
- `useChatState` for sidebar Tutor chat state
- `useVersionHistoryState`

Prefer typed props and small, explicit interfaces over broad untyped objects.

---

## Implementation Checklist

Before merging UI work:

1. Styling uses tokens + SCSS modules (no new hard-coded color system).
2. Shared vs lab-specific placement is intentional.
3. Focus states and keyboard interactions are preserved.
4. `npm run typecheck` passes.
5. `npm run build` passes.
6. Imports reference current folders (no legacy paths).

---

## Repository Hygiene

- Keep `.DS_Store` out of source control.
- Keep build artifacts ignored unless release process explicitly requires tracking them.
- Keep lockfile tracked for reproducible installs.

---

## Migration Notes (Current)

Recent organization cleanup established:

- `TopNavigation` + `LevelProgressBubbles` in `src/components/ui/header` (CADS Global Header **labLevel**: 48px dark on-brand bar, extraSmall controls, 30px light-mode progress pill)
- resource panel views in `src/components/lab2/resource-panel/views`
- shared atoms (`AppButton`, `AppIconButton`, `AppLink`, `AppTextField`/`AppTextArea`, `AppSlider`, `AppTag`, `Tooltip`, `AlertBanner`) in `src/components/ui`
- AI Chat Lab workspace chrome in `src/components/ide/aichatlab/views`
- Sketch Lab workspace chrome in `src/components/ide/sketchlab/views`
- icon components in `src/components/ui/icons`
- dev tools in `src/components/lab2/dev`
- legacy/deprecated files removed

Do not reintroduce removed legacy paths or compatibility shims unless there is a concrete migration need.

---

## Quick Decision Guide

- **Need a new reusable control?** -> CADS (`@moshebari/cads-react`), not a new `App*` atom
- **Need a new icon?** -> CADS `FaIcon`
- **Need a new sidebar tab panel?** -> `src/components/lab2/resource-panel/views`
- **Need shared code editor / file manager features?** -> `src/components/ide/shared`
- **Need Web Lab-specific workspace chrome?** -> `src/components/ide/weblab2/views`
- **Need Python Lab-specific workspace chrome?** -> `src/components/ide/pythonlab/views`
- **Need Sketch Lab-specific workspace chrome?** -> `src/components/ide/sketchlab/views`
- **Need AI Chat Lab-specific workspace chrome?** -> `src/components/ide/aichatlab/views`
- **Need to tune Tutor?** -> `src/lib/tutor` and `src/guidelines/tutor-harness.md`
- **Need an experiment?** -> extra route + Experiments on `/levels` (see `.cursor/skills/add-experiment/SKILL.md`)

---

## Versioning

**Last Updated:** May 10, 2026  
**Status:** Starter kit for Chat Lab, Web Lab 2, Python Lab, and Sketch Lab
