import { CHULA_PINK, testimonials } from "../lib/data";

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="py-24 px-6"
      style={{ background: `linear-gradient(135deg, ${CHULA_PINK}, #c0005a)` }}
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold text-white mb-3">
            เสียงจากผู้เรียนของเรา
          </h2>
          <p className="text-pink-200 text-lg">
            ผลลัพธ์จริงจากผู้ที่เรียนจบแล้ว
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-6 text-white"
            >
              <div className="text-4xl mb-4 text-pink-200">"</div>
              <p className="text-sm leading-relaxed text-pink-50 mb-6">
                {t.text}
              </p>
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-full ${t.avatarColor} flex items-center justify-center font-bold text-white text-sm`}
                >
                  {t.avatar}
                </div>
                <div>
                  <div className="font-semibold text-sm">{t.name}</div>
                  <div className="text-xs text-pink-200">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
