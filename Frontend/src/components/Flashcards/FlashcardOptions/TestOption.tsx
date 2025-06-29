import { FaGraduationCap } from "react-icons/fa"
import { Link } from "react-router-dom"

export const TestOption = () =>{
    return (<>
    <div>
        <Link to={"/flashcardtest"}>
            <FaGraduationCap />
            <span> Test Mode </span>
        </Link>
    </div>
    </>)
}