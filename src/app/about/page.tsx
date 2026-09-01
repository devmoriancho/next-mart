import FrontEndLayout from "@/components/layout/FrontEndLayout";
import Image from "next/image";

export default function AboutPage() {
  return (
    <FrontEndLayout>
      <section className="bg-background px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
          <div className="max-w-xl text-center lg:text-left">
            <span className="inline-flex items-center rounded-full bg-surface px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-accent border border-border">
              Our Blueprint
            </span>

            <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:leading-[1.1]">
              Sartorial Precision Meets Scalable Digital Infrastructure
            </h1>

            <p className="mt-6 text-base leading-8 text-muted-foreground">
              NexusMart operates at the convergence of architectural garment
              construction and modern software engineering. We reject the
              compromises of mass production, focusing instead on limited
              curated sub-collections manufactured with complete resource
              integrity.
            </p>

            <p className="mt-4 text-base leading-8 text-muted-foreground">
              By combining high-trust relational database synchronization with
              premier logistics pipelines, we ensure that every individual order
              undergoes strict data verification before premium delivery
              dispatch.
            </p>

            <div className="mt-10 grid grid-cols-2 gap-6 border-t border-border pt-8">
              <div>
                <h2 className="text-3xl font-extrabold tracking-tight text-primary">
                  150+
                </h2>
                <p className="mt-2 text-sm font-medium text-muted-foreground uppercase tracking-wider">
                  Regions Serviced
                </p>
              </div>

              <div>
                <h2 className="text-3xl font-extrabold tracking-tight text-primary">
                  99.9%
                </h2>
                <p className="mt-2 text-sm font-medium text-muted-foreground uppercase tracking-wider">
                  Uptime Verification
                </p>
              </div>
            </div>
          </div>

          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl border border-border bg-surface shadow-xl">
            <Image
              src="/images/about-artisan-tailor-studio.jpg"
              alt="Artisan tailoring craftsmanship workspace"
              fill
              priority
              sizes="(max-w-7xl) 50vw, 100vw"
              className="object-cover transition-transform duration-500 hover:scale-102"
            />
          </div>
        </div>
      </section>
    </FrontEndLayout>
  );
}
