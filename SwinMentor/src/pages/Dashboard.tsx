import { FeatureCards } from '@/components/FeatureCards/FeatureCards';
import { UserGroups } from '@/components/UnitGroups/UserGroups';
import React from 'react';
import { FaUsers } from 'react-icons/fa';
import { FaUserGroup } from 'react-icons/fa6';

const Dashboard: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-6">
      {/* Page Header */}
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard</h1>
      <h2 className="text-2xl font-semibold text-gray-700 mb-6 flex items-center">
          <FaUsers className="mr-3 text-red-500" />
          Get Involved
        </h2>
      <FeatureCards/>
      <h2 className="text-2xl font-semibold text-gray-700 mb-6 flex items-center">
                      <FaUserGroup className="mr-3 text-red-500" />
                      Your Groups
                    </h2>
      <UserGroups/>
     
    </div>
  );
};

export default Dashboard;