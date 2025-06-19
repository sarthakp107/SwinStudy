import { FaBook } from "react-icons/fa"
import { Link } from "react-router-dom"

const FeatureFlashcards = () =>{
    return (
    <>
      {/* Flashcard */}
      <div className="bg-red-600 text-white p-6 rounded-lg shadow-md flex flex-col items-center justify-center text-center transition duration-300 hover:bg-red-700 hover:shadow-lg cursor-pointer">
        <Link to="/upload" className="w-full h-full flex flex-col items-center justify-center"> 
        <FaBook className="w-10 h-10 mb-3 text-white" /> 
          <span className="text-lg font-semibold">Create Flashcards</span>
        </Link>
      </div>
    </>
    )
}
export default FeatureFlashcards;

