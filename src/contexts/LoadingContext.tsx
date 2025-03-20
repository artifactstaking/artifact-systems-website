import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { LoadingScreen } from '../components/ui/LoadingScreen';

interface LoadingContextType {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const location = useLocation();

  useEffect(() => {
    if (isInitialLoad) {
      // Preload all pages on initial load
      const preloadPages = async () => {
        try {
          // Import all pages
          await Promise.all([
            import('../pages/About'),
            import('../pages/Contact'),
            import('../pages/GPUCompute'),
            import('../pages/Hardware'),
            import('../pages/RPC'),
            import('../pages/Sequencing'),
            import('../pages/Validation'),
            import('../pages/ZKProver')
          ]);
          
          // Add a minimum loading time of 1.5 seconds
          await new Promise(resolve => setTimeout(resolve, 1500));
          
          setIsLoading(false);
          setIsInitialLoad(false);
        } catch (error) {
          console.error('Error preloading pages:', error);
          setIsLoading(false);
          setIsInitialLoad(false);
        }
      };

      preloadPages();
    }
  }, [isInitialLoad]);

  // Show loading screen on initial load
  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
}