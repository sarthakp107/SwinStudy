import React, { useRef } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";

interface DragDropProps {
  onUpload: (file: File) => void;
}

const DragDrop: React.FC<DragDropProps> = ({ onUpload }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) onUpload(file);
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) onUpload(file);
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      onClick={() => fileInputRef.current?.click()}
      className="group relative flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 px-6 py-12 text-center cursor-pointer transition-all duration-200 hover:border-red-400 hover:bg-red-50"
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-sm text-red-500 group-hover:bg-red-100 transition-colors duration-200">
        <FaCloudUploadAlt className="h-7 w-7" />
      </div>

      <div>
        <p className="text-sm font-semibold text-gray-700 group-hover:text-red-700">
          Drag & drop your PDF here
        </p>
        <p className="mt-1 text-xs text-gray-400">or click anywhere to browse</p>
      </div>

      <span className="inline-flex items-center rounded-full border border-red-200 bg-white px-4 py-1.5 text-xs font-medium text-red-600 shadow-sm group-hover:bg-red-600 group-hover:text-white transition-colors duration-200">
        Browse Files
      </span>

      <input
        type="file"
        accept=".pdf"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileSelect}
      />
    </div>
  );
};

export default DragDrop;
