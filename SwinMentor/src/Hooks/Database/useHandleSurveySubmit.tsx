import { useState } from "react";
import { useSurveyContext } from "@/Hooks/Context/useSurveyContext";
import { useUpdateDegreeInProfile } from "@/Hooks/Database/update/useUpdateDegreeInProfile";
import { useUpdateUnitsInProfile } from "@/Hooks/Database/update/useUpdateUnitsInProfile";
import { useAuthContext } from "@/Hooks/Context/useAuthContext";
import { NUMBER_OF_CURRENT_UNITS } from "@/config/Constants";
import { useUpdateSurveyStatus } from "./update/useUpdateSurveyStatus";

export const useHandleSurveySubmit = () => {
    const { state } = useSurveyContext();
    const { updateUnits, error: updateUnitsErrror } = useUpdateUnitsInProfile();
    const { updateDegree, error: updateDegreeError } = useUpdateDegreeInProfile();
    const { user } = useAuthContext();
    const { updateSurveyStatus, error: statusUpdateError } = useUpdateSurveyStatus();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSurveySubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!user || state.selectedUnits.length !== NUMBER_OF_CURRENT_UNITS) return;

        setLoading(true);
        setError(null);

        console.log(user);

        try {
            await updateDegree(user.id, state.degree, state.semester);

            //update the hasSubmittedSurvey column in the db
            const statusUpdated = await updateSurveyStatus();
            console.log(statusUpdated);
            if (!statusUpdated) {
                setError(`An error occurred while updating survey status: ${statusUpdateError}`);
                return;
            }

            if (updateDegreeError) {
                <div className='error'>An Error Occured while updating Degree: {updateDegreeError}</div>
            }

            await updateUnits(user.id, state.selectedUnits);
            if (updateUnitsErrror) {
                <div className='error'>An Error Occured while updating Degree: {updateUnitsErrror}</div>
            }

        } catch (err) {
            setError("An error occurred while submitting the survey. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return { handleSurveySubmit, loading, error };
};
