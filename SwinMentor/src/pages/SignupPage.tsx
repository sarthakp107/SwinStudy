import React from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaGoogle } from 'react-icons/fa';
import { useAuth } from '@/context/AuthContext';

const SignupPage: React.FC = () => {

  const {signInWithGithub, signInWithGoogle} = useAuth();
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-gray-100 to-gray-300">
      <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Sign Up</h2>

        {/* GitHub Signup Button */}
        <button
  onClick={signInWithGithub}
  className="w-full bg-gray-800 text-white py-2 rounded-md flex items-center justify-center space-x-2 hover:bg-gray-900 transition duration-300 shadow-md"
>
  <FaGithub className="text-xl" />
  <span className="text-lg">Sign up with GitHub</span>
</button>

<button onClick={signInWithGoogle}
  className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md flex items-center justify-center space-x-2 hover:bg-blue-600 transition-colors duration-300 shadow-md"
>
  <FaGoogle className="text-xl" />
  <span className="text-lg">Sign up with Google</span>
</button>


        {/* Already Have an Account? */}
        <p className="text-sm text-gray-600 text-center mt-4">
          Already have an account? 
          <Link to="/login" className="text-red-500 hover:underline ml-1">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
