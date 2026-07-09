export type Sex = "male" | "female";
export type ActivityLevel =
  | "sedentary"
  | "light"
  | "moderate"
  | "very"
  | "extra";
export type GoalType = "lose" | "maintain" | "gain";

export const activityLevels: Record<
  ActivityLevel,
  { label: string; multiplier: number; description: string }
> = {
  sedentary: {
    label: "Sedentary",
    multiplier: 1.2,
    description: "Little exercise"
  },
  light: {
    label: "Light",
    multiplier: 1.375,
    description: "Training 1-3 days per week"
  },
  moderate: {
    label: "Moderate",
    multiplier: 1.55,
    description: "Training 3-5 days per week"
  },
  very: {
    label: "Very active",
    multiplier: 1.725,
    description: "Hard training 6-7 days per week"
  },
  extra: {
    label: "Extra active",
    multiplier: 1.9,
    description: "Hard training plus physical work"
  }
};

export type ProfileInputs = {
  age: number;
  sex: Sex;
  heightIn: number;
  currentWeightLb: number;
  goalWeightLb: number;
  activityLevel: ActivityLevel;
  goalType: GoalType;
  desiredPaceLbPerWeek?: number | null;
};

export type Targets = {
  bmr: number;
  tdee: number;
  calorieTarget: number;
  calorieDelta: number;
  proteinG: number;
  carbsG: number;
  fatG: number;
  plainEnglish: string;
};

export function poundsToKg(weightLb: number) {
  return weightLb * 0.45359237;
}

export function inchesToCm(heightIn: number) {
  return heightIn * 2.54;
}

export function calculateBmr(input: Pick<ProfileInputs, "age" | "sex" | "heightIn" | "currentWeightLb">) {
  const base =
    10 * poundsToKg(input.currentWeightLb) +
    6.25 * inchesToCm(input.heightIn) -
    5 * input.age;

  return Math.round(input.sex === "male" ? base + 5 : base - 161);
}

export function calculateTdee(bmr: number, activityLevel: ActivityLevel) {
  return Math.round(bmr * activityLevels[activityLevel].multiplier);
}

export function calculateCalorieTarget(tdee: number, goalType: GoalType, desiredPaceLbPerWeek = 0) {
  if (goalType === "maintain") {
    return { calorieTarget: tdee, calorieDelta: 0 };
  }

  const weeklyPace = clamp(desiredPaceLbPerWeek || 0.75, 0.25, 2);
  const dailyEnergy = Math.round((weeklyPace * 3500) / 7);
  const signedDelta = goalType === "lose" ? -dailyEnergy : dailyEnergy;
  const target = tdee + signedDelta;

  return {
    calorieTarget: Math.max(1200, Math.round(target)),
    calorieDelta: signedDelta
  };
}

export function calculateMacroTargets(calorieTarget: number, weightLb: number) {
  const proteinG = Math.round(weightLb * 0.8);
  const fatG = Math.round((calorieTarget * 0.25) / 9);
  const carbsG = Math.max(0, Math.round((calorieTarget - proteinG * 4 - fatG * 9) / 4));

  return { proteinG, carbsG, fatG };
}

export function calculateTargets(input: ProfileInputs): Targets {
  const bmr = calculateBmr(input);
  const tdee = calculateTdee(bmr, input.activityLevel);
  const { calorieTarget, calorieDelta } = calculateCalorieTarget(
    tdee,
    input.goalType,
    input.desiredPaceLbPerWeek ?? 0
  );
  const macros = calculateMacroTargets(calorieTarget, input.currentWeightLb);

  return {
    bmr,
    tdee,
    calorieTarget,
    calorieDelta,
    ...macros,
    plainEnglish: describeTarget(input.goalType, calorieTarget, calorieDelta)
  };
}

function describeTarget(goalType: GoalType, calories: number, delta: number) {
  if (goalType === "maintain") {
    return `Hold near ${calories.toLocaleString()} calories per day to maintain your current trend.`;
  }

  const direction = goalType === "lose" ? "deficit" : "surplus";
  return `Aim for about ${calories.toLocaleString()} calories per day, a ${Math.abs(
    delta
  ).toLocaleString()} calorie ${direction} from estimated maintenance.`;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}
