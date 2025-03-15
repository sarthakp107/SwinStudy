// Dashboard.tsx
import React from 'react';
import { FaUsers, FaUserTie, FaCalendarAlt, FaRegNewspaper } from 'react-icons/fa'; // Icons for new sections
import { Link } from 'react-router-dom';
import YourGroups from '../components/YourGroup'; // Importing the YourGroups component

const Dashboard: React.FC = () => {
  return (
    <div className="flex flex-col h-screen p-6">
      {/* Top Section: Get Involved */}
      <div className="bg-gradient-to-r from-red-200 to-red-100 p-6 shadow-lg rounded-lg mb-6">
        <div className="text-3xl font-semibold text-red-700 mb-6">Get Involved</div>
        {/* Cards for mentor and buddy */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 cursor-pointer">
            <div className="flex items-center space-x-4 mb-4">
              <FaUserTie className="text-4xl text-red-700" />
              <div className="text-xl font-semibold text-red-700">Find a Mentor</div>
            </div>
            <p className="text-gray-600 mb-4">
              Get matched with industry experts who can guide your learning and career.
            </p>
            <Link to="/find-mentor" className="text-red-700 hover:text-red-600 font-semibold">
              Learn More
            </Link>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 cursor-pointer">
            <div className="flex items-center space-x-4 mb-4">
              <FaUsers className="text-4xl text-red-700" />
              <div className="text-xl font-semibold text-red-700">Find a Buddy</div>
            </div>
            <p className="text-gray-600 mb-4">
              Partner with someone who shares your interests for collaborative projects.
            </p>
            <Link to="/find-buddies" className="text-red-700 hover:text-red-600 font-semibold">
              Learn More
            </Link>
          </div>

          {/* New Section Card: Upcoming Events */}
          <div className="bg-white p-6 rounded-lg shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 cursor-pointer">
            <div className="flex items-center space-x-4 mb-4">
              <FaCalendarAlt className="text-4xl text-red-700" />
              <div className="text-xl font-semibold text-red-700">Upcoming Events</div>
            </div>
            <p className="text-gray-600 mb-4">
              Stay updated with the latest events, webinars, and meetups in your area of interest.
            </p>
            <Link to="/events" className="text-red-700 hover:text-red-600 font-semibold">
              View Events
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Section: Left - Your Groups, Right - News/Events */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: Your Groups */}
        <div className="bg-white p-6 space-y-6 shadow-lg rounded-lg">
          <YourGroups /> {/* YourGroups Component here */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
