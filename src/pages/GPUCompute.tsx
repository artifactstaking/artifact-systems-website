import React, { useState, useEffect } from 'react';
import { Layout } from '../components/layout/Layout';
import { Cpu as Gpu, Network, BarChart } from 'lucide-react';
import { SiteDirectory } from '../components/layout/SiteDirectory';
import CycleImage from '../assets/Cycle.webp';

export function GPUCompute() {
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
    backgroundImage: `url(${CycleImage})`,
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
                  GPU Compute Solutions
                </h1>
                <p className={`text-xl ${textStyle}`}>
                  High-performance GPU infrastructure for demanding computational workloads.
                </p>
              </div>
            </div>

            {/* Features Section */}
            <div className="container mx-auto px-4 py-16">
              <div className="max-w-4xl mx-auto space-y-8">
                {/* GPU Infrastructure */}
                <div className={`${containerStyle} transform-gpu`}>
                  <div className="flex items-start space-x-6">
                    <div className={iconContainerStyle}>
                      <Gpu className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h2 className={`text-2xl font-bold mb-3 ${headingStyle}`}>
                        GPU Infrastructure
                      </h2>
                      <p className={textStyle}>
                        Access to the latest NVIDIA data center GPUs, optimized for machine learning, rendering, and parallel computing workloads.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Network Architecture */}
                <div className={`${containerStyle} transform-gpu`}>
                  <div className="flex items-start space-x-6">
                    <div className={iconContainerStyle}>
                      <Network className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h2 className={`text-2xl font-bold mb-3 ${headingStyle}`}>
                        Network Architecture
                      </h2>
                      <p className={textStyle}>
                        High-bandwidth, low-latency networking with NVLink interconnect for multi-GPU configurations and distributed computing.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Monitoring and Analytics */}
                <div className={`${containerStyle} transform-gpu`}>
                  <div className="flex items-start space-x-6">
                    <div className={iconContainerStyle}>
                      <BarChart className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h2 className={`text-2xl font-bold mb-3 ${headingStyle}`}>
                        Monitoring and Analytics
                      </h2>
                      <p className={textStyle}>
                        Real-time monitoring and analytics tools to track GPU utilization, performance metrics, and resource allocation across your workloads.
                      </p>
                    </div>
                  </div>
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