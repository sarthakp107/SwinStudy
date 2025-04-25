import { useFlashcardCount } from "@/Hooks/useFlashcardCount";
import { useQnA } from "@/Hooks/useQnA";
import { SwinButton } from "@/components/Buttons/SwinButton";
import { Flashcard } from "@/components/Flashcards/FlashCard";
import {  SkeletonFlashcards } from "@/components/Loading/SkeletonFlashcards";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useParams, useNavigate, Link } from "react-router-dom";

export const Flashcards = () => {
    const { questionID } = useParams<{ questionID: string }>(); //Gets data from App.tsx
    const navigate = useNavigate();
    const current_question = questionID ? parseInt(questionID, 10) : 0; //Changes questionID to number and stores it
    const { QnAF } = useQnA(); //hook that returns list of QnA (formatted)
    const { count } = useFlashcardCount(); //hook that returns count of Flashcard chosen by user
    const QnA = QnAF;

    const handleNext = () => {
        if (current_question < count - 1) navigate(`/flashcard/${current_question + 1}`);
    };
    const handlePrevious = () => {
        if (current_question > 0) navigate(`/flashcard/${current_question - 1}`)
    };

    return (
    <>
        {/* Show flashcard if QnA has loaded, or else shows Skeleton */}
    {QnA.length > 0 && QnA[current_question] ? (
        // Main Div
        <div className="min-h-screen bg-gray-50 py-12 px-6 flex flex-col items-center">
            {/* Header */}
            <h1 className="text-3xl font-bold text-black mb-8">
                Question {current_question + 1} / {count}
            </h1>
            {/* Flashcard and Buttons Div */}
            <div className="w-full max-w-3xl mx-auto bg-white rounded-2xl shadow-2xl p-10">
                <Flashcard question={QnA[current_question].question} answer={QnA[current_question].answer}/>
                {/* Buttons Div (Next and Previous) */}
                <div className="flex justify-between mt-10">
                    {/* Buttons disabled based on Current Question Number */}
                    <SwinButton icon={<FaArrowLeft />} label="Previous" onClick={handlePrevious} isdisabled={current_question === 0} disabledLabel="Previous"/>
                    <SwinButton icon={<FaArrowRight />} label="Next" onClick={handleNext} isdisabled={current_question === count - 1} disabledLabel="Next"/>
                </div>
            </div>
            <Link to="/dashboard" className="border-2 border-red-600 text-red-600 px-10 py-4 rounded-lg font-semibold text-lg hover:bg-red-50 transition-colors mt-10">
                Home
            </Link>
        </div>):(
        <SkeletonFlashcards />
        
        )}
    </>
    );
};
