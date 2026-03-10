import { useAuthContext } from "@/Hooks/Context/useAuthContext";
import { useAllGeneratedFlashcards } from "@/Hooks/Database/flashcardfunctions/useAllGeneratedFlashcards";
import { useSavedFlashcardCount } from "@/Hooks/Database/flashcardfunctions/useSavedFlashcardCount";
import { ProgressRing } from "./ProgressRings";
import { DailyCheckinCalendar } from "./DailyCheckInCalendar";

export const FlashcardStats = () =>{
    const {user} = useAuthContext();
    const {numberOfSavedFlashcards} = useSavedFlashcardCount(user?.id);
    const {allGeneratedFlashcardsCount} = useAllGeneratedFlashcards(user?.id);

    const flashcardsStudiedValue = allGeneratedFlashcardsCount;
    const flashcardsStudiedMax = 500; 
    const flashcardsSavedValue = numberOfSavedFlashcards;
    const flashcardsSavedMax = 20;

    return (
    <>
        <div className="w-full max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8 mt-8 border border-gray-200">
            {/* Header */}
            <h1 className="text-4xl  text-center  font-extrabold text-gray-800 mb-6">
                Your <span className="text-red-600">Progress</span>
            </h1>
            {user ? (
                <>
                    {/* Progress Rings Section */}
                    <div className="flex flex-wrap justify-around items-center gap-6 mb-8">
                        <ProgressRing
                            value={flashcardsStudiedValue}
                            maxValue={flashcardsStudiedMax}
                            label="Flashcards Studied"
                            color="text-red-600"
                            icon={<span> 🎓 </span>}
                        />
                        <ProgressRing
                            value={flashcardsSavedValue}
                            maxValue={flashcardsSavedMax}
                            label="Flashcards Saved"
                            color="text-blue-600" 
                            icon={<span>⭐</span>} 
                        />
                    </div>

                    {/* Daily Check-in Calendar Section */}
                    <DailyCheckinCalendar />
                </>
            ) : (
                <div className="text-center text-gray-500 py-10">
                    Please log in to view your progress.
                </div>
            )}
        </div>
    </>)
}