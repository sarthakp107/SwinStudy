import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import CreateFlashcard from './pages/CreateFlashcard';
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import { useAuth } from './context/AuthContext';
import SignUpSurvey from './pages/SignupSurvey';
import Dashboard from './pages/Dashboard';

const App: React.FC = () => {
  const { user } = useAuth();

  return (
    <Router>
      <Navbar />
      <Routes>
      <Route path="/" element={<LandingPage />} />
        {user ? (
          <>
            {/* If user is logged in, redirect signup page to home */}
            
            <Route path="/signup" element={<Navigate to="/" replace />} />
            <Route path="/login" element={<Navigate to="/" replace />} />
            {/* Add other routes for logged-in users here */}
            <Route path="/signupsurvey" element={<SignUpSurvey />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </>
        ) : (
          <>
            {/* If user is not logged in, show signup and login pages */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
          </>
        )}

        {/* Create flashcard page */}
        <Route path="/create" element={<CreateFlashcard />} />
      </Routes>
    </Router>
  );
};

export default App;
