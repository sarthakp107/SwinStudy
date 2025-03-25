import { SearchableDropdown } from "./SearchableDropdown"
import { useAvailableUnits } from "@/Hooks/Database/useAvailableUnits"
import { useAuthContext } from "@/Hooks/Context/useAuthContext"
import { useSurveyContext } from "@/Hooks/Context/useSurveyContext"
import { useUpdateUnitsInProfile } from "@/Hooks/Database/update/useUpdateUnitsInProfile"
import { useUpdateDegreeInProfile } from "@/Hooks/Database/update/useUpdateDegreeInProfile"

export const CurrentUnits = ()=>{

    const {state, dispatch} = useSurveyContext()
    const { user } = useAuthContext();
    const { updateUnits, error: updateUnitsErrror } = useUpdateUnitsInProfile();
    const {updateDegree, error: updateDegreeError} = useUpdateDegreeInProfile()
    const { units, error } = useAvailableUnits();

    // if (loading) return <div>Loading units...</div>;
    if (error) return <div className="bg-red-100 text-red-600 text-sm p-3 border border-red-400 rounded-md">Error loading units</div>;

    //Treats each unit as a button, if it is selected for the first time, pushes it to the State's Selected Units, if its pressed again,
    //removes it from the selected units by filtering
    const handleUnitSelect = (unit: string) => {
        let updatedUnits = [...state.selectedUnits];
        if (updatedUnits.includes(unit)) {
            updatedUnits = updatedUnits.filter((id) => id !== unit);
        } else if (updatedUnits.length < 4) {
            updatedUnits.push(unit);
        }
        // console.log("Choosen Unit", updatedUnits)
        dispatch({ type: "SET_UNITS", payload: updatedUnits });
    };

    //Submits to Supabase at Submit
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (user && state.selectedUnits.length === 4) {
            console.log("Updated Degree to Supabase:", state.degree, state.semester)
            await updateDegree(user.id, state.degree, state.semester); //Submit Degree and Sem to Supabase
            console.log("Selected Units:", state.selectedUnits)
            if (updateDegreeError){
                <div className='bg-red-100 text-red-600 text-sm p-3 border border-red-400 rounded-md'>An Error Occured while updating Degree: {updateDegreeError}</div>
            }
            await updateUnits(user.id, state.selectedUnits); //Submit Units to Supabase
            console.log("Selected Units after submission:", state.selectedUnits)
            if (updateUnitsErrror){
                <div className='bg-red-100 text-red-600 text-sm p-3 border border-red-400 rounded-md'>An Error Occured while updating Degree: {updateUnitsErrror}</div>
            }
        }
    };

    
    return (
        <>
            <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Select Your 4 Units</h2>

                {/* Form For Unit Selection */}
                <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full space-y-4">
                    
                    {/* Calling Searchable Component  */}
                    <div className="relative">
                        <label className="block text-gray-700 font-medium mb-2">Search & Select Units</label>
                        <SearchableDropdown 
                            options={units.map((unit) => unit.unit_name)}
                            selectedOptions={state.selectedUnits}
                            onSelect={handleUnitSelect}
                            isMultiSelect={true} //This value is false by default, but can be set to true if we require multi select feature
                        />
                    </div>

                    {/* Previous and Next Buttons */}
                    <div className="flex justify-between mt-4">
                        <button type="button" onClick={() => dispatch({ type: "PREV_STEP" })} className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600">
                            Previous
                        </button>
                        <button type="submit" disabled={state.selectedUnits.length !== 4} className="px-4 py-2 bg-red-500 text-white rounded-lg disabled:bg-gray-300 hover:bg-red-600">
                            Submit
                        </button>
                    </div>

                </form>
            </div>
        </>
    )
}