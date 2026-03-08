import { Link } from "react-router-dom"

const Feature3 = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
      <div className="min-h-[280px] flex items-center justify-center order-2 lg:order-1">
          <img
          src="/rocket.png"
          alt="Customizable study plans"
          className="w-full max-w-lg object-contain object-bottom mix-blend-multiply"
          />
      </div>
      <div className="text-center lg:text-left order-1 lg:order-2">
        <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-sm font-semibold mb-6">
          Organize
        </span>
        <h3 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6 leading-tight">
          Customizable Study Plans
        </h3>
        <p className="text-lg text-slate-600 mb-8 leading-relaxed">
          Organize your workload unit by unit. Create flexible study schedules that fit your life and keep you on track throughout the semester.
        </p>
        <Link
          to="/smartstudy"
          className="inline-flex items-center gap-2 text-red-600 font-semibold hover:text-red-700 transition-colors group"
        >
          Plan Your Semester
          <span className="group-hover:translate-x-1 transition-transform">→</span>
        </Link>
      </div>
    </div>
  )
}

export default Feature3
