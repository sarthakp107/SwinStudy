import supabase from "@/config/supabase-client";
import { useEffect, useState } from "react";
import { useAuthContext } from "../Context/useAuthContext";

export const useUserUnits = () => {
    const [units, setUnits] = useState<any[]>([]);
    const [degree, setDegree] = useState<any[] | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const {user} = useAuthContext();

    useEffect(() => {
        const fetchUserUnits = async () => {
            setLoading(true);
            setError(null);

            // Get the authenticated user from supabase
            

            if (!user) {
                setError("Error fetching user.");
                setLoading(false);
                return;
            }

            const { data, error } = await supabase
            .from("testTable")
            .select("user_id, selected_units")
            .eq("user_id", user.id);

            if (error) {
                setError(error.message);
            } else {
                // Extract the 'units' data from the response
                const userUnits = data?.map((item) => item.selected_units ?? []) || [];
                setUnits(userUnits);  // Set the units in state
            }
            setLoading(false);
        };

      

        const fetchUserDegree = async () => {

            if (!user) {
                setError("Error fetching user.");
                setLoading(false);
                return;
            }

             const { data , error} = await supabase
            .from("profile")
            .select("id, degree")
            .eq("id", user.id);

            if (error) {
                setError(error.message);
            } else {
                setDegree(data);
            }
            setLoading(false);
            fetchUserUnits();
            fetchUserDegree();

        }
    }, [])

    // return {  loading, error };
    return { units, degree, loading, error };

}