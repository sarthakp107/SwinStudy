import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-white px-8 py-4 flex justify-between items-center shadow-md">
      <div className="text-2xl">
        <Link to="/" className="text-red-600 font-bold hover:text-red-700">
          Cheetos
        </Link>
      </div>
      <div className="flex gap-8">
        <Link to="/" className="text-gray-700 hover:text-red-600 transition-colors">
          Home
        </Link>
        <Link to="/about" className="text-gray-700 hover:text-red-600 transition-colors">
          About
        </Link>
        <Link to="/contact" className="text-gray-700 hover:text-red-600 transition-colors">
          Contact
        </Link>
      </div>
    </nav>
  );
};

export default Navbar; 