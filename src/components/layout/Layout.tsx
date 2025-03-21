import React, { useEffect } from 'react';
import { Header } from './Header';
import Footer from './Footer';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { useTransition } from '../../contexts/TransitionContext';
import MonitorImage from '../../assets/Monitor.webp';
import DataHavenImage from '../../assets/DataHaven.webp';
import CybermarketImage from '../../assets/Cybermarket.webp';
import UnderwaterServerImage from '../../assets/Underwaterserverfullres.webp';
import CloudDreamingImage from '../../assets/9CloudDreaming.webp';
import ShipCrashImage from '../../assets/ShipCrash.webp';
import PiratesImage from '../../assets/Pirates.webp';
import WatchingRocketImage from '../../assets/WatchingRocket.webp';
import CycleImage from '../../assets/Cycle.webp';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isLandscape = useMediaQuery('(orientation: landscape)');
  const location = useLocation();
  const { isTransitioning } = useTransition();

  useEffect(() => {
    // Preload all background images
    const images = [
      MonitorImage,
      DataHavenImage,
      CybermarketImage,
      UnderwaterServerImage,
      CloudDreamingImage,
      ShipCrashImage,
      PiratesImage,
      WatchingRocketImage,
      CycleImage
    ];

    images.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  return (
    <div className={`flex flex-col min-h-screen bg-[#000000] ${(isMobile || isLandscape) ? 'mobile-layout overflow-x-hidden w-full' : ''}`}>
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
          <div className={`${(isMobile || isLandscape) ? 'w-full px-4' : 'container mx-auto px-4'}`}>
            {children}
          </div>
        </motion.main>
      </AnimatePresence>
      <Footer />
    </div>
  );
}