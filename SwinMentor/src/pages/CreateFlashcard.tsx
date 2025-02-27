import React, { useState } from 'react';

const CreateFlashcard: React.FC = () => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    // Handle file upload logic here
    console.log('Files dropped:', files);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Create Flashcards</h1>
        
        {/* File Upload Section */}
        <div className="bg-white p-8 rounded-xl shadow-md">
          <div 
            className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors
              ${isDragging ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-red-400'}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="mb-4">
              <span className="text-red-600 text-4xl mb-4">📄</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Drag and drop your files here
            </h3>
            <p className="text-gray-500 mb-4">
              Support for PDF, DOCX, and TXT files
            </p>
            <button className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors">
              Browse Files
            </button>
          </div>

          {/* Upload Guidelines */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-gray-700 mb-2">Supported Formats</h4>
              <p className="text-gray-600 text-sm">PDF, DOCX, TXT files up to 10MB</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-gray-700 mb-2">Processing Time</h4>
              <p className="text-gray-600 text-sm">Usually takes 30 seconds to process</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-gray-700 mb-2">Best Practices</h4>
              <p className="text-gray-600 text-sm">Clear, well-formatted documents work best</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateFlashcard; 