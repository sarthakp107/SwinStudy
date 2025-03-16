// import { useEffect, useState } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import supabase from '../config/supabase-client';

// const Verification = () => {
//     const navigate = useNavigate();
//     const location = useLocation();
//     const [isResending, setIsResending] = useState(false);
//     const email = location.state?.email || "your email";

//     // Listen for auth state changes
//     useEffect(() => {
//         const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
//             if (event === 'SIGNED_IN') {
//                 navigate('/');
//             }
//         });

//         return () => {
//             authListener.subscription.unsubscribe();
//         };
//     }, [navigate]);

//     const handleResendEmail = async () => {
//         setIsResending(true);
//         try {
//             const { error } = await supabase.auth.resend({
//                 type: 'signup',
//                 email: email,
//             });

//             if (error) throw error;

//             alert('Verification email has been resent!');
//         } catch (error) {
//             alert('Error sending verification email. Please try again.');
//         } finally {
//             setIsResending(false);
//         }
//     };

//     return (
//         <div className="min-h-screen flex items-center justify-center bg-gray-100">
//             <div className="max-w-lg w-full bg-white p-8 rounded-lg shadow-lg">
//                 <div className="flex flex-col md:flex-row">
//                     <div className="flex-1">
//                         <div className="text-center">
//                             <h2 className="text-3xl font-semibold mb-4">Verify Your Email</h2>
//                             <div className="text-6xl mb-4">
//                                 📧
//                             </div>
//                             <p className="text-gray-600 mb-4">
//                                 We've sent a verification email to:
//                                 <br />
//                                 <strong className="text-gray-900">{email}</strong>
//                             </p>
//                             <p className="text-gray-600 mb-6">
//                                 Please check your email and click on the verification link to complete your registration.
//                             </p>
//                             <button 
//                                 className="w-full bg-red-500 text-white py-2 px-4 rounded-lg mb-4 hover:bg-blue-600 focus:outline-none disabled:opacity-50"
//                                 onClick={handleResendEmail}
//                                 disabled={isResending}
//                             >
//                                 {isResending ? (
//                                     <span className="animate-spin mr-2 w-4 h-4 border-t-2 border-white rounded-full border-b-2"></span>
//                                 ) : null}
//                                 {isResending ? 'Sending...' : 'Resend Verification Email'}
//                             </button>
//                             <button 
//                                 className="w-full border-2 border-red-500 text-red-500 py-2 px-4 rounded-lg hover:bg-blue-100 focus:outline-none"
//                                 onClick={() => navigate('/login')}
//                             >
//                                 Back to Login
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Verification;
