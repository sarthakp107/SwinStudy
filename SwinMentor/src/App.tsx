import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import CreateFlashcard from './pages/CreateFlashcard';
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import { useAuth } from './context/AuthContext';

const App: React.FC = () => {
  const { user } = useAuth();

  return (
    <Router>
      <Navbar />
      <Routes>
        {user ? (
          <>
            {/* If user is logged in, redirect signup page to home */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/signup" element={<Navigate to="/" replace />} />
            <Route path="/login" element={<Navigate to="/" replace />} />
            {/* Add other routes for logged-in users here */}
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
