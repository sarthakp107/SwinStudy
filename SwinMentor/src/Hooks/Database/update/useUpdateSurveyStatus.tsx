import supabase from "@/config/supabase-client";
import { useAuthContext } from "@/Hooks/Context/useAuthContext";
import { useState } from "react";

export const useUpdateSurveyStatus = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isSuccess, setIsSuccess] = useState(false);
    const { user } = useAuthContext();

    const updateSurveyStatus = async (): Promise<boolean> => {
        setIsLoading(true);
        setError(null);
        setIsSuccess(false);

        if(!user?.id){
            console.log("no user id");
        }

        try {
            const { error } = await supabase
                .from("profile")
                .update({
                    "hasSubmittedSurvey": true
                })
                .eq("id", user?.id);

            if (error) {
                setError(error.message);
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

    }
    return { updateSurveyStatus, isLoading, error, isSuccess }
}