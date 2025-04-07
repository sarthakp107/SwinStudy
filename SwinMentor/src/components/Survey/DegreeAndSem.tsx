import { SearchableDropdown } from './SearchableDropdown';
import { useAvailableDegrees } from '@/Hooks/Database/useAvailableDegrees';
import { useSurveyContext } from '@/Hooks/Context/useSurveyContext';
import { useState } from 'react';
import {SkeletonDegreeandSem} from "../Loading/SkeletonDegreeandSem";
import { ShowSelection } from './ShowSelection';
import { FaArrowRight, FaBars } from 'react-icons/fa6';

export const DegreeAndSem = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [option, setOption] = useState("")
    const { degrees, loading, error } = useAvailableDegrees();
    const { dispatch, state } = useSurveyContext();

    const handleDegreeChange = (degreeId: string) => {
        dispatch({ type: 'SET_DEGREE', payload: degreeId });
    };
    const handleSemesterChange = (semester: number) => {
        dispatch({ type: 'SET_SEMESTER', payload: semester });
        setOption(`Semester ${semester}`)
    };
    const handleNext = async (e: React.FormEvent) => {
        e.preventDefault();
        dispatch({ type: "NEXT_STEP" })
    };

    return (
    <>
        {/* Main Div */}
        <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-red-100 text-red-500 mr-3 text-lg">1</span>
                Select Your Degree & Semester
            </h2>

            {/* Main Form */}
            <form onSubmit={handleNext} className="space-y-8">
                {/* Degree's Section */}
                <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm transition-all hover:shadow-md">
                    <label className="block text-gray-700 font-medium mb-1">Degree Program</label>
                    <p className="text-sm text-gray-500 mb-4">Select your current degree program at Swinburne</p>

                    {loading ? <SkeletonDegreeandSem /> : error ? (<div className="error"> Error Loading Degrees </div>) : (
                        <div className="transition-all duration-300">
                            <SearchableDropdown options={degrees.map((degree) => degree.degree_name)} selectedOptions={state.degree ? [state.degree] : []} onSelect={handleDegreeChange} placeholder="Search for your degree..."/>
                            {state.degree && (<ShowSelection element= {state.degree} />)}
                        </div>
                    )}
                </div>
                {/* Semester's Section */}
                <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm transition-all hover:shadow-md">
                    <label className="block text-gray-700 font-medium mb-1">Current Semester</label>
                    <p className="text-sm text-gray-500 mb-4">Which semester are you currently enrolled in?</p>

                    <div className="relative">
                        <div className="relative">
                            <input type="text" placeholder="Select Semester" value={option} onChange={(e) => setOption(e.target.value)} readOnly onFocus={() => setIsOpen(true)}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all pl-10"
                            />
                            <span className="absolute left-3 top-3 text-gray-400">
                                <FaBars className="h-5 w-5 mr-2 text-red-500" />
                            </span>
                        </div>

                        {isOpen && (
                            <div className="absolute w-full mt-1 z-10 animate-fadeIn">
                                <ul className="bg-white border border-gray-200 shadow-lg rounded-lg overflow-hidden max-h-45 overflow-y-auto grid grid-cols-2 gap-2">
                                    {[1, 2, 3, 4, 5, 6, 7, 8].map((option) => (
                                        <li
                                            key={option}
                                            className="p-3 cursor-pointer border-b last:border-b-0 hover:bg-red-50 flex items-center transition"
                                            onClick={() => { handleSemesterChange(option); setIsOpen(false) }}>
                                            <span className="w-8 h-8 mr-3 flex items-center justify-center bg-red-100 text-red-600 rounded-full font-medium">{option}</span>
                                            Semester {option}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
                {/* Button's Section */}
                <button type="submit" disabled={!state.degree || !state.semester} className={`w-full py-4 rounded-lg flex items-center justify-center transition-all duration-300 ${ state.degree && state.semester   ? 'bg-red-500 hover:bg-red-600 text-white shadow-md hover:shadow-lg' : 'bg-gray-200 text-gray-400 cursor-not-allowed' }`}>
                    <span className="font-medium">Continue to Unit Selection</span>
                    <FaArrowRight className='ml-2 h-5 w-5' />
                </button>
            </form>
        </div>
    </>
    );
};