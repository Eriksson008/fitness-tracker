# Verify

## Latest Validation

Run on 2026-07-09 from branch `modernize-fitness-tracker`.

```powershell
$env:DATABASE_URL='file:../data/fitness.db'; npm run db:deploy
$env:DATABASE_URL='file:../data/fitness.db'; npm run test
$env:DATABASE_URL='file:../data/fitness.db'; npm run typecheck
$env:DATABASE_URL='file:../data/fitness.db'; npm run lint
$env:DATABASE_URL='file:../data/fitness.db'; npm run build
```

Results:

- Dependencies installed successfully.
- `npm audit` reports 0 vulnerabilities after dependency updates and PostCSS override.
- Prisma migration applied successfully to `data/fitness.db`.
- Formula tests passed.
- Typecheck passed.
- Lint passed.
- Production build passed.
- Playwright smoke flow passed for profile save, weight entry, nutrition entry, workout entry, dashboard reload, desktop viewport, and mobile viewport.
- Desktop and mobile smoke checks reported no horizontal overflow.
- Docker Compose build/start passed.
- Docker restart passed and retained `data/fitness.db`.

## Manual Checklist

- Create/update profile.
- Confirm BMR/TDEE/calorie/macro targets update.
- Add weight entry.
- Add nutrition entry.
- Add workout.
- View dashboard.
- Delete recent entries.
- Check mobile layout.
- Run Docker Compose and confirm SQLite persistence after restart.

## Docker Validation

Command:

```powershell
docker compose up --build
```

Completed:

- App available at http://127.0.0.1:3000.
- SQLite database created at `./data/fitness.db`.
- Data remained after container restart.
- After validation, ignored sample data was reset and Docker was started again with a clean migrated database.
