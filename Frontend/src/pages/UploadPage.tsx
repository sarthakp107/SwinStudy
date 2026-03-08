import { FaBolt } from "react-icons/fa"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import DragDrop from "../components/Flashcards/DragDrop"
import { DropDownList } from "../components/Survey/DropDownList"
import {NUMBER_OF_FLASHCARDS} from '../config/Constants'
import { SwinButton } from "../components/Buttons/SwinButton"
import { useFileContext } from "../Hooks/Context/useFileContext"
import { uploadPdfAndGetFlashcards } from "../components/Flashcards/FetchQnA"
import { ShowSelection } from "../components/Survey/ShowSelection"
import {UploadGuidelines} from "../components/Flashcards/UploadGuidelines"

export const UploadPage = () => {
  const { state, dispatch } = useFileContext()
  const navigate = useNavigate()
  const [uploaded, setUploaded] = useState(false) // true once backend has generated flashcards
  const [flashcardCount, setFlashcardCount] = useState(0)
  const [error, setError] = useState("")

  // Upload PDF to backend; backend extracts text, calls LLM, returns flashcards.
  const handleUpload = async (file: File) => {
    dispatch({ type: "SET_QNA", payload: [] })
    dispatch({ type: "SET_FILE", payload: file })
    setError("")
    try {
      const qnaFormatted = await uploadPdfAndGetFlashcards(file)
      setUploaded(true)
      dispatch({ type: "SET_EXTRACTED_TEXT", payload: "Generated" })
      dispatch({ type: "SET_QNA_TEXT", payload: "" })
      dispatch({ type: "SET_QNA", payload: qnaFormatted })
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Error generating flashcards"
      setError(message)
      throw new Error(message)
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
              {state.extractedText && <div className="text-gray-700 mt-2 mb-0"><ShowSelection element={state.file.name}/></div>}
              
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
          <SwinButton label="Generate" onClick={handleGenerate} icon={<FaBolt />} isdisabled={!(flashcardCount > 0 && uploaded)} disabledLabel="Generate"/>
        </div>
        
      </div>
    </div>
  )
}
