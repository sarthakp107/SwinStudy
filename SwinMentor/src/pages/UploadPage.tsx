import { useReducer} from "react"
import DragDrop from "../components/Flashcards/DragDrop"
import { UploadButton } from "@/components/Buttons/UploadButton"
import { fileReducer, initialFileState } from "@/reducers/fileReducer"
import { DropDownList } from "@/components/Survey/DropDownList"
import { NUMBER_OF_FLASHCARDS } from "@/config/Constants"
import { PDFParser } from "@/components/Flashcards/PDFParser"


export const CreateFlashcard1 = () => {
    
    const [state, dispatch] = useReducer(fileReducer, initialFileState)
    
    
    
    const handleUpload = async (file: File) => {
        dispatch({ type: "SET_FILE", payload: file });
        try {
            const extractedText = await PDFParser(file);
            await dispatch({ type: "SET_EXTRACTED_TEXT", payload: extractedText });
            console.log("Extracted Text:", state.extractedText);
        } catch (error) {
            console.error("Error extracting text:", error);
        }
    };

    const handleClick = (option: string)=>{
        console.log(option)
    }


    return (
        <>
            <div>
                <div>
                    <DragDrop onUpload ={handleUpload}/>
                    {state.file && (<div>Uploaded File:{} </div>)}
                </div>
                
                <div>
                    <UploadButton file={state.file} onUpload={handleUpload} label="Upload"  />
                </div>
                
                <div>
                    <label className="">Select Number of Flashcards</label>
                    <DropDownList options={NUMBER_OF_FLASHCARDS} handleClick={handleClick} label="Number of Flashcards"/>
                </div>

            </div>
        </>
    )
}