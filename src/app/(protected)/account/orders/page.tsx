import Image from "next/image";
import Link from "next/link";
import { FiEye } from "react-icons/fi";
import FrontEndLayout from "@/components/layout/FrontEndLayout";
import BreadCrumb from "@/components/ui/BreadCrumb";
import { getOrders } from "@/server-actions/order/getOrders";

const statusStyles: Record<string, string> = {
  PAID: "bg-success/10 text-success border border-success/20",
  PENDING: "bg-warning/10 text-warning border border-warning/20",
  FAILED: "bg-destructive/10 text-destructive border border-destructive/20",
  CANCELLED: "bg-destructive/10 text-destructive border border-destructive/20",
};

export default async function OrdersPage() {
  const response = await getOrders();
  const orders = response.success && response.data ? response.data : [];

  return (
    <FrontEndLayout>
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <BreadCrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Account", href: "/account" },
            { label: "Purchase Records" },
          ]}
        />

        <div className="mb-8 border-b border-border pb-4">
          <h1 className="text-xl font-extrabold tracking-tight text-foreground sm:text-2xl">
            Purchase History
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Review live fulfillment cycles and access historic invoices.
          </p>
        </div>

        {orders.length === 0 ? (
          <div className="text-center py-12 bg-surface/10 rounded-2xl border border-dashed border-border">
            <p className="text-muted-foreground">
              You haven&apos;t placed any orders yet.
            </p>
            <Link
              href="/shop"
              className="mt-4 inline-block text-sm font-bold text-accent underline"
            >
              Browse the Shop
            </Link>
          </div>
        ) : (
          <div className="mt-8 space-y-5">
            {orders.map((order) => {
              const totalItems = order.items.reduce(
                (acc, item) => acc + item.quantity,
                0,
              );

              const primaryImage =
                order.items[0]?.product?.images[0]?.imageUrl ||
                "/images/placeholder.jpg";

              const formattedDate = new Date(
                order.createdAt,
              ).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              });

              return (
                <div
                  key={order.id}
                  className="flex flex-col gap-6 rounded-2xl border border-border bg-surface/20 p-5 transition-all duration-300 hover:border-accent/20 hover:shadow-md md:flex-row md:items-center"
                >
                  <div className="relative shrink-0 aspect-3/4 w-24 overflow-hidden rounded-xl border border-border bg-surface sm:w-28">
                    <Image
                      src={primaryImage}
                      alt={`Order invoice item image`}
                      fill
                      sizes="110px"
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3">
                      <h2 className="font-bold text-base text-foreground">
                        Invoice #{order.orderNumber}
                      </h2>
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-xs font-bold tracking-wide uppercase ${
                          statusStyles[order.paymentStatus] ||
                          "bg-surface text-muted-foreground"
                        }`}
                      >
                        {order.paymentStatus}
                      </span>
                    </div>

                    <div className="mt-6 grid grid-cols-2 gap-4 text-xs font-semibold tracking-wide uppercase sm:grid-cols-3">
                      <div>
                        <p className="text-muted-foreground">Total Units</p>
                        <p className="mt-1.5 text-sm font-bold text-foreground">
                          {totalItems} {totalItems === 1 ? "Item" : "Items"}
                        </p>
                      </div>

                      <div>
                        <p className="text-muted-foreground">Total Price</p>
                        <p className="mt-1.5 text-sm font-bold text-foreground">
                          KES {Number(order.total).toLocaleString()}
                        </p>
                      </div>

                      <div className="col-span-2 sm:col-span-1">
                        <p className="text-muted-foreground">Order Date</p>
                        <p className="mt-1.5 text-sm font-bold text-foreground">
                          {formattedDate}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-end md:justify-center">
                    <Link href={`/account/orders/${order.orderNumber}`}>
                      <button className="flex h-11 w-11 items-center justify-center rounded-xl transition-all duration-200 bg-surface border border-border text-foreground hover:bg-background hover:text-accent hover:border-accent/40 cursor-pointer active:scale-95 shadow-sm">
                        <FiEye size={16} />
                      </button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </FrontEndLayout>
  );
}
