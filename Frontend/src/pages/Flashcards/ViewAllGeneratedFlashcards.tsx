import { useAuthContext } from "@/Hooks/Context/useAuthContext";
import { useAllGeneratedFlashcards } from "@/Hooks/Database/flashcardfunctions/useAllGeneratedFlashcards";

export const ViewAllGeneratedFlashcards = () =>{    
    const {user} = useAuthContext();
    const {allGeneratedFlashcards} = useAllGeneratedFlashcards(user?.id);
    return (
    <>
    <div> Your flashcards: </div>
    {allGeneratedFlashcards.map((flashcard)=>(<div key={flashcard.date}><h3>Question: {flashcard.question}</h3> <p>Answer: {flashcard.answer}</p> <p>Saved on: {flashcard.date}</p> </div>))}
    </>)
}