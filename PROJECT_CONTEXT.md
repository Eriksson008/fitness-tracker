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

Modernization MVP is implemented on branch `modernize-fitness-tracker`. The app has profile setup, calculators, weight tracking, nutrition tracking, workout logging, dashboard summaries, Docker support, migrations, tests, and project methodology docs.
