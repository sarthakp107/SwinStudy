import React, { useEffect, useState } from "react";

interface FlashcardProps {
  question: string;
  answer: string;
}

export const Flashcard: React.FC<FlashcardProps> = ({ question, answer }) => {
  const [isQuestion, setIsQuestion] = useState(true);

  const handleClick = () => {
    setIsQuestion(!isQuestion); 
  };

  useEffect(() => {
    setIsQuestion(true); 
  }, [question]);

  return (
    <div className="w-full max-w-md mx-auto cursor-pointer perspective-1000" onClick={handleClick}>
      
      <div className={`relative w-full h-72 rounded-xl flex justify-center items-center p-6 shadow-lg transition-all duration-500 transform-style-preserve-3d ${isQuestion ? "" : "rotate-y-180"}`}>

        <div className={`absolute w-full h-full flex justify-center items-center backface-hidden transition-all duration-500 ${isQuestion ? "opacity-100" : "opacity-0"}`}>
          <div className="text-xl font-semibold text-gray-800 text-center"> {question} </div>
        </div>

        <div className={`absolute w-full h-full flex justify-center items-center backface-hidden transition-all duration-500 ${isQuestion ? "opacity-0" : "opacity-100"}`}>
          <div className="text-xl font-semibold text-gray-800 text-center transform rotate-y-180"> {answer} </div>
        </div>

      </div>
    </div>
  );
};
