import { FaSave } from "react-icons/fa"
import { Link } from "react-router-dom"

export const ViewSavedFlashcardsOption = () => {
    return (
    <>
    <div>
        <Link to={"/flashcardsaved"} >
        <FaSave /> 
        <span> View Saved Flashcards </span>
        </Link>
    </div>
    </>)
}