import { useState } from "react";
import { useSurveyContext } from "@/Hooks/Context/useSurveyContext";
import { useUpdateDegreeInProfile } from "@/Hooks/Database/update/useUpdateDegreeInProfile";
import { useUpdateUnitsInProfile } from "@/Hooks/Database/update/useUpdateUnitsInProfile";
import { useAuthContext } from "@/Hooks/Context/useAuthContext";
import { NUMBER_OF_CURRENT_UNITS } from "@/config/Constants";

export const useHandleSurveySubmit = () => {
    const { state } = useSurveyContext();
    const { updateUnits, error: updateUnitsErrror } = useUpdateUnitsInProfile();
    const { updateDegree, error: updateDegreeError } = useUpdateDegreeInProfile();
    const { user } = useAuthContext();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSurveySubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!user || state.selectedUnits.length !== NUMBER_OF_CURRENT_UNITS) return;
        
        setLoading(true);
        setError(null);

        console.log(user);

        try {
            console.log("Updating Degree for user:", user.id, state.degree, state.semester);
            console.log("Updating Selected Units:", state.selectedUnits);

            await updateDegree(user.id, state.degree, state.semester);

            if (updateDegreeError) {
                <div className='error'>An Error Occured while updating Degree: {updateDegreeError}</div>
            }

            await updateUnits(user.id, state.selectedUnits);

            if (updateUnitsErrror) {
                <div className='error'>An Error Occured while updating Degree: {updateUnitsErrror}</div>
            }
        } catch (err) {
            setError("An error occurred while submitting the survey. Please try again.");
            console.error("Survey submission error:", err);
        } finally {
            setLoading(false);
        }
    };

    return { handleSurveySubmit, loading, error };
};
