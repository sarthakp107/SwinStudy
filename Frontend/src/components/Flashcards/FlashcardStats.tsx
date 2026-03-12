import { useAuthContext } from "@/Hooks/Context/useAuthContext";
import { useSavedFlashcardCount } from "@/Hooks/Database/flashcardfunctions/useSavedFlashcardCount";
import { FaBookmark, FaFire } from "react-icons/fa";

export const FlashcardStats = () => {
    const { user } = useAuthContext();
    const { numberOfSavedFlashcards } = useSavedFlashcardCount(user?.id);

    if (!user) return null;

    return (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {/* Saved flashcards */}
            <div className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600">
                    <FaBookmark className="h-5 w-5" />
                </div>
                <div>
                    <p className="text-2xl font-bold text-gray-900">
                        {numberOfSavedFlashcards ?? 0}
                    </p>
                    <p className="text-xs text-gray-500">Cards saved</p>
                </div>
            </div>

            {/* Streak placeholder */}
            <div className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-orange-500">
                    <FaFire className="h-5 w-5" />
                </div>
                <div>
                    <p className="text-2xl font-bold text-gray-900">—</p>
                    <p className="text-xs text-gray-500">Day streak</p>
                </div>
            </div>
        </div>
    );
}
