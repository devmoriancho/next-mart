import Link from "next/link";
import { FiChevronRight } from "react-icons/fi";

interface BreadCrumbItem {
  label: string;
  href?: string;
}

interface BreadCrumbProps {
  items: BreadCrumbItem[];
}

export default function BreadCrumb({ items }: BreadCrumbProps) {
  return (
    <nav className="mb-6 flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wider">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <div className="flex items-center gap-2" key={item.label}>
            {item.href && !isLast ? (
              <Link
                href={item.href}
                className="text-muted-foreground transition-colors duration-200 hover:text-accent"
              >
                {item.label}
              </Link>
            ) : (
              <span
                className={
                  isLast ? "text-foreground font-bold" : "text-muted-foreground"
                }
              >
                {item.label}
              </span>
            )}

            {!isLast && (
              <FiChevronRight size={12} className="text-muted-foreground/70" />
            )}
          </div>
        );
      })}
    </nav>
  );
}
