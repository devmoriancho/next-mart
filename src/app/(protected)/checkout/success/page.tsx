import Link from "next/link";
import { FiCheckCircle, FiArrowRight } from "react-icons/fi";
import FrontEndLayout from "@/components/layout/FrontEndLayout";
import Button from "@/components/ui/Button";
import { completeStripeOrder } from "@/server-actions/order/completeStripeOrder";

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id: sessionId } = await searchParams;
  const result = sessionId
    ? await completeStripeOrder(sessionId)
    : { success: false, message: "Missing Stripe checkout session." };
  const orderId = result.success ? result.orderNumber : "pending";

  return (
    <FrontEndLayout>
      <section className="mx-auto max-w-2xl px-4 py-24 sm:px-6 lg:px-8 text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-success/10 border border-success/20 mb-8">
          <FiCheckCircle size={40} className="text-success" />
        </div>

        <h1 className="text-4xl font-extrabold tracking-tight text-foreground mb-4">
          {result.success ? "Order Confirmed" : "Payment Received"}
        </h1>

        <p className="text-lg text-muted-foreground max-w-md mx-auto mb-2">
          {result.success
            ? "Thank you for your purchase!"
            : result.message || "We are still processing your order."}
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
            <Button variant="hover" rightIcon={<FiArrowRight size={16} />}>
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
