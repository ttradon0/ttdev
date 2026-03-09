"use client";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";

const CHULA_PINK = "#E8006F";

export default function Navbar() {
  const { data: session, status } = useSession();
  const [showMenu, setShowMenu] = useState(false);
  const isLoading = status === "loading";

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
          {isLoading ? (
            <div className="w-8 h-8 rounded-full border-2 border-pink-200 border-t-pink-600 animate-spin" />
          ) : session?.user ? (
            <div className="relative">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-pink-50 hover:bg-pink-100 transition-colors"
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold text-sm"
                  style={{ background: CHULA_PINK }}
                >
                  {session.user.name?.charAt(0).toUpperCase() || session.user.email?.charAt(0).toUpperCase()}
                </div>
                <span className="text-sm font-medium text-slate-700 hidden sm:block">
                  {session.user.name || session.user.email}
                </span>
                <svg className={`w-4 h-4 text-slate-500 transition-transform ${showMenu ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {showMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-100 py-2 z-50">
                  <div className="px-4 py-2 border-b border-slate-100">
                    <p className="text-sm font-medium text-slate-900">{session.user.name || 'User'}</p>
                    <p className="text-xs text-slate-500 truncate">{session.user.email}</p>
                  </div>
                  <Link
                    href="/dashboard"
                    className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                  >
                    แดชบอร์ด
                  </Link>
                  <Link
                    href="/settings"
                    className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                  >
                    การตั้งค่า
                  </Link>
                  <button
                    onClick={() => {
                      signOut({ callbackUrl: "/" });
                      setShowMenu(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                  >
                    ออกจากระบบ
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
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
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
