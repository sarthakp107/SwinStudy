import { useQnA } from "@/Hooks/useQnA"
import { SwinButton } from "@/components/Buttons/SwinButton"
import {FaArrowLeft, FaArrowRight} from "react-icons/fa"
import {useParams, useNavigate} from "react-router-dom"

export const Flashcards = () =>{
    const {questionID} = useParams<{questionID: string}>()
    const navigate = useNavigate()
    const current_question = questionID? parseInt(questionID, 10) : 0
    const {QnAF} = useQnA()
    const QnA = QnAF

    const handleNext = () =>{
        navigate (`/flashcard/${current_question + 1}`)
    }
    const handlePrevious = () =>{
        navigate (`/flashcard/${current_question - 1}`)
    }

    return(
        <>
            {QnA.length>0 && QnA[current_question] ? ( 
                <div>
                Question: {QnA[current_question].question}
                Answer: {QnA[current_question].answer}
                </div>
            ):(
                <div>Loading Flashcards...</div>
            )}

            <SwinButton icon={<FaArrowRight />} label="Next" onClick={handleNext} />
            <SwinButton icon={<FaArrowLeft />} label="Previous" onClick={handlePrevious} />
        </>
    )
} 