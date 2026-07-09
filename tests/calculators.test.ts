import { describe, expect, it } from "vitest";
import {
  calculateBmr,
  calculateCalorieTarget,
  calculateMacroTargets,
  calculateTargets,
  calculateTdee
} from "@/lib/calculators";

describe("fitness calculators", () => {
  it("calculates male BMR with the documented Mifflin-St Jeor formula", () => {
    expect(
      calculateBmr({
        age: 30,
        sex: "male",
        heightIn: 70,
        currentWeightLb: 180
      })
    ).toBe(1783);
  });

  it("calculates female BMR with the documented Mifflin-St Jeor formula", () => {
    expect(
      calculateBmr({
        age: 30,
        sex: "female",
        heightIn: 65,
        currentWeightLb: 150
      })
    ).toBe(1401);
  });

  it("applies standard activity multipliers for TDEE", () => {
    expect(calculateTdee(1800, "moderate")).toBe(2790);
  });

  it("turns goal pace into a daily calorie deficit or surplus", () => {
    expect(calculateCalorieTarget(2500, "lose", 1)).toEqual({
      calorieTarget: 2000,
      calorieDelta: -500
    });
    expect(calculateCalorieTarget(2500, "gain", 0.5)).toEqual({
      calorieTarget: 2750,
      calorieDelta: 250
    });
  });

  it("derives pragmatic macro targets from calories and body weight", () => {
    expect(calculateMacroTargets(2200, 180)).toEqual({
      proteinG: 144,
      carbsG: 269,
      fatG: 61
    });
  });

  it("returns a full target bundle for the dashboard", () => {
    const targets = calculateTargets({
      age: 30,
      sex: "male",
      heightIn: 70,
      currentWeightLb: 180,
      goalWeightLb: 170,
      activityLevel: "moderate",
      goalType: "lose",
      desiredPaceLbPerWeek: 1
    });

    expect(targets.bmr).toBe(1783);
    expect(targets.tdee).toBe(2764);
    expect(targets.calorieTarget).toBe(2264);
    expect(targets.proteinG).toBe(144);
  });
});
