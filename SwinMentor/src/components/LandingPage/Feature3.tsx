import { Link } from "react-router-dom"
import { FaCalendarDay } from "react-icons/fa"

const Feature3 = () =>{
    return (
    <>
        <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 lg:pr-16 mb-8 lg:mb-0">
                <div className="w-full h-64 bg-red-500 flex items-center justify-center rounded-lg">
                    <FaCalendarDay className="w-20 h-20 text-white"/> 
                </div>
            </div>
            <div className="lg:w-1/2 text-center lg:text-left">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Customizable Study Plans</h3>
                <p className="text-lg text-gray-700 mb-6">
                Organize your workload unit by unit. Create flexible study schedules that fit your life and help you stay on track throughout the semester.
                </p>
                {/* Link to Study Plan Feature - update path */}
                <Link to="/study-plans" className="text-red-600 font-semibold hover:underline">
                    Plan Your Semester <span aria-hidden="true">&rarr;</span>
                </Link>
            </div>
        </div>
    </>
    )
}

export default Feature3;