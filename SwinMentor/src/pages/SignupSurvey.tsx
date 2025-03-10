import React, { useState } from 'react';
import { FaChevronLeft, FaChevronRight, FaUserGraduate, FaCalendarAlt } from 'react-icons/fa';
import { supabase } from '../../supabase-client';

const steps = ['Which degree and year?', 'Current units'];

const SignUpSurvey: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [degree, setDegree] = useState<string>('');
  const [year, setYear] = useState<string>('');
  const [currentUnits, setCurrentUnits] = useState<string[]>([]);
  const [error, setError] = useState<string>('');


  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1);
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };

  const handleSubmit = async() => {
    const{} = await supabase
console.log(degree, year, currentUnits);
  };

  const handleUnitSelect = (unit: string) => {
    setCurrentUnits((prevUnits) => {
      if (prevUnits.includes(unit)) {
        return prevUnits.filter((u) => u !== unit);
      } else {
        if (prevUnits.length >= 4) {
          return prevUnits;
        }
        return [...prevUnits, unit];
      }
    });
  };

  const isNextDisabled = !degree || !year;
  const units = [
    { id: "OOP", name: "OOP" },
    { id: "ITP", name: "Intro To Programming" },
    { id: "DSP", name: "Data Structures and Patterns" },
    { id: "NETAD", name: "Network Administration" },
    { id: "NSWITCH", name: "Network and Switching" },
    { id: "TIC", name: "Technology in an Indigenous Context" },
  ];

  return (
    <div className="flex min-h-screen bg-red-50">
      {/* Left Sidebar */}
      <div className="w-1/3 bg-gradient-to-r from-red-500 to-red-700 text-white p-8 flex flex-col justify-between rounded-r-xl shadow-lg">
        <div className="space-y-6">
          <h2 className="mt-56 text-6xl font-bold">One final step to becoming part of the SwinStudent family</h2>
          <div className="flex items-center text-lg font-medium">
            <FaUserGraduate className="w-8 h-8 mr-2" />
            <span>Step {activeStep + 1} of {steps.length}</span>
          </div>
        </div>


      </div>

      {/* Right Content Area */}
      <div className="w-2/3 p-8 flex flex-col justify-center space-y-6">
        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-extrabold text-gray-800">Welcome to the Signup Survey</h1>
          <p className="text-xl text-gray-600 mt-2">Please take a moment to complete your registration steps.</p>
        </div>

        {/* Progress Bar */}
        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center justify-between">
            <div className="text-sm font-medium text-gray-700"></div>
          </div>
          <div className="w-full bg-gray-300 rounded-full h-2">
            <div
              className="bg-red-600 h-2 rounded-full"
              style={{ width: `${(activeStep + 1) / steps.length * 100}%` }}
            />
          </div>
        </div>

        {/* Survey Form */}
        <div className="bg-white shadow-xl rounded-xl p-8">
          {activeStep === 0 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Degree Select */}
                <div>
                  <label htmlFor="degree" className="block text-lg font-medium text-gray-700">Degree</label>
                  <select
                    id="degree"
                    value={degree}
                    onChange={(e) => setDegree(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-300"
                  >
                    <option value="">Select Degree</option>
                    <option value="Bachelors of Computer Science">Bachelors of Computer Science</option>
                    <option value="Masters of IT">Masters of IT</option>
                    <option value="PhD in Cybersecurity">PhD in Cybersecurity</option>
                  </select>
                </div>

                {/* Year Select */}
                <div>
                  <label htmlFor="year" className="block text-lg font-medium text-gray-700">Year</label>
                  <select
                    id="year"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-300"
                  >
                    <option value="">Select Year</option>
                    <option value="First Year">First Year</option>
                    <option value="Second Year">Second Year</option>
                    <option value="Third Year">Third Year</option>
                    <option value="Fourth Year">Fourth Year</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {activeStep === 1 && (
            <div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Select Your Current Units</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {units.map((unit) => (
                  <div
                    key={unit}
                    onClick={() => handleUnitSelect(unit)}
                    className={`cursor-pointer border p-6 rounded-lg text-center transition-all duration-300 ${
                      currentUnits.includes(unit)
                        ? 'bg-red-600 text-white'
                        : 'bg-gray-100 text-gray-700'
                    } ${currentUnits.length >= 4 && !currentUnits.includes(unit) ? 'opacity-50 cursor-not-allowed' : ''}`}
                    style={{
                      pointerEvents: currentUnits.length >= 4 && !currentUnits.includes(unit) ? 'none' : 'auto',
                    }}
                  >
                    {unit}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <button
            onClick={handleBack}
            disabled={activeStep === 0}
            className="px-6 py-3 bg-gray-300 text-gray-700 rounded-lg disabled:opacity-50 flex items-center transition-all duration-300 hover:bg-gray-200"
          >
            <FaChevronLeft className="w-5 h-5 mr-2" />
            Back
          </button>

          <button
            onClick={activeStep === steps.length - 1 ? handleSubmit : handleNext}
            disabled={isNextDisabled}
            className={`px-6 py-3 ${isNextDisabled ? 'bg-gray-300' : 'bg-red-600'} text-white rounded-lg flex items-center transition-all duration-300 hover:${isNextDisabled ? '' : 'bg-red-700'}`}
          >
            {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
            <FaChevronRight className="w-5 h-5 ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUpSurvey;
