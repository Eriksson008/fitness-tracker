# Project Context

## Purpose

Fitness Tracker is a local-first personal dashboard for daily weight, calories, macros, workouts, and BMR/TDEE-based targets. The seed repository was a static BMR/TDEE/weight-loss calculator; the current MVP preserves that intent and turns it into a practical tracker.

## Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Prisma 6.19.3
- SQLite
- Vitest
- Docker Compose

Prisma is pinned to the latest 6.x line for a predictable SQLite/migration setup. Next.js and React use current releases.

## Dependency Security

Direct dependencies are pinned to exact versions; transitive vulnerabilities are patched through the
`overrides` block in `package.json` rather than by waiting for the upstream package to bump its range.

| Override | Reason |
| --- | --- |
| `sharp` `0.35.5` | GHSA-f88m-g3jw-g9cj (inherited libvips CVEs), then GHSA-rgj7-g3m4-5g8c (libheif, `< 0.35.4`). Required because Next declares `sharp: ^0.34.5`, which cannot resolve to `0.35.x` under 0.x semver — upgrading Next does **not** clear this. |
| `postcss` `8.5.23` | Path traversal via `sourceMappingURL` auto-loading (`<= 8.5.17`). |
| `nanoid` `3.3.18` | Infinite loop with a custom alphabet and size 0 (`< 3.3.18`), reached through `postcss`. |
| `deepmerge-ts` `8.0.2` | GHSA-ggr8-5vv4-36mx (stack exhaustion). `@prisma/config` pins `7.1.5` exactly on the whole Prisma 6 line, and npm's only offered fix is a Prisma downgrade. `prisma generate` is verified working with 8.x. |

Check the current state with `npm audit` and `npm ls sharp postcss`. Overridden packages report
`overridden` in the `npm ls` tree; that is the confirmation the pin took effect.

`npm audit` reports **0 vulnerabilities** as of 2026-10-02. The `brace-expansion` findings once
accepted here were cleared by a lockfile refresh (`npm audit fix`), without the ESLint 10 upgrade.

npm 10.9 crashes (`Cannot read properties of null (reading 'edgesOut')`) when resolving
`vitest@4.1.11`'s peer set during `npm install`. The lockfile was regenerated with npm 11; `npm ci`
from it works under npm 10.

## Architecture

- `src/app/page.tsx`: dashboard-first server-rendered home screen.
- `src/app/actions.ts`: server actions for profile, weight, nutrition, workout, and delete flows.
- `src/components/*`: focused UI components and forms.
- `src/lib/calculators.ts`: BMR, TDEE, calorie, and macro formulas.
- `src/lib/insights.ts`: dashboard summary and next-action logic.
- `src/lib/prisma.ts`: Prisma client singleton.
- `prisma/schema.prisma`: SQLite schema.
- `prisma/migrations/*`: database migrations.
- `tests/calculators.test.ts`: formula coverage.

## Design Notes

- Visual direction: Premium Dark Fitness.
- Typography: `Plus Jakarta Sans` via `next/font`, falling back to `Inter`, `system-ui`, and `sans-serif`.
- Type should feel like a premium athletic dashboard: energetic through contrast, spacing, and red accents, not through overly heavy font weights.

## Commands

```powershell
npm install
Copy-Item .env.example .env
npm run db:migrate
npm run dev
npm run build
npm run lint
npm run typecheck
npm run test
```

## Ports

- Next app: `127.0.0.1:3000` in Docker, `localhost:3000` in local dev.
- Prisma Studio: `localhost:5555` when started manually.

## Database Notes

- Database: SQLite.
- ORM/migrations: Prisma.
- Local default path: `data/fitness.db` using `DATABASE_URL="file:../data/fitness.db"`.
- Docker path: `/app/data/fitness.db`, mounted from `./data`.
- Reset local data by deleting `./data`.

Main entities:

- `profile`
- `weight_entries`
- `nutrition_entries`
- `workout_sessions`
- `workout_exercises`
- `app_settings`

## Docker Notes

Run:

```powershell
docker compose up --build
```

The compose file binds the app to `127.0.0.1:3000` and persists SQLite through `./data:/app/data`.

## Current Status

Modernization MVP is merged to `main` (PR #1). The app has profile setup, calculators, weight tracking, nutrition tracking, workout logging, dashboard summaries, Docker support, migrations, tests, and project methodology docs.

Feature work is paused. The last change was a dependency security patch (2026-10-02): Next.js
`16.2.12` to `16.3.8` (three RCE advisories), `vitest` `4.1.11`, and `sharp`, `nanoid` and
`deepmerge-ts` overrides — see Dependency Security above. `npm audit`: 0 vulnerabilities. Verified
with `scripts/verify.sh` (lint, typecheck, test, build, compose all OK).
