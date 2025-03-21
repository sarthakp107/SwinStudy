import React, { useReducer } from "react";
import { UnitList } from "./UnitList";
import { initialState, surveyReducer } from "@/reducers/surveyReducer";
import { useAuthContext } from "@/Hooks/Context/useAuthContext";
import { useUpdateUnitsInProfile } from "@/Hooks/Database/update/useUpdateUnitsInProfile";

export const Step2: React.FC = () => {
    const [state, dispatch] = useReducer(surveyReducer, initialState);
    const { user } = useAuthContext();
    const { updateUnits } = useUpdateUnitsInProfile();

    const handleUnitSelection = (unitId: string) => {
        let updatedUnits = [...state.selectedUnits];
        if (updatedUnits.includes(unitId)) {
            updatedUnits = updatedUnits.filter((id) => id !== unitId);
        } else if (updatedUnits.length < 4) {
            updatedUnits.push(unitId);
        }
        dispatch({ type: "SET_UNITS", payload: updatedUnits });
    };

    const handleNext = async (e: React.FormEvent) => {
        e.preventDefault();
        if (user && state.selectedUnits.length === 4) {
            await updateUnits(user.id, state.selectedUnits);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Select Your 4 Units</h2>
            <form onSubmit={handleNext} className="bg-white p-6 rounded-lg shadow-md w-full max-w-md space-y-4">
                <UnitList selectedUnits={state.selectedUnits} onUnitSelect={handleUnitSelection} />
                <div className="flex justify-between mt-4">
                    <button type="button" onClick={() => dispatch({ type: "PREV_STEP" })} className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600">
                        Previous
                    </button>
                    <button type="submit" disabled={state.selectedUnits.length !== 4} className="px-4 py-2 bg-red-500 text-white rounded-lg disabled:bg-gray-300 hover:bg-red-600">
                        Next
                    </button>
                </div>
            </form>
        </div>
    );
};