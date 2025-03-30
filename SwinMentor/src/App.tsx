import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import CreateFlashcard from './pages/CreateFlashcard';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import LoginPage from './pages/Authentication/LoginPage';
import SignupPage from './pages/Authentication/SignupPage';
import { useAuthContext } from './Hooks/Context/useAuthContext';
import { SignUpSurvey } from './pages/Survey/SignupSurvey';
import { UploadPage } from './pages/UploadPage';
import { UnitBuddies } from './pages/UnitBuddies/UnitBuddies';
import { Flashcards } from './pages/Flashcards';

const App: React.FC = () => {
  const { user } = useAuthContext();

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage/>} />
            {user ? (
              <>
                {/* {Logged In}  */}
                <Route path="/survey" element={<SignUpSurvey />} />
                <Route path="/survey" element={<SignUpSurvey />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/upload" element={<UploadPage />} />
                <Route path='/flashcard/:questionID' element = {<Flashcards />}/>
                <Route path="/signup" element={<Navigate to="/" replace />} />
                <Route path="/login" element={<Navigate to="/" replace />} />          
                <Route path="/" element={<LandingPage />} />
                <Route path="/dashboard/:unitName" element={<UnitBuddies/>} />
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
