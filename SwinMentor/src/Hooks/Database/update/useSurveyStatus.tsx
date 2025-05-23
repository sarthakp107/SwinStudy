import supabase from "@/config/supabase-client";
import { useAuthContext } from "@/Hooks/Context/useAuthContext";
import { useEffect, useState } from "react";

export const useSurveyStatus = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [hasSubmittedSurvey, setHasSubmittedSurvey] = useState<boolean>(false);
    const { user } = useAuthContext();

    useEffect(() => {
        const fetchSurveyStatus = async () => {
            setIsLoading(true);
            if (!user?.id) { 
                return; 
            }    
            
            try {
                const { data: fetchData, error } = await supabase
                    .from("profile")
                    .select("hasSubmittedSurvey")
                    .eq("id", user?.id);

                if (error) {
                    setError(error.message);
                }
                if (fetchData && fetchData.length > 0) {
                    setHasSubmittedSurvey(fetchData[0].hasSubmittedSurvey);
                }

            } catch (err: any) {
                setError('Failed to fetch survey status.');
            } finally {
                setIsLoading(false);
            }
        }
        fetchSurveyStatus();
    }, [user?.id])

    return { hasSubmittedSurvey, isLoading, error }
}