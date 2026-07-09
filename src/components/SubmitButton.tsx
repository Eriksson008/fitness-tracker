"use client";

import { LoaderCircle } from "lucide-react";
import { useFormStatus } from "react-dom";

type SubmitButtonProps = {
  children: React.ReactNode;
  icon?: React.ReactNode;
};

export function SubmitButton({ children, icon }: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button className="button button-primary" disabled={pending} type="submit">
      {pending ? <LoaderCircle aria-hidden className="button-icon spin" /> : icon}
      <span>{pending ? "Saving" : children}</span>
    </button>
  );
}
