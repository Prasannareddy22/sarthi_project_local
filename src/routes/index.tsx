import { createFileRoute } from "@tanstack/react-router";
import React, { useState, useRef, useMemo, useEffect, useLayoutEffect } from "react";
import { Link } from "@tanstack/react-router";
import { Scheme } from "../components/ui/SchemesTab";
import ApplicationsTab from "../components/ui/ApplicationsTab";
import NotificationsTab from "../components/ui/NotificationsTab";
import HelpTab from "../components/ui/HelpTab";
import SchemeList from "../components/ui/SchemeList";
import EligibleCard from "../components/EligibleCard";
import { resolveSchemeIdentity } from "@/lib/schemeMatch";
import {
  type TabId,
  type EngineFormData,
  type IndexSearch,
  defaultFormData,
  parseIndexSearch,
  buildSchemeLinkSearch,
} from "@/lib/engineState";
import { useTranslation } from "@/i18n/useTranslation";
import { localizeSchemeNameById } from "@/i18n/schemes";
import LanguageSwitcher from "@/components/LanguageSwitcher";

import {
  Search,
  FileText,
  Bell,
  HelpCircle,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  GraduationCap,
  Briefcase,
  Menu,
  X,
  User,
  Wallet,
  Shield,
  Tractor,
  Award,
  TrendingUp,
  Users,
  IndianRupee,
  Layers,
  ChevronRight,
  AlertCircle,
  Loader2,
  Lock,
  MapPin,
  Phone,
  Mail,
  Building2,
  BadgeCheck,
} from "lucide-react";

export const Route = createFileRoute("/")({
  validateSearch: (search: Record<string, unknown>): IndexSearch => parseIndexSearch(search),
  component: SarthiPortal,
});

