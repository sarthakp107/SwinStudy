import { useEffect, useState } from "react";
import TitleAndButton from "./TitleAndButton";


const LandingWithIntro = () => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 3000); // 3 seconds
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen bg-white overflow-hidden">
      {showSplash ? (
        <div className="absolute inset-0 flex items-center justify-center bg-red-600 z-50">
          <h1 className="text-4xl md:text-6xl font-bold text-white animate-fade-in-up">
            Study Smarter <span className="text-red-600">Swinstudy</span>
          </h1>
        </div>
      ) : ( <TitleAndButton />


      )}
    </div>
  );
};

export default LandingWithIntro;
