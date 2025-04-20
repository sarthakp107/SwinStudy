import { Link } from "react-router-dom"
import { FaUser } from "react-icons/fa"

const Feature1 = () =>{
    return (
    <>
        <div className="flex flex-col lg:flex-row items-center mb-20 lg:mb-32">
          <div className="lg:w-1/2 lg:pr-16 mb-8 lg:mb-0">
            <div className="w-full h-64 bg-red-100 flex items-center justify-center rounded-lg">
                <FaUser className="w-20 h-20 text-red-600"/> 
            </div>
          </div>
          <div className="lg:w-1/2 text-center lg:text-left">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Connect & Collaborate</h3>
            <p className="text-lg text-gray-700 mb-6">
              Find unit buddies, form study groups, and connect with mentors across Swinburne. Share resources and tackle challenging units together.
            </p>
            <Link to="/unit-buddies" className="text-red-600 font-semibold hover:underline">
                Explore Unit Buddies & Mentors <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
    </>
    )
}

export default Feature1;