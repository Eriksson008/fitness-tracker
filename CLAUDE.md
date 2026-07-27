@AGENTS.md

The line above imports this repo's canonical, cross-tool guide (`AGENTS.md`) - the default agent
workflow, stack/commands, and safety rules. All of it applies to Claude Code. Only Claude-specific
notes live below.

## Claude Code specifics

- Read `PROJECT_CONTEXT.md` first for the current stack, architecture, commands, ports, and DB/Docker notes.
- Preserve the local-first fitness-tracker MVP; protect secrets and local data; use Prisma migrations for
  schema changes; keep calculator formulas documented and tested.
- Use **plan mode** for broad or high-risk changes (schema/migrations, auth, infra) before touching code.
- Delegate large read-only investigation to the **`explorer`** subagent; keep **one implementation owner**;
  hand meaningful diffs to the **`reviewer`** subagent before merge.
- **Verify with evidence:** run `scripts/verify.ps1` (lint / typecheck / test / build). Never run
  `db:migrate` / `db:deploy` / a dev server as verification, and never claim a check passed unless it ran.
