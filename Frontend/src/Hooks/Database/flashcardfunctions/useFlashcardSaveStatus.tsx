import { typeFlashcardForQuery } from "@/types";
import { useEffect, useState } from "react"

export const useFlashcardSaveStatus = (question:string, answer:string, userId:string|undefined) =>{
    const [isFlashcardSaved, setIsFlashcardSaved] = useState(false);
    const [useFlashcardSaveStatusLoading, setUseFlashcardSaveStatusLoading] = useState(false);
    const [useFlaschardSaveStatusError, setUseFlaschardSaveStatusError] = useState<string | null>(null);

    useEffect(()=>{
        const checkFlashcardSaveStatus = async () =>{
            try{
                setUseFlaschardSaveStatusError(null);
                setUseFlashcardSaveStatusLoading(true);
                const getResult = await fetch(`${import.meta.env.VITE_BASE_API_Flashcards}/getSpecificSavedFlashcard?userId=${userId}&question=${question}&answer=${answer}`)
                const data:typeFlashcardForQuery[] = await getResult.json();
                if(data.length > 0){
                    setIsFlashcardSaved(true);
                }else{
                    setIsFlashcardSaved(false);
                }
            }catch(error:any){
                setUseFlaschardSaveStatusError(`An Error Occured in GET request: ${error}`)
            }finally{
                setUseFlashcardSaveStatusLoading(false);    
            }

        }

        checkFlashcardSaveStatus();
    }, [question, answer, userId]);

    return {isFlashcardSaved, useFlashcardSaveStatusLoading, useFlaschardSaveStatusError}

}

