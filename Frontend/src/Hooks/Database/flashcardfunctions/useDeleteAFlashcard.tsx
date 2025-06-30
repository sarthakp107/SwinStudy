import {useState } from "react";

export const useDeleteAFlaschard = () => {
    const [useDeleteAFlashcardError, setUseDeleteAFlashcardError ] = useState<string|null>(null);
    const [useDeleteAFlashcardLoading, setUseDeleteAFlashcardLoading ] = useState(false);
    const [useDeleteAFlashcardSuccess, setUseDeleteAFlashcardSuccess ] = useState(false);
        const DeleteAFlashcard = async (question:string, answer:string, userId:string| undefined) =>{
            try{
                setUseDeleteAFlashcardLoading(true);
                await fetch(`${import.meta.env.VITE_BASE_API_Flashcards}/deleteUserSavedFlashcard?userId=${userId}&question=${question}&answer=${answer}`,{
                    method: "DELETE"
                })
                  setUseDeleteAFlashcardSuccess(true);
            }catch(error:any){
                setUseDeleteAFlashcardError(`An Error when saving flashcard: ${error}`)
                setUseDeleteAFlashcardSuccess(false);
            }finally{
                setUseDeleteAFlashcardLoading(false);
            }
        }
    return { useDeleteAFlashcardSuccess ,useDeleteAFlashcardLoading, useDeleteAFlashcardError, DeleteAFlashcard}
}