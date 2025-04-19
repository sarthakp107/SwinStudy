import React from "react";
import { Navigate, Outlet, RouteObject, createBrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import LandingPage from "./pages/HomePage";
import { useAuthContext } from "./Hooks/Context/useAuthContext";
import { useSurveyStatus } from "./Hooks/Database/update/useSurveyStatus";
import { SignUpSurvey } from "./pages/Survey/SignupSurvey";
import LoginPage from "./pages/Authentication/LoginPage";
import SignupPage from "./pages/Authentication/SignupPage";
import Dashboard from "./pages/Dashboard";
import { UnitBuddies } from "./pages/UnitBuddies/UnitBuddies";
import { Flashcards } from "./pages/Flashcards";
import { UploadPage } from "./pages/UploadPage";
import CreateFlashcard from "./pages/CreateFlashcard";
import InProgress from "./pages/InProgress/InProgress";
import Spinner from "./components/Loading/Spinner";

const PublicOnlyRoute = ({element}: {element: React.ReactElement}) => {
    
    const {user, authIsChecked} = useAuthContext();

    if(!authIsChecked){
        return <Spinner />
    }
    
    if(user){
       return <Navigate to="/dashboard" replace/>
    }

    return (element);
}

const ProtectedRoute = ({element}: {element: React.ReactElement})=>{
    
    const {user} = useAuthContext();
    
    if (!user){
       return <Navigate to="/login" replace/>
    }

    return (element)
}

const PublicPrivateRoute = ({element}: {element: React.ReactElement})=>{
    return (element)
}

const UploadGate = () =>{
    const {user} = useAuthContext();
    const {hasSubmittedSurvey} = useSurveyStatus();
    if(!user){
        return (
            <div> 
                Please Login First
            </div>
        )
    }
    if(user && !hasSubmittedSurvey){
        return(
            <div>
                Please complete survey first!
            </div>
        )
    }
    return <UploadPage />;
}

const SurveyGate = () => {
    const { user } = useAuthContext();
    const { hasSubmittedSurvey } = useSurveyStatus();

     if (!user) {
        return <Navigate to="/login" replace />;
    }
    console.log(hasSubmittedSurvey);
    if (!hasSubmittedSurvey) {
        return <SignUpSurvey />;
    }
    
    return <Navigate replace to="/survey" />;
    
};

const routes: RouteObject[] = [
    {
        path: '/',
        element: (
            <>
                <Navbar />
                <Outlet />
            </>
        ),
        children: [
            {
                index: true,
                element: <LandingPage />
            },
            {
                path: 'login', 
                element: <PublicOnlyRoute element={<LoginPage />} />
            },
            {
                path: 'signup', 
                element: <PublicOnlyRoute element={<SignupPage />} />
            },
            {
                path: 'about',
                element:<PublicOnlyRoute element={<InProgress />} />
            },
            //PROTECTED
            {
                path: 'dashboard',
                element: <ProtectedRoute element={<Dashboard />} />
            },
            {
                path: 'dashboard/:unitName', 
                element: <ProtectedRoute element={<UnitBuddies />} />
            },
            {
                path: 'flashcard/:questionID',
                element: <ProtectedRoute element={<Flashcards/>} />
            },
            {
                path: 'upload', 
                element: <PublicPrivateRoute element={<UploadGate />} />
            },
            {
                path: 'create',
                element: <ProtectedRoute element={<CreateFlashcard />} />
            },
            {
                path: 'survey',
                element: <ProtectedRoute element={<SurveyGate />} />
            }
        ],
    },
    {
        path: '*',
        element: <InProgress />
    }
]

const router = createBrowserRouter(routes);

export default router;


