import supabase from "@/config/supabase-client";
import { useAuthContext } from "@/Hooks/Context/useAuthContext";
// import { fetchData } from "pdfjs-dist/types/src/display/node_utils";
import {  useEffect, useState } from "react";


export const useSurveyStatus = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isSuccess, setIsSuccess] = useState(false);

    const[hasSubmittedSurvey, setHasSubmittedSurvey] = useState<boolean>(false);
    const { user } = useAuthContext();


useEffect(() => {
    const fetchSurveyStatus = async () => {
        setIsLoading(true);
        //boolean 
        try {
            const { data: fetchData, error } = await supabase
                .from("profile")
                .select("hasSubmittedSurvey")
                .eq("id", user?.id);

            if (error) {
                setError(error.message);
            }
            if(!fetchData){
                setHasSubmittedSurvey(false);
            }else{
                setHasSubmittedSurvey(true);
            }
        } catch (err: any) {
            setError('Failed to fetch survey status.');
        } finally {
            setIsLoading(false);
        }
    }
    fetchSurveyStatus();
},[user?.id])


    const updateSurveyStatus = async (): Promise<boolean> => {
        setIsLoading(true);
        setError(null);
        setIsSuccess(false);

        if (!user?.id) {
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


    return { hasSubmittedSurvey, updateSurveyStatus, isLoading, error, isSuccess }
}