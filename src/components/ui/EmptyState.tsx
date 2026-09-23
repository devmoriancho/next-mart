import { FiPackage } from "react-icons/fi";

interface EmptyStateProps {
  title: string;
  subTitle: string;
}

export default function EmptyState({ title, subTitle }: EmptyStateProps) {
  return (
    <div className="flex min-h-80 flex-col items-center justify-center rounded-2xl border border-border bg-background px-6 py-16 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-surface">
        <FiPackage size={40} className="text-muted-foreground" />
      </div>

      <h3 className="mt-6 text-2xl font-semibold">{title}</h3>
      <p className="mt-3 max-w-md text-muted-foreground">{subTitle}</p>
    </div>
  );
}
