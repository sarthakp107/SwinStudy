import { FaGamepad } from "react-icons/fa"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import DragDrop from "../components/Flashcards/DragDrop"
import { DropDownList } from "@/components/Survey/DropDownList"
import { NUMBER_OF_FLASHCARDS} from "@/config/Constants"
import { PDFParser } from "@/components/Flashcards/PDFParser"
import { QnAConverter } from "@/components/Flashcards/QnAConverter"
import { SwinButton } from "@/components/Buttons/SwinButton"
import { useFileContext } from "@/Hooks/Context/useFileContext"
import { FetchQnA } from "@/components/Flashcards/FetchQnA"
import { UploadGuidelines } from "@/components/Flashcards/UploadGuidelines"
import { useRandomAPI } from "@/Hooks/useRandomAPI"

export const UploadPage = () => {
  const { state, dispatch } = useFileContext() //Update in FileContext to access it from Flashcard Page
  const navigate = useNavigate()
  const [extractedText, setExtractedText] = useState("") //Used for Validation
  const [flashcardCount, setFlashcardCount] = useState(0) //Used for Validation
  const [error, setError] = useState("")
  const API = useRandomAPI();  

  //Main Function, Starts: User Uploads File
  const handleUpload = async (file: File) => { 
    dispatch({ type: "SET_FILE", payload: file }) //1. Set File
    try {
      const responseFromParser = await PDFParser(file) //2. Extract Text
      setExtractedText(responseFromParser) 
      dispatch({ type: "SET_EXTRACTED_TEXT", payload: responseFromParser })//3.Set Extracted Text
      const QnAText = await FetchQnA(responseFromParser, API) //4. Send Extracted Text to AI to generate Question
      dispatch({ type: "SET_QNA_TEXT", payload: QnAText }) //5. Set QnA (Text) received from AI
      const QnAFormatted = await QnAConverter(QnAText) //6. Format QnA in QnA Format
      dispatch({ type: "SET_QNA", payload: QnAFormatted }) //7. Set QnA (Formatted)
    } catch (error: any) {
      setError("Error in Extraction of Text:" + error.message)
      throw new Error("Error in Q/Ans Generation")
    }
  }

  const handleSelect = (option: number) => {
    setFlashcardCount(option)
    dispatch({ type: "SET_FLASHCARD_COUNT", payload: option }) //8. Set Flashcard Count
  }

  const handleGenerate = async () => {
    try {
      navigate("/flashcard/0") //9. Simply navigate to Flashcards, loading to be handled by Flashcards
    } catch (error: any) {
      setError("Error in Post-Navigation:" + error)
      throw new Error("Error in post-navigation")
    }
  }

  return (
    // Main Div
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* Title/Error */}
        <h1 className="text-3xl font-bold text-gray-800 mb-8 ">Create Flashcards</h1>
        {error && <div className="error">{error}</div>}
        
        {/* File Upload Div */}
        <div className="bg-white p-8 rounded-xl shadow-md mb-8">
          <div className="flex flex-col space-y-6">
            <div>
              <DragDrop onUpload={handleUpload} />
              {state.extractedText && <div className="text-gray-700 mt-2 mb-0">Uploaded File: {state.file.name}</div>}
              <UploadGuidelines />
            </div>
          </div>
        </div>

        {/* Number of Flashcards Div */}
        <div className="bg-white p-4 rounded-xl shadow-md mb-8">
          <div className="flex items-center space-x-4">
            <label className="text-lg font-semibold text-gray-700 mr-50">Number of Flashcards To Generate</label>
            <div className="flex-1">
              <DropDownList options={NUMBER_OF_FLASHCARDS} handleClick={handleSelect} label="Select..." />
            </div>
          </div>
        </div>

        {/* Generate Button */}
        <div className="mb-8 flex justify-end">
          <SwinButton label="Generate" onClick={handleGenerate} icon={<FaGamepad />} isdisabled={!(flashcardCount > 0 && extractedText)} disabledLabel="Generate"/>
        </div>
        
      </div>
    </div>
  )
}
