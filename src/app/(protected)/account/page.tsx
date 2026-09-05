"use client";

import Link from "next/link";
import { FiMapPin, FiPackage } from "react-icons/fi";
import { FaUser } from "react-icons/fa6";
import FrontEndLayout from "@/components/layout/FrontEndLayout";
import Button from "@/components/ui/Button";

export default function AccountPage() {
  return (
    <FrontEndLayout>
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-border bg-surface/20 p-6 space-y-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Full Name
              </p>
              <p className="font-semibold text-foreground mt-1">
                Vincent M. Parkolwa
              </p>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Email Address
              </p>
              <p className="font-semibold text-foreground mt-1">
                vincent.parkolwa@nexusmart.com
              </p>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Phone Reference
              </p>
              <p className="font-semibold text-foreground mt-1">
                +254 701 234 567
              </p>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Member Baseline
              </p>
              <p className="font-semibold text-foreground mt-1">
                September 2025
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-surface/20 p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <FiMapPin size={20} />
                </div>
                <h2 className="text-lg font-bold tracking-tight text-foreground">
                  Default Shipping Hub
                </h2>
              </div>

              <div className="mt-6 space-y-1.5 text-sm font-medium text-muted-foreground">
                <p className="text-foreground font-semibold">
                  Wood Avenue Towers, Box 45
                </p>
                <p>Kilimani District</p>
                <p>Nairobi, 00100</p>
                <p>Kenya</p>
              </div>
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
              Edit Profile
            </Button>
          </Link>

          <Link href="/account/orders" className="w-full sm:w-fit">
            <Button className="w-full" leftIcon={<FiPackage size={16} />}>
              My Purchase History
            </Button>
          </Link>
        </div>
      </section>
    </FrontEndLayout>
  );
}
