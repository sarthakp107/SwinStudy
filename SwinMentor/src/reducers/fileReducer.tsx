type State = {
    file: File | null;
    flashcardCount: number;
  };
  
  type Action =
    | { type: "SET_FILE"; payload: File }
    | { type: "REMOVE_FILE" }
    | { type: "SET_FLASHCARD_COUNT"; payload: number };
  
  export const fileReducer = (state: State, action: Action): State => {
    switch (action.type) {
      case "SET_FILE":
        return { ...state, file: action.payload };
      case "REMOVE_FILE":
        return { ...state, file: null };
      case "SET_FLASHCARD_COUNT":
        return { ...state, flashcardCount: action.payload };
      default:
        return state;
    }
  };
  
  export const initialFileState: State = {
    file: null,
    flashcardCount: 1,
  };
  