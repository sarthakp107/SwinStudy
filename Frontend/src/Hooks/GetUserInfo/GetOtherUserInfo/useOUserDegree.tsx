import supabase from "@/config/supabase-client";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const useOUserDegree = () => {
    const [degree, setDegree] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const {id} = useParams();

    useEffect(() => {


        const fetchUserDegree = async () => {

            setLoading(true);
            setError(null);

            if (!id) {
                setError("Error fetching user.");
                setLoading(false);
                return;
            }

            const { data, error } = await supabase
                .from("profile")
                .select("degree")
                .eq("id", id);

            if (error) {
                setError(error.message);
            } else {
                setDegree(data?.[0]?.degree ?? null);
            }
            setLoading(false);
        }

        fetchUserDegree();
    }, [])

    return {  degree, loading, error };
}