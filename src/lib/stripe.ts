import Stripe from "stripe";

let stripeClient: Stripe | undefined;

export function getStripe() {
  if (stripeClient) return stripeClient;

  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    throw new Error(
      "STRIPE_SECRET_KEY is not available. Restart the Next.js dev server after updating .env.",
    );
  }

  stripeClient = new Stripe(secretKey);
  return stripeClient;
}
