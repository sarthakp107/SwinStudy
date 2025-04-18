  import {QnAFormat} from "@/components/Flashcards/QnAConverter";
  export type FileState = {
    file: File;
    flashcardCount: number;
    extractedText: string;
    embeddedText: string[];
    QnAText: string;
    QnA: QnAFormat[];

  };
  
  export type Action =
    | { type: "SET_FILE"; payload: File }
    | { type: "REMOVE_FILE" }
    | {type: "SET_EXTRACTED_TEXT"; payload: string}
    | {type: "SET_EMBEDDED_TEXT"; payload: string[]}
    | {type: "SET_QNA_TEXT"; payload: string}
    | {type: "SET_QNA"; payload: QnAFormat[]}
    | { type: "SET_FLASHCARD_COUNT"; payload: number };
  
  export const fileReducer = (state: FileState, action: Action): FileState => {
    switch (action.type) {
      case "SET_FILE":
        return { ...state, file: action.payload };
      case "SET_FLASHCARD_COUNT":
        return { ...state, flashcardCount: action.payload };
      case "SET_EXTRACTED_TEXT":
        return {...state, extractedText: action.payload};
      case "SET_EMBEDDED_TEXT":
        return{...state, embeddedText: action.payload};
      case "SET_QNA_TEXT":
        return{...state, QnAText: action.payload};
      case "SET_QNA":
        return{...state, QnA: action.payload};
      default:
        return state;
    }
  };
  
  export const initialFileState: FileState = {
    file: new File([""], "", { type: "text/plain" }),
    flashcardCount: 0,
    extractedText: "",
    embeddedText: [],
    QnAText: "",
    QnA: []
  };
  