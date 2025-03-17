import { useAuth } from '@/context/AuthContext';
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  const { user, signOut } = useAuth();
  return (
    <nav className="bg-white px-8 py-4 flex justify-between items-center shadow-md">
      {/* Logo */}
      <div className="text-2xl font-bold">
        <Link to="/" className="text-red-600 hover:text-red-700 transition-colors duration-300">
          SwinStudy
        </Link>
      </div>

      {/* Navigation Links */}
      <div className="flex items-center gap-6">
        <Link to="/" className="text-gray-700 hover:text-red-600 transition-colors duration-300">
          Home
        </Link>
        <Link to="/about" className="text-gray-700 hover:text-red-600 transition-colors duration-300">
          About
        </Link>
        <Link to="/" className="text-gray-700 hover:text-red-600 transition-colors duration-300">
          Mentors
        </Link>
        <Link to="/" className="text-gray-700 hover:text-red-600 transition-colors duration-300">
          Unit Buddy
        </Link>
        <Link to="/" className="text-gray-700 hover:text-red-600 transition-colors duration-300">
          AI Study
        </Link>
        {user ? (
          <div className="text-white bg-red-500 hover:bg-red-600 border border-red-600 rounded-md px-4 py-2 transition-all duration-300">

            <button onClick={signOut}>Sign Out</button>
          </div>
        ) :
          (
            <div>
              <Link to="/login" className="text-gray-700 mr-5 hover:text-red-600 transition-colors duration-300">
                Login
              </Link>
              <Link
                to="/signup"
                className="text-white bg-red-500 hover:bg-red-600 border border-red-600 rounded-md px-4 py-2 transition-all duration-300"
              >
                Get Started
              </Link>
            </div>)
        }
      </div>
    </nav>
  );
};

export default Navbar;
