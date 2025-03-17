import React from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaLock } from 'react-icons/fa';

const LoginPage: React.FC = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-gray-100 to-gray-300">
      <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Login</h2>

        {/* Login Form */}
        <form className="space-y-5">
          {/* Email Field */}
          <div className="relative">
            <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type="email"
              className="w-full pl-10 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-red-500 focus:outline-none"
              placeholder="Enter your email"
            />
          </div>

          {/* Password Field */}
          <div className="relative">
            <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type="password"
              className="w-full pl-10 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-red-500 focus:outline-none"
              placeholder="Enter your password"
            />
          </div>

          {/* Login Button */}
          <button 
            type="submit" 
            className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition duration-300 shadow-md"
          >
            Login
          </button>
        </form>

        {/* Forgot Password & Signup Link */}
        <div className="text-center mt-4">
          <Link to="/forgot-password" className="text-sm text-gray-500 hover:underline">
            Forgot password?
          </Link>
        </div>

        <p className="text-sm text-gray-600 text-center mt-4">
          Don't have an account? 
          <Link to="/contact" className="text-red-500 hover:underline ml-1">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
