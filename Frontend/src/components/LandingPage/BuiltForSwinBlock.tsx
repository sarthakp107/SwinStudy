import { Link } from "react-router-dom"
import { useAuthContext } from "@/Hooks/Context/useAuthContext"
import { ScrollReveal } from "@/components/ScrollReveal"

const BuiltForSwinBlock = () => {
  const { user } = useAuthContext()

  return (
    <section className="relative min-h-screen flex flex-col bg-slate-50 overflow-hidden">
      {/* King sketch - full right, darker */}
      <div
        className="absolute inset-0 opacity-[0.28] mix-blend-multiply"
        style={{
          backgroundImage: `url("/king.png")`,
          backgroundSize: "cover",
          backgroundPosition: "75% 50%",
        }}
      />
      {/* Left gradient - blends left content area with slate-50 */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(to right, rgb(248 250 252) 0%, rgb(248 250 252) 40%, transparent 70%)",
        }}
      />

      {/* Top: Built for Swinburne */}
      <div className="relative z-10 flex-1 flex items-center justify-center py-20 lg:py-24 px-8 lg:px-16 min-h-[50vh]">
        <ScrollReveal className="max-w-3xl text-center">
          <p className="text-red-600 text-sm font-semibold tracking-[0.2em] uppercase mb-6">
            By Students, For Students
          </p>
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6 leading-tight">
            Built For Swinburne Students,<br />
            <span className="text-red-600">By Swinburne Students</span>
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed mb-8">
            We understand the unique challenges and opportunities at Swinburne. Our platform is tailored to help you navigate your university journey and succeed within the Swinburne community.
          </p>
          <div className="flex flex-wrap gap-4 text-slate-500 text-sm justify-center">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500" />
              Unit-specific
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500" />
              Community-driven
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500" />
              Designed for Swinburne
            </span>
          </div>
        </ScrollReveal>
      </div>

      {/* Bottom: Conquer your units */}
      <div className="relative z-10 flex-1 flex items-center justify-center py-20 lg:py-24 px-8 lg:px-16 min-h-[50vh] border-t border-slate-200">
        <ScrollReveal delay={100} className="max-w-3xl text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6 leading-tight">
            Ready to Conquer Your Units?
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed mb-10">
            Join your peers, unlock powerful study tools, and make this semester your most successful yet.
          </p>
          {user ? (
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 bg-red-600 text-white px-10 py-4 rounded-full font-semibold text-lg hover:bg-red-700 hover:shadow-xl transition-all shadow-lg"
            >
              Go to Dashboard
              <span>→</span>
            </Link>
          ) : (
            <Link
              to="/signup"
              className="inline-flex items-center gap-2 bg-red-600 text-white px-10 py-4 rounded-full font-semibold text-lg hover:bg-red-700 hover:shadow-xl transition-all shadow-lg"
            >
              Sign Up Free
              <span>→</span>
            </Link>
          )}
        </ScrollReveal>
      </div>
    </section>
  )
}

export default BuiltForSwinBlock
