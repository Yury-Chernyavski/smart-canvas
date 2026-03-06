'use client'

import { FC } from "react";
import { Button } from "@/componenst/ui/button";
import { useFormStatus } from "react-dom";

type SubmitButtonProps = {
  label?: string;
  pendingLabel?: string;
  variant: "primary" | "secondary" | "danger";
}


export const SubmitButton: FC<SubmitButtonProps> = ({label = 'Add', pendingLabel = 'Saving...', variant}) => {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} variant={variant}>
      {pending ? pendingLabel : label}
    </Button>
  )
}