import { FaGraduationCap } from "react-icons/fa"
import { Link } from "react-router-dom"

const cardBaseClasses = "flex flex-col items-center justify-center p-6 rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:scale-105";
const iconBaseClasses = "mb-3 text-4xl";
const textBaseClasses = "text-lg font-semibold text-center";

export const TestOption = () => {
    return (
        <Link to={"/flashcardtest"} className={`${cardBaseClasses} bg-white text-black border border-gray-200 hover:bg-gray-100`}>
            <FaGraduationCap className={`${iconBaseClasses} text-black`} /> {/* Retained GraduationCap, icon in black */}
            <span className={textBaseClasses}>Test Mode</span>
        </Link>
    );
}
