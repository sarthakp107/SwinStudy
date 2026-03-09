import React, {useState} from 'react';
import { FaUser, FaLock, FaEnvelope } from 'react-icons/fa';
import { useEmailAuth } from '@/Hooks/Authentication/useEmailAuth';
import { useOAuth } from '@/Hooks/Authentication/useOAuth';
import Spinner from '@/components/Loading/Spinner';
import { Link, useNavigate } from 'react-router-dom';

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
      {/* Single bird "background" - fixed and positioned relative to center
          so it stays near the form on ultrawide screens. */}
      <div className="fixed inset-0" style={{ backgroundColor: "#fef2f2", zIndex: -30 }} />
      <img
        src="/fly-bird-down.png"
        alt=""
        aria-hidden
        className="fixed pointer-events-none select-none opacity-90"
        style={{
          zIndex: -20,
          top: "10%",
          left: "50%",
          height: "clamp(260px, 52vh, 540px)",
          width: "auto",
          transform: "translate(-50%, -50%) translateX(clamp(-220px, -16vw, -120px)) translateY(40px)",
          filter: "drop-shadow(0 24px 60px rgba(0,0,0,0.08))",
        }}
      />
      <div
        className="fixed inset-0 pointer-events-none bg-gradient-to-b from-white/40 via-transparent to-white/50"
        style={{ zIndex: -10 }}
      />

      {/* Form - blended glass */}
      <div className="relative z-10 w-full max-w-md mx-4 backdrop-blur-md bg-white/60 border border-white/50 rounded-2xl p-8 shadow-xl">
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
          <p className="mt-6 text-center text-sm text-slate-700">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold text-red-600 hover:text-red-700">
              Log in
            </Link>
          </p>
      </div>
    </div>
  );
};

export default SignupPage;
