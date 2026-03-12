import { FaBolt, FaBook } from "react-icons/fa"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import DragDrop from "../components/Flashcards/DragDrop"
import { DropDownList } from "../components/Survey/DropDownList"
import { NUMBER_OF_FLASHCARDS } from '../config/Constants'
import { SwinButton } from "../components/Buttons/SwinButton"
import { useFileContext } from "../Hooks/Context/useFileContext"
import { uploadPdfAndGetFlashcards } from "../components/Flashcards/FetchQnA"
import { ShowSelection } from "../components/Survey/ShowSelection"
import { UploadGuidelines } from "../components/Flashcards/UploadGuidelines"

export const UploadPage = () => {
  const { state, dispatch } = useFileContext()
  const navigate = useNavigate()
  const [uploaded, setUploaded] = useState(false)
  const [flashcardCount, setFlashcardCount] = useState(0)
  const [error, setError] = useState("")

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

  const isReady = flashcardCount > 0 && uploaded

  return (
    <div className="min-h-full bg-gradient-to-b from-gray-50 via-white to-white">
      <div className="container mx-auto max-w-3xl px-4 py-8 lg:py-12 space-y-6">

        {/* Header */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-red-600 to-red-700 px-6 py-8 lg:px-10 shadow-sm">
          <div className="absolute -right-10 -top-10 h-52 w-52 rounded-full bg-white/10" />
          <div className="absolute -bottom-8 right-16 h-32 w-32 rounded-full bg-white/5" />
          <div className="relative flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/20 text-white">
              <FaBook className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-red-200 mb-0.5">AI-Powered</p>
              <h1 className="text-2xl lg:text-3xl font-bold text-white leading-tight">Create Flashcards</h1>
              <p className="mt-1 text-sm text-red-200">Upload your notes and we'll generate smart study cards in seconds.</p>
            </div>
          </div>
        </div>

        {/* Error */}
        {error && <div className="error">{error}</div>}

        {/* Step 1 — Upload */}
        <div className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
          <div className="flex items-center gap-3 border-b border-gray-100 px-6 py-4">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white">1</span>
            <h2 className="text-sm font-semibold text-gray-800">Upload your document</h2>
          </div>
          <div className="p-6 space-y-4">
            <DragDrop onUpload={handleUpload} />
            {state.extractedText && (
              <div className="text-gray-700 mt-2">
                <ShowSelection element={state.file.name} />
              </div>
            )}
            <UploadGuidelines />
          </div>
        </div>

        {/* Step 2 — Count */}
        <div className="rounded-2xl border border-gray-100 bg-white shadow-sm">
          <div className="flex items-center gap-3 border-b border-gray-100 px-6 py-4">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white">2</span>
            <h2 className="text-sm font-semibold text-gray-800">How many flashcards?</h2>
          </div>
          <div className="p-6">
            <p className="text-sm text-gray-500 mb-4">Choose how many cards you'd like us to generate from your document.</p>
            <div className="w-full sm:w-64">
              <DropDownList options={NUMBER_OF_FLASHCARDS} handleClick={handleSelect} label="Select count..." />
            </div>
          </div>
        </div>

        {/* Step 3 — Generate */}
        <div className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
          <div className="flex items-center gap-3 border-b border-gray-100 px-6 py-4">
            <span className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold text-white ${isReady ? "bg-red-600" : "bg-gray-300"}`}>3</span>
            <h2 className="text-sm font-semibold text-gray-800">Generate your deck</h2>
          </div>
          <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <p className="text-sm text-gray-500">
              {isReady
                ? "You're all set! Hit generate to create your flashcard deck."
                : "Complete steps 1 and 2 above to unlock this."}
            </p>
            <SwinButton
              label="Generate"
              onClick={handleGenerate}
              icon={<FaBolt />}
              isdisabled={!isReady}
              disabledLabel="Generate"
            />
          </div>
        </div>

      </div>
    </div>
  )
}
