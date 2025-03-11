import React, { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight, FaUserGraduate } from 'react-icons/fa';
import { supabase } from '../../supabase-client';

const steps = ['Which degree and year?', 'Current units'];

const SignUpSurvey: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [degree, setDegree] = useState<string>('');
  const [year, setYear] = useState<string>('');
  const [currentUnits, setCurrentUnits] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [units, setUnits] = useState<{ id: string; name: string }[]>([]); // Units state

  // Fetch units from the database when the component mounts
  useEffect(() => {
    const fetchUnits = async () => {
        const { data, error } = await supabase.from('units').select('unit_id, unit_name'); // Select both id and unit_name
    
        if (error) {
          setError(error.message);
          console.log(error);
        }
    
        if (data) {
          // Update state with id and unit_name
          setUnits(data.map((unit: { unit_id: string; unit_name: string }) => ({
            id: unit.unit_id,
            name: unit.unit_name
          })));
        }
      };
    fetchUnits();
  }, []);

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

  const handleSubmit = async () => {
    setError('');
    console.log('Submitting form...');
  
    try {
      // Get the current authenticated user
      const { data: { user }, error: authError } = await supabase.auth.getUser();
  
      if (authError || !user) {
        console.error('Error getting authenticated user:', authError);
        return;
      }
  
      // Get the profile associated with the authenticated user
      const { data: profileData, error: profileError } = await supabase
        .from('profile')
        .select('id')
        .eq('id', user.id) // Match the user_id to get the profile
        .single(); // We expect a single profile to match
  
      if (profileError) {
        console.error('Error fetching profile:', profileError);
        return;
      }
  
      // Now we have the profile_id, we can update degree and year
      const profileId = profileData.id;
  
      // Update the profile with degree and year
      const { error: updateError } = await supabase
        .from('profile')
        .update({
          degree: degree,
          year: year,
        })
        .eq('id', profileId); // Update using the profile_id
  
      if (updateError) {
        console.error("Profile Update Error:", updateError);
        return;
      }
  
      console.log("Profile updated successfully!");
    } catch (error) {
      console.error("Unexpected Error:", error);
    }
  };
  

  const handleUnitSelect = (unit: string) => {
    setCurrentUnits((prevUnits) => {
      if (prevUnits.includes(unit)) {
        return prevUnits.replace(unit, '').trim();
      } else {
        if (prevUnits.split(' ').length >= 4) {
          return prevUnits;
        }
        return `${prevUnits} ${unit}`.trim();
      }
    });
  };

  const isNextDisabled = !degree || !year;
  const isUnitLimitReached = currentUnits.split(' ').length >= 4;

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
          <h1 className="text-5xl font-extrabold text-gray-800">Signup Survey</h1>
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
                    <option value="1">First Year</option>
                    <option value="2">Second Year</option>
                    <option value="3">Third Year</option>
                    <option value="4">Fourth Year</option>
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
                    key={unit.id}
                    onClick={() => handleUnitSelect(unit.name)}
                    className={`cursor-pointer border p-6 rounded-lg text-center transition-all duration-300 ${
                      currentUnits.includes(unit.name)
                        ? 'bg-red-600 text-white'
                        : 'bg-gray-100 text-gray-700'
                    } ${isUnitLimitReached && !currentUnits.includes(unit.name) ? 'opacity-50 cursor-not-allowed' : ''}`}
                    style={{
                      pointerEvents: isUnitLimitReached && !currentUnits.includes(unit.name) ? 'none' : 'auto',
                    }}
                  >
                    {unit.name}
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
