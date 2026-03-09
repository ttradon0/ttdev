"use client";
import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import LoginCodeAnimation from "../components/LoginCodeAnimation";

const CHULA_PINK = "#E8006F";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "student",
    agree: false,
  });

  const focusStyle = {
    borderColor: CHULA_PINK,
    boxShadow: `0 0 0 3px ${CHULA_PINK}20`,
  };
  const blurStyle = {
    borderColor: "#e2e8f0",
    boxShadow: "none",
  };

  const handleInput = (field: string, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const strength = (() => {
    const p = form.password;
    if (!p) return 0;
    let s = 0;
    if (p.length >= 8) s++;
    if (/[A-Z]/.test(p)) s++;
    if (/[0-9]/.test(p)) s++;
    if (/[^A-Za-z0-9]/.test(p)) s++;
    return s;
  })();

  const strengthLabel = ["", "อ่อนมาก", "อ่อน", "ปานกลาง", "แข็งแกร่ง"][strength];
  const strengthColor = ["", "#ef4444", "#f97316", "#eab308", "#22c55e"][strength];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!form.email || !form.password) {
      setError("กรุณากรอกอีเมลและรหัสผ่าน");
      return;
    }

    if (form.password.length < 8) {
      setError("รหัสผ่านต้องมีความยาวอย่างน้อย 8 ตัวอักษร");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("รหัสผ่านไม่ตรงกัน");
      return;
    }

    if (!form.agree) {
      setError("กรุณายอมรับเงื่อนไขการใช้งาน");
      return;
    }

    setIsLoading(true);

    try {
      const fullName = `${form.firstName} ${form.lastName}`.trim();
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
          name: fullName || undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "การลงทะเบียนล้มเหลว");
        return;
      }

      setSuccess(true);
      
      // Auto sign in after registration
      setTimeout(async () => {
        await signIn("credentials", {
          email: form.email,
          password: form.password,
          redirect: false,
        });
        router.push("/");
        router.refresh();
      }, 1500);
    } catch (err) {
      setError("เกิดข้อผิดพลาดที่ไม่สามารถระบุได้ กรุณาลองใหม่อีกครั้ง");
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
      {/* Left Panel — Form */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 bg-white overflow-y-auto">
        {/* Mobile logo */}
        <Link href="/" className="lg:hidden flex items-center gap-2 mb-8">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold text-sm"
            style={{ background: CHULA_PINK }}>TT</div>
          <span className="font-bold text-xl text-slate-900">TT<span style={{ color: CHULA_PINK }}>Dev</span></span>
        </Link>

        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">สร้างบัญชีใหม่</h1>
          <p className="text-slate-500 mb-8">
            มีบัญชีอยู่แล้ว?{" "}
            <Link href="/login" className="font-semibold hover:underline" style={{ color: CHULA_PINK }}>
              เข้าสู่ระบบ
            </Link>
          </p>

          {/* Social register */}
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
              สมัครด้วย Google
            </button>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-px bg-slate-100" />
            <span className="text-slate-400 text-sm">หรือกรอกข้อมูล</span>
            <div className="flex-1 h-px bg-slate-100" />
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Error/Success messages */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
                {error}
              </div>
            )}
            {success && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl text-sm">
                สมัครสมาชิกสำเร็จ! กำลังเข้าสู่ระบบ...
              </div>
            )}
            {/* Name row */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">ชื่อ</label>
                <input
                  type="text"
                  placeholder="สมชาย"
                  value={form.firstName}
                  onChange={(e) => handleInput("firstName", e.target.value)}
                  className="w-full border border-slate-200 bg-slate-50 focus:bg-white rounded-xl px-4 py-3 text-slate-800 placeholder-slate-400 text-sm outline-none transition-all"
                  onFocus={(e) => Object.assign(e.target.style, focusStyle)}
                  onBlur={(e) => Object.assign(e.target.style, blurStyle)}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">นามสกุล</label>
                <input
                  type="text"
                  placeholder="ใจดี"
                  value={form.lastName}
                  onChange={(e) => handleInput("lastName", e.target.value)}
                  className="w-full border border-slate-200 bg-slate-50 focus:bg-white rounded-xl px-4 py-3 text-slate-800 placeholder-slate-400 text-sm outline-none transition-all"
                  onFocus={(e) => Object.assign(e.target.style, focusStyle)}
                  onBlur={(e) => Object.assign(e.target.style, blurStyle)}
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">อีเมล</label>
              <input
                type="email"
                placeholder="example@email.com"
                value={form.email}
                onChange={(e) => handleInput("email", e.target.value)}
                className="w-full border border-slate-200 bg-slate-50 focus:bg-white rounded-xl px-4 py-3 text-slate-800 placeholder-slate-400 text-sm outline-none transition-all"
                onFocus={(e) => Object.assign(e.target.style, focusStyle)}
                onBlur={(e) => Object.assign(e.target.style, blurStyle)}
              />
            </div>

            {/* Role */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">คุณเป็น</label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: "student", label: "🎓 นักเรียน / นิสิต", desc: "ต้องการเรียน" },
                  { value: "professional", label: "💼 มืออาชีพ", desc: "ต้องการ Upskill" },
                ].map((r) => (
                  <button
                    key={r.value}
                    type="button"
                    onClick={() => handleInput("role", r.value)}
                    className="flex flex-col items-start p-3 rounded-xl border-2 text-left text-sm transition-all"
                    style={{
                      borderColor: form.role === r.value ? CHULA_PINK : "#e2e8f0",
                      background: form.role === r.value ? `${CHULA_PINK}08` : "white",
                    }}
                  >
                    <span className="font-semibold text-slate-800">{r.label}</span>
                    <span className="text-xs text-slate-400 mt-0.5">{r.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">รหัสผ่าน</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="อย่างน้อย 8 ตัวอักษร"
                  value={form.password}
                  onChange={(e) => handleInput("password", e.target.value)}
                  className="w-full border border-slate-200 bg-slate-50 focus:bg-white rounded-xl px-4 py-3 pr-12 text-slate-800 placeholder-slate-400 text-sm outline-none transition-all"
                  onFocus={(e) => Object.assign(e.target.style, focusStyle)}
                  onBlur={(e) => Object.assign(e.target.style, blurStyle)}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors">
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
              {/* Strength meter */}
              {form.password && (
                <div className="mt-2">
                  <div className="flex gap-1 mb-1">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="h-1.5 flex-1 rounded-full transition-all"
                        style={{ background: i <= strength ? strengthColor : "#e2e8f0" }} />
                    ))}
                  </div>
                  <p className="text-xs" style={{ color: strengthColor }}>รหัสผ่าน: {strengthLabel}</p>
                </div>
              )}
            </div>

            {/* Confirm password */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">ยืนยันรหัสผ่าน</label>
              <div className="relative">
                <input
                  type={showConfirm ? "text" : "password"}
                  placeholder="••••••••"
                  value={form.confirmPassword}
                  onChange={(e) => handleInput("confirmPassword", e.target.value)}
                  className="w-full border border-slate-200 bg-slate-50 focus:bg-white rounded-xl px-4 py-3 pr-12 text-slate-800 placeholder-slate-400 text-sm outline-none transition-all"
                  onFocus={(e) => Object.assign(e.target.style, focusStyle)}
                  onBlur={(e) => Object.assign(e.target.style, blurStyle)}
                />
                <button type="button" onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors">
                  {showConfirm ? "🙈" : "👁️"}
                </button>
              </div>
              {form.confirmPassword && form.password !== form.confirmPassword && (
                <p className="text-xs text-red-500 mt-1">รหัสผ่านไม่ตรงกัน</p>
              )}
              {form.confirmPassword && form.password === form.confirmPassword && (
                <p className="text-xs text-green-500 mt-1">✓ รหัสผ่านตรงกัน</p>
              )}
            </div>

            {/* Terms */}
            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                id="agree"
                checked={form.agree}
                onChange={(e) => handleInput("agree", e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded"
                style={{ accentColor: CHULA_PINK }}
              />
              <label htmlFor="agree" className="text-sm text-slate-600 leading-relaxed">
                ฉันยอมรับ{" "}
                <a href="#" className="font-semibold underline" style={{ color: CHULA_PINK }}>เงื่อนไขการใช้งาน</a>
                {" "}และ{" "}
                <a href="#" className="font-semibold underline" style={{ color: CHULA_PINK }}>นโยบายความเป็นส่วนตัว</a>
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading || success}
              className="w-full text-white font-semibold py-3.5 rounded-xl text-base active:scale-[0.98] transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ background: CHULA_PINK, boxShadow: `0 8px 24px -6px ${CHULA_PINK}60` }}
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  กำลังลงทะเบียน...
                </span>
              ) : success ? (
                'ลงทะเบียนสำเร็จ ✓'
              ) : (
                'สมัครสมาชิกฟรี 🎉'
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Right Panel — Branding */}
      <div
        className="hidden lg:flex lg:w-5/12 flex-col items-center justify-center px-14 relative overflow-hidden"
        style={{ background: `linear-gradient(145deg, #c0005a, ${CHULA_PINK})` }}
      >
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full opacity-20 bg-white" />
        <div className="absolute -bottom-32 -left-16 w-96 h-96 rounded-full opacity-10 bg-white" />

        <div className="relative z-10 text-center text-white">
          <Link href="/" className="inline-flex items-center gap-3 mb-10">
            <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center font-bold text-xl">
              TT
            </div>
            <span className="text-2xl font-bold">TTDev</span>
          </Link>

          <h2 className="text-3xl font-bold mb-4">เริ่มต้นวันนี้ได้เลย! 🚀</h2>
          <p className="text-pink-100 text-lg leading-relaxed mb-6">
            เข้าร่วมกับผู้เรียนกว่า 15,000 คน<br />
            และเริ่มต้นสาย Coding ของคุณ
          </p>
          
          <div className="mb-8 w-full max-w-[340px] mx-auto opacity-90 scale-95">
            <LoginCodeAnimation />
          </div>

          {/* Benefit list */}
          <div className="space-y-4 text-left">
            {[
              { icon: "🎓", title: "Certificate รับรองจริง", desc: "นำไปประกอบ Portfolio ได้" },
              { icon: "💻", title: "Workshop ทุกบทเรียน", desc: "Practice ลงมือทำจริงทุกคาบ" },
              { icon: "♾️", title: "เรียนได้ตลอดชีพ", desc: "ซื้อครั้งเดียว ดูได้ตลอด" },
              { icon: "👥", title: "Community Discord", desc: "ถามอาจารย์ได้ตลอด 24 ชม." },
            ].map((b) => (
              <div key={b.title} className="flex items-center gap-4 bg-white/10 backdrop-blur border border-white/20 rounded-xl px-4 py-3">
                <span className="text-2xl">{b.icon}</span>
                <div>
                  <div className="font-semibold text-sm">{b.title}</div>
                  <div className="text-xs text-pink-200">{b.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
