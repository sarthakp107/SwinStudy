import { useReducer} from "react"
import DragDrop from "../components/Flashcards/DragDrop"
import { UploadButton } from "@/components/Flashcards/UploadButton"
import { fileReducer, initialFileState } from "@/reducers/fileReducer"
import { DropDownList } from "@/components/Survey/DropDownList"
import { NUMBER_OF_FLASHCARDS } from "@/config/Constants"
// import FileParser from "@/components/Flashcards/FileParser"


export const CreateFlashcard1 = () => {
    
    const [state, dispatch] = useReducer(fileReducer, initialFileState)

    
    const handleUpload = (file: File)=>{
        dispatch({type: "SET_FILE", payload: file})
        console.log(file)
    }
    const handleClick = (option: string)=>{
        console.log(option)
    }

    const handleExtract = (text: string)=>{
        console.log(text)
    }


    return (
        <>
            <div>
                <div>
                    <DragDrop onUpload ={handleUpload}/>
                    {state.file && (<div>Uploaded File:{} </div>)}
                </div>
                
                <div>
                    <UploadButton file={state.file} onUpload={handleUpload}  />
                </div>
                
                <div>
                    <label className="">Select Number of Flashcards</label>
                    <DropDownList options={NUMBER_OF_FLASHCARDS} handleClick={handleClick} label="Number of Flashcards"/>
                </div>

                {/* <FileParser file = {state.file} onExtractedText={handleExtract}/> */}
            </div>
        </>
    )
}