import { FiGlobe, FiShield, FiHeadphones } from "react-icons/fi";

interface Feature {
  icon: React.ComponentType<{ className?: string; size?: number }>;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: FiGlobe,
    title: "Global Logistics",
    description:
      "Expedited premium shipping network spanning over 150 regions worldwide.",
  },
  {
    icon: FiShield,
    title: "Secure Infrastructure",
    description:
      "Bank-grade encrypted tokenization powered by certified payment gateways.",
  },
  {
    icon: FiHeadphones,
    title: "Concierge Assistance",
    description:
      "Dedicated expert support specialists available around the clock.",
  },
];

export default function ShopWithUs() {
  return (
    <section className="bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl border-t border-border pt-12">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="rounded-2xl border border-border bg-surface/40 p-8 text-center transition-all duration-300 ease-out hover:-translate-y-1 hover:border-accent/30 hover:bg-surface"
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent/10">
                  <Icon className="text-accent" size={24} />
                </div>

                <h3 className="mt-6 text-lg font-bold tracking-tight text-foreground">
                  {feature.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
