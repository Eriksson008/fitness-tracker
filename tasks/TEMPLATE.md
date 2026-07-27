# Task title

## Outcome
Describe the user-visible or engineering outcome.

## Problem
Describe the current limitation or failure.

## Scope
List what may change.

## Non-goals
List what must not change. Never violate the safety/privacy rules in `AGENTS.md`.

## Acceptance criteria
- criterion
- criterion

## Privacy impact
- Does this touch secrets, credentials, personal records, or private data? Confirm none will appear in
  code, tests, fixtures, logs, screenshots, or the vault.

## Relevant context
- files, docs (`README.md`, `PROJECT_CONTEXT.md`)

## Verification
- `pwsh scripts/verify.ps1` / `bash scripts/verify.sh` (only the repo's supported checks).

## Risks
List likely regression risks.

## Completion evidence
Paste the actual verification output after implementation; note any skipped checks. Confirm no secret
or private data was exposed and nothing was committed/pushed unless explicitly requested.
