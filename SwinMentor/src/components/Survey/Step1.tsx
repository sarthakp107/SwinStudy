import React, { useReducer, useState } from 'react';
// import { DegreeList } from './DegreeList';
import { SearchableDropdown } from './SearchableDropdown';
import { useAvailableDegrees } from "@/Hooks/Database/useAvailableDegrees";
import { initialState, surveyReducer } from '@/reducers/surveyReducer';
import { useAuthContext } from '@/Hooks/Context/useAuthContext';
import { useUpdateDegreeInProfile } from '@/Hooks/Database/update/useUpdateDegreeInProfile';


export const Step1: React.FC = () => {
    const [state, dispatch] = useReducer(surveyReducer, initialState);
    const { user } = useAuthContext();
    const { updateDegree } = useUpdateDegreeInProfile();
    const {degrees} = useAvailableDegrees();
    const [isOpen, setIsOpen] = useState(false)
    const [selectedSemester, setSelectedSemester] = useState("")

    const handleDegreeChange = (value: string) => {
        dispatch({ type: 'SET_DEGREE', payload: value });
    };  

    const handleSemesterChange = (semester: string) => {    
        setSelectedSemester(semester)
        setIsOpen(false);
        dispatch({ type: 'SET_SEMESTER', payload: semester});
    };

    const handleNext = async (e: React.FormEvent) => {
        e.preventDefault();
        if (user && state.degree && state.semester) {
            await updateDegree(user.id, state.degree, state.semester);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Select Your Degree & Semester</h2>
            <form onSubmit={handleNext} className="bg-white p-6 rounded-lg shadow-md w-full max-w-md space-y-4">
                <div className="relative">
                    <label className="block text-gray-700 font-medium mb-2">Degree</label>
                    {/* <DegreeList selectedDegree={state.degree || ""} onDegreeChange={handleDegreeChange} /> */}
                    <SearchableDropdown
                        options={degrees.map(degree => ({ id: degree.degree_id, name: degree.degree_name }))}
                        value={state.degree}
                        onChange={handleDegreeChange}
                        placeholder="Search Degree"
                    />
                </div>

                <div className="relative">
                    <label className="block text-gray-700 font-medium mb-2">Semester</label>
                    
                    <div
                        className="w-full p-3 border rounded-lg cursor-pointer bg-gray-100"
                        onClick={() => setIsOpen(!isOpen)} // Toggle dropdown visibility
                    >
                        {selectedSemester ? `Semester ${selectedSemester}` : "Select Semester"}
                    </div>

                    {isOpen && (
                        <ul className="absolute w-full bg-white border border-gray-300 shadow-lg rounded-lg mt-1 max-h-60 overflow-y-auto z-10">
                        {["1", "2", "3", "4", "5", "6", "7", "8"].map((sem) => (
                            <li
                            key={sem}
                            className="p-3 cursor-pointer hover:bg-red-100 transition"
                            onClick= {()=>handleSemesterChange(sem)} 
                            >
                            Semester {sem}
                            </li>
                        ))}
                        </ul>
                    )}
                </div>

                <button type="submit" className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600">Next</button>
            </form>
        </div>
    );
};
