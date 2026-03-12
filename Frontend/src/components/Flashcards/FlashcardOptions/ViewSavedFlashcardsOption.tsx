import { FaBookmark, FaArrowRight } from "react-icons/fa"
import { Link } from "react-router-dom"

export const ViewSavedFlashcardsOption = () => {
    return (
        <Link to="/flashcardsaved" className="group block h-full">
            <div className="relative h-full overflow-hidden rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-red-100 hover:shadow-md">
                <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-red-50" />

                <div className="relative flex flex-col gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-red-600">
                        <FaBookmark className="h-5 w-5" />
                    </div>
                    <div>
                        <p className="text-sm font-bold text-gray-900">Saved Cards</p>
                        <p className="mt-1 text-xs leading-relaxed text-gray-500">
                            Review the flashcards you've bookmarked for later.
                        </p>
                    </div>
                    <div className="flex items-center gap-1 text-xs font-semibold text-gray-400 transition-all group-hover:gap-2 group-hover:text-red-600">
                        <span>View saved</span>
                        <FaArrowRight className="h-3 w-3" />
                    </div>
                </div>
            </div>
        </Link>
    )
}
