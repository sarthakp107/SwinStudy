export type SurveyState = {
    degree: string;
    semester: string;
    selectedUnits: string[]
    step: number;
}

export type Action = 
|{ type: "SET_DEGREE"; payload:string }
|{type: "SET_SEMESTER"; payload: string}
|{type:"SET_UNITS"; payload: string[]}
|{type:"NEXT_STEP"}
|{type:"PREV_STEP"};


export const initialState: SurveyState = {
    degree: "",
    semester: "",
    selectedUnits:[],
    step: 1
}

export function surveyReducer (state: SurveyState, action: Action): SurveyState{
    switch(action.type){
        case "SET_DEGREE":
            return{...state, degree: action.payload}
        case "SET_SEMESTER":
            return { ...state, semester: action.payload };
        case "SET_UNITS":
            return { ...state, selectedUnits: action.payload };
        case "NEXT_STEP":
            return { ...state, step: state.step + 1 };
        case "PREV_STEP":
            return { ...state, step: state.step - 1 };
    default:
        return state;
    }
}
