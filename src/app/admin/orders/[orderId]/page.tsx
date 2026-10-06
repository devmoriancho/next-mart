import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FiArrowLeft, FiPackage, FiMapPin } from "react-icons/fi";
import AdminLayout from "@/components/layout/AdminLayout";
import OrderStatusCard from "@/components/order/OrderStatusCard";
import { getOrderDetails } from "@/server-actions/order/getOrderDetails";

interface PageProps {
  params: Promise<{ orderId: string }>;
}

export default async function AdminSingleOrderPage({ params }: PageProps) {
  const resolvedParams = await params;
  const response = await getOrderDetails(resolvedParams.orderId);

  if (!response.success || !response.data) {
    notFound();
  }

  const order = response.data;

  const formattedDate = new Date(order.createdAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <AdminLayout>
      <section className="mx-auto max-w-7xl py-6">
        <div className="flex flex-col gap-5 rounded-2xl border border-border bg-surface/20 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Link href="/admin/orders">
              <button className="mb-4 inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-3 py-1.5 text-xs font-semibold text-foreground hover:bg-background transition">
                <FiArrowLeft size={14} /> Back to Dashboard
              </button>
            </Link>
            <h1 className="text-2xl font-black tracking-tight text-foreground sm:text-3xl">
              Fulfillment Manifest #{order.orderNumber}
            </h1>
            <p className="mt-1 text-sm font-medium text-muted-foreground">
              Order placed on {formattedDate}
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[2fr_1fr]">
          <div className="space-y-6">
            <div className="rounded-2xl border border-border p-6 bg-surface/10">
              <div className="flex items-center gap-3 border-b border-border pb-4">
                <div className="text-accent">
                  <FiPackage size={18} />
                </div>
                <h2 className="text-base font-bold uppercase tracking-wider text-foreground">
                  Consignment Items
                </h2>
              </div>

              <div className="mt-6 space-y-4">
                {order.items.map((item) => {
                  const primaryImage =
                    item.product?.images?.[0]?.imageUrl ||
                    "/images/placeholder.jpg";

                  return (
                    <div
                      key={item.id}
                      className="flex flex-col gap-5 rounded-xl border border-border bg-background p-5 sm:flex-row sm:items-center"
                    >
                      <div className="relative aspect-3/4 w-24 shrink-0 overflow-hidden rounded-xl border border-border">
                        <Image
                          src={primaryImage}
                          alt={item.product?.name || "Item"}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex flex-1 flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <h3 className="text-sm font-bold text-foreground">
                            {item.product?.name}
                          </h3>
                          <div className="mt-3 flex flex-wrap gap-2 text-xs font-semibold text-muted-foreground uppercase">
                            <span className="rounded-lg bg-surface px-2.5 py-1 border border-border">
                              Size: {item.size}
                            </span>
                            <span className="rounded-lg bg-surface px-2.5 py-1 border border-border">
                              Hue: {item.color}
                            </span>
                            <span className="rounded-lg bg-surface px-2.5 py-1 border border-border">
                              Units: {item.quantity}
                            </span>
                          </div>
                        </div>
                        <div className="text-left sm:text-right">
                          <p className="text-lg font-extrabold text-foreground">
                            KES{" "}
                            {Number(
                              Number(item.price) * item.quantity,
                            ).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="space-y-6 lg:sticky lg:top-24 lg:h-fit">
            <OrderStatusCard orderId={order.id} currentStatus={order.status} />

            <div className="rounded-2xl border border-border p-6 bg-surface/10">
              <h2 className="text-base font-bold uppercase tracking-wider text-foreground border-b border-border pb-4">
                Financial Summary
              </h2>
              <div className="mt-6 space-y-3.5 text-sm font-medium text-muted-foreground">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-foreground">
                    KES {Number(order.subtotal).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-success uppercase font-bold text-xs tracking-wider">
                    {Number(order.shipping) === 0
                      ? "Free"
                      : `KES ${Number(order.shipping).toLocaleString()}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span className="text-foreground">
                    KES {Number(order.tax).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between border-t border-border pt-4 text-lg font-black text-foreground">
                  <span>Total Record</span>
                  <span className="text-accent">
                    KES {Number(order.total).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-border p-6 bg-surface/10">
              <div className="flex items-center gap-3 border-b border-border pb-4">
                <div className="text-accent">
                  <FiMapPin size={18} />
                </div>
                <h2 className="text-base font-bold uppercase tracking-wider text-foreground">
                  Delivery Destination
                </h2>
              </div>
              <div className="mt-5 space-y-1 text-sm font-medium text-muted-foreground">
                <p className="font-bold text-foreground">
                  {order.address.firstName} {order.address.lastName}
                </p>
                <p className="text-xs">{order.address.phone}</p>
                <p className="mt-2 text-foreground/80">
                  {order.address.street}
                </p>
                <p>
                  {order.address.city}, {order.address.state}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </AdminLayout>
  );
}
