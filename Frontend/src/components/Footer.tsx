import { useSurveyStatus } from '@/Hooks/Database/update/useSurveyStatus';
import React from 'react';

export const Footer: React.FC  = () => {
    const{isLoading} = useSurveyStatus();
    return (
        (!isLoading && <footer className="bg-gray-800 text-white text-center py-4 ">
      <div className="container mx-auto">
        <p>&copy; 2025 SwinStudy. All rights reserved.</p>
      </div>
    </footer>)

    );
}