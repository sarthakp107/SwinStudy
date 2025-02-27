import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import CreateFlashcard from './pages/CreateFlashcard';
import Navbar from './components/Navbar';

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/create" element={<CreateFlashcard />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
};

export default App;
