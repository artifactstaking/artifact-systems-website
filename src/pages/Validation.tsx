import React, { useState, useEffect } from 'react';
import { Layout } from '../components/layout/Layout';
import { Shield, Users, AlertCircle, Code } from 'lucide-react';
import { SiteDirectory } from '../components/layout/SiteDirectory';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import MonitorImage from '../assets/Monitor.webp';

export function Validation() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [pageHeight, setPageHeight] = useState(0);
  const [directoryHeight, setDirectoryHeight] = useState(0);
  
  const [titleRef, titleInView] = useInView({
    triggerOnce: true,
    threshold: 0.2
  });

  const [card1Ref, card1InView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [card2Ref, card2InView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [card3Ref, card3InView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [card4Ref, card4InView] = useInView({ triggerOnce: true, threshold: 0.2 });

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
    backgroundImage: `url(${MonitorImage})`,
    backgroundPosition: `center ${parallaxOffset}%`,
    backgroundSize: 'cover',
    backgroundAttachment: 'fixed',
    willChange: 'background-position',
    transform: 'translate3d(0,0,0)',
    backfaceVisibility: 'hidden'
  };

  const containerStyle = "backdrop-blur-sm bg-black/70 p-6 md:p-8 rounded-xl shadow-lg border border-white/10 dark:border-white/5";
  const iconContainerStyle = "p-2 md:p-3 backdrop-blur-sm bg-black/70 rounded-lg";
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
            <div className="container mx-auto px-4 py-12 md:py-24">
              <motion.div 
                ref={titleRef}
                initial={{ opacity: 0, y: 20 }}
                animate={titleInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className={`${containerStyle} max-w-4xl mx-auto text-center`}
              >
                <h1 className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 ${headingStyle}`}>
                  Validation Offerings
                </h1>
                <p className={`text-base md:text-xl ${textStyle}`}>
                  Artifact provides custom validation solutions that are tailored to each of our clients' needs, ensuring optimal performance and reliability.
                </p>
              </motion.div>
            </div>

            {/* Validation Features */}
            <div className="container mx-auto px-4 py-12 md:py-20">
              <div className="max-w-6xl mx-auto space-y-8">
                {/* White Label Validation */}
                <div className="flex justify-end md:px-6">
                  <motion.div
                    ref={card1Ref}
                    initial={{ opacity: 0, x: 100 }}
                    animate={card1InView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className={`${containerStyle} w-full md:w-[600px]`}
                  >
                    <div className="flex items-center space-x-4 mb-6">
                      <div className={iconContainerStyle}>
                        <Shield className="w-8 h-8 text-white" />
                      </div>
                      <h3 className={`text-2xl font-bold ${headingStyle}`}>White Label Validation</h3>
                    </div>
                    <p className={textStyle}>
                      Our white label validation service allows you to maintain your brand identity while leveraging our robust infrastructure and expertise. We handle the technical complexities while you focus on your business growth.
                    </p>
                  </motion.div>
                </div>

                {/* Validator Commission Sharing */}
                <div className="flex justify-start md:px-6">
                  <motion.div
                    ref={card2Ref}
                    initial={{ opacity: 0, x: -100 }}
                    animate={card2InView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className={`${containerStyle} w-full md:w-[600px]`}
                  >
                    <div className="flex items-center space-x-4 mb-6">
                      <div className={iconContainerStyle}>
                        <Users className="w-8 h-8 text-white" />
                      </div>
                      <h3 className={`text-2xl font-bold ${headingStyle}`}>Commission Sharing</h3>
                    </div>
                    <p className={textStyle}>
                      Partner with us through our commission sharing program. Bring your delegations to our Artifact-branded validators and benefit from a competitive share of the commission revenue, backed by our enterprise-grade infrastructure.
                    </p>
                  </motion.div>
                </div>

                {/* Slashing Protection */}
                <div className="flex justify-end md:px-6">
                  <motion.div
                    ref={card3Ref}
                    initial={{ opacity: 0, x: 100 }}
                    animate={card3InView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className={`${containerStyle} w-full md:w-[600px]`}
                  >
                    <div className="flex items-center space-x-4 mb-6">
                      <div className={iconContainerStyle}>
                        <AlertCircle className="w-8 h-8 text-white" />
                      </div>
                      <h3 className={`text-2xl font-bold ${headingStyle}`}>Slashing Protection</h3>
                    </div>
                    <p className={textStyle}>
                      Our advanced monitoring systems and redundant infrastructure provide comprehensive slashing protection, safeguarding your assets and ensuring optimal validator performance with minimal risk.
                    </p>
                  </motion.div>
                </div>

                {/* Custom Integrations */}
                <div className="flex justify-start md:px-6">
                  <motion.div
                    ref={card4Ref}
                    initial={{ opacity: 0, x: -100 }}
                    animate={card4InView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className={`${containerStyle} w-full md:w-[600px]`}
                  >
                    <div className="flex items-center space-x-4 mb-6">
                      <div className={iconContainerStyle}>
                        <Code className="w-8 h-8 text-white" />
                      </div>
                      <h3 className={`text-2xl font-bold ${headingStyle}`}>Custom Integrations</h3>
                    </div>
                    <p className={textStyle}>
                      We develop tailored integration solutions that seamlessly connect with your existing platforms and workflows, providing real-time monitoring, reporting, and management capabilities.
                    </p>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Site Directory Section */}
        <div className="bg-black site-directory">
          <SiteDirectory />
        </div>
      </div>
    </Layout>
  );
}