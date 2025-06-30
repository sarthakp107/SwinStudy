import {useState } from "react";

export const useSaveAFlashcard = () => {
    const [useSaveAFlashcardError, setUseSaveAFlashcardError ] = useState<string|null>(null);
    const [useSaveAFlashcardLoading, setUseSaveAFlashcardLoading ] = useState(false);
    const [useSaveAFlashcardSuccess, setUseSaveAFlashcardSuccess ] = useState(false);
        const SaveAFlashcard = async (question:string, answer:string, userId:string| undefined) =>{
            try{
                setUseSaveAFlashcardLoading(true);
                await fetch(`${import.meta.env.VITE_BASE_API_Flashcards}/postUserSavedFlashcard`,{
                    method:"POST",
                    headers:{
                      "content-type":"application/json",
                    },
                    body: JSON.stringify(
                      {
                        userId: userId,
                        question:question,
                        answer:answer
                      }
                    ) 
                  })
                  setUseSaveAFlashcardSuccess(true);
            }catch(error:any){
                setUseSaveAFlashcardError(`An Error when saving flashcard: ${error}`)
                setUseSaveAFlashcardSuccess(false);
            }finally{
                setUseSaveAFlashcardLoading(false);
            }
        }
    return { useSaveAFlashcardSuccess ,useSaveAFlashcardLoading, useSaveAFlashcardError, SaveAFlashcard}
}