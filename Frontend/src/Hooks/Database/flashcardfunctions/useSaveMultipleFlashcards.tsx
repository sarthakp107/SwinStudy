import { QnAFormat } from "@/components/Flashcards/QnAConverter";
import {useState } from "react";

export const useSaveMultipleFlashcards = () => {
    const [useSaveMultipleFlashcardsError, setUseSaveMultipleFlashcardsError ] = useState<string|null>(null);
    const [useSaveMultipleFlashcardsLoading, setUseSaveMultipleFlashcardsLoading ] = useState(false);
    const [useSaveMultipleFlashcardsSuccess, setUseSaveMultipleFlashcardsSuccess ] = useState(false);
        const SaveMultipleFlashcards = async (flashcards:QnAFormat[], userId:string| undefined) =>{
            if(!userId || flashcards.length == 0){
                setUseSaveMultipleFlashcardsError("Error. Missing userId or Flashcard Empty");
                return;
            }
            try{
                setUseSaveMultipleFlashcardsLoading(true);
                const savePromises = flashcards.map(async(flashcard)=>{
                    console.log("Posting Flashcard: ", flashcard.question);
                    const result = await fetch(`${import.meta.env.VITE_BASE_API_Flashcards}/postUserGeneratedFlashcards`,{
                        method:"POST",
                        headers:{
                          "content-type":"application/json",
                        },
                        body: JSON.stringify(
                          {
                            userId: userId,
                            question:flashcard.question,
                            answer:flashcard.answer
                          }
                        ) 
                      })
                    if(result.ok){console.log("Post Successful!")};
                    if (!result.ok){
                        const errorData = await result.json();
                        throw new Error(`Failed to save flashcard "${flashcard.question}": ${result.status} - ${errorData.message || result.statusText}`);
                    }
                    return result;
                })
                await Promise.all(savePromises);
                setUseSaveMultipleFlashcardsSuccess(true);
                console.log("All Flashcards Saved!")
            }catch(error:any){
                setUseSaveMultipleFlashcardsError(`An Error when saving flashcards: ${error}`)
                console.error(error);
                setUseSaveMultipleFlashcardsSuccess(false);
            }finally{
                setUseSaveMultipleFlashcardsLoading(false);
            }
        }
    return { useSaveMultipleFlashcardsSuccess ,useSaveMultipleFlashcardsLoading, useSaveMultipleFlashcardsError, SaveMultipleFlashcards}
}