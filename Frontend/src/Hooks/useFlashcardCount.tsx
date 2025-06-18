import { useFileContext } from "./Context/useFileContext"
import {useEffect, useState} from "react"

export const useFlashcardCount = () =>{
    const {state} = useFileContext()
    const [count, setCount] = useState(0)
    useEffect(()=>{
        const flashcardCount = async () =>{
            if (state.QnA){
                setCount(state.flashcardCount)
            }
            return Number
        }
        flashcardCount();
    }, [state.flashcardCount])
    return {count}
}
