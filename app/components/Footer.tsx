import { CHULA_PINK } from "../lib/data";

export default function Footer() {
  return (
    <footer className="border-t border-pink-100 py-10 px-6 bg-pink-50">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-400">
        <div className="flex items-center gap-2 font-semibold text-slate-700">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center text-white font-bold text-xs"
            style={{ background: CHULA_PINK }}
          >
            TT
          </div>
          TTDev — คอร์สเรียนสาย Coding by CEDT Chula 🌸
        </div>
        <p>© 2026 TTDev. สงวนลิขสิทธิ์ทุกประการ</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-pink-600 transition-colors">
            นโยบายความเป็นส่วนตัว
          </a>
          <a href="#" className="hover:text-pink-600 transition-colors">
            ติดต่อเรา
          </a>
        </div>
      </div>
    </footer>
  );
}
