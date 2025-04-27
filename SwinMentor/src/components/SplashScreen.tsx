// components/SplashScreen.tsx
import React from "react";

const SplashScreen: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-center">
    <h1 className="text-5xl md:text-6xl font-bold text-red-600 fade-up">
      SwinStudy
    </h1>
    <p className="mt-4 text-lg md:text-2xl text-red-400 fade-up-delay">
      Study Smarter. Achieve More.
    </p>
  </div>
  );
};

export default SplashScreen;
