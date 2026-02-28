import { useState } from "react";
import { apiFetch } from "@/lib/apiClient";
import { useFlashcardRefresh } from "@/context/FlashcardRefreshContext";

export const useDeleteAFlaschard = () => {
    const [useDeleteAFlashcardError, setUseDeleteAFlashcardError] = useState<string | null>(null);
    const [useDeleteAFlashcardLoading, setUseDeleteAFlashcardLoading] = useState(false);
    const [useDeleteAFlashcardSuccess, setUseDeleteAFlashcardSuccess] = useState(false);
    const triggerRefresh = useFlashcardRefresh();

    const DeleteAFlashcard = async (question: string, answer: string, _userId: string | undefined) => {
        try {
            setUseDeleteAFlashcardLoading(true);
            const res = await apiFetch("/api/flashcards/saved?question=" + encodeURIComponent(question) + "&answer=" + encodeURIComponent(answer), {
                method: "DELETE",
            });
            if (!res.ok) throw new Error("Failed to delete");
            setUseDeleteAFlashcardSuccess(true);
            triggerRefresh();
        } catch (error: unknown) {
            setUseDeleteAFlashcardError(`An Error when deleting flashcard: ${error instanceof Error ? error.message : error}`);
            setUseDeleteAFlashcardSuccess(false);
        } finally {
            setUseDeleteAFlashcardLoading(false);
        }
    };
    return { useDeleteAFlashcardSuccess, useDeleteAFlashcardLoading, useDeleteAFlashcardError, DeleteAFlashcard };
};