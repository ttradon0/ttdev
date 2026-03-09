"use client";
import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import LoginCodeAnimation from "../components/LoginCodeAnimation";

const CHULA_PINK = "#E8006F";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError(result.error);
      } else {
        router.push("/");
        router.refresh();
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    await signIn("google", { callbackUrl: "/" });
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ fontFamily: "var(--font-prompt), sans-serif" }}
    >
      {/* Navbar */}
      <nav className="h-14 bg-white border-b border-slate-100 shadow-sm flex items-center px-6 gap-4 z-50 shrink-0">
        <Link
          href="/"
          className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors text-sm font-medium group"
        >
          <span className="text-lg group-hover:-translate-x-0.5 transition-transform">←</span>
          <span>กลับหน้าหลัก</span>
        </Link>
        <div className="flex-1" />
        <Link href="/" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center text-white font-bold text-xs"
            style={{ background: CHULA_PINK }}>TT</div>
          <span className="font-bold text-slate-900 text-sm">TT<span style={{ color: CHULA_PINK }}>Dev</span></span>
        </Link>
      </nav>

      {/* Main content */}
      <div className="flex flex-1">
      {/* Left Panel — Branding */}
      <div
        className="hidden lg:flex lg:w-1/2 flex-col items-center justify-center px-16 relative overflow-hidden"
        style={{ background: `linear-gradient(145deg, ${CHULA_PINK}, #c0005a)` }}
      >
        {/* Decorative circles */}
        <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full opacity-20 bg-white" />
        <div className="absolute -bottom-32 -right-16 w-96 h-96 rounded-full opacity-10 bg-white" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-5 bg-white" />

        {/* Content */}
        <div className="relative z-10 text-center text-white">
          {/* Logo */}
          <Link href="/" className="inline-flex items-center gap-3 mb-12">
            <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center font-bold text-xl shadow">
              TT
            </div>
            <span className="text-2xl font-bold">TTDev</span>
          </Link>

          {/* Illustration */}
          <LoginCodeAnimation />

          <h2 className="text-3xl font-bold mb-3">ยินดีต้อนรับกลับ! 👋</h2>
          <p className="text-pink-100 text-lg leading-relaxed mb-8">
            เข้าสู่ระบบเพื่อเรียนต่อจากที่ค้างไว้<br />
            แล้วพัฒนาทักษะ Coding ของคุณวันนี้
          </p>

          {/* Mini stats */}
          <div className="flex justify-center gap-8">
            <div className="text-center">
              <div className="text-2xl font-bold">15K+</div>
              <div className="text-pink-200 text-xs">ผู้เรียน</div>
            </div>
            <div className="w-px bg-white/20" />
            <div className="text-center">
              <div className="text-2xl font-bold">30+</div>
              <div className="text-pink-200 text-xs">คอร์ส</div>
            </div>
            <div className="w-px bg-white/20" />
            <div className="text-center">
              <div className="text-2xl font-bold">4.9★</div>
              <div className="text-pink-200 text-xs">คะแนน</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel — Form */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 bg-white">
        {/* Mobile logo */}
        <Link href="/" className="lg:hidden flex items-center gap-2 mb-8">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold text-sm"
            style={{ background: CHULA_PINK }}>TT</div>
          <span className="font-bold text-xl text-slate-900">TT<span style={{ color: CHULA_PINK }}>Dev</span></span>
        </Link>

        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">เข้าสู่ระบบ</h1>
          <p className="text-slate-500 mb-8">
            ยังไม่มีบัญชี?{" "}
            <Link href="/register" className="font-semibold hover:underline transition-all"
              style={{ color: CHULA_PINK }}>
              สมัครสมาชิกฟรี
            </Link>
          </p>

          {/* Social login */}
          <div className="mb-6">
            <button 
              type="button"
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-medium py-3 rounded-xl text-sm transition-all disabled:opacity-50"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              เข้าสู่ระบบด้วย Google
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-px bg-slate-100" />
            <span className="text-slate-400 text-sm">หรือเข้าสู่ระบบด้วยอีเมล</span>
            <div className="flex-1 h-px bg-slate-100" />
          </div>

          {/* Form */}
          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Error message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
                {error}
              </div>
            )}
            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">อีเมล</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@email.com"
                className="w-full border border-slate-200 bg-slate-50 focus:bg-white rounded-xl px-4 py-3 text-slate-800 placeholder-slate-400 text-sm outline-none transition-all"
                style={{ "--tw-ring-color": CHULA_PINK } as React.CSSProperties}
                onFocus={(e) => {
                  e.target.style.borderColor = CHULA_PINK;
                  e.target.style.boxShadow = `0 0 0 3px ${CHULA_PINK}20`;
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#e2e8f0";
                  e.target.style.boxShadow = "none";
                }}
              />
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-sm font-semibold text-slate-700">รหัสผ่าน</label>
                <a href="#" className="text-xs font-medium hover:underline" style={{ color: CHULA_PINK }}>
                  ลืมรหัสผ่าน?
                </a>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full border border-slate-200 bg-slate-50 focus:bg-white rounded-xl px-4 py-3 pr-12 text-slate-800 placeholder-slate-400 text-sm outline-none transition-all"
                  onFocus={(e) => {
                    e.target.style.borderColor = CHULA_PINK;
                    e.target.style.boxShadow = `0 0 0 3px ${CHULA_PINK}20`;
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#e2e8f0";
                    e.target.style.boxShadow = "none";
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors select-none"
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            {/* Remember me */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="remember"
                className="w-4 h-4 rounded"
                style={{ accentColor: CHULA_PINK }}
              />
              <label htmlFor="remember" className="text-sm text-slate-600">จดจำฉันไว้</label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full text-white font-semibold py-3.5 rounded-xl text-base active:scale-[0.98] transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ background: CHULA_PINK, boxShadow: `0 8px 24px -6px ${CHULA_PINK}60` }}
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  กำลังเข้าสู่ระบบ...
                </span>
              ) : (
                'เข้าสู่ระบบ →'
              )}
            </button>
          </form>

          <p className="text-center text-xs text-slate-400 mt-8">
            โดยการเข้าสู่ระบบ คุณตกลงยอมรับ{" "}
            <a href="#" className="underline hover:text-slate-600">เงื่อนไขการใช้งาน</a>{" "}
            และ{" "}
            <a href="#" className="underline hover:text-slate-600">นโยบายความเป็นส่วนตัว</a>
          </p>
        </div>
      </div>
      </div>
    </div>
  );
}
