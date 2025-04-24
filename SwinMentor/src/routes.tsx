import React from "react";
import { Navigate, Outlet, RouteObject, createBrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import LandingPage from "./pages/LandingPage";
import { useAuthContext } from "./Hooks/Context/useAuthContext";
import { useSurveyStatus } from "./Hooks/Database/update/useSurveyStatus";
import { SignUpSurvey } from "./pages/Survey/SignupSurvey";
import LoginPage from "./pages/Authentication/LoginPage";
import SignupPage from "./pages/Authentication/SignupPage";
import Dashboard from "./pages/Dashboard";
import { UnitBuddies } from "./pages/UnitBuddies/UnitBuddies";
import { Flashcards } from "./pages/Flashcards";
import { UploadPage } from "./pages/UploadPage";
import InProgress from "./pages/InProgress/InProgress";
import Spinner from "./components/Loading/Spinner";
import FeatureBlock from "./components/LandingPage/FeatureBlock";
import { Footer } from "./components/Footer";

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

// const UploadGate = () =>{
//     const {user} = useAuthContext();
//     const {hasSubmittedSurvey} = useSurveyStatus();
//     if(!user){
//         return (
//             <div> 
//                 Please Login First
//             </div>
//         )
//     }
//     if(user && !hasSubmittedSurvey){
//         return(
//             <div>
//                 Please complete survey first!
//             </div>
//         )
//     }
//     return <UploadPage />;
// }

const SurveyGate = () => {
    // const { user } =  useAuthContext();
    const {isLoading, hasSubmittedSurvey } = useSurveyStatus();
    
    // if (!user) {
    //     console.log("NOT A USER")
    //     return <Navigate to="/" replace />;
    // }
    console.log(hasSubmittedSurvey);
    if (isLoading){
        return <Spinner />
    }
    if (!hasSubmittedSurvey) {
        return <SignUpSurvey />;
    }else{
        console.log("HAS ALREADY SUBMITTED SURVEY")
        return <Navigate to="/" replace />;
    }
};

const routes: RouteObject[] = [
    {
        path: '/',
        element: (
            <>
                <Navbar />
                <Outlet />
                <Footer />
            </>
        ),
        children: [
            {
                index: true,
                element: <LandingPage />
            },
            //Visible To Non-Users ONLY
            {
                path: 'login', 
                element: <PublicOnlyRoute element={<LoginPage />} />
            },
            {
                path: 'signup', 
                element: <PublicOnlyRoute element={<SignupPage />} />
            },
            //Visible To ALL Users
            {
                path: 'about',
                element:<PublicPrivateRoute element={<InProgress />} />
            },
            {
                path: 'buddies',
                element:<PublicPrivateRoute element={<InProgress />} />
            },
            {
                path: 'smartstudy',
                element:<PublicPrivateRoute element={<InProgress />} />
            },
            {
                path: 'features',
                element: <PublicPrivateRoute element={<FeatureBlock />}/>
            },            
            {
                path: 'upload', 
                element: <PublicPrivateRoute element={<UploadPage />} />
            },
            //Visible To Users ONLY
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
                path: 'survey',
                element: <ProtectedRoute element={<SurveyGate/>}/>
            },
            {
                path: 'mentors',
                element: <ProtectedRoute element={<InProgress/>}/>
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


