import { useState } from "react";
import { useSurveyContext } from "@/Hooks/Context/useSurveyContext";
import { useAuthContext } from "@/Hooks/Context/useAuthContext";
import { NUMBER_OF_CURRENT_UNITS } from "@/config/Constants";
import { useNavigate } from "react-router-dom";
import { apiFetch } from "@/lib/apiClient";

export const useHandleSurveySubmit = () => {
  const { state } = useSurveyContext();
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSurveySubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user || state.selectedUnits.length !== NUMBER_OF_CURRENT_UNITS) return;

    setLoading(true);
    setError(null);

    try {
      const res = await apiFetch("/api/survey/save", {
        method: "POST",
        body: {
          degree: state.degree,
          semester: state.semester,
          selectedUnits: state.selectedUnits,
        },
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Failed to submit survey.");
        return;
      }

      navigate("/dashboard");
    } catch {
      setError("An error occurred while submitting the survey. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return { handleSurveySubmit, loading, error };
};
