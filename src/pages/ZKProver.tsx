import React, { useState, useEffect } from 'react';
import { Layout } from '../components/layout/Layout';
import { Cpu, Lock, Zap } from 'lucide-react';
import { SiteDirectory } from '../components/layout/SiteDirectory';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import CybermarketImage from '../assets/Cybermarket.webp';

export function ZKProver() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [pageHeight, setPageHeight] = useState(0);
  const [directoryHeight, setDirectoryHeight] = useState(0);

  const [titleRef, titleInView] = useInView({
    triggerOnce: true,
    threshold: 0.2
  });

  const [featuresRef, featuresInView] = useInView({
    triggerOnce: true,
    threshold: 0.2
  });

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
    backgroundImage: `url(${CybermarketImage})`,
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

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const featureVariants = {
    hidden: { opacity: 0, rotateX: 45 },
    visible: (i: number) => ({
      opacity: 1,
      rotateX: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.8,
        ease: "easeOut"
      }
    })
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
              <motion.div
                ref={titleRef}
                initial="hidden"
                animate={titleInView ? "visible" : "hidden"}
                variants={containerVariants}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className={`${containerStyle} max-w-4xl mx-auto text-center`}
              >
                <h1 className={`text-4xl md:text-5xl font-bold mb-6 ${headingStyle}`}>
                  ZK Prover Infrastructure
                </h1>
                <p className={`text-xl ${textStyle}`}>
                  High-performance zero-knowledge proof generation with enterprise-grade hardware.
                </p>
              </motion.div>
            </div>

            {/* Features Section */}
            <div className="container mx-auto px-4 py-16">
              <div 
                ref={featuresRef}
                className="max-w-4xl mx-auto space-y-8"
              >
                {/* Computational Power */}
                <motion.div
                  custom={0}
                  initial="hidden"
                  animate={featuresInView ? "visible" : "hidden"}
                  variants={featureVariants}
                  className={`${containerStyle} transform-gpu`}
                >
                  <div className="flex items-start space-x-6">
                    <div className={iconContainerStyle}>
                      <Cpu className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h2 className={`text-2xl font-bold mb-3 ${headingStyle}`}>
                        Computational Power
                      </h2>
                      <p className={textStyle}>
                        Our dedicated hardware infrastructure is optimized for zero-knowledge proof generation, featuring the latest generation processors and specialized accelerators for maximum throughput.
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Security Features */}
                <motion.div
                  custom={1}
                  initial="hidden"
                  animate={featuresInView ? "visible" : "hidden"}
                  variants={featureVariants}
                  className={`${containerStyle} transform-gpu`}
                >
                  <div className="flex items-start space-x-6">
                    <div className={iconContainerStyle}>
                      <Lock className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h2 className={`text-2xl font-bold mb-3 ${headingStyle}`}>
                        Security Features
                      </h2>
                      <p className={textStyle}>
                        Enterprise-grade security measures protect your proving keys and sensitive computation data, with isolated environments and secure key management systems.
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Performance Optimization */}
                <motion.div
                  custom={2}
                  initial="hidden"
                  animate={featuresInView ? "visible" : "hidden"}
                  variants={featureVariants}
                  className={`${containerStyle} transform-gpu`}
                >
                  <div className="flex items-start space-x-6">
                    <div className={iconContainerStyle}>
                      <Zap className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h2 className={`text-2xl font-bold mb-3 ${headingStyle}`}>
                        Performance Optimization
                      </h2>
                      <p className={textStyle}>
                        Advanced parallel processing capabilities and optimized proving algorithms ensure minimal latency and maximum efficiency in proof generation.
                      </p>
                    </div>
                  </div>
                </motion.div>
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