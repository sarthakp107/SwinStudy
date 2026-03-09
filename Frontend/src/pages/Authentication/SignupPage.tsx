import React, {useState} from 'react';
import { FaUser, FaLock, FaEnvelope } from 'react-icons/fa';
import { useEmailAuth } from '@/Hooks/Authentication/useEmailAuth';
import { useOAuth } from '@/Hooks/Authentication/useOAuth';
import Spinner from '@/components/Loading/Spinner';
import { useNavigate } from 'react-router-dom';

const SignupPage: React.FC = () => {
  const [displayName, setDisplayName] = useState("");
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signUpWithEmail, error: emailAuthError, isPending } = useEmailAuth();
  const { error: oAuthError } = useOAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await signUpWithEmail(email, password, displayName);
    if (success) navigate('/survey');
  };

  return (
    <div className="relative flex justify-center items-center min-h-[calc(100vh-4rem)] pt-8 pb-12">
      {/* Single bird background - fixed, full viewport, blends with navbar */}
      <div
        className="fixed inset-0 -z-10"
        style={{
          backgroundImage: `url("/fly-bird-down.png")`,
          backgroundSize: "auto 50%",
          backgroundPosition: "75% 70%",
          backgroundRepeat: "no-repeat",
          backgroundColor: "#fef2f2",
        }}
      />
      {/* Very subtle gradient - keeps form readable without separating it */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-b from-white/40 via-transparent to-white/50" />

      {/* Form - blended glass, no harsh card */}
      <div className="w-full max-w-md mx-4 backdrop-blur-md bg-white/60 border border-white/50 rounded-2xl p-8 shadow-xl">
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
      </div>
    </div>
  );
};

export default SignupPage;
