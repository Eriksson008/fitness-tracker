# Agent Instructions

When editing this file, update the counterpart file in the same change.

Read `PROJECT_CONTEXT.md` first. It contains the current stack, architecture, commands, ports, database notes, Docker notes, and status.

## Working Rules

- Preserve the local-first MVP intent.
- Keep `CLAUDE.md` and `AGENTS.md` aligned.
- Do not commit secrets or local data.
- Use Prisma migrations for schema changes.
- Keep calculator formulas documented and tested.
- Prefer small, typed components and server actions over a separate API until the app needs one.
- Keep the Premium Dark Fitness design direction unless `STYLE_GUIDE.md` is intentionally updated.

## Validation Before Commit

Run:

```powershell
npm run test
npm run typecheck
npm run lint
npm run build
```

When database behavior changes, also run:

```powershell
npm run db:migrate
```
