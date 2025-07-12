import { FaBookmark } from "react-icons/fa"
import { Link } from "react-router-dom"

const cardBaseClasses = "flex flex-col items-center justify-center p-6 rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:scale-105";
const iconBaseClasses = "mb-3 text-4xl";
const textBaseClasses = "text-lg font-semibold text-center";


export const ViewSavedFlashcardsOption = () => {
    return (
        <Link to={"/flashcardsaved"} className={`${cardBaseClasses} bg-black text-white hover:bg-gray-800`}>
            <FaBookmark className={iconBaseClasses} /> {/* Replaced FaSave with Bookmark */}
            <span className={textBaseClasses}>View Saved Flashcards</span>
        </Link>
    );
}
