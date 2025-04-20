import Spinner from '@/components/Loading/Spinner';
import useUserProfile from '@/Hooks/GetUserInfo/useUserProfile';
import React from 'react';
import LandingHero from '@/components/LandingPage/LandingHero';
import FeatureBlock from '@/components/LandingPage/FeatureBlock';
import ProblemBlock from '@/components/LandingPage/ProblemBlock';
import BuiltForSwinBlock from '@/components/LandingPage/BuiltForSwinBlock';
import CTABlock from '@/components/LandingPage/CTABlock';

const LandingPage: React.FC = () => {
  const { loading } = useUserProfile(); 

  if (loading) return <Spinner />; 
  return (
    <div className="overflow-hidden"> 
      <LandingHero />
      <ProblemBlock />
      <FeatureBlock />
      <BuiltForSwinBlock />
      <CTABlock />
       {/* <Footer /> */}
    </div>
  );
};

export default LandingPage;