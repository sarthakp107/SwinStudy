import { useState } from "react";
import { apiFetch } from "@/lib/apiClient";
import { useFlashcardRefresh } from "@/context/FlashcardRefreshContext";

export const useSaveAFlashcard = () => {
    const [useSaveAFlashcardError, setUseSaveAFlashcardError] = useState<string | null>(null);
    const [useSaveAFlashcardLoading, setUseSaveAFlashcardLoading] = useState(false);
    const [useSaveAFlashcardSuccess, setUseSaveAFlashcardSuccess] = useState(false);
    const triggerRefresh = useFlashcardRefresh();

    const SaveAFlashcard = async (question: string, answer: string, _userId: string | undefined) => {
        try {
            setUseSaveAFlashcardLoading(true);
            const res = await apiFetch("/api/flashcards/saved", {
                method: "POST",
                body: { question, answer },
            });
            if (!res.ok) throw new Error("Failed to save");
            setUseSaveAFlashcardSuccess(true);
            triggerRefresh();
        } catch (error: unknown) {
            setUseSaveAFlashcardError(`An Error when saving flashcard: ${error instanceof Error ? error.message : error}`);
            setUseSaveAFlashcardSuccess(false);
        } finally {
            setUseSaveAFlashcardLoading(false);
        }
    };
    return { useSaveAFlashcardSuccess, useSaveAFlashcardLoading, useSaveAFlashcardError, SaveAFlashcard };
};