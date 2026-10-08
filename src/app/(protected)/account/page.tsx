import Link from "next/link";
import { redirect } from "next/navigation";
import { FiMapPin, FiPackage } from "react-icons/fi";
import { FaUser } from "react-icons/fa6";
import FrontEndLayout from "@/components/layout/FrontEndLayout";
import Button from "@/components/ui/Button";
import { getProfile } from "@/server-actions/user/getProfile";

export const dynamic = "force-dynamic";

export default async function AccountPage() {
  const userProfile = await getProfile();

  if (!userProfile) {
    redirect("/signin");
  }

  const defaultAddress = userProfile.addresses?.[0] || null;

  const joinDate = new Date(userProfile.createdAt).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <FrontEndLayout>
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-border bg-surface/20 p-6 space-y-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Name
              </p>
              <p className="font-semibold text-foreground mt-1">
                {userProfile.name}
              </p>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Email
              </p>
              <p className="font-semibold text-foreground mt-1">
                {userProfile.email}
              </p>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Phone
              </p>
              <p className="font-semibold text-foreground mt-1">
                {userProfile.phone || "Not set"}
              </p>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Joined
              </p>
              <p className="font-semibold text-foreground mt-1">{joinDate}</p>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-surface/20 p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 border-b border-border pb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <FiMapPin size={20} />
                </div>
                <h2 className="text-base font-bold uppercase tracking-wider text-foreground">
                  Shipping Address
                </h2>
              </div>

              {defaultAddress ? (
                <div className="mt-5 space-y-1.5 text-sm font-medium text-muted-foreground">
                  <p className="text-foreground font-semibold">
                    {defaultAddress.firstName} {defaultAddress.lastName}
                  </p>
                  <p>{defaultAddress.phone}</p>
                  <p className="text-foreground/80">{defaultAddress.street}</p>
                  <p>
                    {defaultAddress.city}, {defaultAddress.state}
                  </p>
                  {defaultAddress.postalCode && (
                    <p>Postal Code: {defaultAddress.postalCode}</p>
                  )}
                  <p className="text-xs font-bold uppercase tracking-wider mt-2 text-accent">
                    {userProfile.country}
                  </p>
                </div>
              ) : (
                <div className="mt-8 text-center sm:text-left">
                  <p className="text-sm font-medium text-muted-foreground">
                    No shipping address added yet.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4 border-t border-border pt-8">
          <Link href="/account/edit" className="w-full sm:w-fit">
            <Button
              variant="hover"
              className="w-full"
              leftIcon={<FaUser size={16} />}
            >
              Edit Account
            </Button>
          </Link>

          <Link href="/account/orders" className="w-full sm:w-fit">
            <Button className="w-full" leftIcon={<FiPackage size={16} />}>
              Orders
            </Button>
          </Link>
        </div>
      </section>
    </FrontEndLayout>
  );
}
