"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FiCheckCircle, FiArrowRight } from "react-icons/fi";
import FrontEndLayout from "@/components/layout/FrontEndLayout";
import Button from "@/components/ui/Button";

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId") || "unknown";

  return (
    <FrontEndLayout>
      <section className="mx-auto max-w-2xl px-4 py-24 sm:px-6 lg:px-8 text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-success/10 border border-success/20 mb-8">
          <FiCheckCircle size={40} className="text-success" />
        </div>

        <h1 className="text-4xl font-extrabold tracking-tight text-foreground mb-4">
          Order Confirmed
        </h1>

        <p className="text-lg text-muted-foreground max-w-md mx-auto mb-2">
          Thank you for your purchase!
        </p>

        <p className="text-sm text-muted-foreground/70 max-w-md mx-auto mb-8">
          Order ID: <span className="font-mono font-bold">{orderId}</span>
        </p>

        <p className="text-sm text-muted-foreground max-w-md mx-auto mb-8">
          A confirmation email has been sent to your inbox. You can track your
          order progress from your account dashboard.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/shop">
            <Button variant="secondary" rightIcon={<FiArrowRight size={16} />}>
              Continue Shopping
            </Button>
          </Link>
          <Link href="/account/orders">
            <Button rightIcon={<FiArrowRight size={16} />}>View Orders</Button>
          </Link>
        </div>
      </section>
    </FrontEndLayout>
  );
}
