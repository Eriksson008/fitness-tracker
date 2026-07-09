"use client";

import { Utensils } from "lucide-react";
import { useActionState } from "react";
import { saveNutritionAction } from "@/app/actions";
import { todayInputValue } from "@/lib/date";
import { emptyActionState } from "@/lib/validation";
import { FormStatus } from "@/components/FormStatus";
import { SubmitButton } from "@/components/SubmitButton";

export function NutritionEntryForm() {
  const [state, action] = useActionState(saveNutritionAction, emptyActionState);

  return (
    <form action={action} className="card compact-form">
      <div className="section-heading tight">
        <div>
          <p className="eyebrow">Nutrition</p>
          <h2>Daily intake</h2>
        </div>
      </div>
      <div className="form-grid two">
        <label>
          <span>Date</span>
          <input defaultValue={todayInputValue()} name="date" required type="date" />
        </label>
        <label>
          <span>Calories</span>
          <input inputMode="numeric" max={10000} min={0} name="calories" required type="number" />
        </label>
        <label>
          <span>Protein (g)</span>
          <input inputMode="numeric" max={500} min={0} name="proteinG" required type="number" />
        </label>
        <label>
          <span>Carbs (g)</span>
          <input inputMode="numeric" max={1000} min={0} name="carbsG" required type="number" />
        </label>
        <label>
          <span>Fat (g)</span>
          <input inputMode="numeric" max={500} min={0} name="fatG" required type="number" />
        </label>
        <label>
          <span>Note</span>
          <input name="note" placeholder="Optional" />
        </label>
      </div>
      <FormStatus state={state} />
      <SubmitButton icon={<Utensils aria-hidden className="button-icon" />}>Log nutrition</SubmitButton>
    </form>
  );
}
