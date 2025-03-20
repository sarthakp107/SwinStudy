import React from 'react';
import { FaUsers, FaUserTie, FaCalendarAlt, FaUserFriends, FaChalkboardTeacher } from 'react-icons/fa';
import { Link } from 'react-router-dom';


const Dashboard: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-6">
      {/* Page Header */}
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard</h1>
      
      {/* Top Section: Get Involved */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6 flex items-center">
          <FaUsers className="mr-3 text-red-500" />
          Get Involved
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Find a Mentor Card */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden transition duration-300 hover:shadow-lg border-t-4 border-red-500">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-red-100 rounded-full mr-4">
                  <FaChalkboardTeacher className="text-red-600 text-xl" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800">Find a Mentor</h3>
              </div>
              <p className="text-gray-600 mb-6">
                Get matched with industry experts who can guide your learning and career.
              </p>
              <Link to="/mentors" className="inline-block px-4 py-2 bg-red-600 text-white rounded-md font-medium transition hover:bg-red-700">
                Learn More
              </Link>
            </div>
          </div>
          
          {/* Find a Buddy Card */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden transition duration-300 hover:shadow-lg border-t-4 border-red-500">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-red-100 rounded-full mr-4">
                  <FaUserFriends className="text-red-600 text-xl" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800">Find a Buddy</h3>
              </div>
              <p className="text-gray-600 mb-6">
                Partner with someone who shares your interests for collaborative projects.
              </p>
              <Link to="/buddies" className="inline-block px-4 py-2 bg-red-600 text-white rounded-md font-medium transition hover:bg-red-700">
                Learn More
              </Link>
            </div>
          </div>
          
          {/* Upcoming Events Card */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden transition duration-300 hover:shadow-lg border-t-4 border-red-500">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-red-100 rounded-full mr-4">
                  <FaCalendarAlt className="text-red-600 text-xl" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800">Upcoming Events</h3>
              </div>
              <p className="text-gray-600 mb-6">
                Stay updated with the latest events, webinars, and meetups in your area of interest.
              </p>
              <Link to="/events" className="inline-block px-4 py-2 bg-red-600 text-white rounded-md font-medium transition hover:bg-red-700">
                View Events
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Bottom Section: Your Groups */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-700 mb-6 flex items-center">
          <FaUserTie className="mr-3 text-red-500" />
          Your Groups
        </h2>
        <div className="bg-white rounded-lg shadow-md p-6">
          {/* <YourGroups /> */}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;