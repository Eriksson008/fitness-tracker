"use client";

import type { Profile } from "@prisma/client";
import { Save } from "lucide-react";
import { useActionState } from "react";
import { saveProfileAction } from "@/app/actions";
import { activityLevels } from "@/lib/calculators";
import { emptyActionState } from "@/lib/validation";
import { FormStatus } from "@/components/FormStatus";
import { SubmitButton } from "@/components/SubmitButton";

export function ProfileForm({ profile }: { profile: Profile | null }) {
  const [state, action] = useActionState(saveProfileAction, emptyActionState);

  return (
    <form action={action} className="card form-card">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Profile</p>
          <h2>Training baseline</h2>
        </div>
        <span className="pill">Local only</span>
      </div>

      <div className="form-grid two">
        <label>
          <span>Profile label</span>
          <input defaultValue={profile?.label ?? "My fitness profile"} name="label" placeholder="My fitness profile" />
        </label>
        <label>
          <span>Age</span>
          <input defaultValue={profile?.age ?? 30} inputMode="numeric" max={100} min={13} name="age" required type="number" />
        </label>
        <label>
          <span>Sex for BMR formula</span>
          <select defaultValue={profile?.sex ?? "male"} name="sex" required>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </label>
        <label>
          <span>Height (in)</span>
          <input defaultValue={profile?.heightIn ?? 70} inputMode="decimal" max={90} min={48} name="heightIn" required step="0.1" type="number" />
        </label>
        <label>
          <span>Current weight (lb)</span>
          <input defaultValue={profile?.currentWeightLb ?? 180} inputMode="decimal" max={700} min={70} name="currentWeightLb" required step="0.1" type="number" />
        </label>
        <label>
          <span>Goal weight (lb)</span>
          <input defaultValue={profile?.goalWeightLb ?? 170} inputMode="decimal" max={700} min={70} name="goalWeightLb" required step="0.1" type="number" />
        </label>
        <label>
          <span>Activity level</span>
          <select defaultValue={profile?.activityLevel ?? "moderate"} name="activityLevel" required>
            {Object.entries(activityLevels).map(([value, option]) => (
              <option key={value} value={value}>
                {option.label} - {option.description}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span>Goal type</span>
          <select defaultValue={profile?.goalType ?? "lose"} name="goalType" required>
            <option value="lose">Lose weight</option>
            <option value="maintain">Maintain</option>
            <option value="gain">Gain weight</option>
          </select>
        </label>
        <label>
          <span>Desired pace (lb/week)</span>
          <input defaultValue={profile?.desiredPaceLbPerWeek ?? 0.75} inputMode="decimal" max={2} min={0.25} name="desiredPaceLbPerWeek" step="0.25" type="number" />
        </label>
      </div>

      <p className="microcopy">
        BMR uses Mifflin-St Jeor. Goal calories use roughly 3,500 calories per pound, capped to a practical pace.
      </p>
      <FormStatus state={state} />
      <SubmitButton icon={<Save aria-hidden className="button-icon" />}>Save profile</SubmitButton>
    </form>
  );
}
