import { FaBook, FaArrowRight } from "react-icons/fa"
import { Link } from "react-router-dom"

const FeatureFlashcards = () => {
    return (
        <Link to="/flashcardupload" className="group block h-full">
            <div className="relative h-full overflow-hidden rounded-2xl bg-gradient-to-br from-red-600 to-red-700 p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-red-200 hover:shadow-lg">
                {/* decorative circle */}
                <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-white/10" />
                <div className="absolute -bottom-6 -right-2 h-16 w-16 rounded-full bg-white/5" />

                <div className="relative flex flex-col gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/20 text-white">
                        <FaBook className="h-5 w-5" />
                    </div>
                    <div>
                        <p className="text-sm font-bold text-white">Create Flashcards</p>
                        <p className="mt-1 text-xs leading-relaxed text-red-100">
                            Upload notes and generate smart study decks instantly.
                        </p>
                    </div>
                    <div className="flex items-center gap-1 text-xs font-semibold text-white/80 transition-all group-hover:gap-2 group-hover:text-white">
                        <span>Get started</span>
                        <FaArrowRight className="h-3 w-3" />
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default FeatureFlashcards;
