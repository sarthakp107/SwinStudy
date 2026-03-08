import { Link } from "react-router-dom"
import { useAuthContext } from "@/Hooks/Context/useAuthContext"

const CTABlock = () => {
  const { user } = useAuthContext()

  return (
    <section
      className="relative min-h-screen flex items-center justify-center py-28 overflow-hidden"
      style={{
        backgroundImage: `url("/king.png")`,
        backgroundSize: "cover",
        backgroundPosition: "center right",
      }}
    >
      {/* Gradient overlay - blends king sketch with red tone */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, rgba(220, 38, 38, 0.82) 0%, rgba(190, 18, 60, 0.72) 50%, rgba(190, 18, 60, 0.65) 100%)",
        }}
      />
      <div className="relative z-10 container mx-auto px-6 max-w-3xl text-center">
        <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6 leading-tight">
          Ready to Conquer Your Units?
        </h2>
        <p className="text-red-100 text-xl mb-10 max-w-xl mx-auto leading-relaxed">
          Join your peers, unlock powerful study tools, and make this semester your most successful yet.
        </p>
        {user ? (
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 bg-white text-red-600 px-10 py-4 rounded-full font-semibold text-lg hover:bg-slate-50 hover:shadow-xl transition-all shadow-lg"
          >
            Go to Dashboard
            <span>→</span>
          </Link>
        ) : (
          <Link
            to="/signup"
            className="inline-flex items-center gap-2 bg-white text-red-600 px-10 py-4 rounded-full font-semibold text-lg hover:bg-slate-50 hover:shadow-xl transition-all shadow-lg"
          >
            Sign Up Free
            <span>→</span>
          </Link>
        )}
      </div>
    </section>
  )
}

export default CTABlock
