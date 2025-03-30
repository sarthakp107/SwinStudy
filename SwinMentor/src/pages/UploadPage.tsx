import { FaGamepad } from "react-icons/fa"
import { useNavigate } from "react-router-dom"
import {useState} from "react"
import DragDrop from "../components/Flashcards/DragDrop"
import { UploadButton } from "@/components/Buttons/UploadButton"
import { DropDownList } from "@/components/Survey/DropDownList"
import { NUMBER_OF_FLASHCARDS } from "@/config/Constants"
import { PDFParser } from "@/components/Flashcards/PDFParser"
import { QnAConverter } from "@/components/Flashcards/QnAConverter"
import { SwinButton } from "@/components/Buttons/SwinButton"
import { useFileContext } from "@/Hooks/Context/useFileContext"
import { FetchQnA } from "@/components/Flashcards/FetchQnA"

export const UploadPage = () => {
    const {state, dispatch} = useFileContext()
    const navigate = useNavigate() 
    const [extractedText, setExtractedText] = useState("")
    const [flashcardCount, setFlashcardCount] = useState(0)
    const [error, setError] = useState("")

    const handleUpload = async (file: File) => {
       dispatch({ type: "SET_FILE", payload: file });
        try {
            const responseFromParser = await PDFParser(file);
            setExtractedText(responseFromParser)
            await dispatch({ type: "SET_EXTRACTED_TEXT", payload: responseFromParser});
        }
        catch(error:any){
            setError("Error in Extraction of Text:" + error.message)
            throw new Error ("Error in Extraction of Text")
        }
        try{
            console.log("API REQUEST CALLED")
            const QnAText = await FetchQnA(extractedText)
            // Test Data const QnAText = "Question: What is the Transformer model based on? Answer: The Transformer model is based solely on attention mechanisms. Question: What are the two main components of neural machine translation? Answer: The two main components of neural machine translation are an encoder and a decoder. Question: What does the encoder do in the Transformer model? Answer: The encoder maps an input sequence of symbol representations to a sequence of continuous representations. Question: What does the decoder do in the Transformer model? Answer: The decoder generates an output sequence of symbols one element at a time. Question: What is the key advantage of the Transformer model over recurrent models? Answer: The Transformer model allows for significantly more parallelization and can reach a new state of the art in translation quality after being trained for as little as twelve hours on eight P100 GPUs.Question: What is the named attention mechanism used in the Transformer? Answer: The named attention mechanism used in the Transformer is Scaled Dot-Product Attention. Question: What is self-attention? Answer: Self-attention is an attention mechanism relating different positions of a single sequence in order to compute a representation of the sequence. Question: What is multi-head attention? Answer: Multi-head attention is an extension of scaled dot-product attention that allows the model to jointly attend to information from different representation subspaces at different positions by linearly projecting the queries, keys and values h times with different, learned linear projections. Question: What is the BLEU score of the Transformer model on the WMT 2014 English-to-German translation task? Answer: The BLEU score of the Transformer model on the WMT 2014 English-to-German translation task is 28.4. Question: What is the key difference between the Transformer and traditional sequence transduction models? Answer: Unlike traditional sequence transduction models, the Transformer does not use recurrence or convolution at all."
            await dispatch ({type:"SET_QNA_TEXT", payload: QnAText})

            const QnAFormatted = QnAConverter(QnAText)
            await dispatch({type:"SET_QNA", payload: QnAFormatted})   
        } catch (error:any) {
                setError("Error in Fetching:" + error.message)
                throw new Error("Error in Fetching:");  
        }
    };

    const handleSelect = (option: number)=>{
        setFlashcardCount(option)
        dispatch ({type: "SET_FLASHCARD_COUNT", payload: option})
    };

    const handleGenerate = async ()=> { 
        try{
            navigate("/flashcard/0")
        }catch(error:any){
            setError("Error in Post-Navigation:" + error)
            throw new Error("Error in post-navigation")
        }

    };

    return (
        <>
            <div>
                <div>
                    <DragDrop onUpload ={handleUpload}/>
                    {state.file && (<div>Uploaded File: {state.file.name} </div>)}
                    {error && <div className="error">{error}</div>}
                </div>
                
                <div>
                    <UploadButton file={state.file} onUpload={handleUpload} label="Upload"  />
                </div>
                
                <div>
                    <label className="">Select Number of Flashcards</label>
                    <DropDownList options={NUMBER_OF_FLASHCARDS} handleClick={handleSelect} label="Number of Flashcards"/>
                </div>

                <div>
                    <SwinButton label = "Generate" onClick={handleGenerate} icon={<FaGamepad/>} isdisabled= {!(flashcardCount > 0 && extractedText) } disabledLabel="Generate"/>
                </div>
            </div>
        </>
    )
}