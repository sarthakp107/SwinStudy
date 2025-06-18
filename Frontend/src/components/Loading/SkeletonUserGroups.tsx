import React from 'react';

export const SkeletonUserGroups: React.FC = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3].map(i => (
                <div key={i} className="p-6 bg-white rounded-lg shadow-md animate-pulse">
                    <div className="flex items-center mb-6">
                        <div className="w-12 h-12 bg-gray-200 rounded-lg mr-4"></div>
                        <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                    </div>
                    <div className="h-4 bg-gray-200 rounded w-1/4 mb-6"></div>
                    <div className="flex flex-wrap gap-2 mb-6">
                        {[1, 2, 3].map(j => (
                            <div key={j} className="h-6 bg-gray-200 rounded-full w-20"></div>
                        ))}
                    </div>
                    <div className="h-10 bg-gray-200 rounded w-full"></div>
                </div>
            ))}
        </div>

    );
};