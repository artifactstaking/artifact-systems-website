import React from 'react';
import { useMediaQuery } from '../../hooks/useMediaQuery';

export default function Footer() {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isLandscape = useMediaQuery('(orientation: landscape)');

  return (
    <footer className="bg-[#000000] text-white py-8 border-t border-gray-800">
      <div className={`w-full px-4 ${isMobile || isLandscape ? 'max-w-full' : 'container mx-auto'}`}>
        <p className="text-center">&copy; {new Date().getFullYear()} Artifact Systems LLC. All rights reserved.</p>
      </div>
    </footer>
  );
}