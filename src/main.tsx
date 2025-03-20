import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import { ThemeProvider } from './contexts/ThemeContext';
import { TransitionProvider } from './contexts/TransitionContext';
import { LoadingProvider } from './contexts/LoadingContext';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <TransitionProvider>
          <LoadingProvider>
            <App />
          </LoadingProvider>
        </TransitionProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);