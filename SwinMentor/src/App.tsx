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
        {user ? (
          <>
            {/* {Logged In}  */}
            <Route path="/survey" element={<SignUpSurvey />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/signup" element={<Navigate to="/" replace />} />
            <Route path="/login" element={<Navigate to="/" replace />} />       
            <Route path="/" element={<LandingPage />} />
          </>
        ) : (
          <>
            {/* {Not Logged In} */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/" element={<LandingPage />} />
          </>
        )}

        {/* Create flashcard page */}
        <Route path="/create" element={<CreateFlashcard />} />
      </Routes>
    </Router>
  );
};

export default App;
