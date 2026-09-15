# Lab2 Prototype Kit

This repo is used from Claude Code, the Claude app, and Cursor. Read [AGENTS.md](AGENTS.md) before making changes.

@AGENTS.md

## Skills

Workflows live in `.claude/skills/` (Agent Skills format — Claude Code and Cursor both load this path):

| Skill | When |
|-------|------|
| [add-experiment](.claude/skills/add-experiment/SKILL.md) | Demo, prototype, exploration, or new-lab spike — extra route + Experiments card |
| [add-lab-route](.claude/skills/add-lab-route/SKILL.md) | Compose a lab page after deciding experiment vs canonical |
| [prepare-commits](.claude/skills/prepare-commits/SKILL.md) | Split the working tree into reviewable commits (invoke explicitly; do not auto-run) |

If you are in the Claude app and skills are not auto-loaded, open the `SKILL.md` for the workflow you need.

## Ground rules

- Canonical Level Types stay the product surface. Explorations are extra routes plus a named card in `src/pages/experimentLinks.ts`. Do not flag a canonical page for a one-off.
- UI uses **CADS** (`@moshebari/cads-react` + Foundations variables). Details: `.cursor/rules/design-system.mdc`.
- Verify with `npm run typecheck` and `npm run build`.
