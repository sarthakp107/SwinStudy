import { FaRandom, FaArrowRight } from "react-icons/fa"
import { Link } from "react-router-dom"

export const RandomPreviouslyStudiedFlashcardsOption = () => {
    return (
        <Link to="/flashcardrandom" className="group block h-full">
            <div className="relative h-full overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-slate-300 hover:shadow-lg">
                <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-red-600/20" />
                <div className="absolute -bottom-6 -right-2 h-16 w-16 rounded-full bg-red-500/10" />

                <div className="relative flex flex-col gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-white">
                        <FaRandom className="h-5 w-5" />
                    </div>
                    <div>
                        <p className="text-sm font-bold text-white">Random Review</p>
                        <p className="mt-1 text-xs leading-relaxed text-slate-400">
                            Shuffle through cards you've already studied before.
                        </p>
                    </div>
                    <div className="flex items-center gap-1 text-xs font-semibold text-slate-400 transition-all group-hover:gap-2 group-hover:text-red-400">
                        <span>Start shuffle</span>
                        <FaArrowRight className="h-3 w-3" />
                    </div>
                </div>
            </div>
        </Link>
    )
}
