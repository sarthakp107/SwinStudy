import { typeFlashcardForQuery } from "@/types";
import { useEffect, useState } from "react"


export const useSavedFlashcardCount = (userId:string|undefined) =>{
    // const {user} = useAuthContext();
    const [numberOfSavedFlashcards, setNumberOfSavedFlashcard] = useState(0);
    const [useSavedFlashcardCountError, setUseSavedFlashcardCountError ] = useState<string|null>(null);
    const [useSavedFlashcardCountLoading, setUseSavedFlashcardCountLoading ] = useState(false);
    useEffect(()=>{
        if (!userId) {
            setUseSavedFlashcardCountLoading(false);
            return;
        }
        const getSavedFlashcardsCount = async () =>{
            try{
                setUseSavedFlashcardCountLoading(true);
                setUseSavedFlashcardCountError(null);
                const getResult = await fetch(`${import.meta.env.VITE_BASE_API_Flashcards}/getUserSavedFlashcard?userId=${userId}`)
                const data: typeFlashcardForQuery[] = await getResult.json();   
                setNumberOfSavedFlashcard(data.length);
            }catch(error:any){
                setUseSavedFlashcardCountError(error);
            }finally{
                setUseSavedFlashcardCountLoading(false);
            }
        }
        getSavedFlashcardsCount();
    }, [userId])
    return {numberOfSavedFlashcards, useSavedFlashcardCountError, useSavedFlashcardCountLoading}
}