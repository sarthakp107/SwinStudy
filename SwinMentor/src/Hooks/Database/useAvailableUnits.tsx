import supabase from "@/config/supabase-client";
import { useEffect, useState } from "react";

interface Units {
    unit_id: string;
    unit_name: string;
}

export const useAvailableUnits = () => {
    const [units, setUnits] = useState<Units[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);


    useEffect(() => {
        const fetchUnits = async () => {
            setLoading(true);
            setError(null);

            try {
                const { data, error } = await supabase
                    .from("all_units")
                    .select("unit_id, unit_name");

                if (error) {
                    throw new Error(error.message);
                }

                setUnits(data || []);
            } catch (err: unknown) { // Use 'unknown' type for error
                if (err instanceof Error) {
                    setError(err.message); // Access 'message' if it's an instance of Error
                } else {
                    setError("An unknown error occurred");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchUnits();
    }, [])
    return { units, loading, error };
}