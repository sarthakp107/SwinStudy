import { FaUserFriends } from "react-icons/fa"
import { Link } from "react-router-dom"

const FeatureFindBuddies = () =>{
    return (
    <>
    {/* Find a buddy Card */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden transition duration-300 hover:shadow-lg border-t-4 border-red-500">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-red-100 rounded-full mr-4">
                  <FaUserFriends className="text-red-600 text-xl" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800">Find a Buddy</h3>
              </div>
              <p className="text-gray-600 mb-6">
                Partner with someone who shares your interests for collaborative projects.
              </p>
              <Link to="/buddies" className="inline-block px-4 py-2 bg-red-600 text-white rounded-md font-medium transition hover:bg-red-700">
                Learn More
              </Link>
            </div>
        </div>
    </>
    )
}

export default FeatureFindBuddies;