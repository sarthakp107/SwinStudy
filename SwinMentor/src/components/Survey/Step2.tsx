import { useSurveyContext } from "@/Hooks/Context/useSurveyContext";
import { CurrentUnits } from "./CurrentUnits";
import { NUMBER_OF_CURRENT_UNITS } from "@/config/Constants";
import { useHandleSurveySubmit } from "@/Hooks/Database/useHandleSurveySubmit";
import { FaBook, FaArrowLeft } from "react-icons/fa";

export const Step2: React.FC = () => {
    const { state, dispatch } = useSurveyContext();
    const { handleSurveySubmit, loading } = useHandleSurveySubmit();

    return (
    <>
        {/* Main Div */}
        <div className="w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
            {/* Header Div */}
            <div className="bg-red-50 p-5 border-b border-red-100">
                <h3 className="text-xl font-semibold text-gray-800 flex items-center">
                    <FaBook className="h-6 w-6 mr-2 text-red-500" />
                    Units Information
                </h3>
                <p className="text-gray-600 ml-8 text-sm">We will use this information to match you with your unit peers</p>
            </div>
            {/* Current Units Div */}
            <div className="p-8">
                <CurrentUnits />
                {/* Buttons Div*/}
                <div className="flex justify-between mt-7 mb-3">
                    <button type="button" onClick={() => dispatch({ type: "PREV_STEP" })} className={`w-full py-4 rounded-lg flex items-center justify-center transition-all duration-300 bg-red-500 text-white} text-white mr-4`}>
                        <FaArrowLeft className='ml-2 h-5 w-5 mr-1' />
                        Previous
                    </button>
                    <button type="submit" onClick={handleSurveySubmit} disabled={state.selectedUnits.length !== NUMBER_OF_CURRENT_UNITS || loading} 
                    className={`w-full py-4 rounded-lg flex items-center justify-center transition-all duration-300 ${ (state.selectedUnits).length>=4   ? 'bg-red-500 hover:bg-red-600 text-white shadow-md hover:shadow-lg' : 'bg-gray-200 text-gray-400 cursor-not-allowed' }`}>
                        {loading ? "Processing..." : "Submit"}
                    </button>
                </div>
            </div>
        </div>
    </>
    );
};
