import { typeFlashcardForQuery } from "@/types";
import { useEffect, useState } from "react"

export const useSavedFlashcards = (userId:string|undefined) =>{
    const [savedFlashcards, setSavedFlashcards] = useState<typeFlashcardForQuery[]>([]);
    const [useSavedFlashcardsError, setUseSavedFlashcardsError ] = useState<string|null>(null);
    const [useSavedFlashcardsLoading, setUseSavedFlashcardsLoading ] = useState(false);
    useEffect(()=>{
        if (!userId) {
            setUseSavedFlashcardsLoading(false);
            return;
        }
        const getSavedFlashcards = async () =>{
            try{
                setUseSavedFlashcardsLoading(true);
                setUseSavedFlashcardsError(null);
                const getResult = await fetch(`${import.meta.env.VITE_BASE_API_Flashcards}/getUserSavedFlashcard?userId=${userId}`)
                const data: typeFlashcardForQuery[] = await getResult.json();   
                setSavedFlashcards(data);
            }catch(error:any){
                setUseSavedFlashcardsError(error);
            }finally{
                setUseSavedFlashcardsLoading(false);
            }
        }
        getSavedFlashcards();
    }, [userId])
    return {savedFlashcards, useSavedFlashcardsError, useSavedFlashcardsLoading}
}