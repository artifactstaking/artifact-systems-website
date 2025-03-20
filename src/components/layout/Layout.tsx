import React from 'react';
import { Header } from './Header';
import Footer from './Footer';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { useTransition } from '../../contexts/TransitionContext';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isLandscape = useMediaQuery('(orientation: landscape)');
  const location = useLocation();
  const { isTransitioning } = useTransition();

  return (
    <div className={`flex flex-col min-h-screen bg-[#000000] ${(isMobile || isLandscape) ? 'mobile-layout overflow-x-hidden w-screen' : ''}`}>
      <Header />
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: isTransitioning ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="flex-grow pt-16 relative w-full overflow-x-hidden"
        >
          {children}
        </motion.main>
      </AnimatePresence>
      <Footer />
    </div>
  );
}