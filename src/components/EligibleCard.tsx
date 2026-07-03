// EligibleCard.tsx
import { Link } from "@tanstack/react-router";
import { Award, CheckCircle2, ArrowRight } from "lucide-react";
import { resolveSchemeIdentity, type MatchedSchemeRaw } from "@/lib/schemeMatch";
import { buildSchemeLinkSearch, type TabId, type EngineFormData } from "@/lib/engineState";
import type { Scheme } from "@/components/ui/SchemesTab";

export interface EligibleCardProps {
  // Accepts either a canonical catalog scheme ({id, name, ...}) or a raw
  // eligibility-engine match ({ scheme, benefits, missing, percentage }).
  scheme: MatchedSchemeRaw;
  // Where this card is rendered from, so the scheme detail page's Back
  // button knows which tab (and, for the engine, which inputs/results) to
  // return to. Defaults to the catalog since that's EligibleCard's other
  // caller; the Eligibility Engine passes from="engine" explicitly.
  from?: TabId;
  input?: Partial<EngineFormData>;
  results?: Scheme[];
}

export default function EligibleCard({
  scheme,
  from = "schemes",
  input,
  results,
}: EligibleCardProps) {
  const { id, name } = resolveSchemeIdentity(scheme);

  if (!id) {
    console.log("DEBUG: ID resolution failed. Inspecting scheme object:", scheme);
  }

  return (
    <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-white to-[#F8FAFC] border border-[#E2E8F0] p-5 hover:shadow-xl hover:-translate-y-1 transition-all group">
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#10B981]/10 blur-3xl rounded-full" />
      <div className="relative flex items-start justify-between">
        <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#10B981] to-[#059669] grid place-items-center text-white shadow-lg shadow-[#10B981]/30">
          <Award className="w-5 h-5" />
        </div>
        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#10B981] bg-[#10B981]/10 px-2 py-1 rounded-full">
          <CheckCircle2 className="w-3 h-3" /> 100% Match
        </span>
      </div>

      <div className="relative mt-5 text-[15px] font-bold text-[#0B2240] leading-snug min-h-[44px]">
        {name}
      </div>

      <div className="relative mt-1 text-[11px] text-[#64748B] uppercase tracking-wider font-semibold">
        Government of Telangana
      </div>

      {id ? (
        <Link
          to="/scheme/$id"
          params={{ id }}
          search={buildSchemeLinkSearch(from, { input, results })}
          className="relative mt-5 w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#0B2240] text-white text-[13px] font-semibold hover:bg-[#1E3A8A] transition-colors"
        >
          Apply now{" "}
          <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      ) : (
        <button
          disabled
          className="relative mt-5 w-full py-2.5 rounded-xl bg-gray-300 text-gray-500 text-[13px] font-semibold cursor-not-allowed"
          title="We couldn't match this scheme to a details page"
        >
          Details unavailable
        </button>
      )}
    </div>
  );
}