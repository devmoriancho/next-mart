import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

export default function SortOptions() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sort = searchParams.get("sort") ?? "newest";

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("sort", value);

    router.replace(`/shop?${params.toString()}`);
  };

  return (
    <div className="flex justify-between items-center mb-6 border-b border-border pb-4">
      <h1 className="text-xl font-extrabold tracking-tight text-foreground sm:text-2xl">
        All Collections
      </h1>

      <div className="relative">
        <select
          value={sort}
          onChange={(e) => handleSortChange(e.target.value)}
          className="appearance-none rounded-xl border border-border bg-surface/30 px-4 py-2.5 pr-10 text-sm font-semibold text-foreground focus:border-accent focus:outline-none cursor-pointer"
        >
          <option value="low-high">Sort By: Price (Low to High)</option>
          <option value="high-low">Sort By: Price ( High to Low)</option>
          <option value="newest">Sort By: Newest</option>
          <option value="oldest">Sort By: Oldest</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-muted-foreground">
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
