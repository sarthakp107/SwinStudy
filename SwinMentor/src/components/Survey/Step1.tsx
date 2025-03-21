import React, { useReducer } from 'react';
import { DegreeList } from './DegreeList';
import { initialState, surveyReducer } from '@/reducers/surveyReducer';
import { useAuthContext } from '@/Hooks/Context/useAuthContext';
import { useUpdateDegreeInProfile } from '@/Hooks/Database/update/useUpdateDegreeInProfile';
import { FaDownload } from 'react-icons/fa'; 


export const Step1: React.FC = () => {
    const [state, dispatch] = useReducer(surveyReducer, initialState);
    const { user } = useAuthContext();
    const { updateDegree } = useUpdateDegreeInProfile();

    const handleDegreeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch({ type: 'SET_DEGREE', payload: e.target.value });
    };

    const handleSemesterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch({ type: 'SET_SEMESTER', payload: e.target.value });
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
                    <select
                        className="w-full p-3 border rounded-lg appearance-none bg-gray-100 focus:ring-2 focus:ring-red-500"
                        onChange={handleDegreeChange}
                        value={state.degree || ""}
                        required
                    >
                        <option value="">Select Degree</option> 
                        <DegreeList />
                    </select>
                    <FaDownload className="absolute right-3 top-10 w-5 h-5 text-gray-500" />
                </div>
                <div className="relative">
                    <label className="block text-gray-700 font-medium mb-2">Semester</label>
                    <select
                        className="w-full p-3 border rounded-lg appearance-none bg-gray-100 focus:ring-2 focus:ring-red-500"
                        onChange={handleSemesterChange}
                    >
                        <option>Select Semester</option>
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                            <option key={sem} value={sem}>Semester {sem}</option>
                        ))}
                    </select>
                    <FaDownload className="absolute right-3 top-10 w-5 h-5 text-gray-500" />
                </div>
                <button type="submit" className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600">Next</button>
            </form>
        </div>
    );
};