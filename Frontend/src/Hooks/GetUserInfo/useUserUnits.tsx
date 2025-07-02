import supabase from "@/config/supabase-client";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const useUserUnits = () => {
    const [units, setUnits] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const {id} = useParams();

    useEffect(() => {
        const fetchUserUnits = async () => {
            setLoading(true);
            setError(null);

            if (!id) {
                setError("Error fetching user.");
                setLoading(false);
                return;
            }

            const { data, error } = await supabase
            .from("testTable")
            .select("user_id, selected_units")
            .eq("user_id", id);

            if (error) {
                setError(error.message);
            } else {
                // Extract the 'units' data from the response
                const userUnits = data?.map((item) => item.selected_units ?? []) || [];
                setUnits(userUnits);  // Set the units in state
            }
            setLoading(false);
        };
    
            fetchUserUnits();

    }, [])

    return { units, loading, error };

}