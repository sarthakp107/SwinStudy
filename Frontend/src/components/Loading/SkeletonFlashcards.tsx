import { useEffect, useState } from "react";
import Spinner from "./Spinner";
//Shows a Skeleton Flashcards Page and a non-real progress bar

export const SkeletonFlashcards = () => {
  const [progress, setProgress] = useState(0);
  //UseEffect for Progress bar animation, goes from 0 to 100
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        return oldProgress + 5; //Adds 5 per second, meaning it takes 20 seconds to reach till 100.
      });
    }, 1000); // Updates every second for a smooth transition

    return () => clearInterval(interval);
  }, []);

  return (
    // Main Div
    <div className="min-h-screen bg-gray-50 py-12 px-6 flex flex-col items-center">

      {/* Div for Skeleton Flashcard and Buttons */}
      <div className="w-full max-w-3xl mx-auto bg-white rounded-2xl shadow-2xl p-10 mt-8">
        {/* Flashcard Skeleton */}
        <div className="w-full max-w-3xl mx-auto">
          <div className="relative w-full h-96 rounded-xl border-4 border-red-500 bg-gray-300 animate-pulse" />
        </div>
        {/* Navigation Buttons Skeleton */}
        <div className="flex justify-between mt-10">
          <div className="h-12 w-32 bg-gray-300 rounded-md animate-pulse" />
          <div className="h-12 w-32 bg-gray-300 rounded-md animate-pulse" />
        </div>
      </div>

     {/* Progress Div*/}
     <div className="w-full max-w-3xl mx-auto ">
        {/* Prop Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden mt-4">
          <div className="bg-red-500 h-4 transition-all duration-1000 ease-linear" style={{ width: `${progress}%` }}></div>
        </div>
        {/* Text Below Bar */}
        <p className="mt-2 text-center text-gray-500 text-sm animate-pulse">
          Sit tight, we are making the magic happen...
        </p>
      </div>
      
        <Spinner />
    </div>
  );
};
