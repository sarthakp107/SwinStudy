import { FaGraduationCap, FaArrowRight } from "react-icons/fa"
import { Link } from "react-router-dom"

const FeatureMentor = () => {
    return (
        <Link to="/mentors" className="group block h-full">
            <div className="relative h-full overflow-hidden rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-amber-100 hover:shadow-md">
                {/* decorative circle */}
                <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-amber-50" />

                <div className="relative flex flex-col gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                        <FaGraduationCap className="h-5 w-5" />
                    </div>
                    <div>
                        <p className="text-sm font-bold text-gray-900">
                            Explore Mentors
                            <span className="ml-2 inline-block rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-semibold text-amber-700">
                                Soon
                            </span>
                        </p>
                        <p className="mt-1 text-xs leading-relaxed text-gray-500">
                            Get matched with senior students who aced your units.
                        </p>
                    </div>
                    <div className="flex items-center gap-1 text-xs font-semibold text-gray-400 transition-all group-hover:gap-2 group-hover:text-amber-600">
                        <span>See mentors</span>
                        <FaArrowRight className="h-3 w-3" />
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default FeatureMentor;
