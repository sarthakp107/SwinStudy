import useUserProfile from "@/Hooks/GetUserInfo/useUserProfile"
import { FlashcardOptions } from "@/components/Flashcards/FlashcardOptions/FlashcardOptions";
import { FlashcardStats } from "@/components/Flashcards/FlashcardStats";

export const Flashcards = () =>{
    const {displayName} =  useUserProfile();
    
    
    return(
    <>
    {/* Header Div */}
    <div> Welcome Back, {displayName}! </div>
    {/* Div For Stats */}
    <div> <FlashcardStats /> </div>
    {/* Div For Options */}
    <div> <FlashcardOptions /> </div>
    </>
    )
    
}