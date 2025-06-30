import { FaBook } from "react-icons/fa"
import { Link } from "react-router-dom"

export const RandomPreviouslyStudiedFlashcardsOption = () =>{
    return (<>
    <div>
        <Link to={"/flashcardrandom"}>
            <FaBook/>
            <span> Previously Studied Flashcards </span>
        </Link>
    </div>
    </>)
}