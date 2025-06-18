import { useContext } from "react";
import { SurveyContext } from "@/context/SurveyContext";

export const useSurveyContext = () => {
    const context = useContext(SurveyContext);
    if (!context) {
      throw new Error('useSurveyContext must be used an SurveyProvider');
    }
    return context;
  };