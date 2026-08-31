import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-background border-t border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 py-10 text-sm text-muted-foreground md:flex-row">
          <p className="tracking-wide">
            &copy; {new Date().getFullYear()} NexusMart. All rights reserved.
          </p>

          <div className="flex gap-8 font-medium tracking-wide">
            <Link
              href="/terms"
              className="transition-colors duration-200 hover:text-foreground"
            >
              Terms of Service
            </Link>
            <Link
              href="/privacy-policy"
              className="transition-colors duration-200 hover:text-foreground"
            >
              Privacy Policy
            </Link>
            <Link
              href="/cookies"
              className="transition-colors duration-200 hover:text-foreground"
            >
              Cookie Preference
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
