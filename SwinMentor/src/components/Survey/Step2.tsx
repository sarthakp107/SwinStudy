import { useSurveyContext } from "@/Hooks/Context/useSurveyContext";
import { CurrentUnits } from "./CurrentUnits";
import { NUMBER_OF_CURRENT_UNITS } from "@/config/Constants"
import { useUpdateDegreeInProfile } from "@/Hooks/Database/update/useUpdateDegreeInProfile";
import { useUpdateUnitsInProfile } from "@/Hooks/Database/update/useUpdateUnitsInProfile";
import { useAuthContext } from "@/Hooks/Context/useAuthContext";


export const Step2: React.FC = () => {
    const { state, dispatch } = useSurveyContext();
    const { updateUnits, error: updateUnitsErrror } = useUpdateUnitsInProfile();
    const { updateDegree, error: updateDegreeError } = useUpdateDegreeInProfile();
    const { user } = useAuthContext();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (user && state.selectedUnits.length === 4) {
            console.log("Updated Degree to Supabase:", state.degree, state.semester)
            await updateDegree(user.id, state.degree, state.semester); //Submit Degree and Sem to Supabase
            console.log("Selected Units:", state.selectedUnits)
            if (updateDegreeError) {
                <div className='error'>An Error Occured while updating Degree: {updateDegreeError}</div>
            }
            await updateUnits(user.id, state.selectedUnits); //Submit Units to Supabase
            console.log("Selected Units after submission:", state.selectedUnits)
            if (updateUnitsErrror) {
                <div className='error'>An Error Occured while updating Degree: {updateUnitsErrror}</div>
            }
        }
    };
    return (
        //Main Div
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
            <CurrentUnits />

            <div className="flex justify-between mt-4">
                <button type="button" onClick={() => dispatch({ type: "PREV_STEP" })} className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600">
                    Previous
                </button>
                <button type="submit" onClick={handleSubmit} disabled={state.selectedUnits.length !== NUMBER_OF_CURRENT_UNITS} className="px-4 py-2 bg-red-500 text-white rounded-lg disabled:bg-gray-300 hover:bg-red-600">
                    Submit
                </button>
            </div>
        </div>
    );
};
