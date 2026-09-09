"use client";

import { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { FiLock } from "react-icons/fi";
import Button from "@/components/ui/Button";

interface StripePaymentFormProps {
  amount: number;
  formData: Record<string, string>;
}

export default function StripePaymentForm({
  amount,
  formData,
}: StripePaymentFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      setError("Stripe not loaded");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Create payment intent on backend
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: Math.round(amount * 100), // Convert to cents
          formData,
        }),
      });

      if (!res.ok) throw new Error("Failed to create payment intent");

      const { clientSecret } = await res.json();

      // Confirm payment
      const cardElement = elements.getElement(CardElement);
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement!,
          billing_details: {
            name: `${formData.firstName} ${formData.lastName}`,
            email: formData.email,
            phone: formData.phone,
            address: {
              line1: formData.address,
              city: formData.city,
              state: formData.state,
              postal_code: formData.postal,
              country: "KE",
            },
          },
        },
      });

      if (result.error) {
        setError(result.error.message || "Payment failed");
      } else if (result.paymentIntent?.status === "succeeded") {
        // Redirect to success page
        window.location.href = `/checkout/success?orderId=${result.paymentIntent.id}`;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Payment error");
    } finally {
      setLoading(false);
    }
  };

  const cardElementOptions = {
    style: {
      base: {
        fontSize: "14px",
        fontFamily: "system-ui, -apple-system, sans-serif",
        color: "hsl(var(--color-foreground))",
        "::placeholder": {
          color: "hsl(var(--color-muted-foreground))",
        },
      },
      invalid: {
        color: "hsl(var(--color-destructive))",
      },
    },
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="rounded-xl border border-border bg-surface/40 px-4 py-3.5 mt-1.5">
        <CardElement options={cardElementOptions} />
      </div>

      {error && (
        <div className="rounded-lg bg-destructive/10 border border-destructive/20 p-3 text-sm text-destructive font-medium">
          {error}
        </div>
      )}

      <Button
        type="submit"
        disabled={!stripe || loading}
        fullWidth
        className="shadow-lg shadow-accent/10"
        leftIcon={<FiLock size={16} />}
      >
        {loading ? "Processing..." : `Pay $${amount.toFixed(2)}`}
      </Button>
    </form>
  );
}
