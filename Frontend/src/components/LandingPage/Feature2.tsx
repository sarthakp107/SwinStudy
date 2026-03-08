import { Link } from "react-router-dom"

const Feature2 = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
      <div className="min-h-[280px] flex items-end justify-center order-2 lg:order-2">
        <img
          src="/buddies.png"
          alt="Smart flashcards from your notes"
          className="w-full max-w-lg object-contain object-bottom mix-blend-multiply"
        />
      </div>
      <div className="text-center lg:text-right order-1 lg:order-1">
        <span className="inline-block px-4 py-1.5 rounded-full bg-amber-50 text-amber-700 text-sm font-semibold mb-6">
          AI-Powered
        </span>
        <h3 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6 leading-tight">
          Smart Flashcards from Your Notes
        </h3>
        <p className="text-lg text-slate-600 mb-8 leading-relaxed">
          Upload lecture slides, readings, or notes (PDF, DOCX, TXT). Our AI generates personalized flashcards for active, effective revision.
        </p>
        <Link
          to="/upload"
          className="inline-flex items-center gap-2 text-red-600 font-semibold hover:text-red-700 transition-colors group"
        >
          Generate Your First Deck
          <span className="group-hover:translate-x-1 transition-transform">→</span>
        </Link>
      </div>
    </div>
  )
}

export default Feature2
