import React from 'react';

const Spinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center mt-16">

      <div className="w-8 h-8 border-4 border-t-transparent border-red-500 rounded-full animate-spin"></div>
    </div>
  );
};

export default Spinner;