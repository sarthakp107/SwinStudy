import React from 'react';
import { FeatureCards } from '@/components/FeatureCards/FeatureCards'; 
import { UserGroups } from '@/components/UnitGroups/UserGroups'; 
import useUserProfile from '@/Hooks/GetUserInfo/useUserProfile'; 
import Spinner from '@/components/Loading/Spinner'; 

const Dashboard: React.FC = () => {
  const { displayName, loading: profileLoading } = useUserProfile();
  if (profileLoading) {
      return (
           <div className="min-h-screen flex items-center justify-center bg-gray-50">
               <Spinner /> 
           </div>
       );
   }

  return (
    <div className="container mx-auto px-4 py-8 lg:py-12"> 

      {/* Welcome Div */}
      <div className="mb-8">
        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2"> Welcome back, <span className="text-red-600">{displayName || 'Swinburne Student'}</span>!</h1>
        <p className="text-lg text-gray-700">Your central hub for mastering your units and connecting with peers.</p>
      </div>

      {/* Quick Actions Div */}
      <div className="mb-12">
        <FeatureCards />
      </div>

      {/* Units Div */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">  Your Units & Groups </h2>
        <UserGroups/>
      </div>

    </div>
  );
};

export default Dashboard;