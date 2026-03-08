import Spinner from '@/components/Loading/Spinner';
import useUserProfile from '@/Hooks/GetUserInfo/useUserProfile';
import React, { useEffect, useState } from 'react';
import { scrollToSection } from '@/utils/scrollToSection';
import LandingHero from '@/components/LandingPage/LandingHero';
import FeatureBlock from '@/components/LandingPage/FeatureBlock';
import ProblemBlock from '@/components/LandingPage/ProblemBlock';
import BuiltForSwinBlock from '@/components/LandingPage/BuiltForSwinBlock';
import SupaDemoFlashcards from '@/components/LandingPage/SupaDemoFlashcards';
import { useAuthContext } from '@/Hooks/Context/useAuthContext';
import SplashScreen from '@/components/SplashScreen';

const LandingPage: React.FC = () => {
  const { user } = useAuthContext();
  const { loading } = useUserProfile();
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

  // Scroll to hash section when navigating with hash (e.g. /#features)
  useEffect(() => {
    const scrollToHash = () => {
      const hash = window.location.hash?.slice(1);
      if (hash) scrollToSection(hash, 1200);
    };
    scrollToHash();
    window.addEventListener('hashchange', scrollToHash);
    return () => window.removeEventListener('hashchange', scrollToHash);
  }, []);

  if (loading) return <Spinner />;
  return (
    <div className="overflow-hidden">
      {!hasSeenSplash && !splashDone && (
        <div className="fixed inset-0 z-50 bg-white flex items-center justify-center">
          <SplashScreen />
        </div>
      )}
      <div id="hero">
        <LandingHero />
      </div>
      {!user && (
        <>
          <div id="problem" className="scroll-mt-4">
            <ProblemBlock />
          </div>
          <div id="demo" className="scroll-mt-4">
            <SupaDemoFlashcards />
          </div>
        </>
      )}
      <div id="features" className="scroll-mt-4">
        <FeatureBlock />
      </div>
      <div id="cta" className="scroll-mt-4">
        <BuiltForSwinBlock />
      </div>
    </div>
  );
};

export default LandingPage;