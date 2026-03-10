import { useAuthContext } from "@/Hooks/Context/useAuthContext";
import { useSaveMultipleFlashcards } from "@/Hooks/Database/flashcardfunctions/useSaveMultipleFlashcards";
import { useFlashcardCount } from "@/Hooks/useFlashcardCount";
import { useQnA } from "@/Hooks/useQnA";
import { SwinButton } from "@/components/Buttons/SwinButton";
import { Flashcard } from "@/components/Flashcards/FlashCard";
import {  SkeletonFlashcards } from "@/components/Loading/SkeletonFlashcards";
import { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight, FaStar } from "react-icons/fa";
import {Link } from "react-router-dom";

export const ViewFlashcards = () => {
    const [current_question, setCurrent_Question] = useState<number>(0); //Start with 0
    const { QnAF } = useQnA(); //hook that returns list of QnA (formatted)
    const { count } = useFlashcardCount(); //hook that returns count of Flashcard chosen by user
    const QnA = QnAF;
    const {user} = useAuthContext();
    const {SaveMultipleFlashcards} = useSaveMultipleFlashcards();
    const [hasFlashcardSavedToDB, setHasFlashcardSavedToDB] = useState(false);
    const [deckSaved, setDeckSaved] = useState(false);
    const [showDialog, setShowDialog] = useState(false);
    const [deck_name, setDeck_Name] = useState<string | null>('Lora_Deck')
    const handleNext = () => {
        if (current_question < count - 1) setCurrent_Question(current_question + 1);
    };
    const handlePrevious = () => {
        if (current_question > 0) setCurrent_Question(current_question - 1);
    };
    useEffect(()=>{
        if(QnA.length > 0 && user?.id && !hasFlashcardSavedToDB ){
            SaveMultipleFlashcards(QnA.slice(0, count), user.id);
            setHasFlashcardSavedToDB(true);
        }

    }, [QnA, user?.id, SaveMultipleFlashcards])
    const handleSaveDeck = () =>{
        setDeckSaved(!deckSaved);
        setShowDialog(true);
    }
    const handlePostDeck = () =>{
        if(QnA.length > 0 && user?.id &&  deck_name){
            SaveMultipleFlashcards(QnA.slice(0, count), user.id, deck_name)
            setShowDialog(false);
            console.log("Deck Saved!");
        }

    }

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
            <div className="flex gap-x-4">
                <Link to="/dashboard" className="border-2 border-red-600 text-red-600 px-10 py-4 rounded-lg font-semibold text-lg hover:bg-red-50 transition-colors mt-10">
                    Home
                </Link>
                <SwinButton label="Save Deck" onClick={handleSaveDeck} icon={<FaStar className= {`${deckSaved? 'text-yellow-500' : ''}`}/>} classname="border-2 border-red-600 text-red-600 px-10 py-4 rounded-lg font-semibold text-lg hover:bg-red-50 transition-colors mt-10" />
            </div>
        </div>
        
        ):(
        <SkeletonFlashcards />
        
        )}
    {showDialog? (<>
    <div className="fixed inset-0 bg-white bg-opacity-30 backdrop-filter backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-white p-8 rounded-lg shadow-xl w-96">
            <h2 className="text-2xl font-bold mb-4">Deck Name</h2>
            <input type="text" className="border p-2 w-full mb-4" placeholder="Enter deck name" />
            <div className="flex justify-end gap-2">
                <button className="bg-gray-200 px-4 py-2 rounded cursor-pointer" onClick={()=>setShowDialog(false)}>Cancel</button>
                <button className="bg-red-600 text-white px-4 py-2 rounded cursor-pointer" onClick={()=>handlePostDeck()}>Save</button>
            </div>
        </div>
    </div>
     </>):(<></>)}
    </>
    );
};


