import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { Button } from '../components/ui/Button';
import { ContactForm } from '../components/ui/ContactForm';
import { SolutionsCarousel } from '../components/ui/SolutionsCarousel';
import { SiteDirectory } from '../components/layout/SiteDirectory';
import { useTransition } from '../contexts/TransitionContext';
import WatchingRocketImage from '../assets/WatchingRocket.webp';

export function Home() {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [pageHeight, setPageHeight] = useState(0);
  const [directoryHeight, setDirectoryHeight] = useState(0);
  const navigate = useNavigate();
  const { startTransition } = useTransition();

  useEffect(() => {
    const updateDimensions = () => {
      const directory = document.querySelector('.site-directory');
      setPageHeight(document.documentElement.scrollHeight);
      setDirectoryHeight(directory?.getBoundingClientRect().height || 0);
    };

    const handleScroll = () => {
      requestAnimationFrame(() => {
        setScrollPosition(window.scrollY);
      });
    };

    updateDimensions();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', updateDimensions);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);

  const parallaxOffset = Math.min(
    100,
    Math.max(
      0,
      ((scrollPosition + window.innerHeight) / (pageHeight - directoryHeight)) * 100
    )
  );

  const backgroundStyle = {
    backgroundImage: `url(${WatchingRocketImage})`,
    backgroundPosition: `center ${parallaxOffset}%`,
    backgroundSize: 'cover',
    backgroundAttachment: 'fixed',
    willChange: 'background-position',
    transform: 'translate3d(0,0,0)',
    backfaceVisibility: 'hidden'
  };

  const containerStyle = "backdrop-blur-sm bg-black/70 p-6 md:p-8 rounded-xl shadow-lg border border-white/10 dark:border-white/5";
  const headingStyle = "text-white dark:text-white";
  const textStyle = "text-white/90 dark:text-white/90";

  const handleHardwareClick = async () => {
    await startTransition();
    navigate('/hardware');
    window.scrollTo(0, 0);
  };

  const handleNavigation = async (path: string) => {
    await startTransition();
    navigate(path);
    window.scrollTo(0, 0);
  };

  return (
    <Layout>
      <div className="min-h-screen flex flex-col">
        <div className="flex-grow relative bg-[#000000]">
          {/* Background Image Container */}
          <div 
            className="absolute inset-0 bg-no-repeat opacity-60"
            style={backgroundStyle}
          />
          
          {/* Content Container */}
          <div className="relative z-10">
            {/* Hero Section */}
            <div className="container mx-auto px-4 py-16">
              <section className={`${containerStyle} max-w-4xl mx-auto text-center`}>
                <h1 className={`text-2xl md:text-4xl lg:text-5xl font-bold mb-4 ${headingStyle}`}>
                  Privately owned infrastructure for institutions on the Web3 frontier.
                </h1>
                <div className="flex flex-wrap justify-center items-center gap-2 text-sm md:text-lg text-gray-400 mb-8">
                  <span className="px-2 py-1">Validation</span>
                  <span className="block w-1 h-4 bg-gray-700"></span>
                  <span className="px-2 py-1">RPC</span>
                  <span className="block w-1 h-4 bg-gray-700"></span>
                  <span className="px-2 py-1">Sequencing</span>
                  <span className="block w-1 h-4 bg-gray-700"></span>
                  <span className="px-2 py-1">ZK Prover</span>
                  <span className="block w-1 h-4 bg-gray-700"></span>
                  <span className="px-2 py-1">GPU Compute</span>
                </div>
                <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-4">
                  <Button size="lg" onClick={() => setIsContactFormOpen(true)}>Get Started</Button>
                  <Button size="lg" variant="outline" onClick={() => handleNavigation('/about')}>Learn More</Button>
                </div>
              </section>
            </div>

            {/* Contact Form Modal */}
            <ContactForm 
              isOpen={isContactFormOpen} 
              onClose={() => setIsContactFormOpen(false)} 
            />

            {/* Stats Bar */}
            <div className={`container mx-auto px-4 py-12`}>
              <div className={`${containerStyle} grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4`}>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2">97+</div>
                  <div className="text-sm text-gray-400 uppercase tracking-wider">Blockchains</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2">2B+</div>
                  <div className="text-sm text-gray-400 uppercase tracking-wider">Aggregate Stake</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2">40B+</div>
                  <div className="text-sm text-gray-400 uppercase tracking-wider">RPC Requests per Month</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2">99.99%</div>
                  <div className="text-sm text-gray-400 uppercase tracking-wider">Uptime</div>
                </div>
              </div>
            </div>

            {/* Company Description Section */}
            <div className="container mx-auto px-4 py-20">
              <div className={`${containerStyle} max-w-4xl mx-auto space-y-8 text-center`}>
                <p className="text-lg md:text-xl text-white leading-relaxed">
                  Artifact Systems is a high-performance Web3 infrastructure company that provides enterprise-grade RPC, validation, zkProver, and managed GPU compute services.
                </p>
                <p className="text-lg md:text-xl text-[#B2B2B2] leading-relaxed">
                  Our clients are critical to the Web3 ecosystem and include blockchain foundations, digital asset custodians, crypto banks, exchanges, high-frequency trading groups, and liquidity providers.
                </p>
              </div>
            </div>

            {/* Hardware Section */}
            <div className="container mx-auto px-4 py-20">
              <div className={`${containerStyle} max-w-3xl mx-auto text-center`}>
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                  Fine-tuned servers that cloud providers cannot supply
                </h2>
                <p className="text-lg md:text-xl text-[#B2B2B2] mb-8">
                  Artifact provides fully customized, high-performance server infrastructure in Tier III colocation facilities worldwide, delivering superior performance and cost efficiency through personalized hardware solutions.
                </p>
                <Button size="lg" variant="outline" onClick={handleHardwareClick}>Learn More</Button>
              </div>
            </div>

            {/* Solutions Carousel */}
            <SolutionsCarousel />

            {/* Contact Section */}
            <div className="container mx-auto px-4 py-24">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white">
                  Unlock your full potential<span className="text-gray-400">_</span>
                </h2>
                <p className="text-lg md:text-xl text-gray-400 mb-8">
                  Work with us to deploy solutions that meet your exact needs.
                </p>
                <Button size="lg" onClick={() => setIsContactFormOpen(true)}>
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-black site-directory">
          <SiteDirectory />
        </div>
      </div>
    </Layout>
  );
}