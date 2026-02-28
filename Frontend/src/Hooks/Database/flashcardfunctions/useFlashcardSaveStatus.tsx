import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/apiClient";

export const useFlashcardSaveStatus = (question: string, answer: string, userId: string | undefined) => {
    const [isFlashcardSaved, setIsFlashcardSaved] = useState(false);
    const [useFlashcardSaveStatusLoading, setUseFlashcardSaveStatusLoading] = useState(false);
    const [useFlaschardSaveStatusError, setUseFlaschardSaveStatusError] = useState<string | null>(null);

    useEffect(() => {
        if (!userId) return;
        const checkFlashcardSaveStatus = async () => {
            try {
                setUseFlaschardSaveStatusError(null);
                setUseFlashcardSaveStatusLoading(true);
                const res = await apiFetch("/api/flashcards/saved/specific?question=" + encodeURIComponent(question) + "&answer=" + encodeURIComponent(answer));
                if (res.status === 404) {
                    setIsFlashcardSaved(false);
                } else if (res.ok) {
                    setIsFlashcardSaved(true);
                } else {
                    setIsFlashcardSaved(false);
                }
            } catch (error: unknown) {
                setUseFlaschardSaveStatusError(`An Error Occured in GET request: ${error instanceof Error ? error.message : error}`);
            } finally {
                setUseFlashcardSaveStatusLoading(false);
            }
        };
        checkFlashcardSaveStatus();
    }, [question, answer, userId]);

    return { isFlashcardSaved, useFlashcardSaveStatusLoading, useFlaschardSaveStatusError };
};

