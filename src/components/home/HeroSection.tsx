import Link from "next/link";
import Image from "next/image";
export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-background">
      <div className="mx-auto max-w-7xl flex flex-col-reverse items-center gap-12 px-4 py-12 sm:px-6 lg:grid lg:min-h-[calc(100vh-64px)] lg:grid-cols-2 lg:px-8 lg:py-0">
        <div className="max-w-xl text-center lg:text-left">
          <span className="inline-flex items-center rounded-full bg-surface px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground border border-border">
            🌱 Sustainable Essentials
          </span>

          <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl lg:leading-[1.1]">
            Elevate Your Style With{" "}
            <span className="bg-linear-to-r from-accent to-primary bg-clip-text text-transparent">
              Premium Fashion
            </span>
          </h1>

          <p className="mt-6 text-base leading-8 text-muted-foreground sm:text-lg">
            Discover minimalist apparel made responsibly from premium,
            eco-friendly materials. Our timeless wardrobe staples are engineered
            for ultimate comfort, durability, and a flawless fit that lasts.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
            <Link
              href="/shop"
              className="rounded-xl bg-primary px-8 py-4 text-center font-semibold text-primary-foreground shadow-lg shadow-primary/10 transition-all duration-200 hover:bg-primary-hover hover:scale-[1.02] active:scale-[0.98]"
            >
              Shop Now
            </Link>

            <Link
              href="/about"
              className="rounded-xl border border-border bg-background px-8 py-4 text-center font-semibold text-foreground transition-all duration-200 hover:bg-surface hover:scale-[1.02] active:scale-[0.98]"
            >
              Learn More
            </Link>
          </div>
        </div>

        <div className="relative w-full max-w-md lg:max-w-none flex items-center justify-center lg:justify-end">
          <div className="absolute -top-10 -right-10 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />
          <div className="relative aspect-4/5 w-full max-w-112.5 overflow-hidden rounded-2xl bg-surface border border-border shadow-2xl">
            <div className="flex h-full w-full items-center justify-center text-sm font-medium text-muted-foreground bg-linear-to-b from-surface to-border/30">
              <Image
                src="/images/hero-urban-studio-pose-01.jpg"
                alt="Premium urban apparel showcase"
                fill
                priority
                className="object-cover"
                sizes="(max-w-7xl) 50vw, 100vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
