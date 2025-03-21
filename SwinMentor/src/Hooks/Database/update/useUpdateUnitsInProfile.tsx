import supabase from "@/config/supabase-client";
import { useState } from "react";

interface UpdateUnitsResult {
    updateUnits: (userId: string, selectedUnits: string[]) => Promise<boolean>;
    isLoading: boolean;
    error: string | null;
    isSuccess: boolean;
}

export const useUpdateUnitsInProfile = (): UpdateUnitsResult => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isSuccess, setIsSuccess] = useState(false);

    const updateUnits = async (userId: string, selectedUnits: string[]): Promise<boolean> => {
        if (!userId) {
            setError("User ID is required");
            return false;
        }
        
        setIsLoading(true);
        setError(null);
        setIsSuccess(false);

        try {
            const { error: updateError } = await supabase
                .from("testTable") 
                .update({ 
                    "user": userId,
                    "selected_units":  selectedUnits
                })

            if (updateError) {
                setError(updateError.message);
                return false;
            }
            setIsSuccess(true);
            return true;
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("An unknown error occurred");
            }
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    return { updateUnits, isLoading, error, isSuccess };
};
