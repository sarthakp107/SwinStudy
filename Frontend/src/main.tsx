import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { QueryClient, QueryClientProvider } from 'react-query';
import {  AuthContextProvider } from './context/AuthContext.tsx'
import { SurveyProvider } from './context/SurveyContext.tsx';
import { FileProvider } from './context/FileContext.tsx';
import { RouterProvider } from 'react-router-dom';
import router from './routes.tsx';
import { socket } from "./socket"; 

const client = new QueryClient();

const App: React.FC = () => {

   useEffect(() => {
    // Fires when socket successfully connects
    socket.on("connect", () => {
      console.log("Socket.IO connected with ID:", socket.id);
    });

    socket.on("message", (msg) => {
      console.log(" Message from server:", msg);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from socket");
    });

    return () => {
      // Clean up listeners when component unmounts
      socket.off("connect");
      socket.off("message");
      socket.off("disconnect");
    };
  }, []);

   return (
     <QueryClientProvider client={client}>
       <AuthContextProvider>
         <SurveyProvider>
           <FileProvider>
               <RouterProvider router={router} />
           </FileProvider>
         </SurveyProvider>
       </AuthContextProvider>
     </QueryClientProvider>
   );
 };

createRoot(document.getElementById('root')!).render(
<StrictMode>
  <App /> 
</StrictMode>
);
