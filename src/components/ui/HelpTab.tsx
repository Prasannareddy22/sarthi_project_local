import { useState } from "react";
import { HelpCircle, Phone, Mail, MessageCircle, ChevronDown, Search, MapPin } from "lucide-react";

const faqs = [
  {
    q: "How does the eligibility engine decide which schemes I qualify for?",
    a: "SARTHI matches the details in your profile (age, income, category, residence, and more) against the published eligibility rules for each Telangana welfare scheme, and shows you a percentage match along with anything you're missing.",
  },
  {
    q: "I qualify for a scheme — how do I actually apply?",
    a: 'Open the scheme from your matches and select "Apply now" or "View details". This takes you to the scheme page with the required documents and a link to the official application portal or Mee Seva instructions.',
  },
  {
    q: "Why does a scheme show as only partially eligible?",
    a: "A partial match means you meet some but not all criteria. The scheme card lists what's missing — updating your profile with that information may move you to full eligibility.",
  },
  {
    q: "Is my data shared with anyone outside the portal?",
    a: "Your profile is used only to evaluate scheme eligibility. Review the terms on the official Government of Telangana scheme portals for how your data is handled once you apply.",
  },
  {
    q: "I don't have Mee Seva access. Can I still apply?",
    a: "Most schemes offer an offline route through your local Mee Seva center, Tahsildar, or MRO office. Each scheme's detail page lists offline instructions alongside the online option.",
  },
];

const contactOptions = [
  {
    icon: Phone,
    label: "Helpline",
    value: "1100",
    detail: "Toll-free, Mon–Sat, 8 AM – 8 PM",
    tone: { bg: "bg-[#10B981]/10", text: "text-[#10B981]" },
  },
  {
    icon: Mail,
    label: "Email support",
    value: "support@sarthi.telangana.gov.in",
    detail: "Response within 2 business days",
    tone: { bg: "bg-[#1E3A8A]/10", text: "text-[#1E3A8A]" },
  },
  {
    icon: MapPin,
    label: "Visit in person",
    value: "Nearest Mee Seva Center",
    detail: "Find a center for document verification",
    tone: { bg: "bg-[#F59E0B]/15", text: "text-[#B45309]" },
  },
];

export default function HelpTab() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [query, setQuery] = useState("");

  const filteredFaqs = faqs.filter(
    (f) =>
      f.q.toLowerCase().includes(query.toLowerCase()) ||
      f.a.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div>
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 rounded-2xl bg-[#1E3A8A]/10 grid place-items-center text-[#1E3A8A]">
          <HelpCircle className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-[#0B2240]">Help &amp; support</h2>
          <p className="text-[13px] text-[#64748B] mt-0.5">
            Answers to common questions, or reach a real person.
          </p>
        </div>
      </div>

      {/* Contact options */}
      <div className="mt-6 grid sm:grid-cols-3 gap-3">
        {contactOptions.map((c) => (
          <div
            key={c.label}
            className="rounded-2xl border border-[#E2E8F0] bg-white p-4 hover:shadow-md hover:-translate-y-0.5 transition-all"
          >
            <div
              className={`w-9 h-9 rounded-xl grid place-items-center ${c.tone.bg} ${c.tone.text}`}
            >
              <c.icon className="w-4 h-4" />
            </div>
            <div className="mt-3 text-[11px] font-semibold uppercase tracking-wider text-[#94A3B8]">
              {c.label}
            </div>
            <div className="text-[13.5px] font-bold text-[#0B2240] mt-0.5 break-words">
              {c.value}
            </div>
            <div className="text-[11.5px] text-[#64748B] mt-1">{c.detail}</div>
          </div>
        ))}
      </div>

      {/* FAQ search */}
      <div className="mt-8">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <h3 className="text-[15px] font-bold text-[#0B2240]">Frequently asked questions</h3>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#94A3B8]" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search help topics…"
              className="w-56 pl-8 pr-3 py-2 text-[12.5px] rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] focus:outline-none focus:border-[#1E3A8A] focus:ring-4 focus:ring-[#1E3A8A]/10 transition"
            />
          </div>
        </div>

        <div className="mt-4 space-y-2">
          {filteredFaqs.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-[#E2E8F0] p-8 text-center text-[13px] text-[#64748B]">
              No help topics match "{query}".
            </div>
          ) : (
            filteredFaqs.map((f, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div key={f.q} className="rounded-2xl border border-[#E2E8F0] overflow-hidden">
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between gap-3 px-4 py-3.5 text-left hover:bg-[#F8FAFC] transition-colors"
                  >
                    <span className="text-[13.5px] font-semibold text-[#0F172A]">{f.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#64748B] shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 text-[12.5px] text-[#64748B] leading-relaxed">
                      {f.a}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Live chat CTA */}
      <div className="mt-8 rounded-3xl bg-gradient-to-br from-[#0B2240] to-[#1E3A8A] p-6 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/10 grid place-items-center">
            <MessageCircle className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[14px] font-bold">Still stuck?</div>
            <div className="text-[12.5px] text-white/70">
              Chat with a SARTHI assistant for guided help.
            </div>
          </div>
        </div>
        <button className="px-4 py-2 rounded-xl bg-white text-[#0B2240] text-[13px] font-semibold hover:bg-white/90 transition-colors whitespace-nowrap">
          Start chat
        </button>
      </div>
    </div>
  );
}