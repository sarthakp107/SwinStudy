import React, { useEffect, useState } from "react";
import { SwinButton } from "../Buttons/SwinButton";
import { FaStar } from "react-icons/fa";
import { useAuthContext } from "@/Hooks/Context/useAuthContext";
//Flashcard CARDS. Takes Question and Answer as Prop and displays them in a card
interface FlashcardProps {
  question: string;
  answer: string;
}
type Flashcard={
  userid:string;
  question:string;
  answer:string
  date: string;
}

export const Flashcard: React.FC<FlashcardProps> = ({ question, answer }) => {
   //This controls the flip. Is Question shows the question, when the div is pressed, is Question Becomes false, meaning it is an Answer and Answer shows
  const [isQuestion, setIsQuestion] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const {user} = useAuthContext();
  const handleClick = () => {
    setIsQuestion(!isQuestion); //Simply switch value of isQuestion on Click
  };

  const handleSaveFlashcard = async () =>{
    // console.log("Retrieving value for userId: ", user)
    // const result = await fetch(`https://www.swinstudy.com/api/flashcards/getUserSavedFlashcard?userId=${user?.id}`)
    // const data: Flashcard[] = await result.json();
    // console.log(data[0].userid);
    // console.log(data[0].question);
    // console.log(data[0].answer);
    if(isSaved){
      console.log("Deleting question for user: ", user?.id);
      const deleteResult = await fetch(`https://www.swinstudy.com/api/flashcards/deleteUserSavedFlashcard?userId=${user?.id}&question=${question}&answer=${answer}`,{
        method: "DELETE"
      })
      console.log("Delete Flashcard Result: ", deleteResult);
      setIsSaved(false);
    }else{
    console.log("Posting result for user: ", user);
    const postResult = await fetch("https://www.swinstudy.com/api/flashcards/postUserSavedFlashcard",{
      method:"POST",
      headers:{
        "content-type":"application/json",
      },
      body: JSON.stringify(
        {
          userId: user?.id,
          question:question,
          answer:answer
        }
      ) 
    })
    console.log("Saved Flashcard!", postResult);
    setIsSaved(true);
    }
    
    
  };

  //isQuestion retains state. So, if an answer is displaying and user clicks "Next", the card displays answer itself for the next question as well. 
  //So, resetting the isQuestion to true each time new question is passed(user presses next)

  useEffect(() => {
    console.log("Use Effect Triggered")
    setIsQuestion(true); 
    console.log("IsQuestion Set to True")
    async function checkFlashcardIsSaved(){
      console.log("Query sent, awaiting result")
      const getResult = await fetch(`https://www.swinstudy.com/api/flashcards/getSpecificSavedFlashcard?userId=${user?.id}&question=${question}&answer=${answer}`)
      const data:Flashcard[] = await getResult.json();
      console.log("Data Returned. Data: ", data);
      if (data.length>0){
        console.log("IsSaved set to TRUE");
        setIsSaved(true);
      }else{
        console.log("IsSaved set to FALSE");
        setIsSaved(false);
      }
    }
    console.log("Calling the Check function NOW")
    checkFlashcardIsSaved();
  }, [question]); 

  return (
    <>
    <div className="pl-150">
    {isSaved?
    (
    <SwinButton label="Save" icon={<FaStar className="text-yellow-400"/>} onClick={()=>handleSaveFlashcard()} />
    ):(
      <SwinButton label="Save" icon={<FaStar />} onClick={()=>handleSaveFlashcard()} />
    )
    }
    </div>
   
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
