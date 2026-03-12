import { useSurveyStatus } from '@/Hooks/Database/update/useSurveyStatus';
import React from 'react';

export const Footer: React.FC  = () => {
    const{isLoading} = useSurveyStatus();
    return (
        (!isLoading && <footer className="mt-auto w-full bg-gray-900 text-gray-300 text-center py-4 border-t border-gray-800">
      <div className="container mx-auto px-4">
        <p className="text-sm">&copy; 2025 SwinStudy. All rights reserved.</p>
      </div>
    </footer>)

    );
}