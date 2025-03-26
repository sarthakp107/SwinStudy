  type State = {
    file: File;
    flashcardCount: number;
    extractedText: string;
  };
  
  type Action =
    | { type: "SET_FILE"; payload: File }
    | { type: "REMOVE_FILE" }
    | {type: "SET_EXTRACTED_TEXT"; payload: string}
    | { type: "SET_FLASHCARD_COUNT"; payload: number };
  
  export const fileReducer = (state: State, action: Action): State => {
    switch (action.type) {
      case "SET_FILE":
        return { ...state, file: action.payload };
      case "SET_FLASHCARD_COUNT":
        return { ...state, flashcardCount: action.payload };
      case "SET_EXTRACTED_TEXT":
        return {...state, extractedText: action.payload}
      default:
        return state;
    }
  };
  
  export const initialFileState: State = {
    file: new File([""], "default.txt", { type: "text/plain" }),
    flashcardCount: 0,
    extractedText: ""
  };
  