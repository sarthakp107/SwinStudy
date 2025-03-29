import { useSurveyContext } from "@/Hooks/Context/useSurveyContext";
import { CurrentUnits } from "./CurrentUnits";
import { NUMBER_OF_CURRENT_UNITS } from "@/config/Constants";
import { useHandleSurveySubmit } from "@/Hooks/Database/useHandleSurveySubmit";
import Spinner from "../Loading/Spinner";

export const Step2: React.FC = () => {
    const { state, dispatch } = useSurveyContext();
    const { handleSurveySubmit, loading, error } = useHandleSurveySubmit();

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
            <CurrentUnits />
            
            {error && <div className='error text-red-500'>{error}</div>}
            
            <div className="flex justify-between mt-4">
                <button type="button" onClick={() => dispatch({ type: "PREV_STEP" })} className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600">
                    Previous
                </button>
                <button 
                    type="submit" 
                    onClick={handleSurveySubmit} 
                    disabled={state.selectedUnits.length !== NUMBER_OF_CURRENT_UNITS || loading} 
                    className={`px-4 py-2 text-white rounded-lg ${loading ? 'bg-gray-300' : 'bg-red-500 hover:bg-red-600'}`}
                >
                    {loading ? <Spinner/> : "Submit"}
                </button>
            </div>
        </div>
    );
};
