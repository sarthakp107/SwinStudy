import supabase from "@/config/supabase-client";
import { useEffect, useState } from "react";

export const useUserUnits = () => {
    const [units, setUnits] = useState<any[]>([]);  
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);


    useEffect(() => {
        const fetchUnits = async() => {
            setLoading(true);
            setError(null);

            // Get the authenticated user from supabase
            const { data: { user }, error: userError } = await supabase.auth.getUser();

            if (userError || !user) {
                setError("Error fetching user.");
                setLoading(false);
                return;
            }

            const {data,error} = await supabase
            .from("user_units")
            .select("unit_id, units(*)")
            .eq("profile_id", user.id);

            if (error) {
                setError("Error fetching units.");
            } else {
                // Extract the 'units' data from the response
                const userUnits = data?.map((item) => item.units) || [];
                setUnits(userUnits);  // Set the units in state
            }

            setLoading(false); 
        };

        fetchUnits();
    }, [])

    return { units, loading, error };

}