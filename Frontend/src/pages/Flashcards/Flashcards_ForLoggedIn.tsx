import useUserProfile from "@/Hooks/GetUserInfo/useUserProfile"
import { FlashcardOptions } from "@/components/Flashcards/FlashcardOptions/FlashcardOptions";
import { FlashcardStats } from "@/components/Flashcards/FlashcardStats";

export const Flashcards = () => {
    const { displayName } = useUserProfile();

    return (
        <div className="min-h-full bg-gradient-to-b from-gray-50 via-white to-white">
            <div className="container mx-auto px-4 py-8 lg:py-12 space-y-8">

                {/* Hero header */}
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-red-600 to-red-700 px-6 py-8 lg:px-10 lg:py-10 shadow-sm">
                    {/* decorative circles */}
                    <div className="absolute -right-10 -top-10 h-52 w-52 rounded-full bg-white/10" />
                    <div className="absolute -bottom-8 right-16 h-32 w-32 rounded-full bg-white/5" />

                    <div className="relative">
                        <p className="mb-1 text-sm font-medium text-red-200 uppercase tracking-widest">Flashcards</p>
                        <h1 className="text-2xl lg:text-3xl font-bold text-white">
                            Hey, <span className="text-red-100">{displayName || "Student"}</span> — ready to study?
                        </h1>
                        <p className="mt-2 text-sm text-red-200 max-w-md">
                            Create new decks, review saved cards, or test yourself. Pick what works for you today.
                        </p>
                    </div>
                </div>

                {/* Stats row */}
                <FlashcardStats />

                {/* Options grid */}
                <div>
                    <h2 className="mb-4 text-lg font-semibold text-gray-800">What do you want to do?</h2>
                    <FlashcardOptions />
                </div>

            </div>
        </div>
    )
}
