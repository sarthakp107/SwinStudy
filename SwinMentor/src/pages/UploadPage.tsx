import { FaGamepad } from "react-icons/fa"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import DragDrop from "../components/Flashcards/DragDrop"
import { DropDownList } from "@/components/Survey/DropDownList"
import { NUMBER_OF_FLASHCARDS, TEST_QnA } from "@/config/Constants"
import { PDFParser } from "@/components/Flashcards/PDFParser"
import { QnAConverter } from "@/components/Flashcards/QnAConverter"
import { SwinButton } from "@/components/Buttons/SwinButton"
import { useFileContext } from "@/Hooks/Context/useFileContext"
import { FetchQnA } from "@/components/Flashcards/FetchQnA"
import { UploadGuidelines } from "@/components/Flashcards/UploadGuidelines"

export const UploadPage = () => {
  const { state, dispatch } = useFileContext()
  const navigate = useNavigate()
  const [extractedText, setExtractedText] = useState("")
  const [flashcardCount, setFlashcardCount] = useState(0)
  const [error, setError] = useState("")

  const handleUpload = async (file: File) => {
    dispatch({ type: "SET_FILE", payload: file })
    try {
      const responseFromParser = await PDFParser(file)
      await setExtractedText(responseFromParser)
      console.log("extracted text", extractedText)
      setError("")
      await dispatch({ type: "SET_EXTRACTED_TEXT", payload: responseFromParser })

      // const QnAText = await FetchQnA(responseFromParser)
      const QnAText = TEST_QnA
      await dispatch({ type: "SET_QNA_TEXT", payload: QnAText })

      const QnAFormatted = QnAConverter(QnAText)
      await dispatch({ type: "SET_QNA", payload: QnAFormatted })
    } catch (error: any) {
      setError("Error in Extraction of Text:" + error.message)
      throw new Error("Error in Q/Ans Generation")
    }

  }

  const handleSelect = (option: number) => {
    setFlashcardCount(option)
    dispatch({ type: "SET_FLASHCARD_COUNT", payload: option })
  }

  const handleGenerate = async () => {
    try {
      navigate("/flashcard/0")
    } catch (error: any) {
      setError("Error in Post-Navigation:" + error)
      throw new Error("Error in post-navigation")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Title Section */}
        <h1 className="text-3xl font-bold text-gray-800 mb-8 ">Create Flashcards</h1>
        {error && <div className="error">{error}</div>}
        {/* File Upload Section */}
        <div className="bg-white p-8 rounded-xl shadow-md mb-8">
          <div className="flex flex-col space-y-6">
            <div>
              <DragDrop onUpload={handleUpload} />
              {state.extractedText && <div className="text-gray-700 mt-2 mb-0">Uploaded File: {state.file.name}</div>}
              <UploadGuidelines />
            </div>
          </div>
        </div>

        {/* Number of Flashcards Selection */}
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
          <SwinButton
            label="Generate"
            onClick={handleGenerate}
            icon={<FaGamepad />}
            isdisabled={!(flashcardCount > 0 && extractedText)}
            disabledLabel="Generate"
          />
        </div>

        
      </div>
    </div>
  )
}
