import React from 'react';
import { FaCalendarAlt, FaUserFriends, FaChalkboardTeacher } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export const FeatureCards: React.FC = () => {
    return (
        <section className="mb-10">
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
                <h3 className="text-xl font-semibold text-gray-800">Study Plan</h3>
              </div>
              <p className="text-gray-600 mb-6">
                Stay updated with the latest events, webinars, and meetups in your area of interest.
              </p>
              <Link to="/events" className="inline-block px-4 py-2 bg-red-600 text-white rounded-md font-medium transition hover:bg-red-700">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
};