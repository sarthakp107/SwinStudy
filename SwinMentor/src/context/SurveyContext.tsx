import React, { createContext, useReducer,  ReactNode } from 'react';
import { surveyReducer, initialState, SurveyState, Action } from '@/reducers/surveyReducer';

type SurveyContextType = {
  state: SurveyState;
  dispatch: React.Dispatch<Action>;
};

export const SurveyContext = createContext<SurveyContextType | undefined>(undefined);

export const SurveyProvider = ({ children }: {children: ReactNode}) => {
  const [state, dispatch] = useReducer(surveyReducer, initialState);

  return (
    <SurveyContext.Provider value={{ state, dispatch }}>
      {children}
    </SurveyContext.Provider>
  );
};

