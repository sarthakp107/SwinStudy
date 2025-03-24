import DragDrop from "../components/Flashcards/DragDrop"


export const CreateFlashcard1 = () => {
    const handleFileSelect = (file: File)=>{
        console.log("working", file)
    }

    return (
        <>
            <div>
                <DragDrop onFileSelect={handleFileSelect}/>
            </div>
        </>
    )
}