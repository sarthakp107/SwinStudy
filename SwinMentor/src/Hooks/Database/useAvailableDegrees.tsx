import supabase from "@/config/supabase-client";
import { useEffect, useState } from "react";

interface Degree {
    degree_id: string;
    degree_name: string;
}

export const useAvailableDegrees = () => {
    const [degrees, setDegrees] = useState<Degree[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);


    useEffect(() => {
        const fetchDegrees = async () => {
            setLoading(true);
            setError(null);

            try {
                const { data, error } = await supabase
                    .from("available_degrees")
                    .select("degree_id, degree_name");

                if (error) {
                    throw new Error(error.message);
                }

                setDegrees(data || []);
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

        fetchDegrees();
    }, [])
    return { degrees, loading, error };
}