import { useAuthContext } from "@/Hooks/Context/useAuthContext" 
import useUserProfile from "@/Hooks/GetUserInfo/useUserProfile";
import { Link } from "react-router-dom";
const TitleAndButton = () =>{
    const {user} = useAuthContext();
    const {displayName} = useUserProfile();
    return(
        <>
            <div className="lg:w-1/2 lg:pr-16 mb-12 lg:mb-0 text-center lg:text-left">
                <p className="text-red-600 text-lg font-semibold mb-3">Your Swinburne Study Advantage</p>
                {/* Dynamic Headline */}
                {user ? (
                    <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                        Welcome back, <span className="text-red-600">{displayName || 'Swinburne Student'}!</span>
                        <br /> Let's boost your <span className="text-red-600">studies</span>.
                    </h1>
                ) : (
                    <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                        Unlock Your Full Potential as a <span className="text-red-600">Swinburne Student</span>
                    </h1>
                )}
                <p className="text-xl text-gray-700 mb-8 max-w-lg lg:max-w-none mx-auto lg:mx-0">
                    Find study buddies, generate flashcards from notes, and create personalized study plans - all in one place, built specifically for Swinburne University.
                </p>

                {/* Buttons Div */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                    {user ? (
                        <Link to="/dashboard" className="bg-red-600 text-white px-10 py-4 rounded-lg font-semibold text-lg hover:bg-red-700 transition-colors shadow-lg">
                            Go to Dashboard
                        </Link>
                    ) : (
                        <Link to="/signup" className="bg-red-600 text-white px-10 py-4 rounded-lg font-semibold text-lg hover:bg-red-700 transition-colors shadow-lg">
                            Get Started for Free
                        </Link>
                    )}
                    <Link to="/features" className="border-2 border-red-600 text-red-600 px-10 py-4 rounded-lg font-semibold text-lg hover:bg-red-50 transition-colors">
                        Learn More
                    </Link>
                </div>
                
            </div> 
        </>
    )
}

export default TitleAndButton