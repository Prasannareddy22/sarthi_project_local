import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Mail, Lock, Eye, EyeOff, ArrowRight, ShieldCheck, Sparkles, Loader2 } from "lucide-react";
import { useTranslation } from "@/i18n/useTranslation";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export const Route = createFileRoute("/login")({
  component: LoginPage,
});

function LoginPage() {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError(t("auth.login.errEnterBoth"));
      return;
    }

    setLoading(true);
    try {
      // TODO: wire up to your auth endpoint, e.g.
      // const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ email, password }),
      // });
      // if (!res.ok) throw new Error("Invalid email or password.");
      await new Promise((resolve) => setTimeout(resolve, 700));
    } catch (err) {
      setError(err instanceof Error ? err.message : t("auth.somethingWrong"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-[#F8FAFC]">
      {/* Brand panel */}
      <div className="relative hidden lg:flex flex-col justify-between overflow-hidden bg-[#0B2240] text-white p-12">
        <div className="absolute inset-0 opacity-[0.35]">
          <div className="absolute -top-32 -left-24 w-[520px] h-[520px] rounded-full bg-[#1E3A8A] blur-3xl" />
          <div className="absolute bottom-0 right-0 w-[420px] h-[420px] rounded-full bg-[#10B981]/30 blur-3xl" />
        </div>
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.6) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />

        <Link to="/" className="relative flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-white/20 to-white/5 border border-white/20 grid place-items-center text-white font-bold text-sm">
            <span>SR</span>
            <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-[#F59E0B] border-2 border-[#0B2240]" />
          </div>
          <div className="leading-tight">
            <div className="text-[15px] font-bold tracking-tight">SARTHI</div>
            <div className="text-[10px] uppercase tracking-[0.14em] text-white/60 font-medium">
              {t("auth.tagline")}
            </div>
          </div>
        </Link>

        <div className="relative">
          <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#10B981] bg-[#10B981]/10 px-2.5 py-1 rounded-full">
            <Sparkles className="w-3 h-3" /> {t("auth.login.aiBadge")}
          </div>
          <h1 className="mt-5 text-3xl font-bold tracking-tight leading-tight">
            {t("auth.login.welcomeTitle")}
          </h1>
          <p className="mt-3 text-[14px] text-white/70 leading-relaxed max-w-sm">
            {t("auth.login.welcomeDesc")}
          </p>
        </div>

        <div className="relative flex items-center gap-2 text-[12px] text-white/60">
          <ShieldCheck className="w-4 h-4" />
          {t("auth.dataUsageNote")}
        </div>
      </div>

      {/* Form panel */}
      <div className="flex items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-sm">
          <div className="flex justify-end mb-4">
            <LanguageSwitcher variant="pill" />
          </div>
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-[#0B2240] to-[#1E3A8A] grid place-items-center text-white font-bold text-sm shadow-lg shadow-[#0B2240]/20">
              <span>SR</span>
              <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-[#F59E0B] border-2 border-white" />
            </div>
            <div className="leading-tight">
              <div className="text-[15px] font-bold tracking-tight text-[#0F172A]">SARTHI</div>
              <div className="text-[10px] uppercase tracking-[0.14em] text-[#64748B] font-medium">
                {t("auth.tagline")}
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-white border border-[#E2E8F0] shadow-sm p-8">
            <h2 className="text-[22px] font-bold tracking-tight text-[#0B2240]">
              {t("auth.login.heading")}
            </h2>
            <p className="text-[13px] text-[#64748B] mt-1.5">
              {t("auth.login.newToSarthi")}{" "}
              <Link to="/register" className="font-semibold text-[#1E3A8A] hover:text-[#0B2240]">
                {t("auth.login.createAccount")}
              </Link>
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              {error && (
                <div className="rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-[12.5px] px-3.5 py-2.5">
                  {error}
                </div>
              )}

              <label className="block">
                <span className="block text-[11px] font-semibold uppercase tracking-wider text-[#64748B] mb-1.5">
                  {t("auth.emailLabel")}
                </span>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t("auth.emailPlaceholder")}
                    autoComplete="email"
                    className="w-full pl-10 pr-3.5 py-2.5 text-[13px] bg-white text-[#0F172A] placeholder:text-[#94A3B8] rounded-xl border border-[#E2E8F0] hover:border-[#CBD5E1] focus:outline-none focus:border-[#1E3A8A] focus:ring-4 focus:ring-[#1E3A8A]/10 transition"
                  />
                </div>
              </label>

              <label className="block">
                <span className="block text-[11px] font-semibold uppercase tracking-wider text-[#64748B] mb-1.5">
                  {t("auth.passwordLabel")}
                </span>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={t("auth.passwordPlaceholder")}
                    autoComplete="current-password"
                    className="w-full pl-10 pr-10 py-2.5 text-[13px] bg-white text-[#0F172A] placeholder:text-[#94A3B8] rounded-xl border border-[#E2E8F0] hover:border-[#CBD5E1] focus:outline-none focus:border-[#1E3A8A] focus:ring-4 focus:ring-[#1E3A8A]/10 transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#0B2240]"
                    aria-label={showPassword ? t("auth.hidePassword") : t("auth.showPassword")}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </label>

              <div className="flex items-center justify-end">
                <button
                  type="button"
                  className="text-[12.5px] font-semibold text-[#1E3A8A] hover:text-[#0B2240]"
                >
                  {t("auth.login.forgotPassword")}
                </button>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#0B2240] text-white text-[13px] font-semibold hover:bg-[#1E3A8A] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> {t("auth.login.submitting")}
                  </>
                ) : (
                  <>
                    {t("auth.login.submit")} <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>

          <p className="text-[11.5px] text-[#94A3B8] text-center mt-6">
            <Link to="/" className="hover:text-[#0B2240]">
              {t("auth.backToSarthi")}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
