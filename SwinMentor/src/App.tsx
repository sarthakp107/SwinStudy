import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import CreateFlashcard from './pages/CreateFlashcard';
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';

const App: React.FC = () => {
  return (
    <Router>  
      <Navbar />
        <Routes>  
          {/** Landing page */}
          <Route path="/" element={<LandingPage />} />

          {/** Registration pages */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          {/** Create flashcard page */}
          <Route path="/create" element={<CreateFlashcard />} />
        </Routes>
    </Router>
  );
};

export default App;
