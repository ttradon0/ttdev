"use client";
import Link from "next/link";

const CHULA_PINK = "#E8006F";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md shadow-sm border-b border-pink-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow"
            style={{ background: CHULA_PINK }}
          >
            TT
          </div>
          <span className="font-bold text-lg text-slate-900">
            TT<span style={{ color: CHULA_PINK }}>Dev</span>
          </span>
        </Link>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <a href="#courses" className="hover:text-pink-600 transition-colors">
            คอร์สทั้งหมด
          </a>
          <a href="#features" className="hover:text-pink-600 transition-colors">
            ทำไมต้องเรา
          </a>
          <a href="#testimonials" className="hover:text-pink-600 transition-colors">
            รีวิว
          </a>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="hidden sm:block text-sm font-medium text-slate-600 hover:text-pink-600 transition-colors px-4 py-2"
          >
            เข้าสู่ระบบ
          </Link>
          <Link
            href="/register"
            className="text-sm font-semibold text-white px-5 py-2 rounded-full active:scale-95 transition-all shadow-sm"
            style={{ background: CHULA_PINK }}
          >
            สมัครฟรี
          </Link>
        </div>
      </div>
    </nav>
  );
}
