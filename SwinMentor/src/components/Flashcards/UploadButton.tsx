import React, { useRef } from "react";

interface UploadButtonProps {
    onUpload: (file:File) => void
    file: File | null;
}

export const UploadButton: React.FC<UploadButtonProps>=({onUpload})=>{
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) =>{
        const file = event.target.files?.[0]
        if (file) onUpload(file)
    }

    return (
        <>  
            <button 
            onClick={()=>fileInputRef.current?.click()}
            className="bg-red-600 text-white px-4 py-2 rounded-lg mt-4 cursor-pointer"
            >
            Upload
                <input
                    type = "file"
                    accept=".pdf, .docx"
                    ref={fileInputRef}
                    className="hidden"
                    onChange={handleFileSelect}
                />
            </button>
        </>
    )
}