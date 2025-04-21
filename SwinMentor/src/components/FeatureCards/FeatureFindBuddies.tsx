import { FaUserFriends } from "react-icons/fa"
import { Link } from "react-router-dom"

const FeatureFindBuddies = () =>{
    return (
    <>
    {/* Find a buddy Card */}
      <div className="bg-black text-white p-6 rounded-lg shadow-md flex flex-col items-center justify-center text-center transition duration-300 hover:bg-gray-800 hover:shadow-lg cursor-pointer">
            <Link to="/buddies" className="w-full h-full flex flex-col items-center justify-center"> 
            <FaUserFriends className="w-10 h-10 mb-3 text-white" />
                <span className="text-lg font-semibold">Find Unit Buddies</span>
            </Link>
      </div>
    </>
    )
}
export default FeatureFindBuddies;