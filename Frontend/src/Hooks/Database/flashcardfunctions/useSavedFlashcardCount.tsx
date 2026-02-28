import { typeFlashcardForQuery } from "@/types";
import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/apiClient";
import { useFlashcardRefreshTrigger } from "@/context/FlashcardRefreshContext";

export const useSavedFlashcardCount = (userId: string | undefined) => {
    const [numberOfSavedFlashcards, setNumberOfSavedFlashcard] = useState(0);
    const [useSavedFlashcardCountError, setUseSavedFlashcardCountError] = useState<string | null>(null);
    const [useSavedFlashcardCountLoading, setUseSavedFlashcardCountLoading] = useState(false);
    const refreshTrigger = useFlashcardRefreshTrigger();

    useEffect(() => {
        if (!userId) {
            setUseSavedFlashcardCountLoading(false);
            return;
        }
        const getSavedFlashcardsCount = async () => {
            try {
                setUseSavedFlashcardCountLoading(true);
                setUseSavedFlashcardCountError(null);
                const res = await apiFetch("/api/flashcards/saved");
                if (!res.ok) throw new Error("Failed to fetch");
                const data: typeFlashcardForQuery[] = await res.json();
                setNumberOfSavedFlashcard(data.length);
            } catch (error: unknown) {
                setUseSavedFlashcardCountError(error instanceof Error ? error.message : String(error));
            } finally {
                setUseSavedFlashcardCountLoading(false);
            }
        };
        getSavedFlashcardsCount();
    }, [userId, refreshTrigger]);
    return { numberOfSavedFlashcards, useSavedFlashcardCountError, useSavedFlashcardCountLoading };
};