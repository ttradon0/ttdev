import { CHULA_PINK, features } from "../lib/data";

export default function Features() {
  return (
    <section id="features" className="py-24 bg-slate-50 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span
            className="font-semibold tracking-wider text-sm uppercase mb-3 block"
            style={{ color: CHULA_PINK }}
          >
            Why Choose Us
          </span>
          <h2 className="text-4xl font-bold text-slate-900 mb-6 leading-tight">
            ทำไมใครๆ ก็เลือกเรียนกับ TTDev?
          </h2>
          <p className="text-slate-500 text-lg">
            เราออกแบบระบบการเรียนให้เข้ากับคนรุ่นใหม่
            เน้นความเข้าใจและการนำไปใช้จริง ไม่ใช่แค่การท่องจำ
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f, i) => (
            <div
              key={i}
              className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-6 shadow-md"
                style={{
                  background: `linear-gradient(135deg, ${CHULA_PINK}, #ff69b4)`,
                }}
              >
                <div className="bg-white/20 backdrop-blur w-full h-full rounded-2xl flex items-center justify-center">
                  {f.icon}
                </div>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                {f.title}
              </h3>
              <p className="text-slate-500 leading-relaxed text-sm">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
