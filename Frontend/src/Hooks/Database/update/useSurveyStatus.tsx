import { useEffect, useState } from "react";
import { useAuthContext } from "@/Hooks/Context/useAuthContext";
import { apiFetch } from "@/lib/apiClient";

export const useSurveyStatus = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSubmittedSurvey, setHasSubmittedSurvey] = useState(false);
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchSurveyStatus = async () => {
      setIsLoading(true);
      if (!user?.id) {
        setIsLoading(false);
        return;
      }

      try {
        const res = await apiFetch("/api/survey/status");
        if (!res.ok) {
          setHasSubmittedSurvey(false);
          return;
        }
        const data = await res.json();
        setHasSubmittedSurvey(data.hasSubmittedSurvey ?? false);
      } catch {
        setError("Failed to fetch survey status.");
        setHasSubmittedSurvey(false);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSurveyStatus();
  }, [user?.id]);

  return { hasSubmittedSurvey, isLoading, error };
};
