import type { NutritionEntry, Profile, WeightEntry, WorkoutSession } from "@prisma/client";
import { calculateTargets } from "@/lib/calculators";

export function buildProfileTargets(profile: Profile | null) {
  if (!profile) return null;

  return calculateTargets({
    age: profile.age,
    sex: profile.sex as "male" | "female",
    heightIn: profile.heightIn,
    currentWeightLb: profile.currentWeightLb,
    goalWeightLb: profile.goalWeightLb,
    activityLevel: profile.activityLevel as never,
    goalType: profile.goalType as never,
    desiredPaceLbPerWeek: profile.desiredPaceLbPerWeek
  });
}

export function weightStats(profile: Profile | null, entries: WeightEntry[]) {
  const ordered = [...entries].sort((a, b) => a.date.getTime() - b.date.getTime());
  const start = ordered[0]?.weightLb ?? profile?.currentWeightLb ?? null;
  const current = ordered[ordered.length - 1]?.weightLb ?? profile?.currentWeightLb ?? null;
  const totalChange = start !== null && current !== null ? current - start : null;
  const days =
    ordered.length > 1
      ? Math.max(1, (ordered[ordered.length - 1].date.getTime() - ordered[0].date.getTime()) / 86400000)
      : 0;
  const averageWeeklyChange = totalChange !== null && days > 0 ? (totalChange / days) * 7 : null;

  return { start, current, totalChange, averageWeeklyChange };
}

export function nextRecommendedAction(
  profile: Profile | null,
  todayNutrition: NutritionEntry | null,
  lastWorkout: WorkoutSession | null,
  latestWeight: WeightEntry | null
) {
  if (!profile) return "Set up your profile to unlock targets and daily tracking.";
  if (!latestWeight) return "Add today's weigh-in so progress has a real baseline.";
  if (!todayNutrition) return "Log calories and protein for today before the day gets away from you.";
  if (!lastWorkout) return "Add your latest workout so training momentum appears on the dashboard.";
  return "Stay consistent today: hit protein, land near calories, and log the next workout.";
}
