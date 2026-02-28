import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/apiClient";

interface Degree {
  degreeId: number;
  degreeName: string;
  degreeCode?: string;
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
        const res = await apiFetch("/api/degrees");
        if (!res.ok) throw new Error("Failed to fetch degrees");
        const data = await res.json();
        setDegrees(data || []);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchDegrees();
  }, []);

  return {
    degrees: degrees.map((d) => ({
      degree_id: String(d.degreeId),
      degree_name: d.degreeName,
    })),
    loading,
    error,
  };
};
