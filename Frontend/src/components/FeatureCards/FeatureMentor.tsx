import { FaGraduationCap } from "react-icons/fa"
import { Link } from "react-router-dom"

const FeatureMentor = () =>{
    return (
    <>
    {/* Find a Mentor Card */}
        <div className="bg-white text-gray-800 p-6 rounded-lg shadow-md flex flex-col items-center justify-center text-center transition duration-300 hover:bg-gray-50 hover:shadow-lg cursor-pointer border border-gray-200">
            <Link to="/mentors" className="w-full h-full flex flex-col items-center justify-center"> 
            <FaGraduationCap className="w-10 h-10 mb-3 text-black" /> 
                <span className="text-lg font-semibold">Explore Mentors</span>
            </Link>
        </div>
    </>
    )
}
export default FeatureMentor;