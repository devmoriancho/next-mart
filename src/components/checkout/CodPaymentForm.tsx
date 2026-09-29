"use client";

import React from "react";
import { FiCheckCircle } from "react-icons/fi";
import Button from "@/components/ui/Button";

interface CodPaymentFormProps {
  amount: number;
  isSubmitting: boolean;
  onConfirm: () => Promise<void>;
}

export default function CodPaymentForm({
  amount,
  isSubmitting,
  onConfirm,
}: CodPaymentFormProps) {
  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-border bg-background p-4 flex items-start gap-3">
        <FiCheckCircle className="h-5 w-5 text-success mt-0.5 shrink-0" />
        <div>
          <h4 className="text-sm font-bold text-foreground">
            Cash on Delivery Option Active
          </h4>
          <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
            You will pay the total amount of{" "}
            <span className="font-bold text-foreground">
              ${amount.toFixed(2)}
            </span>{" "}
            in cash directly to our delivery agent upon physical receipt of your
            package at your doorstep.
          </p>
        </div>
      </div>

      <Button
        fullWidth
        type="button"
        onClick={onConfirm}
        disabled={isSubmitting}
        className="shadow-lg shadow-accent/10 cursor-pointer"
      >
        {isSubmitting
          ? "Processing Order..."
          : "Confirm Cash on Delivery Order"}
      </Button>
    </div>
  );
}
