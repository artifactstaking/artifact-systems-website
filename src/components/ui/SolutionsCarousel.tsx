import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../utils/constants';
import { Button } from './Button';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { useTransition } from '../../contexts/TransitionContext';

const solutions = [
  {
    title: 'Validation: alpha to mainnet',
    description: 'Custom validation solutions tailored to each clients needs, from white label validation to commission sharing.',
    route: ROUTES.VALIDATION
  },
  {
    title: 'RPC: enterprise speeds, fixed costs',
    description: 'Multi-tenant and private RPC solutions with custom rate limits and full archive access, delivering superior performance through personalized infrastructure.',
    route: ROUTES.RPC
  },
  {
    title: 'Sequencing: robust compute',
    description: 'High-performance transaction sequencing with enterprise-grade reliability.',
    route: ROUTES.SEQUENCING
  },
  {
    title: 'ZK Prover: privacy upgraded',
    description: 'Advanced zero-knowledge proof infrastructure for maximum security and efficiency.',
    route: ROUTES.ZK_PROVER
  },
  {
    title: 'GPU: personalized training, fixed cost',
    description: 'High-performance GPU infrastructure for demanding computational workloads.',
    route: ROUTES.GPU_COMPUTE
  }
];

export function SolutionsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const { startTransition } = useTransition();

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? solutions.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === solutions.length - 1 ? 0 : prev + 1));
  };

  const handleClick = async (route: string) => {
    await startTransition();
    navigate(route);
    window.scrollTo(0, 0);
  };

  const containerStyle = "backdrop-blur-sm bg-black/60 p-6 md:p-8 rounded-xl shadow-lg border border-white/10 dark:border-white/5";

  return (
    <div className="relative py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">
          Tailored Solutions
        </h2>
        
        <div className="relative max-w-4xl mx-auto">
          {/* Navigation Buttons */}
          <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between pointer-events-none">
            <button
              onClick={handlePrevious}
              className={`${
                isMobile ? 'relative' : 'absolute -left-4 md:-left-12'
              } p-2 rounded-full backdrop-blur-sm bg-black/60 shadow-lg hover:bg-black/70 transition-colors z-10 pointer-events-auto border border-white/10 dark:border-white/5`}
              aria-label="Previous solution"
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </button>
            
            <button
              onClick={handleNext}
              className={`${
                isMobile ? 'relative' : 'absolute -right-4 md:-right-12'
              } p-2 rounded-full backdrop-blur-sm bg-black/60 shadow-lg hover:bg-black/70 transition-colors z-10 pointer-events-auto border border-white/10 dark:border-white/5`}
              aria-label="Next solution"
            >
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </button>
          </div>

          {/* Solutions Container */}
          <div className="overflow-hidden relative">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {solutions.map((solution, index) => (
                <div
                  key={index}
                  className="w-full flex-shrink-0"
                  style={{ minWidth: '100%' }}
                >
                  <div className={`${containerStyle} mx-4`}>
                    <h3 className="text-2xl font-bold text-white mb-4">
                      {solution.title}
                    </h3>
                    <p className="text-white/90 text-lg mb-6">
                      {solution.description}
                    </p>
                    <Button 
                      size="lg" 
                      variant="outline" 
                      onClick={() => handleClick(solution.route)}
                    >
                      Learn More
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center space-x-2 mt-8">
            {solutions.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2.6 h-2.6 rounded-full transition-colors ${
                  index === currentIndex
                    ? 'bg-white'
                    : 'bg-white/30'
                }`}
                aria-label={`Go to solution ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}