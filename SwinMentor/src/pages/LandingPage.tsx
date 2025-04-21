import Spinner from '@/components/Loading/Spinner';
import useUserProfile from '@/Hooks/GetUserInfo/useUserProfile';
import React from 'react';
import LandingHero from '@/components/LandingPage/LandingHero';
import FeatureBlock from '@/components/LandingPage/FeatureBlock';
import ProblemBlock from '@/components/LandingPage/ProblemBlock';
import BuiltForSwinBlock from '@/components/LandingPage/BuiltForSwinBlock';
import CTABlock from '@/components/LandingPage/CTABlock';
import SupaDemoFlashcards from '@/components/LandingPage/SupaDemoFlashcards';
import { useAuthContext } from '@/Hooks/Context/useAuthContext';

const LandingPage: React.FC = () => {
  const {user} = useAuthContext();
  const {loading } = useUserProfile(); 

  if (loading) return <Spinner />; 
  return (
    <div className="overflow-hidden"> 
      <LandingHero />
      {!user && <ProblemBlock />}
      {!user && <SupaDemoFlashcards />}
      <FeatureBlock />
      <BuiltForSwinBlock />
      <CTABlock />
       {/* <Footer /> */}
    </div>
  );
};

export default LandingPage;