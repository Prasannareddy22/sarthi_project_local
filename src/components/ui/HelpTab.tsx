import { useState } from "react";
import { HelpCircle, Phone, Mail, MessageCircle, ChevronDown, Search, MapPin } from "lucide-react";
import { useTranslation } from "@/i18n/useTranslation";

export default function HelpTab() {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [query, setQuery] = useState("");

  const faqs = [
    { q: t("help.faqs.q1"), a: t("help.faqs.a1") },
    { q: t("help.faqs.q2"), a: t("help.faqs.a2") },
    { q: t("help.faqs.q3"), a: t("help.faqs.a3") },
    { q: t("help.faqs.q4"), a: t("help.faqs.a4") },
    { q: t("help.faqs.q5"), a: t("help.faqs.a5") },
  ];

  const contactOptions = [
    {
      icon: Phone,
      label: t("help.helpline"),
      value: "1100",
      detail: t("help.helplineDetail"),
      tone: { bg: "bg-[#10B981]/10", text: "text-[#10B981]" },
    },
    {
      icon: Mail,
      label: t("help.emailSupport"),
      value: "support@sarthi.telangana.gov.in",
      detail: t("help.emailDetail"),
      tone: { bg: "bg-[#1E3A8A]/10", text: "text-[#1E3A8A]" },
    },
    {
      icon: MapPin,
      label: t("help.visitInPerson"),
      value: t("help.visitValue"),
      detail: t("help.visitDetail"),
      tone: { bg: "bg-[#F59E0B]/15", text: "text-[#B45309]" },
    },
  ];

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
          <h2 className="text-xl font-bold text-[#0B2240]">{t("help.title")}</h2>
          <p className="text-[13px] text-[#64748B] mt-0.5">{t("help.subtitle")}</p>
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
          <h3 className="text-[15px] font-bold text-[#0B2240]">{t("help.faqTitle")}</h3>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#94A3B8]" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t("help.faqSearchPlaceholder")}
              className="w-56 pl-8 pr-3 py-2 text-[12.5px] rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] focus:outline-none focus:border-[#1E3A8A] focus:ring-4 focus:ring-[#1E3A8A]/10 transition"
            />
          </div>
        </div>

        <div className="mt-4 space-y-2">
          {filteredFaqs.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-[#E2E8F0] p-8 text-center text-[13px] text-[#64748B]">
              {t("help.noTopics", { query })}
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
            <div className="text-[14px] font-bold">{t("help.stillStuck")}</div>
            <div className="text-[12.5px] text-white/70">{t("help.stillStuckDesc")}</div>
          </div>
        </div>
        <button className="px-4 py-2 rounded-xl bg-white text-[#0B2240] text-[13px] font-semibold hover:bg-white/90 transition-colors whitespace-nowrap">
          {t("help.startChat")}
        </button>
      </div>
    </div>
  );
}
