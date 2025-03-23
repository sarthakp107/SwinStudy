import { Step1 } from "@/components/Survey/Step1";
import { Step2 } from "@/components/Survey/Step2";
import { useSurveyContext } from "@/Hooks/Context/useSurveyContext";

export const SignUpSurvey: React.FC = () => {
    const{ state }= useSurveyContext()

    return (
        <div className="container mx-auto p-4">
            {state.step === 1 ? (
                <Step1 />
            ) : ( 
                <Step2 />
            )}
        </div>
    );
};
