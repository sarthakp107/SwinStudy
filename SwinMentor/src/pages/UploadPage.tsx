import { useReducer} from "react"
import DragDrop from "../components/Flashcards/DragDrop"
import { UploadButton } from "@/components/Buttons/UploadButton"
import { fileReducer, initialFileState } from "@/reducers/fileReducer"
import { DropDownList } from "@/components/Survey/DropDownList"
import { NUMBER_OF_FLASHCARDS } from "@/config/Constants"
import { PDFParser } from "@/components/Flashcards/PDFParser"
import { Embedder } from "@/components/Flashcards/Embedder"
import { FetchQnA } from "@/components/Flashcards/FetchQnA"
// import FetchQnADeepSeek from "@/components/Flashcards/FetchQnADeepSeek"
// import {FetchQnAOurServer} from "@/components/Flashcards/FetchQnAOurServer"



export const CreateFlashcard1 = () => {
    
    const [state, dispatch] = useReducer(fileReducer, initialFileState)
    
    
    
    const handleUpload = async (file: File) => {
        dispatch({ type: "SET_FILE", payload: file });
        try {
            const extractedText = await PDFParser(file);
            // const extractedText = "Hi, how are you deepseek, I will attach the PDF in the next prompt";
            await dispatch({ type: "SET_EXTRACTED_TEXT", payload: extractedText });
            console.log("Extracted Text:", extractedText);

            const embeddedText = await Embedder(extractedText)
            await dispatch({ type: "SET_EMBEDDED_TEXT", payload: embeddedText });
            console.log("Extracted Text:", embeddedText);

            // const QnAPairOurServer = await FetchQnAOurServer(extractedText)
            // console.log ("QnAPair:", QnAPairOurServer)
            // await dispatch({type: "SET_QNA_TEXT", payload: QnAPairOurServer})

            const QnAPair = await FetchQnA(extractedText)
            console.log ("QnAPair:", QnAPair)
            await dispatch({type: "SET_QNA_TEXT", payload: QnAPair})

            // const QnAPairDeepSeek = await FetchQnADeepSeek(extractedText)
            // console.log ("QnAPair:", QnAPair)
            // await dispatch({type: "SET_QNA_TEXT", payload: QnAPairDeepSeek})

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

                <div>
                    {/* {state.embeddedText} */}
                    {state.QnAText}
                </div>
            </div>
        </>
    )
}