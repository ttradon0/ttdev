import TypewriterHero from "./TypewriterHero";
import CodeEditorAnimation from "./CodeEditorAnimation";
import { CHULA_PINK, stats } from "../lib/data";

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-40 pb-20 px-6">
      {/* Background blobs */}
      <div className="absolute -top-32 -right-32 w-[600px] h-[600px] bg-pink-100 rounded-full blur-3xl opacity-60 pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-rose-100 rounded-full blur-3xl opacity-50 pointer-events-none" />

      <div className="relative max-w-[85%] mx-auto grid lg:grid-cols-2 gap-24 lg:gap-32 items-center">
        {/* Left — Text */}
        <div>
          <span
            className="inline-block mb-8 px-4 py-1.5 rounded-full bg-pink-50 border border-pink-200 text-sm font-semibold tracking-wide"
            style={{ color: CHULA_PINK }}
          >
            🎓 นิสิต CEDT จุฬาฯ แนะนำ — เรียนโค้ดดิ้งที่ดีที่สุด
          </span>
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 leading-tight mb-6">
            เริ่มต้นสาย <TypewriterHero /> ได้วันนี้
          </h1>
          <p className="text-lg md:text-xl text-slate-500 mb-10 leading-relaxed">
            อัปสกิลอัพเงินเดือน กับคอร์สเรียนรูปแบบ Interactive <br className="hidden md:block" />
            สอนโดยผู้เชี่ยวชาญจากบริษัทชั้นนำ เรียนสนุก ได้ลงมือทำจริง
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#courses"
              className="inline-flex items-center justify-center gap-2 text-white font-semibold px-8 py-4 rounded-2xl text-lg active:scale-95 transition-all shadow-lg"
              style={{
                background: CHULA_PINK,
                boxShadow: `0 10px 30px -8px ${CHULA_PINK}80`,
              }}
            >
              ดูคอร์สทั้งหมด <span>→</span>
            </a>
            <a
              href="#features"
              className="inline-flex items-center justify-center gap-2 bg-white border-2 border-slate-200 hover:border-pink-300 text-slate-700 font-semibold px-8 py-4 rounded-2xl text-lg transition-all"
            >
              ทำไมต้องเรา?
            </a>
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-5 text-sm text-slate-500">
            <span>✅ ไม่ต้องใช้บัตรเครดิต</span>
            <span>✅ เรียนได้ตลอดชีพ</span>
            <span>✅ Certificate จริง</span>
          </div>
        </div>

        {/* Right — Code Editor Animation */}
        <div className="relative flex items-center justify-center">
          <div
            className="absolute inset-0 rounded-3xl blur-2xl opacity-30 scale-95 pointer-events-none"
            style={{
              background: `linear-gradient(135deg, ${CHULA_PINK}60, #ff69b460)`,
            }}
          />

          <CodeEditorAnimation />

          {/* Floating badges */}
          <div className="absolute -top-4 -right-4 bg-white border border-slate-100 shadow-lg rounded-xl px-4 py-2 flex items-center gap-2 text-sm font-semibold text-slate-700 z-10">
            <span className="text-green-500">●</span> Live Preview
          </div>
          <div className="absolute -bottom-4 -left-4 bg-white border border-slate-100 shadow-lg rounded-xl px-4 py-2 flex items-center gap-2 text-sm font-semibold text-slate-700 z-10">
            🏆 <span>5,800+ Students</span>
          </div>
        </div>
      </div>

      {/* Stats strip */}
      <div className="relative max-w-4xl mx-auto mt-24">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="bg-white border border-slate-100 rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="text-3xl font-bold text-slate-900 mb-1">
                {s.value}
              </div>
              <div className="text-sm font-medium" style={{ color: CHULA_PINK }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
