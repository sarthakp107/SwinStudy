import { useSurveyStatus } from "@/Hooks/Database/update/useSurveyStatus";
import { Navigate, Outlet } from "react-router-dom";

const SurveyGuard = () => {
    const { hasSubmittedSurvey, isLoading } = useSurveyStatus();

    if (isLoading) return <p>Loading...</p>;

    return !hasSubmittedSurvey ? <Outlet /> : <Navigate to="/dashboard" />;
};

export default SurveyGuard;
