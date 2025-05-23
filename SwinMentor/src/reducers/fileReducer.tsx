  import {QnAFormat} from "@/components/Flashcards/QnAConverter";
import getRandomNumber from "@/components/Maths/getRandomNumber";
import { NUMBER_OF_API } from "@/config/Constants";
  export type FileState = {
    file: File;
    flashcardCount: number;
    extractedText: string;
    embeddedText: string[];
    QnAText: string;
    QnA: QnAFormat[];
    Current_API: number;
  };
  
  export type Action =
    | { type: "SET_FILE"; payload: File }
    | { type: "REMOVE_FILE" }
    | {type: "SET_EXTRACTED_TEXT"; payload: string}
    | {type: "SET_EMBEDDED_TEXT"; payload: string[]}
    | {type: "SET_QNA_TEXT"; payload: string}
    | {type: "SET_QNA"; payload: QnAFormat[]}
    | { type: "SET_FLASHCARD_COUNT"; payload: number }
    | {type:"SET_CURRENT_API"; payload: number};
  
  export const fileReducer = (state: FileState, action: Action): FileState => {
    switch (action.type) {
      case "REMOVE_FILE":
        return{...state, file: new File([""], "", { type: "text/plain" })};
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
    QnA: [],
    Current_API: getRandomNumber(0,NUMBER_OF_API)
  };
  