// components/ui/SchemeList.tsx
//
// Renders the full welfare-scheme catalog ("All Schemes" tab), independent
// of eligibility. Deliberately uses SchemeCard (a neutral catalog card),
// not EligibleCard — EligibleCard is reserved for the Eligibility Engine's
// "you're a 100% match" results, and using it here previously made every
// scheme in the catalog look like a personalized match regardless of
// whether the user actually qualified.
import React, { useState } from "react";
import { getAllSchemes } from "../../services/schemeService";
import SchemeCard from "./SchemeCard";
import { Scheme } from "@/data/schemes";

const SchemeList: React.FC = () => {
  const [schemes] = useState<Scheme[]>(getAllSchemes());
  const [search, setSearch] = useState("");

  const filteredSchemes = schemes.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="scheme-list-container">
      <input
        placeholder="Filter schemes..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-6 p-2 border rounded w-full max-w-sm"
      />

      <div
        className="scheme-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "20px",
        }}
      >
        {filteredSchemes.length > 0 ? (
          filteredSchemes.map((scheme) => (
            <SchemeCard key={scheme.id} scheme={scheme} from="schemes" />
          ))
        ) : (
          <p className="col-span-full text-center py-10 text-[#64748B]">No schemes found.</p>
        )}
      </div>
    </div>
  );
};

export default SchemeList;