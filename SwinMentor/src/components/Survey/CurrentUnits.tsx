import { SearchableDropdown } from "./SearchableDropdown";
import { useAvailableUnits } from "@/Hooks/Database/useAvailableUnits";
import { SkeletonDegreeandSem } from "../Loading/SkeletonDegreeandSem";
import { useSurveyContext } from "@/Hooks/Context/useSurveyContext";
import { ShowSelectedItems } from "./ShowSelectedItems";
import { NUMBER_OF_CURRENT_UNITS } from "@/config/Constants";

export const CurrentUnits = () => {
    const { state, dispatch } = useSurveyContext();
    const { units, error, loading } = useAvailableUnits();

    const handleUnitSelect = (unit: string) => {
        let updatedUnits = [...state.selectedUnits];
        if (updatedUnits.includes(unit)) {
            updatedUnits = updatedUnits.filter((id) => id !== unit);
        } else if (updatedUnits.length < 4) {
            updatedUnits.push(unit);
        }
        dispatch({ type: "SET_UNITS", payload: updatedUnits });
    };

    return (
        <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Select Your 4 Units</h2>
            {/* Searchable Dropdown */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm transition-all hover:shadow-md">
                <label className="block text-gray-700 font-medium mb-1">Current Units</label>
                <p className="text-sm text-gray-500 mb-4">Select the units you are taking this Semester</p>
                {loading ? ( <SkeletonDegreeandSem />) : error ? (<div className="error">Error Loading Units</div>
                ) : (
                    <SearchableDropdown options={units.map((unit) => unit.unit_name)}selectedOptions={state.selectedUnits} onSelect={handleUnitSelect}/>
                )}
            </div>

            {/* Selected Units Display */}
            <div>
              <h3 className="text-lg font-semibold text-red-600 mt-5">Selected Units:</h3>
              <ShowSelectedItems selectedItems={state.selectedUnits} onRemove={handleUnitSelect} label="Select a unit" numberOfItems={NUMBER_OF_CURRENT_UNITS}/>
            </div>
            
        </div>
    );
};
