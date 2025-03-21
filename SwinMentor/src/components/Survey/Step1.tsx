import React, { useReducer } from 'react';
import { DegreeList } from './DegreeList';
import { initialState, surveyReducer } from '@/reducers/surveyReducer';
import { useAuthContext } from '@/Hooks/Context/useAuthContext';
import { useUpdateDegreeInProfile } from '@/Hooks/Database/update/useUpdateDegreeInProfile';

export const Step1: React.FC = () => {
    const [state, dispatch] = useReducer(surveyReducer, initialState);
    const {user} = useAuthContext();
    const{updateDegree} = useUpdateDegreeInProfile();

    const handleDegreeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const degree = String(e.target.value);
        dispatch({ type: 'SET_DEGREE', payload: degree });
    };

    const handleSemesterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch({ type: 'SET_SEMESTER', payload: e.target.value });
    };

    const handleNext = async (e: React.FormEvent) => {
        e.preventDefault();
        if (user && state.degree && state.semester) {
            await updateDegree(user.id, state.degree, state.semester);
            console.log(user.id, state.degree, state.semester);
        }
    };

    return (
        <>
            <h2 className="text-xl font-semibold">Select Your Degree & Semester</h2>
        <form onSubmit={handleNext}>
            <div className="flex min-h-screen bg-red-50 ">
                <label>
                    Degree:
                    <select
                        className="border p-2 rounded w-full"
                        onChange={handleDegreeChange}
                        value={state.degree || ""}
                        required
                    >
                        <option value="">Select Degree</option> 
                        <DegreeList />
                    </select>
                </label>

                <label>
                    Semester:
                    <select
                        className="border p-2 rounded w-full"
                        onChange={handleSemesterChange}
                    >
                        <option>Select Semester</option>
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                            <option key={sem} value={sem} >Semester {sem}</option>
                        ))}
                    </select>
                </label>
                <button type='submit'>Next</button>
            </div>
            </form>
        </>
    );
};
