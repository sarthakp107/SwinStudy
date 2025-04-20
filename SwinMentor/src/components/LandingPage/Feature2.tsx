import { Link } from "react-router-dom"
import { FaBookOpen } from "react-icons/fa"

const Feature2 = () =>{
    return (
    <>
        <div className="flex flex-col lg:flex-row-reverse items-center mb-20 lg:mb-32">
            <div className="lg:w-1/2 lg:pl-16 mb-8 lg:mb-0">
                <div className="w-full h-64 bg-black flex items-center justify-center rounded-lg">
                    <FaBookOpen className="w-20 h-20 text-white"/>
                </div>
            </div>
            <div className="lg:w-1/2 text-center lg:text-left">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Smart Flashcards from Your Notes</h3>
                <p className="text-lg text-gray-700 mb-6">
                Upload your lecture slides, readings, or notes (PDF, DOCX, TXT). Our AI instantly generates personalized flashcards to make revision active and effective.
                </p>
                <Link to="/upload" className="text-red-600 font-semibold hover:underline">
                    Generate Your First Deck <span aria-hidden="true">&rarr;</span>
                </Link>
            </div>
        </div>
    </>
    )
}

export default Feature2;