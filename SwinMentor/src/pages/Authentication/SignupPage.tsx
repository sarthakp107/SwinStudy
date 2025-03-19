import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaGithub, FaGoogle, FaUser, FaLock } from 'react-icons/fa';
import { useAuth } from '@/context/AuthContext';

const SignupPage: React.FC = () => {

  const {signInWithGithub, signInWithGoogle, signUpWithEmail} = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const navigate = useNavigate();

  // Signup Handling Function
  const handleSubmit = async (e: React.FormEvent) => {
    setisLoading(true);
    e.preventDefault();
    setError(""); // Reset previous errors

    try {
      
      await signUpWithEmail(email, password);
      navigate('/survey');
    } catch (err: any) {
      setisLoading(false);
      setError(`Error: ${err.message || err}`);
    }
  };


  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-gray-100 to-gray-300">
      
      <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-md">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">Create an account</h2>

          {/* Form For Sign Up with Email/Password */}
          <form className='space-y-5' onSubmit={handleSubmit}>
            {error && 
                (
                  <div className='bg-red-100 text-red-600 text-sm p-3 border border-red-400 rounded-md'>
                    {error}
                  </div>
                )
            }
            {/* Input For Email */}
            <div className='relative'>
            <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <input
                type = "email"
                className="w-full pl-10 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-red-500 focus:outline-none"
                placeholder='Enter Your Email'
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                />
            </div>

            {/* Input For Password */}
            <div className="relative">
              <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <input
                type="password"
                className="w-full pl-10 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-red-500 focus:outline-none"
                placeholder="Enter Your Password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
              />
            </div>

            {/* Button for SignUp with Email */}
            <button
              type='submit'
              className='w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition duration-300 shadow-md mb-3'
              disabled={isLoading}
            > 
            {isLoading ? 'Processing...' : "Sign Up"}
            </button>
          </form>

          {/* {Or Seperator} */}
          <div className='flex items-center my-4'>
            <hr className='flex-grow border-t border-gray-300'/>
            <span className='mx-4 text-gray-500'>or</span>
            <hr className='flex-grow border-t border-gray-300'/>
          </div>
                {/* GitHub Signup Button */}
          <button onClick={signInWithGithub} className="w-full bg-gray-800 text-white py-2 rounded-md flex items-center justify-center space-x-2 hover:bg-gray-900 transition duration-300 shadow-md">
            <FaGithub className="text-xl" />
            <span className="text-lg">Sign up with GitHub</span>
          </button>

          <button onClick={signInWithGoogle} className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md flex items-center justify-center space-x-2 hover:bg-blue-600 transition-colors duration-300 shadow-md">
            <FaGoogle className="text-xl" />
            <span className="text-lg">Sign up with Google</span>
          </button>
        

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
