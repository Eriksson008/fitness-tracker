import type { ActivityLevel, GoalType, Sex } from "@/lib/calculators";

export type ActionState = {
  ok: boolean;
  message: string;
};

export const emptyActionState: ActionState = {
  ok: false,
  message: ""
};

export function textField(formData: FormData, key: string, fallback = "") {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : fallback;
}

export function numberField(formData: FormData, key: string) {
  const value = Number(textField(formData, key));
  return Number.isFinite(value) ? value : NaN;
}

export function optionalNumberField(formData: FormData, key: string) {
  const raw = textField(formData, key);
  if (!raw) return null;

  const value = Number(raw);
  return Number.isFinite(value) ? value : NaN;
}

export function assertRange(value: number, label: string, min: number, max: number) {
  if (!Number.isFinite(value) || value < min || value > max) {
    throw new Error(`${label} must be between ${min} and ${max}.`);
  }
}

export function sexField(value: string): Sex {
  if (value === "male" || value === "female") return value;
  throw new Error("Choose a sex for the BMR formula.");
}

export function activityField(value: string): ActivityLevel {
  if (["sedentary", "light", "moderate", "very", "extra"].includes(value)) {
    return value as ActivityLevel;
  }

  throw new Error("Choose an activity level.");
}

export function goalField(value: string): GoalType {
  if (value === "lose" || value === "maintain" || value === "gain") return value;
  throw new Error("Choose a goal type.");
}
