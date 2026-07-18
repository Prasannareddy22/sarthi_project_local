import React from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowUpRight,
  CheckCircle2,
  HeartHandshake,
  GraduationCap,
  Home,
  Zap,
  Users,
  Apple,
  ShieldCheck,
  Tractor,
  Sparkles,
} from "lucide-react";
import type { Scheme } from "@/data/schemes";
import { useTranslation } from "@/i18n/useTranslation";
import { translateCategory } from "@/i18n/categories";

interface SchemeCardProps {
  scheme: Scheme;
  isTargeted?: boolean;
}

/**
 * Per-category visual identity (icon + accent tint).
 * Unified navy/emerald base with a soft category-tinted icon chip
 * so cards feel cohesive but scannable.
 */
const categoryStyle: Record<
  string,
  {
    Icon: React.ComponentType<{ className?: string }>;
    iconBg: string;
    iconFg: string;
    ring: string;
  }
> = {
  "Women & Child Welfare": {
    Icon: HeartHandshake,
    iconBg: "bg-rose-50",
    iconFg: "text-rose-600",
    ring: "group-hover:ring-rose-200",
  },
  Education: {
    Icon: GraduationCap,
    iconBg: "bg-indigo-50",
    iconFg: "text-indigo-600",
    ring: "group-hover:ring-indigo-200",
  },
  Housing: {
    Icon: Home,
    iconBg: "bg-amber-50",
    iconFg: "text-amber-600",
    ring: "group-hover:ring-amber-200",
  },
  Utilities: {
    Icon: Zap,
    iconBg: "bg-yellow-50",
    iconFg: "text-yellow-600",
    ring: "group-hover:ring-yellow-200",
  },
  "Social Welfare": {
    Icon: Users,
    iconBg: "bg-sky-50",
    iconFg: "text-sky-600",
    ring: "group-hover:ring-sky-200",
  },
  Nutrition: {
    Icon: Apple,
    iconBg: "bg-lime-50",
    iconFg: "text-lime-700",
    ring: "group-hover:ring-lime-200",
  },
  Insurance: {
    Icon: ShieldCheck,
    iconBg: "bg-emerald-50",
    iconFg: "text-emerald-600",
    ring: "group-hover:ring-emerald-200",
  },
  Agriculture: {
    Icon: Tractor,
    iconBg: "bg-green-50",
    iconFg: "text-green-700",
    ring: "group-hover:ring-green-200",
  },
};

const fallbackStyle = {
  Icon: Sparkles,
  iconBg: "bg-slate-100",
  iconFg: "text-slate-600",
  ring: "group-hover:ring-slate-200",
};

const SchemeCard: React.FC<SchemeCardProps> = ({ scheme, isTargeted }) => {
  const { t } = useTranslation();
  const style = categoryStyle[scheme.category] ?? fallbackStyle;
  const { Icon } = style;

  return (
    <article
      data-testid={`scheme-card-${scheme.id}`}
      className={[
        "group relative flex flex-col h-full",
        "bg-white rounded-2xl border overflow-hidden",
        "transition-all duration-300 ease-out",
        "ring-1 ring-transparent",
        isTargeted
          ? "border-[#1E3A8A] shadow-[0_10px_30px_-12px_rgba(30,58,138,0.35)] bg-[#F8FAFF]"
          : "border-slate-200 shadow-[0_1px_2px_rgba(15,23,42,0.04)] hover:shadow-[0_12px_28px_-14px_rgba(15,23,42,0.25)] hover:-translate-y-0.5 hover:border-slate-300",
        style.ring,
      ].join(" ")}
    >
      {/* Header: icon + category tag */}
      <div className="flex items-start justify-between p-5 pb-3">
        <div
          className={`w-11 h-11 rounded-xl ${style.iconBg} ${style.iconFg} grid place-items-center transition-transform duration-300 group-hover:scale-105`}
        >
          <Icon className="w-5 h-5" />
        </div>
        <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-500 bg-slate-50 border border-slate-100 px-2.5 py-1 rounded-full">
          {translateCategory(t, scheme.category)}
        </span>
      </div>

      {/* Title & description */}
      <div className="px-5 pb-4 flex-1 flex flex-col">
        <h3
          className="text-[17px] sm:text-[18px] font-bold text-[#0B2240] leading-snug mb-2 line-clamp-2"
          title={scheme.name}
        >
          {scheme.name}
        </h3>
        <p className="text-[13px] leading-relaxed text-slate-500 mb-4 line-clamp-3">
          {scheme.description.replace(/\[cite:[^\]]*\]/g, "").trim()}
        </p>

        {/* Benefits */}
        <div className="mt-auto">
          <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400 mb-2">
            {t("schemeList.keyBenefits")}
          </div>
          <ul className="space-y-1.5">
            {scheme.benefits.slice(0, 2).map((benefit, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-[13px] text-slate-700 leading-snug"
              >
                <CheckCircle2 className="w-4 h-4 mt-[2px] shrink-0 text-emerald-500" />
                <span className="line-clamp-2">
                  {benefit.replace(/\[cite:[^\]]*\]/g, "").trim()}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Divider + CTA */}
      <div className="mt-2 border-t border-slate-100 bg-slate-50/60 p-4">
        <Link
          to="/scheme/$id"
          params={{ id: scheme.id }}
          data-testid={`scheme-card-view-${scheme.id}`}
          className="w-full inline-flex items-center justify-between gap-2 px-4 py-2.5 rounded-xl bg-[#0B2240] text-white text-[13px] font-semibold hover:bg-[#1E3A8A] active:scale-[0.99] transition-all"
        >
          <span>{t("schemeList.viewDetails")}</span>
          <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>
    </article>
  );
};

export default SchemeCard;
