import { useAuthContext } from "@/Hooks/Context/useAuthContext";
import { useSavedFlashcardCount } from "@/Hooks/Database/flashcardfunctions/useSavedFlashcardCount";

export const FlashcardStats = () =>{
    const {user} = useAuthContext();
    const {numberOfSavedFlashcards} = useSavedFlashcardCount(user?.id);
    return (
    <>
    {user &&         <div> 
            <h1>Your Progress So Far: </h1>
            <h2> Flashcards Studied: </h2>
            <h2> Flashcards Saved: {numberOfSavedFlashcards} </h2>
        </div> }

    </>)
}