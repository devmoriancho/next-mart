"use client";

import { useState } from "react";
import { RiArrowRightDoubleFill } from "react-icons/ri";

export default function FilterOptions() {
  const [showFilter, setShowFilter] = useState(false);

  return (
    <aside className="w-full sm:min-w-60 sm:max-w-60">
      <button
        onClick={() => setShowFilter((prev) => !prev)}
        className="mb-6 flex items-center gap-2 text-sm font-bold tracking-wider text-foreground sm:cursor-default"
      >
        FILTERS
        <RiArrowRightDoubleFill
          className={`transition-transform duration-300 sm:hidden ${showFilter ? "rotate-90" : ""}`}
          size={18}
        />
      </button>

      <div className={`space-y-5 sm:block ${showFilter ? "block" : "hidden"}`}>
        <div className="rounded-2xl border border-border bg-surface/30 p-5">
          <h3 className="mb-4 text-xs font-bold tracking-wider text-foreground">
            COLLECTIONS
          </h3>
          <div className="space-y-3 text-sm text-muted-foreground font-medium">
            <label className="flex items-center gap-3 cursor-pointer select-none hover:text-foreground transition-colors">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-border text-accent accent-accent focus:ring-accent"
              />
              <span>Minimalist</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer select-none hover:text-foreground transition-colors">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-border text-accent accent-accent focus:ring-accent"
              />
              <span>Streetwear</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer select-none hover:text-foreground transition-colors">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-border text-accent accent-accent focus:ring-accent"
              />
              <span>Premium Line</span>
            </label>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-surface/30 p-5">
          <h3 className="mb-4 text-xs font-bold tracking-wider text-foreground">
            PRODUCT SEGMENTS
          </h3>
          <div className="space-y-3 text-sm text-muted-foreground font-medium">
            <label className="flex items-center gap-3 cursor-pointer select-none hover:text-foreground transition-colors">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-border text-accent accent-accent focus:ring-accent"
              />
              <span>Apparel</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer select-none hover:text-foreground transition-colors">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-border text-accent accent-accent focus:ring-accent"
              />
              <span>Accessories</span>
            </label>
          </div>
        </div>
      </div>
    </aside>
  );
}
