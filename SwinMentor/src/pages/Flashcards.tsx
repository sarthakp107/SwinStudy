import { useFlashcardCount } from "@/Hooks/useFlashcardCount";
import { useQnA } from "@/Hooks/useQnA";
import { SwinButton } from "@/components/Buttons/SwinButton";
import { Flashcard } from "@/components/Flashcards/FlashCard";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";

export const Flashcards = () => {
    const { questionID } = useParams<{ questionID: string }>();
    const navigate = useNavigate();
    const current_question = questionID ? parseInt(questionID, 10) : 0;
    const { QnAF } = useQnA();
    const { count } = useFlashcardCount();
    const QnA = QnAF;

    const handleNext = () => {
        if (current_question < count - 1) {
            navigate(`/flashcard/${current_question + 1}`);
        }
    };
    const handlePrevious = () => {
        if (current_question > 0) {
            navigate(`/flashcard/${current_question - 1}`);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-6 flex flex-col items-center">
            <div className="w-full max-w-2xl mx-auto">
                {/* Flashcard Display */}
                {QnA.length > 0 && QnA[current_question] ? (
                    <Flashcard question={QnA[current_question].question} answer={QnA[current_question].answer} />
                ) : (
                    <div className="flex justify-center items-center w-full h-64">
                        <div className="animate-spin h-12 w-12 border-t-4 border-gray-500 rounded-full"></div>
                    </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8 space-x-6">
                    <SwinButton
                        icon={<FaArrowLeft />}
                        label="Previous"
                        onClick={handlePrevious}
                        isdisabled={current_question === 0}
                        disabledLabel="Previous"
                        
                    />
                    <SwinButton
                        icon={<FaArrowRight />}
                        label="Next"
                        onClick={handleNext}
                        isdisabled={current_question === count - 1}
                        disabledLabel="Next"
                        
                    />
                </div>
            </div>
        </div>
    );
};
