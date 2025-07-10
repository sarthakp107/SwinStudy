import { useAuthContext } from "@/Hooks/Context/useAuthContext";
import { useAllGeneratedFlashcards } from "@/Hooks/Database/flashcardfunctions/useAllGeneratedFlashcards";
import { useSavedFlashcardCount } from "@/Hooks/Database/flashcardfunctions/useSavedFlashcardCount";

export const FlashcardStats = () =>{
    const {user} = useAuthContext();
    const {numberOfSavedFlashcards} = useSavedFlashcardCount(user?.id);
    const {allGeneratedFlashcardsCount} = useAllGeneratedFlashcards(user?.id);
    return (
    <>
    {user &&   <div> 
            <h1>Your Progress So Far:  </h1>
            <h2> Flashcards Studied: {allGeneratedFlashcardsCount}</h2>
            <h2> Flashcards Saved: {numberOfSavedFlashcards} </h2>
        </div> }

    </>)
}