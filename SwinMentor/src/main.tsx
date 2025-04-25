import { StrictMode, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { QueryClient, QueryClientProvider } from 'react-query';
import {  AuthContextProvider } from './context/AuthContext.tsx'
import { SurveyProvider } from './context/SurveyContext.tsx';
import { FileProvider } from './context/FileContext.tsx';
import { RouterProvider } from 'react-router-dom';
import router from './routes.tsx';
import SplashScreen from './components/SplashScreen.tsx';
const client = new QueryClient();

const App: React.FC = () => {
   const [splashDone, setSplashDone] = useState(false);
   const [hasSeenSplash] = useState(() => {
     return localStorage.getItem('hasSeenSplash') === 'true';
   });
 
   useEffect(() => {
     if (!hasSeenSplash) {
       const timer = setTimeout(() => {
         setSplashDone(true);
         localStorage.setItem('hasSeenSplash', 'true'); // mark as seen
       }, 4000); // duration of splash
 
       return () => clearTimeout(timer);
     } else {
       setSplashDone(true); // skip splash
     }
   }, [hasSeenSplash]);
 
   return (
     <QueryClientProvider client={client}>
       <AuthContextProvider>
         <SurveyProvider>
           <FileProvider>
 
             {/* Splash only on first visit */}
             {!hasSeenSplash && !splashDone && (
               <div className="fixed inset-0 z-50 bg-white flex items-center justify-center">
                 <SplashScreen />
               </div>
             )}
 
             {/* Router shown always, just hidden if splash is running */}
             <div className={`${!splashDone ? 'opacity-0 pointer-events-none' : 'opacity-100'} transition-opacity duration-500`}>
               <RouterProvider router={router} />
             </div>
 
           </FileProvider>
         </SurveyProvider>
       </AuthContextProvider>
     </QueryClientProvider>
   );
 };
 
 

createRoot(document.getElementById('root')!).render(
<StrictMode>
  <App /> 
</StrictMode>
);
