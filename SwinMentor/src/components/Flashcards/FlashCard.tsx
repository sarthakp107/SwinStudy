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
    <>
        <div onClick={handleClick}>
        <div className="flex justify-center items-center h-full p-4">
            {isQuestion ? (
                <div>
                    <div >Question{question}</div>
                </div>
            ) : (
                <div>
                    <div >Answer{answer}</div>
                </div>
            )}
        </div>
        </div>
    </>
    
  );
};
