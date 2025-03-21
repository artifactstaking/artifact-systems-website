import React, { useState, useEffect } from 'react';
import { Layout } from '../components/layout/Layout';
import { Rocket, Zap, Archive, Lock, Users } from 'lucide-react';
import { SiteDirectory } from '../components/layout/SiteDirectory';
import DataHavenImage from '../assets/DataHaven.webp';

export function RPC() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [pageHeight, setPageHeight] = useState(0);
  const [directoryHeight, setDirectoryHeight] = useState(0);

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
    backgroundImage: `url(${DataHavenImage})`,
    backgroundPosition: `center ${parallaxOffset}%`,
    backgroundSize: 'cover',
    backgroundAttachment: 'fixed',
    willChange: 'background-position',
    transform: 'translate3d(0,0,0)',
    backfaceVisibility: 'hidden'
  };

  const containerStyle = "backdrop-blur-sm bg-black/70 p-6 md:p-8 rounded-xl shadow-lg border border-white/10 dark:border-white/5";
  const iconContainerStyle = "p-3 backdrop-blur-sm bg-black/70 rounded-lg";
  const headingStyle = "text-white dark:text-white";
  const textStyle = "text-white/90 dark:text-white/90";

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
              <div className={`${containerStyle} max-w-4xl mx-auto text-center`}>
                <h1 className={`text-4xl md:text-5xl font-bold mb-6 ${headingStyle}`}>
                  RPC Services
                </h1>
                <p className={`text-xl ${textStyle}`}>
                  Connect to any blockchain at any speed, with fixed costs.
                </p>
              </div>
            </div>

            {/* Features Section */}
            <div className="container mx-auto px-4 py-16">
              <div className="max-w-4xl mx-auto space-y-8">
                {/* Get What You Need */}
                <div className={`${containerStyle}`}>
                  <div className="flex items-start space-x-6">
                    <div className={iconContainerStyle}>
                      <Rocket className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h2 className={`text-2xl font-bold mb-3 ${headingStyle}`}>
                        Get What You Need
                      </h2>
                      <p className={textStyle}>
                        We specialize in providing RPC for blockchains that mainstream commercial RPC providers do not support.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Be First to Market */}
                <div className={`${containerStyle}`}>
                  <div className="flex items-start space-x-6">
                    <div className={iconContainerStyle}>
                      <Zap className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h2 className={`text-2xl font-bold mb-3 ${headingStyle}`}>
                        Be First to Market
                      </h2>
                      <p className={textStyle}>
                        Artifact provides early Testnet RPC for blockchains that have not yet launched Mainnet, including Testnets with private or closed validator sets.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Full Archive */}
                <div className={`${containerStyle}`}>
                  <div className="flex items-start space-x-6">
                    <div className={iconContainerStyle}>
                      <Archive className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h2 className={`text-2xl font-bold mb-3 ${headingStyle}`}>
                        Full Archive
                      </h2>
                      <p className={textStyle}>
                        Our optional Full Archive service allows you access to the entire history of a blockchain from the initial genesis block up to the current state.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Service Types */}
            <div className="container mx-auto px-4 py-16">
              <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
                {/* Private */}
                <div className={`${containerStyle}`}>
                  <div className="flex items-center space-x-4 mb-6">
                    <div className={iconContainerStyle}>
                      <Lock className="w-8 h-8 text-white" />
                    </div>
                    <h2 className={`text-2xl font-bold ${headingStyle}`}>Private</h2>
                  </div>
                  <ul className="space-y-4">
                    <li className="flex items-start space-x-3">
                      <div className="w-1.5 h-1.5 mt-2.5 rounded-full bg-white flex-shrink-0" />
                      <p className={textStyle}>
                        Dedicated bare-metal servers that only you can use
                      </p>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-1.5 h-1.5 mt-2.5 rounded-full bg-white flex-shrink-0" />
                      <p className={textStyle}>
                        Private, client specific load balancers with no transaction cap or rate limiting
                      </p>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-1.5 h-1.5 mt-2.5 rounded-full bg-white flex-shrink-0" />
                      <p className={textStyle}>
                        Seamless addition of capacity as your project grows
                      </p>
                    </li>
                  </ul>
                </div>

                {/* Pooled */}
                <div className={`${containerStyle}`}>
                  <div className="flex items-center space-x-4 mb-6">
                    <div className={iconContainerStyle}>
                      <Users className="w-8 h-8 text-white" />
                    </div>
                    <h2 className={`text-2xl font-bold ${headingStyle}`}>Pooled</h2>
                  </div>
                  <ul className="space-y-4">
                    <li className="flex items-start space-x-3">
                      <div className="w-1.5 h-1.5 mt-2.5 rounded-full bg-white flex-shrink-0" />
                      <p className={textStyle}>
                        Multi-tenant, high capacity RPC server clusters
                      </p>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-1.5 h-1.5 mt-2.5 rounded-full bg-white flex-shrink-0" />
                      <p className={textStyle}>
                        Adjust your rate limit and pricing to meet your needs
                      </p>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-1.5 h-1.5 mt-2.5 rounded-full bg-white flex-shrink-0" />
                      <p className={textStyle}>
                        Server capacity auto-scales so you can focus on what matters
                      </p>
                    </li>
                  </ul>
                </div>
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