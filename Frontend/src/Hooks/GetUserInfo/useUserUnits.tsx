import { useEffect, useState } from "react";
import { useAuthContext } from "../Context/useAuthContext";
import { apiFetch } from "@/lib/apiClient";

export interface UserUnit {
  unitId: number;
  unitName: string;
  unitCode?: string;
  creditPoints?: number;
}

export const useUserUnits = () => {
  const [units, setUnits] = useState<UserUnit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchUserUnits = async () => {
      setLoading(true);
      setError(null);

      if (!user?.id) {
        setUnits([]);
        setLoading(false);
        return;
      }

      try {
        const res = await apiFetch("/api/survey/my-units");
        if (!res.ok) {
          setUnits([]);
          return;
        }
        const data = await res.json();
        setUnits(data ?? []);
      } catch {
        setError("Failed to fetch your units.");
        setUnits([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUserUnits();
  }, [user?.id]);

  return {
    units,
    /** Unit names for display/links (e.g. dashboard/:unitName) */
    unitNames: units.map((u) => u.unitName),
    loading,
    error,
  };
};
