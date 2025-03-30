import { useFlashcardCount } from "@/Hooks/useFlashcardCount"
import { useQnA } from "@/Hooks/useQnA"
import { SwinButton } from "@/components/Buttons/SwinButton"
import { Flashcard } from "@/components/Flashcards/FlashCard"
import {FaArrowLeft, FaArrowRight} from "react-icons/fa"
import {useParams, useNavigate} from "react-router-dom"

export const Flashcards = () =>{
    const {questionID} = useParams<{questionID: string}>()
    const navigate = useNavigate()
    const current_question = questionID? parseInt(questionID, 10) : 0
    const {QnAF} = useQnA()
    const {count} = useFlashcardCount()
    const QnA = QnAF

    const handleNext = () =>{
        if (current_question<count-1){
            navigate (`/flashcard/${current_question + 1}`)
        }
    }
    const handlePrevious = () =>{
        if (current_question>0){
            navigate (`/flashcard/${current_question - 1}`)
        }
    }

    return(
        <>
            {QnA.length>0 && QnA[current_question] ? (
            <> 
                <Flashcard question={QnA[current_question].question} answer={QnA[current_question].answer}/>
            </>    
            ):(
                <> </> //Spinner to be added here
            )}

            <SwinButton icon={<FaArrowRight />} label="Next" onClick={handleNext} isdisabled= {current_question == count - 1 } disabledLabel="Next" />
            <SwinButton icon={<FaArrowLeft />} label="Previous" onClick={handlePrevious} isdisabled= {current_question == 0 } disabledLabel="Previous"/>

        </>
    )
} 