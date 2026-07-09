import { Activity, CalendarDays, Flame, Target, TrendingUp } from "lucide-react";
import { deleteNutritionAction, deleteWeightAction, deleteWorkoutAction } from "@/app/actions";
import { DeleteButton } from "@/components/DeleteButton";
import { MetricCard } from "@/components/MetricCard";
import { NutritionEntryForm } from "@/components/NutritionEntryForm";
import { ProfileForm } from "@/components/ProfileForm";
import { ProgressBar } from "@/components/ProgressBar";
import { WeightChart } from "@/components/WeightChart";
import { WeightEntryForm } from "@/components/WeightEntryForm";
import { WorkoutForm } from "@/components/WorkoutForm";
import { buildProfileTargets, nextRecommendedAction, weightStats } from "@/lib/insights";
import { prisma } from "@/lib/prisma";
import { formatDate, inputDateToUtc, todayInputValue } from "@/lib/date";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export default async function Home() {
  const today = inputDateToUtc(todayInputValue());
  const [profile, weightEntries, nutritionEntries, workoutSessions, todayNutrition] = await Promise.all([
    prisma.profile.findFirst(),
    prisma.weightEntry.findMany({ orderBy: { date: "desc" }, take: 14 }),
    prisma.nutritionEntry.findMany({ orderBy: { date: "desc" }, take: 7 }),
    prisma.workoutSession.findMany({
      include: { exercises: true },
      orderBy: { date: "desc" },
      take: 7
    }),
    prisma.nutritionEntry.findUnique({ where: { date: today } })
  ]);

  const targets = buildProfileTargets(profile);
  const stats = weightStats(profile, weightEntries);
  const lastWorkout = workoutSessions[0] ?? null;
  const latestWeight = weightEntries[0] ?? null;
  const action = nextRecommendedAction(profile, todayNutrition, lastWorkout, latestWeight);
  const calories = todayNutrition?.calories ?? 0;
  const protein = todayNutrition?.proteinG ?? 0;
  const goalProgress =
    profile && stats.current !== null
      ? Math.min(
          100,
          Math.max(
            0,
            (Math.abs((stats.start ?? profile.currentWeightLb) - stats.current) /
              Math.max(1, Math.abs((stats.start ?? profile.currentWeightLb) - profile.goalWeightLb))) *
              100
          )
        )
      : 0;

  return (
    <main>
      <section className="app-shell">
        <header className="hero">
          <div>
            <p className="eyebrow">Local fitness tracker</p>
            <h1>{profile?.label ?? "Build your baseline"}</h1>
            <p className="hero-copy">
              A practical daily dashboard for body weight, calories, macros, workouts, and goal pace.
            </p>
          </div>
          <div className="hero-panel" aria-label="Next recommended action">
            <span>
              <Target size={18} />
              Next action
            </span>
            <strong>{action}</strong>
          </div>
        </header>

        <section className="dashboard-grid" aria-label="Dashboard">
          <MetricCard
            detail={targets ? `TDEE ${targets.tdee.toLocaleString()} cal` : "Complete profile setup"}
            label="Daily calories"
            tone="accent"
            value={targets ? targets.calorieTarget.toLocaleString() : "--"}
          />
          <MetricCard
            detail={targets ? `${targets.carbsG}g carbs / ${targets.fatG}g fat` : "Macros unlock with targets"}
            label="Protein target"
            value={targets ? `${targets.proteinG}g` : "--"}
          />
          <MetricCard
            detail={stats.totalChange === null ? "No weigh-ins yet" : `${signed(stats.totalChange)} lb total`}
            label="Current weight"
            value={stats.current === null ? "--" : `${stats.current.toFixed(1)} lb`}
          />
          <MetricCard
            detail={lastWorkout ? `${lastWorkout.durationMin} min on ${formatDate(lastWorkout.date)}` : "No workouts logged"}
            label="Last workout"
            tone="muted"
            value={lastWorkout?.type ?? "--"}
          />
        </section>

        <section className="split-grid">
          <article className="card today-card">
            <div className="section-heading">
              <div>
                <p className="eyebrow">Today</p>
                <h2>Targets vs actual</h2>
              </div>
              <Flame aria-hidden size={22} />
            </div>
            {targets ? (
              <>
                <ProgressBar label="Calories" max={targets.calorieTarget} value={calories} />
                <ProgressBar label="Protein" max={targets.proteinG} value={protein} />
                <p className="microcopy">{targets.plainEnglish}</p>
              </>
            ) : (
              <div className="empty-state">
                <strong>No targets yet</strong>
                <span>Save your profile once, then the dashboard will calculate BMR, TDEE, calories, and macros.</span>
              </div>
            )}
          </article>

          <article className="card trend-card">
            <div className="section-heading">
              <div>
                <p className="eyebrow">Progress</p>
                <h2>Weight trend</h2>
              </div>
              <TrendingUp aria-hidden size={22} />
            </div>
            <WeightChart entries={weightEntries} />
            <div className="trend-footer">
              <span>Goal progress</span>
              <strong>{Math.round(goalProgress)}%</strong>
            </div>
            <div className="progress-track subtle">
              <span style={{ width: `${goalProgress}%` }} />
            </div>
            <p className="microcopy">
              Weekly average: {stats.averageWeeklyChange === null ? "needs more data" : `${signed(stats.averageWeeklyChange)} lb/week`}
            </p>
          </article>
        </section>

        <section className="form-layout" aria-label="Daily logging">
          <ProfileForm profile={profile} />
          <div className="side-stack">
            <WeightEntryForm defaultWeight={stats.current} />
            <NutritionEntryForm />
            <WorkoutForm />
          </div>
        </section>

        <section className="history-grid" aria-label="Recent history">
          <HistoryPanel
            empty="Log a weigh-in to start a trend."
            icon={<Activity size={18} />}
            title="Recent weigh-ins"
          >
            {weightEntries.map((entry) => (
              <li key={entry.id}>
                <div>
                  <strong>{entry.weightLb.toFixed(1)} lb</strong>
                  <span>{formatDate(entry.date)}{entry.note ? ` - ${entry.note}` : ""}</span>
                </div>
                <form action={deleteWeightAction}>
                  <input name="id" type="hidden" value={entry.id} />
                  <DeleteButton />
                </form>
              </li>
            ))}
          </HistoryPanel>

          <HistoryPanel
            empty="Track calories and macros for the day."
            icon={<Flame size={18} />}
            title="Nutrition history"
          >
            {nutritionEntries.map((entry) => (
              <li key={entry.id}>
                <div>
                  <strong>{entry.calories.toLocaleString()} cal</strong>
                  <span>
                    {formatDate(entry.date)} - P {entry.proteinG}g / C {entry.carbsG}g / F {entry.fatG}g
                  </span>
                </div>
                <form action={deleteNutritionAction}>
                  <input name="id" type="hidden" value={entry.id} />
                  <DeleteButton />
                </form>
              </li>
            ))}
          </HistoryPanel>

          <HistoryPanel
            empty="Add a workout to keep training visible."
            icon={<CalendarDays size={18} />}
            title="Workout history"
          >
            {workoutSessions.map((session) => (
              <li key={session.id}>
                <div>
                  <strong>{session.type}</strong>
                  <span>
                    {formatDate(session.date)} - {session.durationMin} min
                    {session.exercises[0] ? ` - ${session.exercises[0].name}` : ""}
                  </span>
                </div>
                <form action={deleteWorkoutAction}>
                  <input name="id" type="hidden" value={session.id} />
                  <DeleteButton />
                </form>
              </li>
            ))}
          </HistoryPanel>
        </section>
      </section>
    </main>
  );
}

function HistoryPanel({
  children,
  empty,
  icon,
  title
}: {
  children: React.ReactNode[];
  empty: string;
  icon: React.ReactNode;
  title: string;
}) {
  return (
    <article className="card history-card">
      <div className="history-title">
        {icon}
        <h2>{title}</h2>
      </div>
      {children.length > 0 ? <ul>{children}</ul> : <p className="empty-list">{empty}</p>}
    </article>
  );
}

function signed(value: number) {
  return `${value > 0 ? "+" : ""}${value.toFixed(1)}`;
}
