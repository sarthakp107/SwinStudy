import supabase from "@/config/supabase-client";
import { useState } from "react";


interface UpdateDegreeResult {
    updateDegree: (userId: string, degree: string, semester: number | string) => Promise<boolean>;
    isLoading: boolean;
    error: string | null;
    isSuccess: boolean;
}



export const useUpdateDegreeInProfile = (): UpdateDegreeResult => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isSuccess, setIsSuccess] = useState(false);

    const updateDegree = async (
        userId: string,
        degree: string,
        semester: number | string
    ): Promise<boolean> => {
        if (!userId) {
            setError("User ID is required");
            return false;
        }

        setIsLoading(true);
        setError(null);
        setIsSuccess(false);

        try {
            const { error: updateError } = await supabase
                .from('profile') // Replace with your actual table name
                .update({
                    degree: degree,
                    semester: semester
                })
                .eq('id', userId);

                if (updateError) {
                    setError(updateError.message);
                    return false;  // Explicitly return false if there was an error
                }
    

            setIsSuccess(true);
            return true;
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message); // Access 'message' if it's an instance of Error
            } else {
                setError("An unknown error occurred");
            }
            return false;
        } finally {
            setIsLoading(false);
        }


    };
    return { updateDegree, isLoading, error, isSuccess };
}