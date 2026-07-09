"use client";

import { Dumbbell } from "lucide-react";
import { useActionState } from "react";
import { saveWorkoutAction } from "@/app/actions";
import { todayInputValue } from "@/lib/date";
import { emptyActionState } from "@/lib/validation";
import { FormStatus } from "@/components/FormStatus";
import { SubmitButton } from "@/components/SubmitButton";

export function WorkoutForm() {
  const [state, action] = useActionState(saveWorkoutAction, emptyActionState);

  return (
    <form action={action} className="card compact-form">
      <div className="section-heading tight">
        <div>
          <p className="eyebrow">Training</p>
          <h2>Workout log</h2>
        </div>
      </div>
      <div className="form-grid two">
        <label>
          <span>Date</span>
          <input defaultValue={todayInputValue()} name="date" required type="date" />
        </label>
        <label>
          <span>Type</span>
          <input name="type" placeholder="Strength, run, bike" required />
        </label>
        <label>
          <span>Duration (min)</span>
          <input inputMode="numeric" max={600} min={1} name="durationMin" required type="number" />
        </label>
        <label>
          <span>Main exercise</span>
          <input name="exerciseName" placeholder="Optional" />
        </label>
        <label>
          <span>Sets</span>
          <input inputMode="numeric" min={0} name="sets" type="number" />
        </label>
        <label>
          <span>Reps</span>
          <input inputMode="numeric" min={0} name="reps" type="number" />
        </label>
        <label>
          <span>Load (lb)</span>
          <input inputMode="decimal" min={0} name="weightLb" step="0.5" type="number" />
        </label>
        <label>
          <span>Notes</span>
          <input name="notes" placeholder="How it felt" />
        </label>
      </div>
      <FormStatus state={state} />
      <SubmitButton icon={<Dumbbell aria-hidden className="button-icon" />}>Log workout</SubmitButton>
    </form>
  );
}
