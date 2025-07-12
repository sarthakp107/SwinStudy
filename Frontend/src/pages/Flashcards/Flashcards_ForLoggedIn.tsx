import useUserProfile from "@/Hooks/GetUserInfo/useUserProfile"
import { FlashcardOptions } from "@/components/Flashcards/FlashcardOptions/FlashcardOptions";
import { FlashcardStats } from "@/components/Flashcards/FlashcardStats";

export const Flashcards = () =>{
    const {displayName} =  useUserProfile();
    
    
    return(
    <>
    <div className="mt-5">
        {/* <p className="text-4xl text-center font-extrabold text-gray-800 mb-6">
            Welcome Back, <span className="text-red-600">{displayName || "User"}</span>!
        </p> */}
        <h1 className="text-4xl  text-center font-extrabold text-gray-800 mb-6">
            Welcome Back, <span className="text-red-600">{displayName || "User"}</span>!
        </h1>
    </div>
    {/* Div For Options */}
    <div> <FlashcardOptions /> </div>
    {/* Div For Stats */}
    <div> <FlashcardStats /> </div>
    </>
    )
    
}