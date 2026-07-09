# Fitness Tracker

A local-first personal fitness tracker for BMR/TDEE targets, weight trends, nutrition, and workouts. The original static calculator has been modernized into a Next.js MVP with SQLite persistence and Docker support.

## Stack

- Next.js 16 App Router
- TypeScript
- Prisma ORM
- SQLite
- Vitest for formula tests
- Docker Compose for local production-style runs

This stack keeps the app simple for a solo developer while providing typed server actions, migrations, and a clean path to grow.

## Features

- Profile setup for age, sex, height, weight, goal, activity level, and desired pace.
- BMR, TDEE, calorie target, and macro target calculations.
- Weight check-ins with recent history and a simple trend chart.
- Daily nutrition tracking for calories, protein, carbs, and fat.
- Workout logging with optional main exercise details.
- Dashboard-first dark UI with empty states, validation, loading states, and mobile layout.

## Formulas

BMR uses Mifflin-St Jeor:

- Male: `10 * weightKg + 6.25 * heightCm - 5 * age + 5`
- Female: `10 * weightKg + 6.25 * heightCm - 5 * age - 161`

TDEE uses standard activity multipliers:

- Sedentary: `1.2`
- Light: `1.375`
- Moderate: `1.55`
- Very active: `1.725`
- Extra active: `1.9`

Goal calories use approximately `3,500 calories = 1 lb` and convert desired weekly pace into a daily deficit or surplus.

## Local Setup

```powershell
npm install
Copy-Item .env.example .env
npm run db:migrate
npm run dev
```

Open http://localhost:3000.

## Commands

```powershell
npm run dev
npm run build
npm run start
npm run lint
npm run typecheck
npm run test
npm run db:migrate
npm run db:deploy
npm run db:studio
```

## Docker

```powershell
docker compose up --build
```

The app binds to `127.0.0.1:3000` and stores SQLite data at `./data/fitness.db` through a mounted volume.

To reset local Docker data:

```powershell
docker compose down
Remove-Item -Recurse -Force .\data
docker compose up --build
```

## Ports

- App: `127.0.0.1:3000`
- Prisma Studio, when run manually: `localhost:5555`

## Database

SQLite is used for the MVP. Prisma migrations live in `prisma/migrations`. Local database files are ignored by git.

Default local env:

```env
DATABASE_URL="file:../data/fitness.db"
```

## Validation

See `VERIFY.md` for the latest validation checklist and results.
