import { DegreeAndSem } from './DegreeAndSem';
import { FaBook } from 'react-icons/fa';

export const Step1: React.FC = () => {
  return (
  <>
    {/* Main Div */}
    <div className="w-full bg-white rounded-2xl shadow-xl overflow-visible border border-gray-100">  
      {/* Header Div */}
      <div className="bg-red-50 p-5 border-b border-red-100">
        <h3 className="text-xl font-semibold text-gray-800 flex items-center">
        <FaBook className="h-6 w-6 mr-2 text-red-500" />
          Academic Information
        </h3>
        <p className="text-gray-600 ml-8 text-sm">Let's get started with your academic details</p>
      </div>
      {/* Div Containing Components */}
      <div className="p-8">
        <DegreeAndSem />
      </div>
    </div>
  </>

  );
};