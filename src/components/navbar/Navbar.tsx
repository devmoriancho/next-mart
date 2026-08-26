"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { FiMenu, FiX } from "react-icons/fi";
import { IoBagOutline, IoSearch } from "react-icons/io5";

interface NavLink {
  href: string;
  label: string;
}

const navLinks: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="text-3xl font-bold tracking-tight text-foreground"
        >
          NexusMart.
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                className={`relative text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                  isActive
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                href={link.href}
                key={link.href}
              >
                {link.label}
                {isActive && (
                  <span className="absolute -bottom-1 left-0 h-0.5 w-full rounded-full bg-accent" />
                )}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-1 sm:gap-2">
          <button className="rounded-full p-2 text-foreground transition-all duration-200 hover:bg-surface hover:scale-105 active:scale-95">
            <IoSearch size={20} />
          </button>
          <button
            className="rounded-full p-2 text-foreground transition-all duration-200 hover:bg-surface hover:scale-105 active:scale-95"
            onClick={() => router.push("/sign-in")}
          >
            <FaRegUser size={19} />
          </button>
          <button
            className="relative rounded-full p-2 text-foreground transition-all duration-200 hover:bg-surface hover:scale-105 active:scale-95"
            onClick={() => router.push("/cart")}
          >
            <IoBagOutline size={21} />
            <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-accent-foreground">
              0
            </span>
          </button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="ml-1 rounded-full p-2 text-xl text-foreground transition-transform active:scale-90 md:hidden"
          >
            {isOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </nav>

      {isOpen && (
        <div className="border-t border-border bg-background md:hidden">
          <div className="flex flex-col px-4 py-4">
            {navLinks.map((link) => {
              return (
                <Link
                  className="rounded-md px-2 py-3 text-sm font-medium transition hover:bg-surface hover:text-foreground"
                  href={link.href}
                  key={link.href}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              );
            })}
            <button
              className="mt-4 rounded-lg bg-primary py-3 text-sm font-medium text-primary-foreground transition-all duration-200 hover:bg-primary-hover hover:scale-[1.02] active:scale-[0.98]"
              onClick={() => router.push("/sign-in")}
            >
              Sign In
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
