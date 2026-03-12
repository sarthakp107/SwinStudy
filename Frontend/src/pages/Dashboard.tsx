import React from 'react';
import { FeatureCards } from '@/components/FeatureCards/FeatureCards'; 
import { UserGroups } from '@/components/UnitGroups/UserGroups'; 
import useUserProfile from '@/Hooks/GetUserInfo/useUserProfile'; 
import Spinner from '@/components/Loading/Spinner'; 

const Dashboard: React.FC = () => {
  const { displayName, loading: profileLoading } = useUserProfile();
  if (profileLoading) {
      return (
        <div className="min-h-full bg-gradient-to-b from-gray-50 via-white to-white flex items-center justify-center py-16">
          <Spinner />
        </div>
       );
   }

  return (
    <div className="min-h-full bg-gradient-to-b from-gray-50 via-white to-white">
      <div className="container mx-auto px-4 py-8 lg:py-12 space-y-10">
        {/* Welcome / hero section */}
        <section className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
              Welcome back,
              {" "}
              <span className="text-red-600">
                {displayName || "Swinburne Student"}
              </span>
              !
            </h1>
            <p className="text-base lg:text-lg text-gray-700 max-w-2xl">
              Your central hub to manage units, study with smart flashcards, and connect with your classmates.
            </p>
          </div>
        </section>

        {/* Main dashboard content */}
        <section className="grid gap-6 lg:grid-cols-[2fr,3fr] items-start">
          {/* Quick actions card */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 lg:p-7">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">
                Quick actions
              </h2>
              <span className="inline-flex items-center rounded-full bg-red-50 px-3 py-1 text-xs font-medium text-red-600">
                Stay on top of your study
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Jump straight into the most useful tools for your current semester.
            </p>
            <div className="mt-2">
              <FeatureCards />
            </div>
          </div>

          {/* Units & groups card */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 lg:p-7">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">
                Your units & groups
              </h2>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              See all your enrolled units and quickly jump into the groups that matter most.
            </p>
            <UserGroups />
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;