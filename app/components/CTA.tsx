import { CHULA_PINK } from "../lib/data";

export default function CTA() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <div
          className="border border-pink-100 rounded-3xl p-12 shadow-lg"
          style={{ background: `linear-gradient(135deg, #fff0f6, #ffffff, #fff0f6)` }}
        >
          <div className="text-5xl mb-4">🎯</div>
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            พร้อมเริ่มต้นแล้วหรือยัง?
          </h2>
          <p className="text-slate-500 text-lg mb-8 leading-relaxed">
            สมัครฟรีวันนี้ เข้าถึงบทเรียนตัวอย่างทุกคอร์ส<br />
            ไม่ต้องใช้บัตรเครดิต ไม่มีสัญญาผูกมัด
          </p>
          <button
            className="text-white font-bold px-12 py-4 rounded-2xl text-xl active:scale-95 transition-all shadow-xl"
            style={{
              background: CHULA_PINK,
              boxShadow: `0 15px 40px -10px ${CHULA_PINK}80`,
            }}
          >
            สมัครสมาชิกฟรี
          </button>
          <p className="text-xs text-slate-400 mt-4">
            เข้าร่วมกับผู้เรียนกว่า 15,000 คนแล้ววันนี้
          </p>
        </div>
      </div>
    </section>
  );
}
