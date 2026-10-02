# AGENTS.md

Canonical, cross-tool operating guide for **Fitness Tracker**. Both Claude Code (via `CLAUDE.md`, which
imports this file with `@AGENTS.md`) and Codex (which reads `AGENTS.md` natively) follow it. **Edit this
file only** - do not copy it back into `CLAUDE.md`.

Read `PROJECT_CONTEXT.md` first. It contains the current stack, architecture, commands, ports, database notes, Docker notes, and status.

<!-- ai-workflow:default-start level=Standard novault=false vaultnote="Fitness Tracker/README" (managed by ai-workflows/update-repo-workflow; edit the template, not here) -->
## Default agent workflow

Workspace-wide defaults for Claude Code and Codex. The repo-specific sections of this file take
precedence over them.

- **Change.** Make the smallest robust change that fits the existing architecture. Several sessions
  work in this workspace at once, so leave alone any change you did not make.
- **Free to do.** Read, search, edit, add tests, run local checks and builds, fix what your change
  broke, delete scratch files you created.
- **Ask first.** Commit, push, deploy, run a remote or destructive migration, delete data or volumes,
  add a git remote, change a repo's visibility, send anything to an external service. One exception:
  generator or template-refresh output with no hand-written content may be committed locally, as its
  own commit of only those files. It is not pushed.
- **Verify.** Show the changed behavior working, narrowest check first. Run `scripts/verify.ps1`
  (`scripts/verify.sh` under bash) when the change reaches beyond one module, and before reporting a
  substantial change done. Report what ran, what failed and what was skipped. A failure that predates
  your change is reported, not fixed in passing, and a test is not edited to make it pass.
- **Plan.** Work that will span sessions or change hands gets `tasks/<date>-<slug>.md`: objective,
  constraints, discoveries, approach, progress, open questions, validation status. Keep it current as
  you go and move it to `tasks/done/` when the work lands. Smaller work needs no plan file.
- **Docs.** Edit a doc when your change makes it wrong, or when you had to work out a constraint the
  next session would otherwise work out again. Implementation facts go in this repo's docs; a
  repeatable procedure becomes a skill.
- **UI.** User-facing UI work follows the `design-kit` plugin (`fredrik-local` marketplace): this
  repo's design document wins over its `design-principles` skill, and the result is looked at with
  `visual-loop` before it is reported done.
- **Shell.** Windows PowerShell 5.1 (`powershell`), PowerShell 7 (`pwsh`) and Git Bash are installed.
  Repo scripts are written for and run with `powershell`.
- **Tier: Standard.** A change that is broad, hard to reverse, or touches data handling gets an
  independent review before it is reported done: the `reviewer` subagent in Claude Code,
  `codex review` in Codex. A change to UI behavior is checked in a browser.

### The Second Brain vault

`../second-brain/02-Projects/Fitness Tracker/README.md` holds this project's direction: decisions with their
reasons, what is deliberately not being done, and what comes next. `PROJECT_CONTEXT.md` in this repo
holds implementation.

- **Before** changing architecture, scope or product direction, or when a requirement is ambiguous,
  read that note's **Important Decisions** table so a settled decision is not re-decided. Where the
  note and the code disagree, the code is what runs; correct the note.
- **After** a change to the project's real state (a feature shipped, a deploy, a new architecture or
  constraint, a decision made), update the note under the rules in `../second-brain/AGENTS.md`, update
  `PROJECT_CONTEXT.md`, and show `git status` for this repo and for `../second-brain`. Fixes,
  refactors, styling and dependency bumps do not count. Where this file has a Second Brain sync rule
  of its own, that rule says what counts for this repo.
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
