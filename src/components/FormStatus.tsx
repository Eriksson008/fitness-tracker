"use client";

import type { ActionState } from "@/lib/validation";

export function FormStatus({ state }: { state: ActionState }) {
  if (!state.message) return null;

  return (
    <p className={state.ok ? "form-status success" : "form-status error"} role={state.ok ? "status" : "alert"}>
      {state.message}
    </p>
  );
}
