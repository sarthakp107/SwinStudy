import { useAuthContext } from "@/Hooks/Context/useAuthContext";
import { useSavedFlashcards } from "@/Hooks/Database/flashcardfunctions/useSavedFlashcards"

export const ViewSavedFlashcards = () =>{    
    const {user} = useAuthContext();
    const {savedFlashcards} = useSavedFlashcards(user?.id);
    return (
    <>
    <div> Your flashcards: </div>
    {savedFlashcards.map((flashcard)=>(<div key={flashcard.date}><h3>{flashcard.question}</h3> <p>{flashcard.answer}</p> <p>Saved on: {flashcard.date}</p> </div>))}
    </>)
}