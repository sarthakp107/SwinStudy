import React from "react";

const InProgress: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-red-500 border-solid mx-auto mb-6"></div>
        <h1 className="text-3xl font-semibold text-gray-800">This page is under construction</h1>
        <p className="mt-4 text-gray-600 text-lg">We're working hard to finish it. Check back soon!</p>
      </div>
    </div>
  );
};

export default InProgress;
