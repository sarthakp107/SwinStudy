import React, { useEffect, useState } from "react";
import { SwinButton } from "../Buttons/SwinButton";
import { FaStar } from "react-icons/fa";
import { useAuthContext } from "@/Hooks/Context/useAuthContext";
import { useFlashcardSaveStatus } from "@/Hooks/Database/flashcardfunctions/useFlashcardSaveStatus";
import { useSaveAFlashcard } from "@/Hooks/Database/flashcardfunctions/useSaveAFlashcard";
import { useDeleteAFlaschard } from "@/Hooks/Database/flashcardfunctions/useDeleteAFlashcard";
//Flashcard CARDS. Takes Question and Answer as Prop and displays them in a card
interface FlashcardProps {
  question: string;
  answer: string;
}

export const Flashcard: React.FC<FlashcardProps> = ({ question, answer }) => {
   //This controls the flip. Is Question shows the question, when the div is pressed, is Question Becomes false, meaning it is an Answer and Answer shows
  const [isQuestion, setIsQuestion] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const {user} = useAuthContext();
  const {isFlashcardSaved, useFlaschardSaveStatusError} = useFlashcardSaveStatus(question, answer, user?.id)
  const {SaveAFlashcard, useSaveAFlashcardError} = useSaveAFlashcard();
  const {DeleteAFlashcard, useDeleteAFlashcardError} = useDeleteAFlaschard();

  const handleClick = () => {
    setIsQuestion(!isQuestion); //Simply switch value of isQuestion on Click
  };
  const handleSaveFlashcard = async () =>{
    if(isSaved){
      DeleteAFlashcard(question, answer, user?.id)
      if (useDeleteAFlashcardError){console.error("An error occured when unsaving Flashcard", useDeleteAFlashcardError)}
      setIsSaved(false);
    }else{
      SaveAFlashcard(question, answer, user?.id);
      if(useSaveAFlashcardError){console.error("An Error occured when saving Flashcard: ", useSaveAFlashcardError)}
      setIsSaved(true);
    }
  };
  //Resetting the isQuestion to true each time new question is passed(user presses next)
  useEffect(() => {
    setIsQuestion(true); 
    if(useFlaschardSaveStatusError){
      console.error("An Error occured in Checking Flashcard Save Status: ", useFlaschardSaveStatusError)
    }
    if(isFlashcardSaved == true){
      setIsSaved(true)
    }else{
      setIsSaved(false)
    }
  }, [question, isFlashcardSaved, useFlaschardSaveStatusError] ); 

  return (
    <>
    {user? (
      <div className="pl-150">
      {isSaved?
      (
      <SwinButton label="Save" icon={<FaStar className="text-yellow-400"/>} onClick={()=>handleSaveFlashcard()} />
      ):(
      <SwinButton label="Save" icon={<FaStar />} onClick={()=>handleSaveFlashcard()} />
      )
      }
      </div>
    ):(
    <div className="relative pl-150 group">
      <SwinButton
        label="Save"
        icon={<FaStar className="disabled" />}
        onClick={handleSaveFlashcard}
        isdisabled
        disabledLabel="Save"
      />
      {/* Tooltip shown only when hovering over the disabled button's group parent */}
      <div className="absolute hidden group-hover:block left-full ml-2 top-1/2 -translate-y-1/2 w-max px-4 py-2 text-sm text-white bg-gray-800 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform">
        Please login to save
      </div>
    </div>
    )}
   
    {/* Main div */}
    <div 
      className="w-full max-w-3xl mx-auto cursor-pointer perspective-1000" onClick={handleClick}>
        {/* Div for handling flip animation */}
        <div className="hover:cursor-pointer pl-150 pb-3">
        </div>
      <div className={`relative w-full h-96 rounded-xl border-4 border-red-500 bg-white flex justify-center items-center p-8 shadow-2xl transition-transform duration-700 transform-style-preserve-3d ${isQuestion ? "" : "rotate-y-180"}`}>
        {/* Question Div */}
        <div className={`absolute inset-0 flex justify-center items-center backface-hidden transition-opacity duration-700 ${isQuestion ? "opacity-100" : "opacity-0"}`}> {/*If it is question, then show (opacity 100, or else dont show)*/}
          <div className="text-3xl font-semibold text-black text-center">
            {question}
          </div>
        </div>
        {/* Answer Div */}
        <div className={`absolute inset-0 flex justify-center items-center backface-hidden transition-opacity duration-700 ${isQuestion ? "opacity-0" : "opacity-100"}`}>{/*If it is question, then dont show (opacity 0, or else show)*/}
          <div className="text-3xl font-semibold text-black text-center transform rotate-y-180">
            {answer}
          </div>
        </div>
      </div>
    </div>
    </>
  );
};
