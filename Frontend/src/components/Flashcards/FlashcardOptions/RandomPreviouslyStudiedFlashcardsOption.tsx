import { FaBook, FaBookOpen } from "react-icons/fa"
import { Link } from "react-router-dom"

const cardBaseClasses = "flex flex-col items-center justify-center p-6 rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:scale-105";
const iconBaseClasses = "mb-3 text-4xl";
const textBaseClasses = "text-lg font-semibold text-center";


export const RandomPreviouslyStudiedFlashcardsOption = () => {
    return (
        <Link to={"/flashcardrandom"} className={`${cardBaseClasses} bg-white text-black border border-gray-200 hover:bg-gray-100`}>
            <FaBookOpen className={`${iconBaseClasses} text-red-600`} /> {/* Replaced FaBook with BookOpen, icon in red */}
            <span className={textBaseClasses}>Previously Studied Flashcards</span>
        </Link>
    );
}
