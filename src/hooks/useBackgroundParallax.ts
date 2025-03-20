import { useState, useEffect } from 'react';
import { useMediaQuery } from './useMediaQuery';

interface BackgroundStyleProps {
  image: string;
  scrollPosition: number;
  pageHeight: number;
  directoryHeight: number;
}

export function useBackgroundParallax({ image, scrollPosition, pageHeight, directoryHeight }: BackgroundStyleProps) {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isLandscape = useMediaQuery('(orientation: landscape)');
  const [backgroundStyle, setBackgroundStyle] = useState({});

  useEffect(() => {
    const parallaxOffset = Math.min(
      100,
      Math.max(
        0,
        ((scrollPosition + window.innerHeight) / (pageHeight - directoryHeight)) * 100
      )
    );

    setBackgroundStyle({
      backgroundImage: `url(${image})`,
      backgroundPosition: isMobile ? 'center center' : `center ${parallaxOffset}%`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundAttachment: (isMobile || isLandscape) ? 'scroll' : 'fixed',
      minHeight: '100vh',
      width: '100vw',
      willChange: 'background-position',
      transform: 'translate3d(0,0,0)',
      backfaceVisibility: 'hidden',
      overflow: 'hidden'
    });
  }, [image, scrollPosition, pageHeight, directoryHeight, isMobile, isLandscape]);

  return backgroundStyle;
}