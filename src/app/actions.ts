"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { inputDateToUtc } from "@/lib/date";
import {
  activityField,
  assertRange,
  emptyActionState,
  goalField,
  numberField,
  optionalNumberField,
  sexField,
  textField,
  type ActionState
} from "@/lib/validation";

export async function saveProfileAction(
  _previousState: ActionState = emptyActionState,
  formData: FormData
): Promise<ActionState> {
  void _previousState;
  try {
    const label = textField(formData, "label", "Personal profile") || "Personal profile";
    const age = numberField(formData, "age");
    const sex = sexField(textField(formData, "sex"));
    const heightIn = numberField(formData, "heightIn");
    const currentWeightLb = numberField(formData, "currentWeightLb");
    const goalWeightLb = numberField(formData, "goalWeightLb");
    const activityLevel = activityField(textField(formData, "activityLevel"));
    const goalType = goalField(textField(formData, "goalType"));
    const desiredPaceLbPerWeek = optionalNumberField(formData, "desiredPaceLbPerWeek");

    assertRange(age, "Age", 13, 100);
    assertRange(heightIn, "Height", 48, 90);
    assertRange(currentWeightLb, "Current weight", 70, 700);
    assertRange(goalWeightLb, "Goal weight", 70, 700);

    if (desiredPaceLbPerWeek !== null) {
      assertRange(desiredPaceLbPerWeek, "Desired pace", 0.25, 2);
    }

    const existing = await prisma.profile.findFirst({ select: { id: true } });
    const data = {
      label,
      age,
      sex,
      heightIn,
      currentWeightLb,
      goalWeightLb,
      activityLevel,
      goalType,
      desiredPaceLbPerWeek: goalType === "maintain" ? null : desiredPaceLbPerWeek ?? 0.75
    };

    if (existing) {
      await prisma.profile.update({ where: { id: existing.id }, data });
    } else {
      await prisma.profile.create({ data });
    }

    revalidatePath("/");
    return { ok: true, message: "Profile and targets updated." };
  } catch (error) {
    return actionError(error);
  }
}

export async function saveWeightAction(
  _previousState: ActionState = emptyActionState,
  formData: FormData
): Promise<ActionState> {
  void _previousState;
  try {
    const date = inputDateToUtc(textField(formData, "date"));
    const weightLb = numberField(formData, "weightLb");
    const note = textField(formData, "note") || null;

    assertRange(weightLb, "Weight", 70, 700);

    await prisma.weightEntry.upsert({
      where: { date },
      update: { weightLb, note },
      create: { date, weightLb, note }
    });

    const profile = await prisma.profile.findFirst({ select: { id: true } });
    if (profile) {
      await prisma.profile.update({ where: { id: profile.id }, data: { currentWeightLb: weightLb } });
    }

    revalidatePath("/");
    return { ok: true, message: "Weight entry saved." };
  } catch (error) {
    return actionError(error);
  }
}

export async function saveNutritionAction(
  _previousState: ActionState = emptyActionState,
  formData: FormData
): Promise<ActionState> {
  void _previousState;
  try {
    const date = inputDateToUtc(textField(formData, "date"));
    const calories = numberField(formData, "calories");
    const proteinG = numberField(formData, "proteinG");
    const carbsG = numberField(formData, "carbsG");
    const fatG = numberField(formData, "fatG");
    const note = textField(formData, "note") || null;

    assertRange(calories, "Calories", 0, 10000);
    assertRange(proteinG, "Protein", 0, 500);
    assertRange(carbsG, "Carbs", 0, 1000);
    assertRange(fatG, "Fat", 0, 500);

    await prisma.nutritionEntry.upsert({
      where: { date },
      update: { calories, proteinG, carbsG, fatG, note },
      create: { date, calories, proteinG, carbsG, fatG, note }
    });

    revalidatePath("/");
    return { ok: true, message: "Nutrition entry saved." };
  } catch (error) {
    return actionError(error);
  }
}

export async function saveWorkoutAction(
  _previousState: ActionState = emptyActionState,
  formData: FormData
): Promise<ActionState> {
  void _previousState;
  try {
    const date = inputDateToUtc(textField(formData, "date"));
    const type = textField(formData, "type");
    const durationMin = numberField(formData, "durationMin");
    const notes = textField(formData, "notes") || null;
    const exerciseName = textField(formData, "exerciseName");
    const sets = optionalNumberField(formData, "sets");
    const reps = optionalNumberField(formData, "reps");
    const weightLb = optionalNumberField(formData, "weightLb");

    if (!type) throw new Error("Workout type is required.");
    assertRange(durationMin, "Duration", 1, 600);

    const exercise =
      exerciseName.length > 0
        ? {
            create: {
              name: exerciseName,
              sets: finiteOptional(sets),
              reps: finiteOptional(reps),
              weightLb: finiteOptional(weightLb)
            }
          }
        : undefined;

    await prisma.workoutSession.create({
      data: {
        date,
        type,
        durationMin,
        notes,
        exercises: exercise
      }
    });

    revalidatePath("/");
    return { ok: true, message: "Workout saved." };
  } catch (error) {
    return actionError(error);
  }
}

export async function deleteWeightAction(formData: FormData) {
  const id = textField(formData, "id");
  if (id) {
    await prisma.weightEntry.delete({ where: { id } });
    revalidatePath("/");
  }
}

export async function deleteNutritionAction(formData: FormData) {
  const id = textField(formData, "id");
  if (id) {
    await prisma.nutritionEntry.delete({ where: { id } });
    revalidatePath("/");
  }
}

export async function deleteWorkoutAction(formData: FormData) {
  const id = textField(formData, "id");
  if (id) {
    await prisma.workoutSession.delete({ where: { id } });
    revalidatePath("/");
  }
}

function finiteOptional(value: number | null) {
  return value === null || !Number.isFinite(value) ? null : value;
}

function actionError(error: unknown): ActionState {
  return {
    ok: false,
    message: error instanceof Error ? error.message : "Something went wrong. Check the form and try again."
  };
}
