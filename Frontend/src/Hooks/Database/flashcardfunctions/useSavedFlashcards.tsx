import { typeFlashcardForQuery } from "@/types";
import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/apiClient";
import { useFlashcardRefreshTrigger } from "@/context/FlashcardRefreshContext";

export const useSavedFlashcards = (userId: string | undefined) => {
    const [savedFlashcards, setSavedFlashcards] = useState<typeFlashcardForQuery[]>([]);
    const [useSavedFlashcardsError, setUseSavedFlashcardsError] = useState<string | null>(null);
    const [useSavedFlashcardsLoading, setUseSavedFlashcardsLoading] = useState(false);
    const refreshTrigger = useFlashcardRefreshTrigger();

    useEffect(() => {
        if (!userId) {
            setUseSavedFlashcardsLoading(false);
            return;
        }
        const getSavedFlashcards = async () => {
            try {
                setUseSavedFlashcardsLoading(true);
                setUseSavedFlashcardsError(null);
                const res = await apiFetch("/api/flashcards/saved");
                if (!res.ok) throw new Error("Failed to fetch");
                const data: typeFlashcardForQuery[] = await res.json();
                setSavedFlashcards(data);
            } catch (error: unknown) {
                setUseSavedFlashcardsError(error instanceof Error ? error.message : String(error));
            } finally {
                setUseSavedFlashcardsLoading(false);
            }
        };
        getSavedFlashcards();
    }, [userId, refreshTrigger]);
    return { savedFlashcards, useSavedFlashcardsError, useSavedFlashcardsLoading };
};