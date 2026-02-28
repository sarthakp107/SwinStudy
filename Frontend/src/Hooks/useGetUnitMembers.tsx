import { useState, useEffect } from "react";
import { useAuthContext } from "./Context/useAuthContext";
import { apiFetch } from "@/lib/apiClient";

export const useGetUnitMembers = (unitName: string) => {
  const [users, setUsers] = useState<{ user_id: string; display_name: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchUsers = async () => {
      if (!unitName) {
        setUsers([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const res = await apiFetch(
          `/api/units/members?unitName=${encodeURIComponent(unitName)}`
        );
        if (!res.ok) {
          setUsers([]);
          setLoading(false);
          return;
        }
        const data = await res.json();
        const members = (data ?? []).map((m: { id: string; fullName: string }) => ({
          user_id: m.id,
          display_name: m.fullName || "SwinStudent",
        }));
        // Exclude current user
        const filtered = members.filter((m: { user_id: string }) => m.user_id !== user?.id);
        setUsers(filtered);
      } catch {
        setError("Failed to fetch unit buddies.");
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [unitName, user?.id]);

  return { users, loading, error };
};
