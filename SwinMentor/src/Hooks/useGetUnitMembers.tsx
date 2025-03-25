import { useState, useEffect } from "react";
import supabase from "@/config/supabase-client";
import { useAuthContext } from "./Context/useAuthContext";
// import { useUserUnits } from "./GetUserInfo/useUserUnits";

export const useGetUnitMembers = (unit: string) => {
  // const { unit } = useUserUnits(); // Get the selected unit
  const [users, setUsers] = useState<{ user_id: string; display_name: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const{user} = useAuthContext();

  useEffect(() => {
    const fetchUsers = async () => {
      if (!unit) return; // Avoid querying if no unit is selected

      setLoading(true);
      setError(null);

      // Fetch the user_id from testTable for the selected unit
      const { data, error } = await supabase
        .from("testTable")
        .select("user_id") // Get user_id from testTable
        .eq("selected_units", unit);

      if (error) {
        console.error("Error fetching users:", error);
        setError(error.message);
      } else {
        console.log("Fetched Users:", data);

        // Now fetch the display_name from the appropriate table (assuming 'profiles' table)
        const userIds = data.map((row) => row.user_id); // Get user_ids array

        // Adjust this query if 'profiles' table or columns have different names
        const { data: profiles, error: profileError } = await supabase
          .from("profile") // Assuming 'profiles' table has display_name and user_id
          .select("id, display_name")
          .in("id", userIds); // Filter by the fetched user_ids

        if (profileError) {
          setError(profileError.message);
        } else {
          const filteredUsers = profiles
          .filter((profile) => profile.id !== user?.id) // Exclude the current user's user_id
          .map((profile) => ({
            user_id: profile.id,
            display_name: profile.display_name || "SwinStudent", // Default to 'SwinStudent'
          }));

        setUsers(filteredUsers);

        }
      }

      setLoading(false);
    };

    fetchUsers();
  }, [unit]); // Depend on unit to trigger the fetch

  return { users, loading, error };
};
