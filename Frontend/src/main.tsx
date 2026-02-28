import { createRoot } from 'react-dom/client'
import './index.css'
import { QueryClient, QueryClientProvider } from 'react-query';
import { AuthContextProvider } from './context/AuthContext.tsx'
import { SurveyProvider } from './context/SurveyContext.tsx';
import { FileProvider } from './context/FileContext.tsx';
import { FlashcardRefreshProvider } from './context/FlashcardRefreshContext.tsx';
import { RouterProvider } from 'react-router-dom';
import router from './routes.tsx';

const client = new QueryClient();

const App: React.FC = () => {
   return (
     <QueryClientProvider client={client}>
       <AuthContextProvider>
         <SurveyProvider>
           <FileProvider>
             <FlashcardRefreshProvider>
               <RouterProvider router={router} />
             </FlashcardRefreshProvider>
           </FileProvider>
         </SurveyProvider>
       </AuthContextProvider>
     </QueryClientProvider>
   );
 };

createRoot(document.getElementById('root')!).render(<App />);
