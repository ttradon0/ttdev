import { CHULA_PINK, courses } from "../lib/data";

export default function Courses() {
  return (
    <section id="courses" className="py-24 px-6 relative">
      <div
        className="absolute top-0  h-1/2 bg-slate-50 -z-10"
        style={{
          background: `linear-gradient(to bottom, #f8fafc, white)`,
        }}
      />
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              คอร์สเรียนยอดนิยม 🔥
            </h2>
            <p className="text-slate-500 text-lg">
              อัปเดตเนื้อหาใหม่ล่าสุดปี 2026 เรียนรู้เทคโนโลยีที่ตลาดงานต้องการมากที่สุด
            </p>
          </div>
          <button
            className="shrink-0 font-semibold px-6 py-3 rounded-xl border-2 transition-all hover:bg-slate-50"
            style={{ color: CHULA_PINK, borderColor: `${CHULA_PINK}40` }}
          >
            ดูทั้งหมด 30+ คอร์ส →
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <div
              key={course.id}
              className="group bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-2xl hover:border-pink-200 transition-all duration-300 flex flex-col h-full cursor-pointer"
            >
              <div
                className="h-48 relative overflow-hidden flex items-center justify-center text-6xl"
                style={{
                  background: `linear-gradient(135deg, ${CHULA_PINK}15, #ff69b420)`,
                }}
              >
                <div className="group-hover:scale-110 transition-transform duration-500">
                  {course.icon}
                </div>
                <div className="absolute top-4 left-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${course.badgeCls}`}
                  >
                    {course.badge}
                  </span>
                </div>
              </div>
              <div className="p-8 flex flex-col flex-1">
                <div className="flex items-center gap-4 text-xs font-medium text-slate-400 mb-4">
                  <span className="flex items-center gap-1">
                    📚 {course.lessons} บทเรียน
                  </span>
                  <span className="flex items-center gap-1">
                    ⏱️ {course.hours} ชม.
                  </span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-pink-600 transition-colors">
                  {course.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-8 flex-1">
                  {course.desc}
                </p>
                <div className="flex items-center justify-between pt-6 border-t border-slate-100 mt-auto">
                  <div className="text-xs text-slate-400 font-medium">
                    ผู้เรียน {course.students} คน
                  </div>
                  <div className="text-xl font-bold text-slate-900">
                    ฿{course.price}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
