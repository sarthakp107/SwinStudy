type flashcardState = {
    current_question: number
}


type Action = 
|{type: "PREVIOUS_STEP"}
|{type: "NEXT_STEP"}


export const flashcardReducer = (state: flashcardState, action: Action) =>{
    switch(action.type){
        case "PREVIOUS_STEP":
            return {...state, current_question: state.current_question - 1}
        case "NEXT_STEP":
            return {...state, current_question: state.current_question + 1}
        default:
            return state
    }
}  

export const initialFlashcardState:flashcardState = {
    current_question: 0
}