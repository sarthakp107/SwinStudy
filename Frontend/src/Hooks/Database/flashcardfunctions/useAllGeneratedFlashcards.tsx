import { typeFlashcardForQuery } from "@/types";
import { useEffect, useState } from "react"

export const useAllGeneratedFlashcards = (userId:string|undefined) =>{
    const [allGeneratedFlashcards, setAllGeneratedFlashcards] = useState<typeFlashcardForQuery[]>([]);
    const [useAllGeneratedFlashcardsError, setUseAllGeneratedFlashcardsError ] = useState<string|null>(null);
    const [useAllGeneratedFlashcardsLoading, setUseAllGeneratedFlashcardsLoading ] = useState(false);
    useEffect(()=>{
        if (!userId) {
            setUseAllGeneratedFlashcardsLoading(false);
            return;
        }
        const getAllGeneratedFlashcards = async () =>{
            try{
                setUseAllGeneratedFlashcardsLoading(true);
                setUseAllGeneratedFlashcardsError(null);
                const getResult = await fetch(`${import.meta.env.VITE_BASE_API_Flashcards}/getUserGeneratedFlashcards?userId=${userId}`)
                const data: typeFlashcardForQuery[] = await getResult.json();   
                setAllGeneratedFlashcards(data);
            }catch(error:any){
                setUseAllGeneratedFlashcardsError(error);
            }finally{
                setUseAllGeneratedFlashcardsLoading(false);
            }
        }
        getAllGeneratedFlashcards();
    }, [userId])
    return {allGeneratedFlashcards, useAllGeneratedFlashcardsError, useAllGeneratedFlashcardsLoading}
}