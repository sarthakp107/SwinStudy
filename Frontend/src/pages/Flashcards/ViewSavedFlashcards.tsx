import { SwinButton } from "@/components/Buttons/SwinButton";
import { Flashcard } from "@/components/Flashcards/FlashCard";
import { SkeletonFlashcards } from "@/components/Loading/SkeletonFlashcards";
import { useAuthContext } from "@/Hooks/Context/useAuthContext";
import { useSavedFlashcards } from "@/Hooks/Database/flashcardfunctions/useSavedFlashcards"
import { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

export const ViewSavedFlashcards = () =>{    
    const {user} = useAuthContext();
    const {savedFlashcards} = useSavedFlashcards(user?.id);
    const [current_question, setCurrent_Question] = useState<number>(0)
    const count = savedFlashcards.length

    const handleNext = () =>{
        setCurrent_Question(current_question + 1)
    }

    const handlePrevious = () =>{
        setCurrent_Question(current_question - 1)
    }
    return (
    <>
        {/* Show flashcard if QnA has loaded, or else shows Skeleton */}
    {count > 0 && savedFlashcards[current_question] ? (
        // Main Div
        <div className="min-h-screen bg-gray-50 py-12 px-6 flex flex-col items-center">
            {/* Header */}
            <h1 className="text-3xl font-bold text-black mb-8">
                Question {current_question + 1} / {count}
            </h1>
            {/* Flashcard and Buttons Div */}
            <div className="w-full max-w-3xl mx-auto bg-white rounded-2xl shadow-2xl p-10">
                <Flashcard question={savedFlashcards[current_question].question} answer={savedFlashcards[current_question].answer}/>
                {/* Buttons Div (Next and Previous) */}
                <div className="flex justify-between mt-10">
                    {/* Buttons disabled based on Current Question Number */}
                    <SwinButton icon={<FaArrowLeft />} label="Previous" onClick={handlePrevious} isdisabled={current_question === 0} disabledLabel="Previous"/>
                    <SwinButton icon={<FaArrowRight />} label="Next" onClick={handleNext} isdisabled={current_question === count - 1} disabledLabel="Next"/>
                </div>
            </div>
            <div className="flex gap-x-4">
                <Link to="/dashboard" className="border-2 border-red-600 text-red-600 px-10 py-4 rounded-lg font-semibold text-lg hover:bg-red-50 transition-colors mt-10">
                    Home
                </Link>
            </div>
        </div>
        
        ):(
        <SkeletonFlashcards />
        
        )}
    </>
)
}