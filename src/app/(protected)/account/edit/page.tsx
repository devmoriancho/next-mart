"use client";

import FrontEndLayout from "@/components/layout/FrontEndLayout";
import BreadCrumb from "@/components/ui/BreadCrumb";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function EditProfilePage() {
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <FrontEndLayout>
      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <BreadCrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Account", href: "/account" },
            { label: "Profile Settings" },
          ]}
        />

        <div className="mb-8 border-b border-border pb-4">
          <h1 className="text-xl font-extrabold tracking-tight text-foreground sm:text-2xl">
            Account Parameters
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Update your core profile information and primary shipping hubs.
          </p>
        </div>

        <form onSubmit={handleSave} className="mt-8 space-y-6">
          <div className="rounded-2xl border border-border bg-surface/20 p-6">
            <h2 className="text-base font-bold tracking-tight text-foreground mb-6 uppercase">
              Personal Information
            </h2>

            <div className="grid gap-5 md:grid-cols-2">
              <Input
                label="Full Name"
                placeholder="Vincent M. Parkolwa"
                type="text"
              />
              <Input
                label="Phone Number"
                placeholder="0712 345 678"
                type="tel"
              />
              <div className="md:col-span-2">
                <Input
                  label="Email Address"
                  placeholder="vincent.parkolwa@nexusmart.com"
                  type="email"
                />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-surface/20 p-6">
            <h2 className="text-base font-bold tracking-tight text-foreground mb-6 uppercase">
              Shipping Allocation
            </h2>

            <div className="grid gap-5 md:grid-cols-2">
              <Input label="Country" placeholder="Kenya" />
              <Input label="County / State" placeholder="Nairobi" />
              <Input label="City / Sub-County" placeholder="Kilimani" />
              <Input label="Postal Code" placeholder="00100" />

              <div className="md:col-span-2">
                <Input
                  label="Street Address"
                  placeholder="Wood Avenue Towers, Box 45"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <Button type="submit" className="w-full sm:w-fit sm:px-8">
              Save Account Changes
            </Button>
          </div>
        </form>
      </section>
    </FrontEndLayout>
  );
}
