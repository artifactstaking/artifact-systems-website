import React, { createContext, useContext, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TransitionContextType {
  isTransitioning: boolean;
  startTransition: () => Promise<void>;
}

const TransitionContext = createContext<TransitionContextType | undefined>(undefined);

export function TransitionProvider({ children }: { children: React.ReactNode }) {
  const [isTransitioning, setIsTransitioning] = useState(false);

  const startTransition = async () => {
    setIsTransitioning(true);
    // Wait for fade out
    await new Promise(resolve => setTimeout(resolve, 300));
    // Wait for content to load
    await new Promise(resolve => setTimeout(resolve, 100));
    setIsTransitioning(false);
  };

  return (
    <TransitionContext.Provider value={{ isTransitioning, startTransition }}>
      <div className="relative">
        {children}
        <AnimatePresence>
          {isTransitioning && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="fixed inset-0 bg-black z-50 pointer-events-none"
              style={{ marginTop: '4rem' }} // Account for header height
            />
          )}
        </AnimatePresence>
      </div>
    </TransitionContext.Provider>
  );
}

export function useTransition() {
  const context = useContext(TransitionContext);
  if (context === undefined) {
    throw new Error('useTransition must be used within a TransitionProvider');
  }
  return context;
}