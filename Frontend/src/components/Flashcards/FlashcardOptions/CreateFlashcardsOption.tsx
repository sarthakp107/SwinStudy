import {  FaPen } from "react-icons/fa"
import { Link } from "react-router-dom"

export const CreateFlashcardsOption = () => {
    return (<>
    <div>
        <Link to={"/flashcardupload"} >
        <FaPen /> 
        <span> Create Flashcards </span>
        </Link>
    </div>
    </>)
}