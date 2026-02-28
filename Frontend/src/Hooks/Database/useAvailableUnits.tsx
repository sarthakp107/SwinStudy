import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/apiClient";

interface Unit {
  unitId: number;
  unitName: string;
  unitCode?: string;
  creditPoints?: number;
}

export const useAvailableUnits = () => {
  const [units, setUnits] = useState<Unit[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUnits = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await apiFetch("/api/units");
        if (!res.ok) throw new Error("Failed to fetch units");
        const data = await res.json();
        setUnits(data || []);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchUnits();
  }, []);

  return {
    units: units.map((u) => ({
      unit_id: String(u.unitId),
      unit_name: u.unitName,
    })),
    loading,
    error,
  };
};
