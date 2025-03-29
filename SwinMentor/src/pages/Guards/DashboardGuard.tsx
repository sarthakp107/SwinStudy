import { useSurveyStatus } from "@/Hooks/Database/update/useSurveyStatus";
import { Navigate, Outlet } from "react-router-dom";

const DashboardGuard = () => {
    const { hasSubmittedSurvey, isLoading } = useSurveyStatus();

    if (isLoading) return <p>Loading...</p>; // Prevent redirect before data loads

    return hasSubmittedSurvey ? <Outlet /> : <Navigate to="/survey" />;
};

export default DashboardGuard;
