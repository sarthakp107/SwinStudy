import { useSignOut } from '@/Hooks/Authentication/useSignOut';
import { useAuthContext } from '@/Hooks/Context/useAuthContext';
import React from 'react';
import { Link } from 'react-router-dom';
import Spinner from './Loading/Spinner';

const Navbar: React.FC = () => {
  const { user } = useAuthContext();
  const {signOut, isPending}=useSignOut();


  const handleSignOut = (e : React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    signOut();
}


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
        {/* <Link to="/" className="text-gray-700 hover:text-red-600 transition-colors duration-300">
          Mentors
        </Link> */}
        <Link to="/buddies" className="text-gray-700 hover:text-red-600 transition-colors duration-300">
          Unit Buddy
        </Link>
        <Link to="/upload" className="text-gray-700 hover:text-red-600 transition-colors duration-300">
          Flashcard
        </Link>
        {!user && 
          <li className='list-none text-gray-700 mr-5 hover:text-red-600 transition-colors duration-300'>
          <Link to="/login">Login</Link>
          <Link to="/signup" className='ml-5 text-white bg-red-500 hover:bg-red-600 border border-red-600 rounded-md px-4 py-2 transition-all duration-300'>Signup</Link>
          </li>
        }
        {user && <li className='list-none'>
                {!isPending && <button className='text-white bg-red-500 hover:bg-red-600 border border-red-600 rounded-md px-4 py-2 transition-all duration-300' onClick={handleSignOut}>Logout</button>}
                {isPending && <Spinner/>}
            </li>}
      </div>
    </nav>
  );
};

export default Navbar;
