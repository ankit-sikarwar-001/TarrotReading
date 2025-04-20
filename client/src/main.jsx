import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { AppContextProvider } from './appContext/AppContext';
import { AuthProvider } from './appContext/AuthContext.jsx';
import { Toaster } from 'react-hot-toast';

createRoot(document.getElementById('root')).render(
  <AppContextProvider>
    <BrowserRouter>
      <AuthProvider>
        <>
          <Toaster position="top-center" reverseOrder={false} />
          <App />
        </>
      </AuthProvider>
    </BrowserRouter>
  </AppContextProvider>
);
