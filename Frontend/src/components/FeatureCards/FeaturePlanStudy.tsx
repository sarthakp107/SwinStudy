import { FaCalendar } from "react-icons/fa"
import { Link } from "react-router-dom"

const FeaturePlanStudy = () =>{
    return (
    <>
    {/* Plan your Study Card */}
        <div className="bg-white text-gray-800 p-6 rounded-lg shadow-md flex flex-col items-center justify-center text-center transition duration-300 hover:bg-gray-50 hover:shadow-lg cursor-pointer border border-gray-200">
            <Link to="/study-plan" className="w-full h-full flex flex-col items-center justify-center"> 
            <FaCalendar className="w-10 h-10 mb-3 text-red-600"/>
                <span className="text-lg font-semibold">Plan Your Study</span>
            </Link>
        </div>
    </>
    )
}
export default FeaturePlanStudy;