function SarthiPortal() {
  const { t } = useTranslation();
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const { tab } = search;
  const [activeTab, setActiveTab] = useState<TabId>(tab || "engine");

  useEffect(() => {
    if (tab) {
      setActiveTab(tab);
    }
  }, [tab]);

  const [loading, setLoading] = useState(false);
  // Hydrate from ?results=... on mount so a scheme-detail visit followed by
  // Back doesn't wipe the eligibility report.
  const [matchedSchemes, setMatchedSchemes] = useState<Scheme[] | null>(search.results ?? null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [activeSection, setActiveSection] = useState("personal");
  // Hydrate from ?input=... the same way, falling back to defaults for any
  // field missing from the URL (e.g. an older/partial link).
  const [formData, setFormData] = useState<EngineFormData>(() => ({
    ...defaultFormData,
    ...search.input,
  }));

  // Keeps the URL's tab in sync so switching tabs is itself bookmarkable/
  // back-button-able, without spamming browser history on every click.
  const goToTab = (nextTab: TabId) => {
    setActiveTab(nextTab);
    navigate({ search: (prev) => ({ ...prev, tab: nextTab }), replace: true });
  };

  const requiredFields = [
    { key: "name", label: t("form.fullName") },
    { key: "age", label: t("form.age") },
    { key: "gender", label: t("form.gender") },
    { key: "religion", label: t("form.religion") },
    { key: "caste", label: t("form.caste") },
    { key: "annual_income", label: t("form.annualIncomeShort") },
    { key: "is_rural", label: t("form.residenceType") },
  ];

  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLDivElement>(null);
  const religionRef = useRef<HTMLSelectElement>(null);
  const casteRef = useRef<HTMLSelectElement>(null);
  const incomeRef = useRef<HTMLInputElement>(null);

  // Section completion tracking
  const completion = useMemo(() => {
    const personal = [
      formData.name,
      formData.age,
      formData.gender,
      formData.religion,
      formData.caste,
    ].filter(Boolean).length;
    const socio =
      [formData.annual_income].filter(Boolean).length + (formData.is_rural !== undefined ? 1 : 0);
    const eduAgri = [formData.occupation, formData.education_level].filter(Boolean).length;
    const welfare = [
      formData.is_widow,
      formData.is_single_woman,
      formData.is_disabled,
      formData.is_pregnant,
    ].filter(Boolean).length;
    return {
      personal: Math.round((personal / 5) * 100),
      socio: Math.round((socio / 2) * 100),
      eduAgri: Math.round((eduAgri / 2) * 100),
      welfare: welfare > 0 ? 100 : 0,
      overall: Math.round(
        ((personal / 5) * 0.4 +
          (socio / 2) * 0.3 +
          (eduAgri / 2) * 0.2 +
          (welfare > 0 ? 1 : 0) * 0.1) *
          100,
      ),
    };
  }, [formData]);

  const handleEvaluate = async (e: React.FormEvent) => {
    e.preventDefault();

    const fieldRefs: Record<string, React.RefObject<HTMLElement>> = {
      name: nameRef as React.RefObject<HTMLElement>,
      age: ageRef as React.RefObject<HTMLElement>,
      gender: genderRef as React.RefObject<HTMLElement>,
      caste: casteRef as React.RefObject<HTMLElement>,
      religion: religionRef as React.RefObject<HTMLElement>,
      annual_income: incomeRef as React.RefObject<HTMLElement>,
    };

    const missingField = requiredFields.find((field) => {
      const value = formData[field.key as keyof typeof formData];
      return value === "" || value === null || value === undefined;
    });

    if (missingField) {
      setErrorMessage(t("submit.validationRequired", { field: missingField.label }));
      const ref = fieldRefs[missingField.key];
      if (ref?.current) {
        ref.current.scrollIntoView({ behavior: "smooth", block: "center" });
        (ref.current as HTMLElement).focus();
      }
      return;
    }

    setErrorMessage("");
    setLoading(true);
    setMatchedSchemes([]);

    const payload = {
      name: formData.name || "Citizen",
      age: parseInt(formData.age) || 0,
      gender: formData.gender || "Female",
      caste: formData.caste || "General",
      religion: formData.religion || "Hindu",
      annual_income: parseFloat(formData.annual_income) || 0,
      is_rural: formData.is_rural ?? true,
      is_income_tax_payer: formData.is_income_tax_payer ?? false,
      is_government_employee: formData.is_government_employee ?? false,
      is_head_of_family: formData.is_head_of_family ?? false,
      has_lpg_connection: formData.has_lpg_connection ?? false,
      is_permanent_resident: formData.is_permanent_resident ?? true,
      has_white_ration_card: formData.has_white_ration_card ?? false,
      age_months: parseInt(formData.age_months) || 0,
      is_pregnant: formData.is_pregnant ?? false,
      is_lactating: formData.is_lactating ?? false,
      owns_pucca_house: formData.owns_pucca_house ?? false,
      is_widow: formData.is_widow ?? false,
      is_single_woman: formData.is_single_woman ?? false,
      is_disabled: formData.is_disabled ?? false,
      occupation: formData.occupation || "Student",
      has_specific_medical_condition: formData.has_specific_medical_condition ?? false,
      electricity_consumption: parseFloat(formData.electricity_consumption) || 0,
      has_electricity_bill_dues: formData.has_electricity_bill_dues ?? false,
      is_pattadar: formData.is_pattadar ?? false,
      has_cultivable_land: parseFloat(formData.has_cultivable_land || "0") > 0,
      is_active_farmer: formData.is_active_farmer ?? false,
      education_level: formData.education_level || "",
      class_level: parseInt(formData.class_level) || 0,
      attendance_percent: parseFloat(formData.attendance_percent) || 0.0,
      graduation_percentage:
        parseFloat(formData.graduation_percentage || formData.graduation_marks_percent) || 0.0,
      is_graduate: formData.is_graduate ?? false,
      is_final_year_student: formData.is_final_year_student ?? false,
      has_confirmed_admission: formData.has_confirmed_admission ?? false,
      target_country: formData.target_country || "",
      gre_score: parseFloat(formData.gre_score) || 0,
      gmat_score: parseFloat(formData.gmat_score) || 0,
      ielts_score: parseFloat(formData.ielts_score) || 0.0,
      toefl_score: parseFloat(formData.toefl_score) || 0.0,
      normalized_gre_gmat: parseFloat(formData.normalized_gre_gmat) || 0.0,
      normalized_english_test: parseFloat(formData.normalized_english_test) || 0.0,
    };

    const API_BASE_URL = "https://sarthi-backend-drdp.onrender.com";
    console.log("Environment variable VITE_API_URL is:", import.meta.env.VITE_API_URL);
    console.log("Final API_BASE_URL used:", API_BASE_URL);
    try {
      const response = await fetch(`${API_BASE_URL}/api/match-schemes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      const results = data.details || [];
      setMatchedSchemes(results);
      // Snapshot this run's inputs + results into the URL (replacing, not
      // pushing, since this is a refinement of the same engine session) so
      // a visit to a scheme detail page and back restores this exact report.
      navigate({
        search: (prev) => ({ ...prev, tab: "engine", input: formData, results }),
        replace: true,
      });
      setTimeout(() => {
        document.getElementById("results")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    } catch (error) {
      console.error("Evaluation failed:", error);
      alert(t("submit.apiError"));
    } finally {
      setLoading(false);
    }
  };

  const eligibleCount = matchedSchemes?.filter((s) => s.percentage === 100).length ?? 0;
  const sections = [
    { id: "personal", label: t("sections.navPersonal"), icon: User, progress: completion.personal },
    { id: "socio", label: t("sections.navSocio"), icon: Wallet, progress: completion.socio },
    {
      id: "education",
      label: t("sections.navEducation"),
      icon: GraduationCap,
      progress: completion.eduAgri,
    },
    { id: "welfare", label: t("sections.navWelfare"), icon: Shield, progress: completion.welfare },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] antialiased selection:bg-[#1E3A8A]/15 selection:text-[#0B2240]">
      {/* GOVT STRIP */}
      <div className="bg-[#0B2240] text-white text-[11px]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-2 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="inline-flex items-center gap-1.5 font-medium tracking-wide">
              <span className="text-base leading-none">🇮🇳</span>
              <span className="hidden sm:inline">{t("govtStrip.government")}</span>
              <span className="sm:hidden">{t("govtStrip.governmentShort")}</span>
            </span>
            <span className="text-white/30">|</span>
            <span className="hidden md:inline text-white/70">{t("govtStrip.officialPortal")}</span>
          </div>
          <LanguageSwitcher variant="bar" />
        </div>
      </div>

      {/* NAVBAR */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-[#E2E8F0]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 h-16 flex items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-[#0B2240] to-[#1E3A8A] grid place-items-center text-white font-bold text-sm shadow-lg shadow-[#0B2240]/20">
              <span>SR</span>
              <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-[#F59E0B] border-2 border-white" />
            </div>
            <div className="leading-tight">
              <div className="text-[15px] font-bold tracking-tight text-[#0F172A]">SARTHI</div>
              <div className="text-[10px] uppercase tracking-[0.14em] text-[#64748B] font-medium">
                {t("nav.tagline")}
              </div>
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-1 text-[13px] font-medium text-[#475569]">
            {[
              { icon: Sparkles, label: t("nav.engine"), id: "engine" },
              { icon: Layers, label: t("nav.schemes"), id: "schemes" },
              { icon: FileText, label: t("nav.applications"), id: "applications" },
              { icon: Bell, label: t("nav.notifications"), id: "notifications" },
              { icon: HelpCircle, label: t("nav.help"), id: "help" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => goToTab(item.id as TabId)} // Safe casting now
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                  activeTab === item.id
                    ? "bg-[#F1F5F9] text-[#0B2240] font-bold"
                    : "hover:bg-[#F8FAFC] hover:text-[#0B2240]"
                }`}
              >
                <item.icon className="w-3.5 h-3.5" />
                {item.label}
              </button>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
              <input
                placeholder={t("nav.searchPlaceholder")}
                className="w-56 pl-9 pr-3 py-2 text-[13px] rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] focus:outline-none focus:border-[#1E3A8A] focus:ring-4 focus:ring-[#1E3A8A]/10 transition"
              />
            </div>
            <Link
              to="/login"
              className="hidden lg:inline-flex px-3 py-2 text-[13px] font-semibold text-[#0B2240] hover:bg-[#F8FAFC] rounded-lg"
            >
              {t("nav.signIn")}
            </Link>
            <Link
              to="/register"
              className="px-3.5 py-2 text-[13px] font-semibold bg-[#0B2240] text-white rounded-lg hover:bg-[#1E3A8A] shadow-sm transition-colors"
            >
              {t("nav.register")}
            </Link>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg border border-[#E2E8F0] text-[#0F172A]"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-[#E2E8F0] bg-white px-4 py-4 space-y-1">
            {[
              { icon: Sparkles, label: t("nav.engine"), id: "engine" },
              { icon: Layers, label: t("nav.schemes"), id: "schemes" },
              { icon: FileText, label: t("nav.applications"), id: "applications" },
              { icon: Bell, label: t("nav.notifications"), id: "notifications" },
              { icon: HelpCircle, label: t("nav.help"), id: "help" },
            ].map((item) => (
              <button // Change <a> to <button>
                key={item.label}
                onClick={() => {
                  goToTab(item.id as TabId); // Safe casting
                  setMobileMenuOpen(false); // Close menu after clicking
                }}
                className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-[14px] font-medium text-[#334155] hover:bg-[#F8FAFC]"
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </button>
            ))}
            <div className="flex gap-2 pt-2">
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="flex-1 text-center px-3 py-2 text-[13px] font-semibold border border-[#E2E8F0] rounded-lg"
              >
                {t("nav.signIn")}
              </Link>
              <Link
                to="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="flex-1 text-center px-3 py-2 text-[13px] font-semibold bg-[#0B2240] text-white rounded-lg"
              >
                {t("nav.register")}
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* HERO */}
      {activeTab === "engine" && (
        <section className="relative overflow-hidden bg-[#0B2240] text-white">
          <div className="absolute inset-0 opacity-[0.35]">
            <div className="absolute -top-32 -left-24 w-[520px] h-[520px] rounded-full bg-[#1E3A8A] blur-3xl" />
            <div className="absolute top-20 right-0 w-[460px] h-[460px] rounded-full bg-[#F59E0B]/40 blur-3xl" />
            <div className="absolute bottom-0 left-1/3 w-[420px] h-[420px] rounded-full bg-[#10B981]/30 blur-3xl" />
          </div>
          <div
            className="absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.6) 1px, transparent 1px)",
              backgroundSize: "44px 44px",
            }}
          />

          <div className="relative max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 pt-16 pb-24 lg:pt-24 lg:pb-32">
            <div className="grid lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur border border-white/20 text-[11px] font-medium tracking-wide">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
                  {t("hero.liveBadge")}
                </div>
                <h1 className="mt-6 text-[40px] sm:text-[56px] lg:text-[68px] leading-[1.02] font-bold tracking-[-0.025em]">
                  {t("hero.titleLead")}{" "}
                  <span className="text-[#F59E0B]">{t("hero.titleHighlight")}</span>
                </h1>
                <p className="mt-6 text-[16px] sm:text-[18px] leading-relaxed text-white/70 max-w-2xl">
                  {t("hero.subtitle")}
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <a
                    href="#eligibility-form"
                    className="inline-flex items-center gap-2 px-5 py-3 bg-white text-[#0B2240] rounded-xl font-semibold text-[14px] shadow-xl shadow-black/20 hover:shadow-2xl hover:-translate-y-0.5 transition-all"
                  >
                    {t("hero.checkEligibility")} <ArrowRight className="w-4 h-4" />
                  </a>
                  <a
                    href="#"
                    className="inline-flex items-center gap-2 px-5 py-3 border border-white/20 backdrop-blur rounded-xl font-semibold text-[14px] text-white/90 hover:bg-white/10"
                  >
                    {t("hero.browseSchemes")}
                  </a>
                </div>

                <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-[12px] text-white/60">
                  <div className="flex items-center gap-2">
                    <BadgeCheck className="w-4 h-4 text-[#10B981]" /> {t("hero.verifiedData")}
                  </div>
                  <div className="flex items-center gap-2">
                    <Lock className="w-4 h-4 text-[#10B981]" /> {t("hero.encrypted")}
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-[#10B981]" /> {t("hero.privacy")}
                  </div>
                </div>
              </div>

              {/* Glassmorphism stats */}
              <div className="lg:col-span-5">
                <div className="grid grid-cols-2 gap-3">
                  {[
                    {
                      icon: Users,
                      label: t("stats.citizensServed"),
                      value: "2.4 Cr",
                      trend: "+12.4%",
                      accent: "from-[#1E3A8A]/40 to-[#1E3A8A]/0",
                    },
                    {
                      icon: IndianRupee,
                      label: t("stats.dbtDisbursed"),
                      value: "₹48,200 Cr",
                      trend: "+8.1%",
                      accent: "from-[#10B981]/40 to-[#10B981]/0",
                    },
                    {
                      icon: Layers,
                      label: t("stats.activeSchemes"),
                      value: "30+",
                      trend: "Live",
                      accent: "from-[#F59E0B]/40 to-[#F59E0B]/0",
                    },
                    {
                      icon: TrendingUp,
                      label: t("stats.matchAccuracy"),
                      value: "98.6%",
                      trend: "AI-graded",
                      accent: "from-white/30 to-white/0",
                    },
                  ].map((s) => (
                    <div
                      key={s.label}
                      className="relative overflow-hidden rounded-2xl border border-white/15 bg-white/[0.06] backdrop-blur-xl p-5 hover:bg-white/[0.1] transition group"
                    >
                      <div
                        className={`absolute -top-12 -right-12 w-32 h-32 rounded-full bg-gradient-to-br ${s.accent} blur-2xl`}
                      />
                      <div className="relative">
                        <div className="flex items-center justify-between">
                          <div className="w-9 h-9 rounded-lg bg-white/10 grid place-items-center">
                            <s.icon className="w-4 h-4 text-white" />
                          </div>
                          <span className="text-[10px] font-semibold text-[#10B981] bg-[#10B981]/15 px-1.5 py-0.5 rounded">
                            {s.trend}
                          </span>
                        </div>
                        <div className="mt-4 text-[26px] font-bold tracking-tight">{s.value}</div>
                        <div className="text-[11px] text-white/60 mt-0.5">{s.label}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* MAIN DASHBOARD */}
      <main
        id="eligibility-form"
        className={`max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 pb-24 relative z-10 
        ${activeTab === "engine" ? "-mt-12" : "pt-8"}`}
      >
        {activeTab === "engine" && (
          <form onSubmit={handleEvaluate} className="grid grid-cols-12 gap-6">
            {/* LEFT SIDEBAR */}
            <aside className="hidden lg:block col-span-3">
              <div className="sticky top-24 space-y-4">
                <div className="rounded-2xl bg-white border border-[#E2E8F0] p-5 shadow-sm">
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-[#64748B]">
                    {t("sidebar.citizenProfile")}
                  </div>
                  <div className="mt-3 flex items-end justify-between">
                    <div className="text-[34px] font-bold tracking-tight text-[#0B2240]">
                      {completion.overall}%
                    </div>
                    <div className="text-[11px] text-[#64748B] mb-1.5">{t("sidebar.complete")}</div>
                  </div>
                  <div className="mt-2 h-1.5 rounded-full bg-[#F1F5F9] overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#1E3A8A] to-[#10B981] transition-all duration-500"
                      style={{ width: `${completion.overall}%` }}
                    />
                  </div>
                </div>

                <nav className="rounded-2xl bg-white border border-[#E2E8F0] p-2 shadow-sm">
                  {sections.map((s) => (
                    <a
                      key={s.id}
                      href={`#${s.id}`}
                      onClick={() => setActiveSection(s.id)}
                      className={`group flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium transition ${
                        activeSection === s.id
                          ? "bg-[#0B2240] text-white"
                          : "text-[#475569] hover:bg-[#F8FAFC]"
                      }`}
                    >
                      <div
                        className={`w-8 h-8 rounded-lg grid place-items-center ${
                          activeSection === s.id
                            ? "bg-white/10"
                            : "bg-[#F1F5F9] group-hover:bg-white"
                        }`}
                      >
                        <s.icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="truncate">{s.label}</div>
                        <div
                          className={`mt-1 h-1 rounded-full overflow-hidden ${activeSection === s.id ? "bg-white/15" : "bg-[#F1F5F9]"}`}
                        >
                          <div
                            className={`h-full transition-all ${activeSection === s.id ? "bg-[#F59E0B]" : "bg-[#10B981]"}`}
                            style={{ width: `${s.progress}%` }}
                          />
                        </div>
                      </div>
                    </a>
                  ))}
                </nav>

                <div className="rounded-2xl bg-gradient-to-br from-[#0B2240] to-[#1E3A8A] p-5 text-white relative overflow-hidden">
                  <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#F59E0B]/20 rounded-full blur-2xl" />
                  <Shield className="w-6 h-6 text-[#F59E0B] relative" />
                  <div className="mt-3 text-[13px] font-semibold relative">
                    {t("sidebar.dataProtectedTitle")}
                  </div>
                  <div className="text-[11px] text-white/70 mt-1 relative leading-relaxed">
                    {t("sidebar.dataProtectedDesc")}
                  </div>
                </div>
              </div>
            </aside>

            {/* MAIN FORM */}
            <div className="col-span-12 lg:col-span-6 space-y-6">
              {/* Section A */}
              <SectionCard
                id="personal"
                icon={User}
                tone="indigo"
                eyebrow={`${t("sections.eyebrow")} 01`}
                title={t("sections.personalTitle")}
                desc={t("sections.personalDesc")}
                progress={completion.personal}
              >
                {/* Name & Age Row */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label={t("form.fullName")} required>
                    <input
                      ref={nameRef}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={inputCls}
                    />
                  </Field>
                  <Field label={t("form.ageYears")} required>
                    <input
                      ref={ageRef}
                      type="number"
                      value={formData.age}
                      onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                      className={inputCls}
                    />
                  </Field>
                </div>

                {/* Gender */}
                <Field label={t("form.gender")} required>
                  <div
                    ref={genderRef}
                    className="grid grid-cols-3 gap-2 p-1 bg-[#F1F5F9] rounded-xl"
                  >
                    {[
                      { value: "Female", label: t("form.female") },
                      { value: "Male", label: t("form.male") },
                      { value: "Transgender", label: t("form.transgender") },
                    ].map((g) => (
                      <button
                        key={g.value}
                        type="button"
                        onClick={() => setFormData({ ...formData, gender: g.value })}
                        className={`py-2.5 text-[12px] font-semibold rounded-lg transition-all ${
                          formData.gender === g.value
                            ? "bg-white text-[#0B2240] shadow-sm ring-1 ring-[#E2E8F0]"
                            : "text-[#64748B] hover:text-[#0B2240]"
                        }`}
                      >
                        {g.label}
                      </button>
                    ))}
                  </div>
                </Field>

                {/* Religion & Caste Row */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label={t("form.religion")} required>
                    <select
                      ref={religionRef}
                      value={formData.religion}
                      onChange={(e) => setFormData({ ...formData, religion: e.target.value })}
                      className={inputCls}
                    >
                      <option value="">{t("form.selectReligion")}</option>
                      <option value="Hindu">{t("form.hindu")}</option>
                      <option value="Muslim">{t("form.muslim")}</option>
                      <option value="Christian">{t("form.christian")}</option>
                      <option value="Other">{t("form.other")}</option>
                    </select>
                  </Field>
                  <Field label={t("form.casteCategory")} required>
                    <select
                      ref={casteRef}
                      value={formData.caste}
                      onChange={(e) => setFormData({ ...formData, caste: e.target.value })}
                      className={inputCls}
                    >
                      <option value="">{t("form.selectCategory")}</option>
                      <option value="SC">SC</option>
                      <option value="ST">ST</option>
                      <option value="BC">BC</option>
                      <option value="EBC">EBC</option>
                      <option value="Minority">{t("form.minority")}</option>
                      <option value="General">{t("form.general")}</option>
                    </select>
                  </Field>
                </div>

                {/* Marital Status Only */}
                <Field label={t("form.maritalStatus")}>
                  <div className="grid grid-cols-2 gap-2 p-1 bg-[#F1F5F9] rounded-xl">
                    {[
                      { label: t("form.married"), value: true },
                      { label: t("form.unmarried"), value: false },
                    ].map((o) => (
                      <button
                        key={o.label}
                        type="button"
                        onClick={() => setFormData({ ...formData, is_married: o.value })}
                        className={`py-2.5 text-[12px] font-semibold rounded-lg transition-all ${
                          formData.is_married === o.value
                            ? "bg-white text-[#0B2240] shadow-sm ring-1 ring-[#E2E8F0]"
                            : "text-[#64748B] hover:text-[#0B2240]"
                        }`}
                      >
                        {o.label}
                      </button>
                    ))}
                  </div>
                </Field>

                {/* Boolean Flags in a cleaner Grid */}
                <div className="grid sm:grid-cols-2 gap-y-3 gap-x-6 pt-2 border-t border-[#F1F5F9] mt-2">
                  <Toggle
                    label={t("form.headOfFamily")}
                    checked={formData.is_head_of_family}
                    onChange={(v) => setFormData({ ...formData, is_head_of_family: v })}
                  />
                  <Toggle
                    label={t("form.govtEmployee")}
                    checked={formData.is_government_employee}
                    onChange={(v) => setFormData({ ...formData, is_government_employee: v })}
                  />
                  <Toggle
                    label={t("form.permanentResident")}
                    checked={formData.is_permanent_resident}
                    onChange={(v) => setFormData({ ...formData, is_permanent_resident: v })}
                  />
                  <Toggle
                    label={t("form.aboutToMarry")}
                    checked={formData.is_about_to_marry}
                    onChange={(v) => setFormData({ ...formData, is_about_to_marry: v })}
                  />
                </div>
              </SectionCard>

              {/* Section B */}
              <SectionCard
                id="socio"
                icon={Wallet}
                tone="emerald"
                eyebrow={`${t("sections.eyebrow")} 02`}
                title={t("sections.socioTitle")}
                desc={t("sections.socioDesc")}
                progress={completion.socio}
              >
                <Field label={t("form.residenceType")}>
                  <div className="grid grid-cols-2 gap-2 p-1 bg-[#F1F5F9] rounded-xl">
                    {[
                      { label: t("form.rural"), value: true },
                      { label: t("form.urban"), value: false },
                    ].map((o) => (
                      <button
                        key={o.label}
                        type="button"
                        onClick={() => setFormData({ ...formData, is_rural: o.value })}
                        className={`py-2.5 text-[12px] font-semibold rounded-lg transition-all ${
                          formData.is_rural === o.value
                            ? "bg-white text-[#0B2240] shadow-sm ring-1 ring-[#E2E8F0]"
                            : "text-[#64748B] hover:text-[#0B2240]"
                        }`}
                      >
                        {o.label}
                      </button>
                    ))}
                  </div>
                </Field>

                <Field label={t("form.annualIncome")} required>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#64748B] text-[13px]">
                      ₹
                    </span>
                    <input
                      ref={incomeRef}
                      type="number"
                      value={formData.annual_income}
                      onChange={(e) => setFormData({ ...formData, annual_income: e.target.value })}
                      placeholder={t("form.incomePlaceholder")}
                      className={`${inputCls} pl-8`}
                    />
                  </div>
                </Field>

                <Toggle
                  label={t("form.hasLpg")}
                  checked={formData.has_lpg_connection}
                  onChange={(v) => setFormData({ ...formData, has_lpg_connection: v })}
                />

                <Field label={t("form.electricityConsumption")}>
                  <input
                    type="number"
                    value={formData.electricity_consumption}
                    onChange={(e) =>
                      setFormData({ ...formData, electricity_consumption: e.target.value })
                    }
                    placeholder={t("form.electricityPlaceholder")}
                    className={inputCls}
                  />
                </Field>

                <div className="space-y-2">
                  <Toggle
                    label={t("form.pendingElectricityDues")}
                    checked={formData.has_electricity_bill_dues}
                    onChange={(v) => setFormData({ ...formData, has_electricity_bill_dues: v })}
                  />
                  <Toggle
                    label={t("form.whiteRationCard")}
                    checked={formData.has_white_ration_card}
                    onChange={(v) => setFormData({ ...formData, has_white_ration_card: v })}
                  />
                  <Toggle
                    label={t("form.ownsPuccaHouse")}
                    checked={formData.owns_pucca_house}
                    onChange={(v) => setFormData({ ...formData, owns_pucca_house: v })}
                  />
                  <Toggle
                    label={t("form.incomeTaxPayer")}
                    checked={formData.is_income_tax_payer}
                    onChange={(v) => setFormData({ ...formData, is_income_tax_payer: v })}
                    warning
                  />
                </div>
              </SectionCard>

              {/* Section C */}
              <SectionCard
                id="education"
                icon={GraduationCap}
                tone="amber"
                eyebrow={`${t("sections.eyebrow")} 03`}
                title={t("sections.educationTitle")}
                desc={t("sections.educationDesc")}
                progress={completion.eduAgri}
              >
                <Field label={t("form.currentOccupation")}>
                  <select
                    value={formData.occupation}
                    onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
                    className={inputCls}
                  >
                    <option value="">{t("form.selectOccupation")}</option>
                    <option value="Student">{t("form.student")}</option>
                    <option value="Farmer">{t("form.farmer")}</option>
                    <option value="Employed">{t("form.employed")}</option>
                    <option value="Unemployed">{t("form.unemployed")}</option>
                  </select>
                </Field>

                {/* STUDENT SECTION */}
                {formData.occupation === "Student" && (
                  <div className="mt-4 space-y-4 border-t pt-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <Field label={t("form.classLevel")}>
                        <input
                          type="number"
                          value={formData.class_level}
                          onChange={(e) =>
                            setFormData({ ...formData, class_level: e.target.value })
                          }
                          className={inputCls}
                        />
                      </Field>
                      <Field label={t("form.attendance")}>
                        <input
                          type="number"
                          value={formData.attendance_percent}
                          onChange={(e) =>
                            setFormData({ ...formData, attendance_percent: e.target.value })
                          }
                          className={inputCls}
                        />
                      </Field>
                    </div>

                    <Toggle
                      label={t("form.isGraduate")}
                      checked={formData.is_graduate}
                      onChange={(v) => setFormData({ ...formData, is_graduate: v })}
                    />
                    <Field label={t("form.graduationPercentage")}>
                      <input
                        type="number"
                        value={formData.graduation_percentage}
                        onChange={(e) =>
                          setFormData({ ...formData, graduation_percentage: e.target.value })
                        }
                        className={inputCls}
                      />
                    </Field>
                    <Toggle
                      label={t("form.finalYearStudent")}
                      checked={formData.is_final_year_student}
                      onChange={(v) => setFormData({ ...formData, is_final_year_student: v })}
                    />

                    <div className="bg-[#F8FAFC] p-4 rounded-xl border border-[#E2E8F0] space-y-4">
                      <Toggle
                        label={t("form.confirmedAdmission")}
                        checked={formData.has_confirmed_admission}
                        onChange={(v) => setFormData({ ...formData, has_confirmed_admission: v })}
                      />
                      {formData.has_confirmed_admission && (
                        <>
                          <Field label={t("form.targetCountry")}>
                            <input
                              value={formData.target_country}
                              onChange={(e) =>
                                setFormData({ ...formData, target_country: e.target.value })
                              }
                              className={inputCls}
                            />
                          </Field>
                          <div className="grid grid-cols-2 gap-4">
                            <Field label={t("form.greScore")}>
                              <input
                                type="number"
                                value={formData.gre_score}
                                onChange={(e) =>
                                  setFormData({ ...formData, gre_score: e.target.value })
                                }
                                className={inputCls}
                              />
                            </Field>
                            <Field label={t("form.gmatScore")}>
                              <input
                                type="number"
                                value={formData.gmat_score}
                                onChange={(e) =>
                                  setFormData({ ...formData, gmat_score: e.target.value })
                                }
                                className={inputCls}
                              />
                            </Field>
                            <Field label={t("form.ieltsScore")}>
                              <input
                                type="number"
                                value={formData.ielts_score}
                                onChange={(e) =>
                                  setFormData({ ...formData, ielts_score: e.target.value })
                                }
                                className={inputCls}
                              />
                            </Field>
                            <Field label={t("form.toeflScore")}>
                              <input
                                type="number"
                                value={formData.toefl_score}
                                onChange={(e) =>
                                  setFormData({ ...formData, toefl_score: e.target.value })
                                }
                                className={inputCls}
                              />
                            </Field>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                )}

                {/* FARMER SECTION */}
                {formData.occupation === "Farmer" && (
                  <div className="mt-4 space-y-4 border-t pt-4">
                    <Toggle
                      label={t("form.isPattadar")}
                      checked={formData.is_pattadar}
                      onChange={(v) => setFormData({ ...formData, is_pattadar: v })}
                    />
                    <Field label={t("form.cultivableLand")}>
                      <input
                        type="number"
                        value={formData.has_cultivable_land}
                        onChange={(e) =>
                          setFormData({ ...formData, has_cultivable_land: e.target.value })
                        }
                        className={inputCls}
                      />
                    </Field>
                  </div>
                )}
              </SectionCard>

              {/* Section D: Welfare Factors */}
              <SectionCard
                id="welfare"
                icon={Shield}
                tone="rose"
                eyebrow={`${t("sections.eyebrow")} 04`}
                title={t("sections.welfareTitle")}
                desc={t("sections.welfareDesc")}
                progress={completion.welfare}
              >
                <div className="space-y-3">
                  <Toggle
                    label={t("form.widow")}
                    checked={formData.is_widow}
                    onChange={(v) => setFormData({ ...formData, is_widow: v })}
                  />
                  <Toggle
                    label={t("form.singleWoman")}
                    checked={formData.is_single_woman}
                    onChange={(v) => setFormData({ ...formData, is_single_woman: v })}
                  />
                  <Toggle
                    label={t("form.pregnant")}
                    checked={formData.is_pregnant}
                    onChange={(v) => setFormData({ ...formData, is_pregnant: v })}
                  />
                  <Toggle
                    label={t("form.lactating")}
                    checked={formData.is_lactating}
                    onChange={(v) => setFormData({ ...formData, is_lactating: v })}
                  />
                  <Toggle
                    label={t("form.medicalCondition")}
                    checked={formData.has_specific_medical_condition}
                    onChange={(v) =>
                      setFormData({ ...formData, has_specific_medical_condition: v })
                    }
                  />
                  <Toggle
                    label={t("form.disabled")}
                    checked={formData.is_disabled}
                    onChange={(v) => setFormData({ ...formData, is_disabled: v })}
                  />
                </div>
              </SectionCard>

              {/* SUBMIT */}
              <div className="rounded-2xl bg-white border border-[#E2E8F0] p-6 shadow-sm">
                {errorMessage && (
                  <div className="mb-4 flex items-start gap-3 p-3.5 rounded-xl bg-red-50 border border-red-100 text-red-700">
                    <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                    <div className="text-[13px] font-medium">{errorMessage}</div>
                  </div>
                )}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 justify-between">
                  <div className="flex items-center gap-3 text-[12px] text-[#64748B]">
                    <Lock className="w-4 h-4 text-[#10B981]" />
                    {t("submit.securityNote")}
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#0B2240] text-white font-semibold text-[14px] shadow-lg shadow-[#0B2240]/20 hover:bg-[#1E3A8A] hover:shadow-xl hover:-translate-y-0.5 transition-all disabled:opacity-60 disabled:hover:translate-y-0"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" /> {t("submit.evaluating")}
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 text-[#F59E0B]" />
                        {t("submit.checkSchemes")}
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* RIGHT SUMMARY */}
            <aside className="hidden lg:block col-span-3">
              <div className="sticky top-24 space-y-4">
                <SummaryCard
                  completion={completion}
                  eligibleCount={eligibleCount}
                  totalMatched={matchedSchemes?.length ?? 0}
                />

                <div className="rounded-2xl bg-white border border-[#E2E8F0] p-5 shadow-sm">
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-[#64748B]">
                    {t("summary.popularSchemes")}
                  </div>
                  <div className="mt-3 space-y-2">
                    {[
                      {
                        name: "Rythu Bandhu",
                        dept: "Agriculture",
                        color: "bg-[#10B981]/10 text-[#047857]",
                      },
                      {
                        name: "Aasara Pension",
                        dept: "Welfare",
                        color: "bg-[#1E3A8A]/10 text-[#1E3A8A]",
                      },
                      {
                        name: "Kalyana Lakshmi",
                        dept: "Women & Child",
                        color: "bg-[#F59E0B]/10 text-[#B45309]",
                      },
                    ].map((s) => (
                      <div
                        key={s.name}
                        className="flex items-center justify-between p-2.5 rounded-xl hover:bg-[#F8FAFC] transition cursor-pointer"
                      >
                        <div>
                          <div className="text-[13px] font-semibold text-[#0F172A]">{s.name}</div>
                          <div className="text-[10px] text-[#64748B] uppercase tracking-wider">
                            {s.dept}
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-[#94A3B8]" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </aside>
          </form>
        )}

        {/* RESULTS */}
        {activeTab === "engine" && matchedSchemes !== null && (
          <section id="results" className="mt-16 scroll-mt-24">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
              <div>
                <div className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-[#1E3A8A] bg-[#1E3A8A]/8 px-2.5 py-1 rounded-full">
                  <CheckCircle2 className="w-3 h-3" /> {t("results.evaluationComplete")}
                </div>
                <h2 className="mt-3 text-[28px] sm:text-[34px] font-bold tracking-tight text-[#0B2240]">
                  {t("results.reportTitle")}
                </h2>
                <p className="text-[14px] text-[#64748B] mt-1">
                  {t("results.reportSubtitle", {
                    total: matchedSchemes.length,
                    eligible: eligibleCount,
                  })}
                </p>
              </div>
              {eligibleCount > 0 && (
                <a
                  href="#eligible"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#10B981] text-white font-semibold text-[13px] hover:bg-[#059669] transition"
                >
                  {t("results.viewEligible", { count: eligibleCount })}{" "}
                  <ArrowRight className="w-4 h-4" />
                </a>
              )}
            </div>

            {matchedSchemes.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-[#E2E8F0] bg-white p-12 text-center">
                <div className="w-14 h-14 rounded-2xl bg-[#F1F5F9] grid place-items-center mx-auto">
                  <Search className="w-6 h-6 text-[#64748B]" />
                </div>
                <div className="mt-4 text-[16px] font-semibold text-[#0F172A]">
                  {t("results.noMatchTitle")}
                </div>
                <div className="text-[13px] text-[#64748B] mt-1">{t("results.noMatchDesc")}</div>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-4">
                {matchedSchemes.map((scheme, idx) => (
                  <SchemeMatchCard
                    key={idx}
                    scheme={scheme}
                    input={formData}
                    results={matchedSchemes}
                  />
                ))}
              </div>
            )}

            {eligibleCount > 0 && (
              <div id="eligible" className="mt-16 scroll-mt-24">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-[#10B981]/15 grid place-items-center">
                    <Award className="w-5 h-5 text-[#10B981]" />
                  </div>
                  <div>
                    <h3 className="text-[22px] font-bold tracking-tight text-[#0B2240]">
                      {t("results.fullyEligibleTitle")}
                    </h3>
                    <div className="text-[13px] text-[#64748B]">
                      {t("results.fullyEligibleDesc")}
                    </div>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {matchedSchemes
                    .filter((s) => s.percentage === 100)
                    .map((scheme, idx) => (
                      <EligibleCard
                        key={idx}
                        scheme={scheme}
                        from="engine"
                        input={formData}
                        results={matchedSchemes}
                      />
                    ))}
                </div>
              </div>
            )}
          </section>
        )}

        {/* SCHEMES TAB */}
        {activeTab === "schemes" && (
          <div className="bg-white rounded-2xl border border-[#E2E8F0] p-8 shadow-sm">
            <SchemeList />
          </div>
        )}

        {/* APPLICATIONS TAB */}
        {activeTab === "applications" && (
          <div className="bg-white rounded-2xl border border-[#E2E8F0] p-8 shadow-sm">
            <h2 className="text-xl font-bold mb-4">{t("applications.heading")}</h2>
            <ApplicationsTab />
          </div>
        )}

        {/* NOTIFICATIONS TAB */}
        {activeTab === "notifications" && (
          <div className="bg-white rounded-2xl border border-[#E2E8F0] p-8 shadow-sm">
            <NotificationsTab />
          </div>
        )}

        {/* HELP TAB */}
        {activeTab === "help" && (
          <div className="bg-white rounded-2xl border border-[#E2E8F0] p-8 shadow-sm">
            <HelpTab />
          </div>
        )}
      </main>

      {/* FOOTER */}
      <footer className="bg-[#0B2240] text-white mt-16">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-16">
          <div className="grid lg:grid-cols-12 gap-10">
            <div className="lg:col-span-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-white to-white/70 text-[#0B2240] grid place-items-center font-bold">
                  SR
                </div>
                <div>
                  <div className="text-[16px] font-bold">SARTHI</div>
                  <div className="text-[10px] uppercase tracking-[0.14em] text-white/60">
                    {t("eligibleCard.govtOfTelangana")}
                  </div>
                </div>
              </div>
              <p className="mt-5 text-[13px] leading-relaxed text-white/70 max-w-sm">
                {t("footer.brandDesc")}
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {["ISO 27001", "Aadhaar Verified", "DigiLocker", "Bhashini"].map((b) => (
                  <span
                    key={b}
                    className="px-2.5 py-1 text-[10px] font-semibold rounded-md bg-white/8 border border-white/10 text-white/80"
                  >
                    {b}
                  </span>
                ))}
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-white/50">
                {t("footer.platform")}
              </div>
              <ul className="mt-4 space-y-2.5 text-[13px] text-white/80">
                <li>
                  <a href="#" className="hover:text-white">
                    {t("footer.aboutSarthi")}
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    {t("footer.schemeDirectory")}
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    {t("footer.dbtStatus")}
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    {t("footer.rtiInformation")}
                  </a>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-3">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-white/50">
                {t("footer.departments")}
              </div>
              <ul className="mt-4 space-y-2.5 text-[13px] text-white/80">
                <li>
                  <a href="#" className="hover:text-white">
                    {t("footer.welfareTribal")}
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    {t("footer.agriCoop")}
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    {t("footer.womenChild")}
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    {t("footer.healthFamily")}
                  </a>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-3 space-y-3">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-white/50">
                {t("footer.getInTouch")}
              </div>
              <div className="rounded-xl bg-white/5 border border-white/10 p-3 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/10 grid place-items-center">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="text-[12px] text-white/80 leading-tight">
                  {t("footer.secretariat")}
                  <br />
                  Hyderabad — 500022
                </div>
              </div>
              <div className="rounded-xl bg-white/5 border border-white/10 p-3 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/10 grid place-items-center">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="text-[12px] text-white/80">1800-425-0425 · 24×7</div>
              </div>
              <div className="rounded-xl bg-white/5 border border-white/10 p-3 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/10 grid place-items-center">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="text-[12px] text-white/80">support-sarthi@telangana.gov.in</div>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-[12px] text-white/60">
            <div>{t("footer.copyright", { year: new Date().getFullYear() })}</div>
            <div className="flex items-center gap-4">
              <a href="#" className="hover:text-white">
                {t("footer.privacy")}
              </a>
              <a href="#" className="hover:text-white">
                {t("footer.terms")}
              </a>
              <a href="#" className="hover:text-white">
                {t("footer.accessibility")}
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ─────────── Reusable bits ─────────── */

const inputCls =
  "w-full px-3.5 py-2.5 text-[13px] bg-white text-[#0F172A] placeholder:text-[#94A3B8] rounded-xl border border-[#E2E8F0] hover:border-[#CBD5E1] focus:outline-none focus:border-[#1E3A8A] focus:ring-4 focus:ring-[#1E3A8A]/10 transition";

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="block text-[11px] font-semibold uppercase tracking-wider text-[#64748B] mb-1.5">
        {label} {required && <span className="text-[#F59E0B] normal-case">*</span>}
      </span>
      {children}
    </label>
  );
}

function Toggle({
  label,
  checked,
  onChange,
  warning,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  warning?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`w-full flex items-center justify-between gap-3 p-3 rounded-xl border transition group ${
        checked
          ? warning
            ? "border-[#F59E0B]/30 bg-[#F59E0B]/5"
            : "border-[#10B981]/30 bg-[#10B981]/5"
          : "border-[#E2E8F0] bg-white hover:border-[#CBD5E1] hover:bg-[#F8FAFC]"
      }`}
    >
      <span
        className={`text-[13px] font-medium text-left ${checked ? "text-[#0B2240]" : "text-[#475569]"}`}
      >
        {label}
      </span>
      <span
        className={`relative w-9 h-5 rounded-full transition ${checked ? (warning ? "bg-[#F59E0B]" : "bg-[#10B981]") : "bg-[#E2E8F0]"}`}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${checked ? "translate-x-4" : ""}`}
        />
      </span>
    </button>
  );
}

function SectionCard({
  id,
  icon: Icon,
  tone,
  eyebrow,
  title,
  desc,
  progress,
  children,
}: {
  id: string;
  icon: React.ElementType;
  tone: "indigo" | "emerald" | "amber" | "rose";
  eyebrow: string;
  title: string;
  desc: string;
  progress: number;
  children: React.ReactNode;
}) {
  const { t } = useTranslation();
  const toneMap = {
    indigo: { bg: "bg-[#1E3A8A]/10", text: "text-[#1E3A8A]", bar: "bg-[#1E3A8A]" },
    emerald: { bg: "bg-[#10B981]/10", text: "text-[#047857]", bar: "bg-[#10B981]" },
    amber: { bg: "bg-[#F59E0B]/15", text: "text-[#B45309]", bar: "bg-[#F59E0B]" },
    rose: { bg: "bg-rose-100", text: "text-rose-700", bar: "bg-rose-500" },
  }[tone];

  return (
    <section
      id={id}
      className="scroll-mt-24 rounded-3xl bg-white border border-[#E2E8F0] shadow-sm hover:shadow-md transition-shadow overflow-hidden"
    >
      <header className="flex items-start gap-4 p-6 border-b border-[#F1F5F9]">
        <div
          className={`w-11 h-11 rounded-2xl grid place-items-center ${toneMap.bg} ${toneMap.text} shrink-0`}
        >
          <Icon className="w-5 h-5" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#94A3B8]">
              {eyebrow}
            </span>
            {progress === 100 && (
              <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#10B981] bg-[#10B981]/10 px-1.5 py-0.5 rounded">
                <CheckCircle2 className="w-3 h-3" /> {t("sections.complete")}
              </span>
            )}
          </div>
          <h3 className="mt-1 text-[17px] font-bold tracking-tight text-[#0B2240]">{title}</h3>
          <p className="text-[12.5px] text-[#64748B] mt-1 leading-relaxed">{desc}</p>
          <div className="mt-3 h-1 bg-[#F1F5F9] rounded-full overflow-hidden max-w-[200px]">
            <div
              className={`h-full ${toneMap.bar} transition-all duration-500`}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </header>
      <div className="p-6 space-y-4">{children}</div>
    </section>
  );
}

function SummaryCard({
  completion,
  eligibleCount,
  totalMatched,
}: {
  completion: any;
  eligibleCount: number;
  totalMatched: number;
}) {
  const { t } = useTranslation();
  const r = 36;
  const c = 2 * Math.PI * r;
  const dash = (completion.overall / 100) * c;

  return (
    <div className="rounded-2xl bg-white border border-[#E2E8F0] p-5 shadow-sm">
      <div className="text-[11px] font-semibold uppercase tracking-wider text-[#64748B]">
        {t("summary.liveSummary")}
      </div>
      <div className="mt-4 flex items-center gap-4">
        <div className="relative w-[88px] h-[88px] shrink-0">
          <svg viewBox="0 0 88 88" className="w-full h-full -rotate-90">
            <circle cx="44" cy="44" r={r} stroke="#F1F5F9" strokeWidth="8" fill="none" />
            <circle
              cx="44"
              cy="44"
              r={r}
              stroke="url(#g1)"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={`${dash} ${c}`}
              className="transition-all duration-700"
            />
            <defs>
              <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#1E3A8A" />
                <stop offset="100%" stopColor="#10B981" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 grid place-items-center">
            <div className="text-[18px] font-bold text-[#0B2240]">{completion.overall}%</div>
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[14px] font-semibold text-[#0F172A]">
            {t("summary.profileReadiness")}
          </div>
          <div className="text-[11px] text-[#64748B] mt-0.5">{t("summary.readinessDesc")}</div>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-2">
        <div className="rounded-xl bg-[#F8FAFC] p-3">
          <div className="text-[20px] font-bold text-[#0B2240]">{totalMatched}</div>
          <div className="text-[10px] uppercase tracking-wider text-[#64748B] mt-0.5">
            {t("summary.matched")}
          </div>
        </div>
        <div className="rounded-xl bg-[#10B981]/10 p-3">
          <div className="text-[20px] font-bold text-[#047857]">{eligibleCount}</div>
          <div className="text-[10px] uppercase tracking-wider text-[#047857]/80 mt-0.5">
            {t("summary.eligible")}
          </div>
        </div>
      </div>
    </div>
  );
}

function SchemeMatchCard({
  scheme,
  input,
  results,
}: {
  scheme: Scheme;
  input?: Partial<EngineFormData>;
  results?: Scheme[];
}) {
  const { t, language } = useTranslation();
  const { id } = resolveSchemeIdentity(scheme);
  const name = localizeSchemeNameById(language, id, scheme.name || scheme.scheme || "");
  const pct = scheme.percentage ?? 0;
  const fully = pct === 100;
  const r = 22;
  const c = 2 * Math.PI * r;
  const dash = (pct / 100) * c;
  const color = fully ? "#10B981" : pct >= 60 ? "#F59E0B" : "#94A3B8";

  return (
    <div className="group rounded-2xl bg-white border border-[#E2E8F0] p-5 hover:shadow-lg hover:-translate-y-0.5 hover:border-[#CBD5E1] transition-all">
      <div className="flex items-start gap-4">
        <div className="relative w-[60px] h-[60px] shrink-0">
          <svg viewBox="0 0 60 60" className="w-full h-full -rotate-90">
            <circle cx="30" cy="30" r={r} stroke="#F1F5F9" strokeWidth="5" fill="none" />
            <circle
              cx="30"
              cy="30"
              r={r}
              stroke={color}
              strokeWidth="5"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={`${dash} ${c}`}
              className="transition-all duration-700"
            />
          </svg>
          <div
            className="absolute inset-0 grid place-items-center text-[12px] font-bold"
            style={{ color }}
          >
            {pct}%
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="text-[14px] font-bold text-[#0B2240] leading-snug">{name}</div>
            {fully ? (
              <span className="shrink-0 inline-flex items-center gap-1 text-[10px] font-semibold text-[#10B981] bg-[#10B981]/10 px-1.5 py-0.5 rounded">
                <CheckCircle2 className="w-3 h-3" /> {t("matchCard.eligible")}
              </span>
            ) : (
              <span className="shrink-0 text-[10px] font-semibold text-[#64748B] bg-[#F1F5F9] px-1.5 py-0.5 rounded">
                {t("matchCard.partial")}
              </span>
            )}
          </div>
          <div className="mt-2 text-[11.5px] text-[#64748B] leading-relaxed">
            {scheme.missing && scheme.missing.length > 0 ? (
              <>
                <span className="font-semibold text-[#475569]">{t("matchCard.missing")} </span>
                {scheme.missing.join(", ")}
              </>
            ) : (
              t("matchCard.allCriteriaMet")
            )}
          </div>
        </div>
      </div>
      <div className="mt-4 pt-4 border-t border-[#F1F5F9] flex items-center justify-between">
        <div className="text-[10px] font-semibold uppercase tracking-wider text-[#94A3B8]">
          {t("matchCard.matchScore")}
        </div>
        {id ? (
          <Link
            to="/scheme/$id"
            params={{ id }}
            search={buildSchemeLinkSearch("engine", { input, results })}
            className="text-[12px] font-semibold text-[#1E3A8A] inline-flex items-center gap-1 group-hover:gap-1.5 transition-all"
          >
            {t("matchCard.viewDetails")} <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        ) : (
          <span className="text-[12px] font-semibold text-[#94A3B8] inline-flex items-center gap-1 cursor-not-allowed">
            {t("matchCard.detailsUnavailable")}
          </span>
        )}
      </div>
    </div>
  );
}
