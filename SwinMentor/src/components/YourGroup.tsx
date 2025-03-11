// YourGroups.tsx
import React from 'react';
import { FaRegUserCircle } from 'react-icons/fa'; // Importing the user icon

interface Group {
  name: string;
  description: string;
  members: number;
}

const YourGroups: React.FC = () => {
  const groups: Group[] = [
    {
      name: 'AI Enthusiasts',
      description: 'A community of AI lovers and innovators discussing the latest trends and technologies.',
      members: 120,
    },
    {
      name: 'Frontend Developers',
      description: 'Collaborate with fellow frontend devs to share knowledge and work on cool projects.',
      members: 75,
    },
    {
      name: 'UX/UI Designers',
      description: 'Designers sharing ideas and tips for creating user-centered designs.',
      members: 50,
    },
    {
      name: 'Blockchain Builders',
      description: 'Build and learn about blockchain technology with experts and enthusiasts.',
      members: 90,
    },
  ];

  return (
    <div className="bg-white p-6 shadow-lg rounded-lg space-y-6">
      <div className="text-2xl font-semibold text-red-700">Your Groups</div>
      <div className="space-y-4">
        {groups.map((group, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 bg-gradient-to-r from-red-100 to-red-200 rounded-lg shadow-md hover:scale-105 transition-all"
          >
            <div>
              <div className="text-xl font-semibold text-red-700">{group.name}</div>
              <p className="text-sm text-gray-600">{group.description}</p>
            </div>
            <div className="text-sm text-gray-600 flex items-center space-x-2">
              <FaRegUserCircle />
              <span>{group.members} Members</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default YourGroups;
