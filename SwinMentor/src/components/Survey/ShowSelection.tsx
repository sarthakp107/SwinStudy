import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';

interface ShowSelectionProps {
  element: string | number; 
}
//Returns a green box with green tick and the selected item
export const ShowSelection: React.FC<ShowSelectionProps> = ({ element }) => {
  return (
    <>
      <div className="mt-4 p-3 bg-green-50 border border-green-100 rounded-lg text-green-700 flex items-center animate-fadeIn">
        <FaCheckCircle className="h-5 w-5 mr-2 text-green-700" />
        <span className="font-medium">{element}</span>
      </div>
    </>
  );
};
