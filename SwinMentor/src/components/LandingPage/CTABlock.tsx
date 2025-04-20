import { Link } from "react-router-dom";
import { useAuthContext } from "@/Hooks/Context/useAuthContext";

const CTABlock = () =>{
    const {user} = useAuthContext();
    return (
    <>
      <section className="bg-red-600 py-20 text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">Ready to Conquer Your Units?</h2>
          <p className="text-red-100 text-xl mb-8 max-w-2xl mx-auto">
            Join your peers, unlock powerful study tools, and make this semester your most successful yet.
          </p>
           {user ? (
               <Link to="/dashboard" className="bg-white text-red-600 px-10 py-4 rounded-lg font-semibold text-lg hover:bg-red-100 transition-colors inline-block shadow-lg">
                 Go to Dashboard
               </Link>
            ) : (
              <Link to="/signup" className="bg-white text-red-600 px-10 py-4 rounded-lg font-semibold text-lg hover:bg-red-100 transition-colors inline-block shadow-lg">
                Sign Up Free
              </Link>
           )}
        </div>
      </section>
    </>
    )
}

export default  CTABlock;