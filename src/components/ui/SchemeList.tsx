import React, { useMemo, useState } from "react";
import { Search, LayoutGrid, X } from "lucide-react";
import { getAllSchemes } from "../../services/schemeService";
import SchemeCard from "./SchemeCard";
import type { Scheme } from "@/data/schemes";

/**
 * Preferred display order for categories. Any category not listed here
 * falls to the end, alphabetically.
 */
const CATEGORY_ORDER = [
  "Women & Child Welfare",
  "Education",
  "Housing",
  "Social Welfare",
  "Nutrition",
  "Agriculture",
  "Insurance",
  "Utilities",
];

const sortCategories = (a: string, b: string) => {
  const ai = CATEGORY_ORDER.indexOf(a);
  const bi = CATEGORY_ORDER.indexOf(b);
  if (ai === -1 && bi === -1) return a.localeCompare(b);
  if (ai === -1) return 1;
  if (bi === -1) return -1;
  return ai - bi;
};

const SchemeList: React.FC = () => {
  const [schemes] = useState<Scheme[]>(getAllSchemes());
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All");

  // All available categories (for filter chips)
  const categories = useMemo(() => {
    const set = new Set(schemes.map((s) => s.category));
    return ["All", ...Array.from(set).sort(sortCategories)];
  }, [schemes]);

  // Filtered + grouped
  const grouped = useMemo(() => {
    const q = search.trim().toLowerCase();
    const filtered = schemes.filter((s) => {
      const matchesSearch =
        !q ||
        s.name.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q) ||
        s.category.toLowerCase().includes(q);
      const matchesCat =
        activeCategory === "All" || s.category === activeCategory;
      return matchesSearch && matchesCat;
    });

    const byCat = new Map<string, Scheme[]>();
    for (const s of filtered) {
      if (!byCat.has(s.category)) byCat.set(s.category, []);
      byCat.get(s.category)!.push(s);
    }

    return Array.from(byCat.entries()).sort(([a], [b]) =>
      sortCategories(a, b)
    );
  }, [schemes, search, activeCategory]);

  const totalCount = grouped.reduce((n, [, arr]) => n + arr.length, 0);

  return (
    <section data-testid="scheme-list-section" className="w-full">
      {/* Header */}
      <header className="mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#1E3A8A] bg-[#1E3A8A]/10 px-3 py-1 rounded-full mb-3">
              <LayoutGrid className="w-3.5 h-3.5" />
              Welfare Catalog
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0B2240]">
              Available Welfare Schemes
            </h2>
            <p className="mt-1.5 text-sm text-slate-500 max-w-2xl">
              Explore schemes across categories. Filter by name or pick a
              category to narrow down what you need.
            </p>
          </div>
          <div className="text-xs text-slate-500">
            <span className="font-semibold text-[#0B2240]">{totalCount}</span>{" "}
            {totalCount === 1 ? "scheme" : "schemes"} shown
          </div>
        </div>
      </header>

      {/* Toolbar: search + category chips */}
      <div
        data-testid="scheme-toolbar"
        className="mb-8 rounded-2xl border border-slate-200 bg-white/80 backdrop-blur-sm shadow-[0_1px_2px_rgba(15,23,42,0.04)] p-3 sm:p-4"
      >
        <div className="flex flex-col lg:flex-row lg:items-center gap-3 lg:gap-4">
          {/* Search */}
          <div className="relative flex-1 min-w-0">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <input
              data-testid="scheme-search-input"
              type="text"
              placeholder="Search schemes by name, description or category…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-9 py-2.5 text-sm rounded-xl border border-slate-200 bg-white text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]/25 focus:border-[#1E3A8A]/60 transition"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                data-testid="scheme-search-clear"
                aria-label="Clear search"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Category chips (horizontally scrollable on mobile) */}
          <div
            data-testid="scheme-category-chips"
            className="flex gap-2 overflow-x-auto lg:overflow-visible lg:flex-wrap -mx-1 px-1 lg:mx-0 lg:px-0 lg:justify-end scrollbar-thin"
          >
            {categories.map((cat) => {
              const active = cat === activeCategory;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  data-testid={`scheme-chip-${cat.toLowerCase().replace(/\s+/g, "-")}`}
                  className={[
                    "shrink-0 whitespace-nowrap px-3.5 py-1.5 rounded-full text-[12px] font-semibold border transition-all",
                    active
                      ? "bg-[#0B2240] text-white border-[#0B2240] shadow-sm"
                      : "bg-white text-slate-600 border-slate-200 hover:border-[#0B2240]/40 hover:text-[#0B2240]",
                  ].join(" ")}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Category sections */}
      {totalCount === 0 ? (
        <div
          data-testid="scheme-empty-state"
          className="rounded-2xl border border-dashed border-slate-200 bg-slate-50/50 py-16 text-center"
        >
          <div className="mx-auto w-12 h-12 rounded-full bg-white border border-slate-200 grid place-items-center mb-3">
            <Search className="w-5 h-5 text-slate-400" />
          </div>
          <p className="text-sm font-semibold text-[#0B2240]">
            No schemes match your filters
          </p>
          <p className="text-xs text-slate-500 mt-1">
            Try clearing the search or selecting a different category.
          </p>
        </div>
      ) : (
        <div className="space-y-10 sm:space-y-12">
          {grouped.map(([category, list]) => (
            <div
              key={category}
              data-testid={`scheme-category-${category.toLowerCase().replace(/\s+/g, "-")}`}
            >
              {/* Sticky category header */}
              <div className="sticky top-0 z-10 -mx-2 sm:-mx-3 px-2 sm:px-3 py-3 mb-4 bg-white/85 backdrop-blur-md border-b border-slate-100">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="inline-block h-6 w-1 rounded-full bg-gradient-to-b from-[#0B2240] to-[#1E3A8A]" />
                    <h3 className="text-base sm:text-lg font-bold tracking-tight text-[#0B2240]">
                      {category}
                    </h3>
                    <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                      {list.length}
                    </span>
                  </div>
                </div>
              </div>

              {/* Fluid responsive grid */}
              <div
                className={[
                  "grid gap-4 sm:gap-5",
                  "grid-cols-1",
                  "sm:grid-cols-2",
                  "lg:grid-cols-3",
                  "2xl:grid-cols-4",
                ].join(" ")}
              >
                {list.map((scheme) => (
                  <SchemeCard key={scheme.id} scheme={scheme} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default SchemeList;