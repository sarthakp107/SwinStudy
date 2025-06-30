import Spinner from '@/components/Loading/Spinner';
import useUserProfile from '@/Hooks/GetUserInfo/useUserProfile';
import React, { useEffect, useState } from 'react';
import LandingHero from '@/components/LandingPage/LandingHero';
import FeatureBlock from '@/components/LandingPage/FeatureBlock';
import ProblemBlock from '@/components/LandingPage/ProblemBlock';
import BuiltForSwinBlock from '@/components/LandingPage/BuiltForSwinBlock';
import CTABlock from '@/components/LandingPage/CTABlock';
import SupaDemoFlashcards from '@/components/LandingPage/SupaDemoFlashcards';
import { useAuthContext } from '@/Hooks/Context/useAuthContext';
import SplashScreen from '@/components/SplashScreen';

const LandingPage: React.FC = () => {
  const {user} = useAuthContext();
  const {loading } = useUserProfile(); 
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

  if (loading) return <Spinner />; 
  return (
    <div className="overflow-hidden"> 
    {!hasSeenSplash && !splashDone && (<div className="fixed inset-0 z-50 bg-white flex items-center justify-center"> <SplashScreen /> </div>)}
      <LandingHero />
      {!user && <ProblemBlock />}
      {!user && <SupaDemoFlashcards />}
      <FeatureBlock />
      <BuiltForSwinBlock />
      <CTABlock />
    </div>
  );
};

export default LandingPage;