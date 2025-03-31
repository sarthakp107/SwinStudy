import React, { useEffect, useState } from "react";
//Flashcard CARDS. Takes Question and Answer as Prop and displays them in a card
interface FlashcardProps {
  question: string;
  answer: string;
}

export const Flashcard: React.FC<FlashcardProps> = ({ question, answer }) => {
   //This controls the flip. Is Question shows the question, when the div is pressed, is Question Becomes false, meaning it is an Answer and Answer shows
  const [isQuestion, setIsQuestion] = useState(true);

  const handleClick = () => {
    setIsQuestion(!isQuestion); //Simply switch value of isQuestion on Click
  };

  //isQuestion retains state. So, if an answer is displaying and user clicks "Next", the card displays answer itself for the next question as well. 
  //So, resetting the isQuestion to true each time new question is passed(user presses next)
  useEffect(() => {
    setIsQuestion(true); 
  }, [question]); 

  return (
    // Main div
    <div 
      className="w-full max-w-3xl mx-auto cursor-pointer perspective-1000" onClick={handleClick}>
        {/* Div for handling flip animation */}
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
  );
};
