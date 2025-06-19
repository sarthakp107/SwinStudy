import { QnAFormat } from "@/components/Flashcards/QnAConverter"
import { useFileContext } from "./Context/useFileContext"
import {useEffect, useState} from "react"

export const useQnA = () =>{
    const {state} = useFileContext()
    const [QnAF, setQnAF] = useState<QnAFormat[]>([])
    useEffect(()=>{
        const listQnA = async () =>{
            if (state.QnA){
                setQnAF(state.QnA)
            }
            return QnAF
        }
        listQnA();
    }, [state.QnA])
    return {QnAF}
}
