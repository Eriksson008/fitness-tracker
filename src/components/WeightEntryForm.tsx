"use client";

import { Scale } from "lucide-react";
import { useActionState } from "react";
import { saveWeightAction } from "@/app/actions";
import { todayInputValue } from "@/lib/date";
import { emptyActionState } from "@/lib/validation";
import { FormStatus } from "@/components/FormStatus";
import { SubmitButton } from "@/components/SubmitButton";

export function WeightEntryForm({ defaultWeight }: { defaultWeight?: number | null }) {
  const [state, action] = useActionState(saveWeightAction, emptyActionState);

  return (
    <form action={action} className="card compact-form">
      <div className="section-heading tight">
        <div>
          <p className="eyebrow">Weight</p>
          <h2>Check in</h2>
        </div>
      </div>
      <div className="form-grid">
        <label>
          <span>Date</span>
          <input defaultValue={todayInputValue()} name="date" required type="date" />
        </label>
        <label>
          <span>Weight (lb)</span>
          <input defaultValue={defaultWeight ?? ""} inputMode="decimal" max={700} min={70} name="weightLb" required step="0.1" type="number" />
        </label>
        <label className="full">
          <span>Note</span>
          <input name="note" placeholder="Optional context" />
        </label>
      </div>
      <FormStatus state={state} />
      <SubmitButton icon={<Scale aria-hidden className="button-icon" />}>Log weight</SubmitButton>
    </form>
  );
}
