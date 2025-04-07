import { Step1 } from "@/components/Survey/Step1";
import { Step2 } from "@/components/Survey/Step2";
import { useSurveyContext } from "@/Hooks/Context/useSurveyContext";
import useUserProfile from "@/Hooks/GetUserInfo/useUserProfile";

export const SignUpSurvey: React.FC = () => {
  const { state } = useSurveyContext();
  const {displayName} = useUserProfile();

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-gray-100 flex flex-col items-center justify-center p-6">
      {/* Two Corner Half-Circles */}
      <div className="fixed top-0 right-0 w-64 h-64 bg-red-500 opacity-10 rounded-bl-full"></div>
      <div className="fixed bottom-0 left-0 w-96 h-96 bg-red-500 opacity-10 rounded-tr-full"></div>
      
      {/* User's Name and Sepearator */}
      <div className="flex flex-col items-center">
        <h1 className="text-4xl font-bold text-gray-800 tracking-tight">{displayName}</h1>
        <div className="h-1 w-32 bg-gradient-to-r from-red-400 to-red-600 rounded-full my-3"></div>
      </div>
      
      {/* Sub-Parent Div */}
      <div className="w-full max-w-4xl transform transition-all duration-300 ease-in-out">
        {/* Title and Step Indicator */}
        <header className="mb-6 text-center">
          <h2 className="text-2xl font-semibold text-gray-800">Complete Your Profile</h2>
          <div className="flex items-center justify-center mt-4 space-x-2">
            <div className={`h-2 w-16 rounded-full ${state.step === 1 ? 'bg-red-500' : 'bg-gray-300'}`}></div>
            <div className={`h-2 w-16 rounded-full ${state.step === 2 ? 'bg-red-500' : 'bg-gray-300'}`}></div>
          </div>
          <p className="text-sm text-gray-600 mt-2 font-medium">Step {state.step} of 2</p>
        </header>
        
        {/* Div Containing Step1/Step2 Elements */}
        <div className="transition-all duration-300 ease-in-out">
          {state.step === 1 ? <Step1 /> : <Step2 />}
        </div>
      </div>
    </div>
  );
};