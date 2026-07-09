"use client";

import { Trash2 } from "lucide-react";
import { useFormStatus } from "react-dom";

export function DeleteButton() {
  const { pending } = useFormStatus();

  return (
    <button aria-label="Delete entry" className="icon-button danger" disabled={pending} title="Delete entry" type="submit">
      <Trash2 aria-hidden size={15} />
    </button>
  );
}
