import React, { useRef } from "react";

interface DragDropProps{
    onFileSelect: (file: File)=>void
}

const DragDrop: React.FC<DragDropProps> = ({onFileSelect}) =>{
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault()
        const file = event.dataTransfer.files[0]
        if (file) onFileSelect(file)
    }

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) =>{
        const file = event.target.files?.[0]
        if (file) onFileSelect(file)
    }
    return (
        <>
            <div
            onDrop={handleDrop}
            onDragOver={(e)=>e.preventDefault()}
            onClick={()=>fileInputRef.current?.click()}
            className="border-2 border-dashed p-6 rounded-lg text-center cursor-pointer"
            >
                <p>Drag and Drop your PDF here</p>
                <input
                type = "file"
                accept=".pdf"
                ref={fileInputRef}
                className="hidden"
                onChange={handleFileSelect}
                />
                
            </div>
        </>
    )

}


export default DragDrop