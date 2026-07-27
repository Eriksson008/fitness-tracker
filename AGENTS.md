# AGENTS.md

Canonical, cross-tool operating guide for **Fitness Tracker**. Both Claude Code (via `CLAUDE.md`, which
imports this file with `@AGENTS.md`) and Codex (which reads `AGENTS.md` natively) follow it. **Edit this
file only** - do not copy it back into `CLAUDE.md`.

Read `PROJECT_CONTEXT.md` first. It contains the current stack, architecture, commands, ports, database notes, Docker notes, and status.

<!-- ai-workflow:default-start (managed by ai-workflows/update-repo-workflow; edit the template, not here) -->
## Default agent workflow

This is the standing process for both Claude Code and Codex in this repo — it applies to every task
**without needing to be restated in the prompt**. Scale effort to the task (see the tiers below).

1. Understand the requested **outcome** first, then inspect the **relevant** implementation.
2. Read the repo docs and any active `tasks/` context relevant to the request.
3. Do **not** scan the whole repository when targeted inspection is enough.
4. Delegate substantial or cross-cutting investigation to a **read-only explorer** agent; skip subagents for trivial changes.
5. For broad or high-risk changes, write a **brief plan** before editing.
6. **One implementation owner** per feature/branch; never let two agents edit overlapping files; use an isolated **worktree** only for genuinely independent work.
7. Make the **smallest defensible change** that satisfies the request; preserve unrelated user work.
8. Run focused checks while implementing; run the repo's **supported verification** (`scripts/verify.ps1` / `.sh`) before claiming done.
9. Have an **independent reviewer** (the `reviewer` agent, or Codex `codex review`) check meaningful changes; use **browser validation** for meaningful UI behavior changes.
10. Compare the result to the requested outcome and acceptance criteria. Report failed/skipped/unavailable checks honestly — **never claim a check passed unless it actually ran**.
11. Do **not** commit, push, deploy, migrate, or mutate external systems unless explicitly authorized. Protect secrets and private data.

### Effort tiers

- **Trivial** (typo, tiny text/style fix, one obvious test): inspect the file, make the change, run a targeted check. No subagents.
- **Normal** (contained feature, bug fix, focused refactor): focused exploration → one implementation owner → repo verification → independent review.
- **Complex / high-risk** (architecture, auth, migrations, infra, cross-app or sensitive-data changes): parallel read-only investigation where useful → written plan → one owner per isolated workstream → targeted + full verification → specialist review → browser/integration evidence where applicable → explicit rollback/risk consideration.

### Updating a Second Brain project note

When a task updates `second-brain/02-Projects/<Project>/README.md`, follow the vault's own rules in
`second-brain/AGENTS.md`. In particular: **`## Recent Changes` is capped at ~25 lines** — trim the
oldest entries as you add one, and promote anything durable (an architectural choice, a security
posture, a constraint someone would otherwise rediscover) into **Important Decisions** first. Git
already holds the history; the note holds what lasts.
<!-- ai-workflow:default-end -->

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
