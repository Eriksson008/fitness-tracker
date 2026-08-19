# AGENTS.md

Canonical, cross-tool operating guide for **Fitness Tracker**. Both Claude Code (via `CLAUDE.md`, which
imports this file with `@AGENTS.md`) and Codex (which reads `AGENTS.md` natively) follow it. **Edit this
file only** - do not copy it back into `CLAUDE.md`.

Read `PROJECT_CONTEXT.md` first. It contains the current stack, architecture, commands, ports, database notes, Docker notes, and status.

<!-- ai-workflow:default-start level=Standard novault=false vaultnote="Fitness Tracker/README" (managed by ai-workflows/update-repo-workflow; edit the template, not here) -->
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

### Committing mechanical refreshes

A **mechanical refresh** - the output of a generator or of a marker-scoped template applier, with no
hand-authored content in it - may be committed locally **without asking**, as its own commit, touching
only the files the tool wrote. Never push it, and never fold unrelated work into it. Everything else
still needs explicit authorization.

Uncommitted work is not safe work here: several sessions run against this workspace at once, and one
of them committing everything will absorb whatever another left sitting in the tree.

### If you explained it twice, write it down

The second time a session has to re-derive the same constraint, gotcha, or domain fact, capture it
before moving on - the repo docs if it is implementation, the vault note's **Important Decisions** if
it is direction, a skill if it is a procedure. The re-explanation is the signal, and capture always
costs less than the third explanation.

### The Second Brain vault — read before, write after

The vault at `../second-brain` holds this project's **direction**: why decisions were made, what is
deliberately not being done, and what comes next. This repo's `PROJECT_CONTEXT.md` holds
**implementation**: how it is built, run, and verified. They answer different questions, so neither
substitutes for the other.

**Read it before planning.** For any non-trivial change, read
`../second-brain/02-Projects/Fitness Tracker/README.md` first — its **Important Decisions** table above
all. That table is where settled calls and their rationale live, and re-deciding something already
decided is the failure this rule exists to prevent. Where the note and the code disagree, the code is
what runs: say so plainly, and correct the note in the same session.

**Write it after.** When a task changes this project's real state, update that note per the vault's
own rules in `second-brain/AGENTS.md`. In particular: **`## Recent Changes` is capped at ~25 lines** —
trim the oldest entries as you add one, and promote anything durable (an architectural choice, a
security posture, a constraint someone would otherwise rediscover) into **Important Decisions** first.
Git already holds the history; the note holds what lasts.

**Meaningful changes only** — not typo fixes, formatting, styling tweaks, routine dependency bumps, or
trivial refactors. What counts as meaningful for *this* repo is listed under `## Second Brain Sync
Rule` below; the mechanics are here so all repos share one copy of them.

Before finishing a meaningful session: update `PROJECT_CONTEXT.md`, update the vault note, run the
repo's checks, then show `git status` for this repo **and** for `../second-brain`.
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
