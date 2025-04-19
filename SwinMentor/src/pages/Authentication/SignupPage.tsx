import React, {useState} from 'react';
import { FaGithub, FaGoogle, FaUser, FaLock, FaEnvelope } from 'react-icons/fa';
import { useEmailAuth } from '@/Hooks/Authentication/useEmailAuth';
import { useOAuth } from '@/Hooks/Authentication/useOAuth';
import { Link } from 'react-router-dom';
import Spinner from '@/components/Loading/Spinner';

const SignupPage: React.FC = () => {
    const[displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {signUpWithEmail, error : emailAuthError, isPending} = useEmailAuth();
  const {signInWithGithub, signInWithGoogle, error: oAuthError} = useOAuth();

  // Signup Handling Function
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await signUpWithEmail(email,password, displayName);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-red-50 to-gray-100">
      {/* Two Corner Half-Circles */}
      {/* <div className="fixed top-0 right-0 w-64 h-64 bg-red-500 opacity-10 rounded-bl-full"></div> */} {/* <--- Causing Issue in Navigation */}
      <div className="fixed bottom-0 left-0 w-96 h-96 bg-red-500 opacity-10 rounded-tr-full"></div>
      <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-md">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">Create an account</h2>

          {/* Form For Sign Up with Email/Password */}
          <form className='space-y-5' onSubmit={handleSubmit}>
            {emailAuthError && 
                (
                  <div className='bg-red-100 text-red-600 text-sm p-3 border border-red-400 rounded-md'>
                    {emailAuthError}
                  </div>
                )
            }
            {oAuthError && 
                (
                  <div className='bg-red-100 text-red-600 text-sm p-3 border border-red-400 rounded-md'>
                    {oAuthError}
                  </div>
                )
            }
            {/* Input For Email */}
            <div className='relative'>
            <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <input
                type = "text"
                className="w-full pl-10 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-red-500 focus:outline-none"
                placeholder='Enter Your Name'
                autoComplete="name"
                value={displayName}
                onChange={(e)=>setDisplayName(e.target.value)}
                />
            </div>
            {/* Input For Email */}
            <div className='relative'>
            <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <input
                type = "email"
                className="w-full pl-10 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-red-500 focus:outline-none"
                placeholder='Enter Your Email'
                autoComplete="email"
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
                autoComplete="new-password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
              />
            </div>
            {!isPending && <button className='w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition duration-300 shadow-md mb-3'>Signup</button>}
            {/* {isPending && <button className='w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition duration-300 shadow-md mb-3'>Loading</button>} */}
            {isPending && <Spinner/>}
          </form>

          {/* {Or Seperator} */}
          <div className='flex items-center my-4'>
            <hr className='flex-grow border-t border-gray-300'/>
            <span className='mx-4 text-gray-500'>or</span>
            <hr className='flex-grow border-t border-gray-300'/>
          </div>
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
