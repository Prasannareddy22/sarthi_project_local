import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Loader2,
  CheckCircle2,
} from "lucide-react";

export const Route = createFileRoute("/register")({
  component: RegisterPage,
});

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const passwordScore = [
    password.length >= 8,
    /[A-Z]/.test(password),
    /[0-9]/.test(password),
  ].filter(Boolean).length;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill out every field to create your account.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords don't match.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }
    if (!agreed) {
      setError("Please accept the terms to continue.");
      return;
    }

    setLoading(true);
    try {
      // TODO: wire up to your auth endpoint, e.g.
      // const res = await fetch(`${API_BASE_URL}/api/auth/register`, {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ name, email, password }),
      // });
      // if (!res.ok) throw new Error("Could not create your account.");
      await new Promise((resolve) => setTimeout(resolve, 700));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
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
          <div className="absolute bottom-0 right-0 w-[420px] h-[420px] rounded-full bg-[#F59E0B]/25 blur-3xl" />
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
              Don't Miss What's Yours
            </div>
          </div>
        </Link>

        <div className="relative">
          <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#10B981] bg-[#10B981]/10 px-2.5 py-1 rounded-full">
            <Sparkles className="w-3 h-3" /> Free, always
          </div>
          <h1 className="mt-5 text-3xl font-bold tracking-tight leading-tight">
            Create your account and never miss a scheme.
          </h1>
          <ul className="mt-5 space-y-2.5 text-[13.5px] text-white/80">
            {[
              "Save your profile and re-run eligibility checks anytime",
              "Track every application in one place",
              "Get notified the moment a new scheme matches you",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative flex items-center gap-2 text-[12px] text-white/60">
          <ShieldCheck className="w-4 h-4" />
          Your data is used only to evaluate scheme eligibility.
        </div>
      </div>

      {/* Form panel */}
      <div className="flex items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-sm">
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-[#0B2240] to-[#1E3A8A] grid place-items-center text-white font-bold text-sm shadow-lg shadow-[#0B2240]/20">
              <span>SR</span>
              <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-[#F59E0B] border-2 border-white" />
            </div>
            <div className="leading-tight">
              <div className="text-[15px] font-bold tracking-tight text-[#0F172A]">SARTHI</div>
              <div className="text-[10px] uppercase tracking-[0.14em] text-[#64748B] font-medium">
                Don't Miss What's Yours
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-white border border-[#E2E8F0] shadow-sm p-8">
            <h2 className="text-[22px] font-bold tracking-tight text-[#0B2240]">
              Create your account
            </h2>
            <p className="text-[13px] text-[#64748B] mt-1.5">
              Already registered?{" "}
              <Link to="/login" className="font-semibold text-[#1E3A8A] hover:text-[#0B2240]">
                Sign in
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
                  Full name
                </span>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Priya Reddy"
                    autoComplete="name"
                    className="w-full pl-10 pr-3.5 py-2.5 text-[13px] bg-white text-[#0F172A] placeholder:text-[#94A3B8] rounded-xl border border-[#E2E8F0] hover:border-[#CBD5E1] focus:outline-none focus:border-[#1E3A8A] focus:ring-4 focus:ring-[#1E3A8A]/10 transition"
                  />
                </div>
              </label>

              <label className="block">
                <span className="block text-[11px] font-semibold uppercase tracking-wider text-[#64748B] mb-1.5">
                  Email address
                </span>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    autoComplete="email"
                    className="w-full pl-10 pr-3.5 py-2.5 text-[13px] bg-white text-[#0F172A] placeholder:text-[#94A3B8] rounded-xl border border-[#E2E8F0] hover:border-[#CBD5E1] focus:outline-none focus:border-[#1E3A8A] focus:ring-4 focus:ring-[#1E3A8A]/10 transition"
                  />
                </div>
              </label>

              <label className="block">
                <span className="block text-[11px] font-semibold uppercase tracking-wider text-[#64748B] mb-1.5">
                  Password
                </span>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    autoComplete="new-password"
                    className="w-full pl-10 pr-10 py-2.5 text-[13px] bg-white text-[#0F172A] placeholder:text-[#94A3B8] rounded-xl border border-[#E2E8F0] hover:border-[#CBD5E1] focus:outline-none focus:border-[#1E3A8A] focus:ring-4 focus:ring-[#1E3A8A]/10 transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#0B2240]"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {password.length > 0 && (
                  <div className="mt-2 flex gap-1">
                    {[0, 1, 2].map((i) => (
                      <span
                        key={i}
                        className={`h-1 flex-1 rounded-full ${
                          i < passwordScore ? "bg-[#10B981]" : "bg-[#E2E8F0]"
                        }`}
                      />
                    ))}
                  </div>
                )}
              </label>

              <label className="block">
                <span className="block text-[11px] font-semibold uppercase tracking-wider text-[#64748B] mb-1.5">
                  Confirm password
                </span>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    autoComplete="new-password"
                    className="w-full pl-10 pr-3.5 py-2.5 text-[13px] bg-white text-[#0F172A] placeholder:text-[#94A3B8] rounded-xl border border-[#E2E8F0] hover:border-[#CBD5E1] focus:outline-none focus:border-[#1E3A8A] focus:ring-4 focus:ring-[#1E3A8A]/10 transition"
                  />
                </div>
              </label>

              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded border-[#CBD5E1] text-[#1E3A8A] focus:ring-[#1E3A8A]/30"
                />
                <span className="text-[12px] text-[#64748B] leading-relaxed">
                  I agree to the SARTHI terms of use and understand my data will be used to evaluate
                  scheme eligibility.
                </span>
              </label>

              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#0B2240] text-white text-[13px] font-semibold hover:bg-[#1E3A8A] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Creating account…
                  </>
                ) : (
                  <>
                    Create account <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>

          <p className="text-[11.5px] text-[#94A3B8] text-center mt-6">
            <Link to="/" className="hover:text-[#0B2240]">
              ← Back to SARTHI
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}