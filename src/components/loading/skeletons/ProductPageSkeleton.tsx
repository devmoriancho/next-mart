export default function ProductPageSkeleton() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 animate-pulse">
      <div className="h-4 w-48 rounded-lg bg-surface" />

      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 mt-6">
        <div className="flex flex-col-reverse gap-4 md:flex-row">
          <div className="flex gap-3 overflow-x-auto md:flex-col">
            {[...Array(4)].map((_, idx) => (
              <div
                key={idx}
                className="h-24 w-20 shrink-0 rounded-xl bg-surface md:h-28 md:w-24"
              />
            ))}
          </div>

          <div className="aspect-4/5 w-full rounded-2xl bg-surface" />
        </div>

        <div className="space-y-6">
          <div className="h-6 w-24 rounded-full bg-surface" />

          <div className="space-y-3">
            <div className="h-10 w-3/4 rounded-xl bg-surface" />
            <div className="h-8 w-1/4 rounded-xl bg-surface" />
          </div>

          <div className="space-y-2 pt-4">
            <div className="h-4 w-full rounded-lg bg-surface" />
            <div className="h-4 w-full rounded-lg bg-surface" />
            <div className="h-4 w-5/6 rounded-lg bg-surface" />
          </div>

          <div className="border-t border-border pt-6 space-y-3">
            <div className="h-4 w-20 rounded-md bg-surface" />
            <div className="flex gap-3">
              {[...Array(5)].map((_, idx) => (
                <div key={idx} className="h-11 w-11 rounded-lg bg-surface" />
              ))}
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <div className="h-4 w-20 rounded-md bg-surface" />
            <div className="flex gap-3">
              {[...Array(3)].map((_, idx) => (
                <div key={idx} className="h-11 w-11 rounded-full bg-surface" />
              ))}
            </div>
          </div>

          <div className="pt-6">
            <div className="h-12 w-full rounded-xl bg-surface sm:w-48" />
          </div>
        </div>
      </div>
    </section>
  );
}
