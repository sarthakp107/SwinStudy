import { SearchableDropdown } from './SearchableDropdown';
import { useAvailableDegrees } from '@/Hooks/Database/useAvailableDegrees';
import { useSurveyContext } from '@/Hooks/Context/useSurveyContext';
import { DropDownList } from './DropDownList';
import { SEMESTER_OPTIONS } from '@/config/Constants';

export const DegreeAndSem = () =>{

    const { degrees, loading, error } = useAvailableDegrees();
    const {dispatch, state} = useSurveyContext();

    const handleDegreeChange = (degreeId: string) => {
        dispatch({ type: 'SET_DEGREE', payload: degreeId });
    };

    const handleSemesterChange = (semester: string) => {    
        dispatch({ type: 'SET_SEMESTER', payload: semester });
    };

    const handleNext = async (e: React.FormEvent) => {
        e.preventDefault();
        dispatch({type: "NEXT_STEP"})
    };
    return (
        <>
            {/* Main Div */}
            <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Select Your Degree & Semester</h2>

                {/* Form for Degree and Sem Selection */}
                <form onSubmit={handleNext} className="bg-white p-6 rounded-lg shadow-md w-full max-w-md space-y-4">

                    {/* Div for Degree Selection */}
                    <div className="relative">
                        <label className="block text-gray-700 font-medium mb-2">Degree</label>

                        {/* Calling Searchable Component  */}
                        {loading ? <div>Loading degrees...</div> : error ? <div>Error loading degrees</div> : (
                            <SearchableDropdown 
                                options={degrees.map((degree) => degree.degree_name)}
                                selectedOptions={state.degree ? [state.degree] : []}
                                onSelect={handleDegreeChange}
                                isMultiSelect={false}
                            />
                        )}

                        {/* After a degree has been selected */}
                        {state.degree && (
                            <p className="mt-2 text-green-600">Selected Degree: {state.degree}</p>
                        )}
                    </div>

                    {/* Div For Semester Selection */}
                    <div className="relative">
                        <label className="block text-gray-700 font-medium mb-2">Semester</label>
                        <DropDownList options={SEMESTER_OPTIONS} handleClick={handleSemesterChange} label='Select Semester' />
                    </div>

                    {/* Next Button, submits to Supabase and sends to Step 2 */}
                    <button type="submit" className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600">Next</button>
                </form>
            </div>
        </>
    )
}