import {  FaPlusCircle } from "react-icons/fa"
import { Link } from "react-router-dom"

const cardBaseClasses = "flex flex-col items-center justify-center p-6 rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:scale-105";
const iconBaseClasses = "mb-3 text-4xl";
const textBaseClasses = "text-lg font-semibold text-center";

export const CreateFlashcardsOption = () => {
    return (
        <Link to={"/flashcardupload"} className={`${cardBaseClasses} bg-red-600 text-white hover:bg-red-700`}>
            <FaPlusCircle className={iconBaseClasses} /> {/* Replaced FaPen with PlusCircle */}
            <span className={textBaseClasses}>Create Flashcards</span>
        </Link>
    );
}
