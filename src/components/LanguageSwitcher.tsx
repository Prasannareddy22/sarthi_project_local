// components/LanguageSwitcher.tsx
//
// Language toggle used in the header/navigation. Renders an accessible inline
// button group (no portal, SSR-safe) in two visual variants so it can live in
// the dark government strip on the portal and on the light auth pages while
// preserving the existing design.
import { Globe } from "lucide-react";

import { LANGUAGE_META, SUPPORTED_LANGUAGES, type Language } from "@/i18n/config";
import { useTranslation } from "@/i18n/useTranslation";

type Variant = "bar" | "pill";

const separatorClass: Record<Variant, string> = {
  bar: "text-white/30",
  pill: "text-slate-300",
};

function buttonClass(variant: Variant, active: boolean): string {
  if (variant === "bar") {
    return active
      ? "px-2 py-0.5 text-white font-semibold"
      : "px-2 py-0.5 text-white/70 hover:text-white";
  }
  return active
    ? "px-2 py-0.5 rounded-md text-[#0B2240] font-semibold bg-[#F1F5F9]"
    : "px-2 py-0.5 rounded-md text-[#64748B] hover:text-[#0B2240]";
}

export default function LanguageSwitcher({ variant = "bar" }: { variant?: Variant }) {
  const { language, setLanguage, t } = useTranslation();

  return (
    <div
      className={`flex items-center gap-1 ${variant === "bar" ? "text-white/80" : "text-[#64748B]"}`}
      role="group"
      aria-label={t("language.select")}
    >
      <Globe className="w-3 h-3" />
      {SUPPORTED_LANGUAGES.map((code: Language, index) => (
        <span key={code} className="flex items-center gap-1">
          {index > 0 && <span className={separatorClass[variant]}>·</span>}
          <button
            type="button"
            onClick={() => setLanguage(code)}
            aria-pressed={language === code}
            title={LANGUAGE_META[code].name}
            className={buttonClass(variant, language === code)}
          >
            {LANGUAGE_META[code].label}
          </button>
        </span>
      ))}
    </div>
  );
}
