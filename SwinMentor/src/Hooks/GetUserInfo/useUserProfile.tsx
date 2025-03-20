import { useEffect, useState } from "react";
import supabase from "@/config/supabase-client";

const useUserProfile = () => {
    const [displayName, setDisplayName] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUserDisplayName = async () => {
            setLoading(true);
            setError(null);

            // Fetch the currently authenticated user
            const { data: { user }, error: userError } = await supabase.auth.getUser();

            if (userError || !user) {
                setError("Error fetching user.");
                setLoading(false);
                return;
            }

            // Fetch the display name from the 'profile' table
            const { data, error } = await supabase
                .from("profile")
                .select("display_name")
                .eq("id", user.id)
                .single();

            if (error) {
                setError("Error fetching display name.");
                setLoading(false);
                return;
            }

             // Capitalize the first letter of the display name
             const capitalizedDisplayName = data?.display_name
             ? data.display_name.charAt(0).toUpperCase() + data.display_name.slice(1)
             : null;

            setDisplayName(capitalizedDisplayName);
            setLoading(false);
        };

        fetchUserDisplayName();
    }, []); 

    return { displayName, loading, error };
};

export default useUserProfile;
