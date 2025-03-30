import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { QueryClient, QueryClientProvider } from 'react-query';
import {  AuthContextProvider } from './context/AuthContext.tsx'
import { SurveyProvider } from './context/SurveyContext.tsx';
import { FileProvider } from './context/FileContext.tsx';


const client = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={client}>
      <AuthContextProvider>
        <SurveyProvider>
          <FileProvider>
            <App />
          </FileProvider>
        </SurveyProvider>
      </AuthContextProvider>
    </QueryClientProvider>
  </StrictMode>
)
