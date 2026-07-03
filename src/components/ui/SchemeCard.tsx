import React from "react";
import { Link } from "@tanstack/react-router";
import { Scheme } from "@/data/schemes";
import { buildSchemeLinkSearch, type TabId } from "@/lib/engineState";

// 1. Add 'isTargeted' to the interface
interface SchemeCardProps {
  scheme: Scheme;
  isTargeted?: boolean;
  // Where this card is being rendered from, so the scheme detail page's
  // Back button knows which tab to return to. Defaults to the full catalog.
  from?: TabId;
}

const SchemeCard: React.FC<SchemeCardProps> = ({ scheme, isTargeted, from = "schemes" }) => {
  return (
    // 2. Use the prop to toggle styles
    <div
      className={`p-6 rounded-2xl border transition-all ${
        isTargeted
          ? "border-[#1E3A8A] ring-2 ring-[#1E3A8A]/20 bg-[#F8FAFF]"
          : "bg-white border-[#E2E8F0] shadow-sm hover:shadow-md"
      }`}
    >
      <h3 className="text-lg font-bold text-[#0B2240] mb-3">{scheme.name}</h3>
      <p className="text-[#64748B] text-sm mb-4 line-clamp-2">{scheme.description}</p>

      <div className="benefits mb-6">
        <strong className="text-xs uppercase tracking-wider text-[#94A3B8]">Benefits:</strong>
        <ul className="mt-2 text-sm text-[#334155] space-y-1">
          {scheme.benefits.slice(0, 2).map((benefit: string, index: number) => (
            <li key={index} className="flex items-center">
              <span className="mr-2">•</span> {benefit}
            </li>
          ))}
        </ul>
      </div>

      <Link
        to="/scheme/$id"
        params={{ id: scheme.id }}
        search={buildSchemeLinkSearch(from)}
        className="block w-full text-center px-4 py-2 bg-[#0B2240] text-white rounded-lg hover:bg-[#1E3A8A] transition-colors"
      >
        View Details
      </Link>
    </div>
  );
};

export default SchemeCard;