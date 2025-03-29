import { SearchableDropdown } from "./SearchableDropdown"
import { useAvailableUnits } from "@/Hooks/Database/useAvailableUnits"
import { useSurveyContext } from "@/Hooks/Context/useSurveyContext"

export const CurrentUnits = ()=>{

    const {state, dispatch} = useSurveyContext()
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

    
    return (
            <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Select Your 4 Units</h2>
                    
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

                   
            </div>
    )
}