# Decisions

## 2026-07-09: Modernize In Place

Decision: Replace the two-file static Bootstrap prototype with a clean app structure in the same repository.

Why: The existing repo only contained `index.html` and `fitnessTracker.js`, so preserving architecture would add drag without protecting meaningful investment. The original formula intent is preserved in `src/lib/calculators.ts` and tests.

## 2026-07-09: Next.js + TypeScript

Decision: Use Next.js App Router with TypeScript.

Why: The app benefits from server-rendered dashboard data, simple server actions, strong typing, and one deployable runtime. This avoids a separate frontend/backend split before the product needs it.

## 2026-07-09: Prisma + SQLite

Decision: Use Prisma with SQLite for the MVP.

Why: SQLite is the simplest durable local database for a personal tracker. Prisma provides schema clarity, migrations, generated types, and Prisma Studio for inspection.

Note: Prisma is pinned to `6.19.3` for a stable SQLite workflow while Prisma 7 remains a larger migration surface.

## 2026-07-09: Local Single Profile

Decision: Avoid auth and model one local profile.

Why: This is a local-first personal app. Auth adds complexity without improving the MVP's daily-use value.

## 2026-07-09: Premium Dark Fitness UI

Decision: Use Premium Dark Fitness as the default design direction.

Why: The product is a daily training dashboard. A near-black base with controlled red accents feels focused, premium, and fitness-oriented without becoming visually loud.

## 2026-07-09: Exact Unit Conversion

Decision: Use exact pounds-to-kilograms conversion in Mifflin-St Jeor rather than the original approximate `weight * 4.5` shortcut.

Why: It preserves the original formula intent while improving accuracy and making tests deterministic.
