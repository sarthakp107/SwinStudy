import React from "react";
import { Navigate, Outlet, RouteObject, createBrowserRouter, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import LandingPage from "./pages/LandingPage";
import { useAuthContext } from "./Hooks/Context/useAuthContext";
import { useSurveyStatus } from "./Hooks/Database/update/useSurveyStatus";
import { SignUpSurvey } from "./pages/Survey/SignupSurvey";
import LoginPage from "./pages/Authentication/LoginPage";
import SignupPage from "./pages/Authentication/SignupPage";
import Dashboard from "./pages/Dashboard";
import { UnitBuddies } from "./pages/UnitBuddies/UnitBuddies";
import { ViewFlashcards } from "./pages/Flashcards/ViewFlashcards";
import { UploadPage } from "./pages/UploadPage";
import InProgress from "./pages/InProgress/InProgress";
import Spinner from "./components/Loading/Spinner";
import FeatureBlock from "./components/LandingPage/FeatureBlock";
import { Footer } from "./components/Footer";
import { Flashcards } from "./pages/Flashcards/Flashcards_ForLoggedIn";
import { ViewSavedFlashcards } from "./pages/Flashcards/ViewSavedFlashcards";
import { ProfilePage } from "./pages/Profile/ProfilePage";

/** Layout that subscribes to auth so Navbar/CTAs re-render when login/logout */
const RootLayout = () => {
  useAuthContext();
  const { pathname } = useLocation();
  const isLanding = pathname === "/";
  return (
    <>
      {!isLanding && <Navbar />}
      <main className={isLanding ? "" : "pt-16"}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

/**
 * Protects routes that require authentication.
 * Redirects to /login if not logged in.
 */
const RequireAuth = ({ children }: { children: React.ReactNode }) => {
  const { user, isAuthReady } = useAuthContext();

  if (!isAuthReady) return <Spinner />;
  if (!user) return <Navigate to="/login" replace />;

  return <>{children}</>;
};

/**
 * Guest-only routes (login, signup).
 * Redirects to /dashboard if already logged in.
 */
const RequireGuest = ({ children }: { children: React.ReactNode }) => {
  const { user, isAuthReady } = useAuthContext();

  if (!isAuthReady) return <Spinner />;
  if (user) return <Navigate to="/survey" replace />;

  return <>{children}</>;
};

const SurveyGate = () => {
  const { isLoading, hasSubmittedSurvey } = useSurveyStatus();

  if (isLoading) return <Spinner />;
  if (!hasSubmittedSurvey) return <SignUpSurvey />;

  return <Navigate to="/dashboard" replace />;
};

const routes: RouteObject[] = [
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <LandingPage /> },

      // Guest-only: redirect to dashboard if logged in
      { path: 'login', element: <RequireGuest><LoginPage /></RequireGuest> },
      { path: 'signup', element: <RequireGuest><SignupPage /></RequireGuest> },

      // Public: anyone can access
      { path: 'flashcard/:questionID', element: <ViewFlashcards /> },
      { path: 'about', element: <InProgress /> },
      { path: 'buddies', element: <InProgress /> },
      { path: 'smartstudy', element: <InProgress /> },
      { path: 'features', element: <FeatureBlock /> },
      { path: 'flashcardupload', element: <UploadPage /> },
      { path: 'flashcards', element: <Flashcards /> },
      { path: 'flashcardsaved', element: <ViewSavedFlashcards /> },

      // Protected: redirect to login if not authenticated
      { path: 'dashboard', element: <RequireAuth><Dashboard /></RequireAuth> },
      { path: 'dashboard/:unitName', element: <RequireAuth><UnitBuddies /></RequireAuth> },
      { path: 'survey', element: <RequireAuth><SurveyGate /></RequireAuth> },
      { path: 'mentors', element: <RequireAuth><InProgress /></RequireAuth> },
      { path: 'profile/:id', element: <RequireAuth><ProfilePage /></RequireAuth> },
    ],
  },
  { path: '*', element: <InProgress /> },
];

const router = createBrowserRouter(routes);

export default router;
