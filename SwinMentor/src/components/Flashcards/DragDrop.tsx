import React, { useRef } from "react";

interface DragDropProps {
  onUpload: (file: File) => void; //Function passed to parent to handle
}

const DragDrop: React.FC<DragDropProps> = ({ onUpload }) => {
  const fileInputRef = useRef<HTMLInputElement>(null); //This creates a reference to the "Input" tag below and stores its value

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) onUpload(file); //Pass to parent
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) onUpload(file); //Pass to parent
  };

  return (
    <>
    {/* Main Div that houses a hidden Input field and instructions*/}
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        onClick={() => fileInputRef.current?.click()}
        className="border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-colors
          hover:border-red-400 bg-white hover:bg-red-50
          border-gray-300"
      >
        {/* Instructions Div */}
        <div className="mb-4">
            <span className="text-red-600 text-4xl">📄</span>
        </div>
        {/* Instructions Div */}
        <h3 className="text-lg font-semibold text-gray-700 mb-2">
          Drag and drop your PDF here
        </h3>
        {/* Instructions Div */}
        <p className="text-gray-500 mb-4">
        Support for PDF, DOCX, and TXT files
        </p>
        {/* Button within Div, only a placeholder. When user clicks, the div gets clicked, and therefore this button doesn't need a onClick Function  */}
        <button className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors">
              Browse Files
        </button>
        {/* Hidden Input Field that accepts PDF and DOCX */}
        <input
          type="file"
          accept=".pdf, .docx"
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileSelect}
        />
      </div>
    </>
  );
};

export default DragDrop;
