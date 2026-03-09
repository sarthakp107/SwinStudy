import React, {useState} from 'react';
import { FaUser, FaLock} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useEmailAuth } from '@/Hooks/Authentication/useEmailAuth';
import Spinner from '@/components/Loading/Spinner';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const {signInWithPassword, isPending ,error: emailAuthError} = useEmailAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const success = await signInWithPassword(email, password);
    if (success) navigate('/dashboard');
  };

  return (
    <div className="relative flex justify-center items-center min-h-[calc(100vh-4rem)] pt-8 pb-12">
      {/* Bird background - fixed, blends with navbar */}
      <div
        className="fixed inset-0 -z-10"
        style={{
          backgroundImage: `url("/fly-bird-up.png")`,
          backgroundSize: "auto 50%",
          backgroundPosition: "71% -8%",
          backgroundRepeat: "no-repeat",
          backgroundColor: "#fef2f2",
        }}
      />
      <div className="fixed inset-0 -z-10 bg-gradient-to-b from-white/40 via-transparent to-white/50" />

      {/* Form - blended glass */}
      <div className="w-full max-w-md mx-4 backdrop-blur-md bg-white/60 border border-white/50 rounded-2xl p-8 shadow-xl">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">Welcome Back</h2>

        {/* Login Form */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          {error && 
              (
                <div className='bg-red-100 text-red-600 text-sm p-3 border border-red-400 rounded-md'>
                  {error}
                </div>
              )
          }
          {emailAuthError && 
              (
                <div className='bg-red-100 text-red-600 text-sm p-3 border border-red-400 rounded-md'>
                  {emailAuthError}
                </div>
              )
          }
          {/* Email Field */}
          <div className="relative">
            <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type="email"
              className="w-full pl-10 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-red-500 focus:outline-none"
              placeholder="Enter Your Email"
              autoComplete="email"
              value={email}
              onChange={(e)=> setEmail(e.target.value)}
            />
          </div>

          {/* Password Field */}
          <div className="relative">
            <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type="password"
              className="w-full pl-10 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-red-500 focus:outline-none"
              placeholder="Enter Your Password"
              autoComplete="current-password"
              value={password}
              onChange={(e)=> setPassword(e.target.value)}
            />
          </div>

          {/* Login Button */}
          {!isPending && <button className='w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition duration-300 shadow-md mb-3'>Login</button>}
            {/* {isPending && <button className='w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition duration-300 shadow-md mb-3'>Loading</button>} */}
            {isPending && <Spinner/>}

        </form>
      </div>
    </div>
  );
};

export default LoginPage;
