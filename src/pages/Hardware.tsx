import React, { useState, useEffect } from 'react';
import { Layout } from '../components/layout/Layout';
import { Shield, Zap, TrendingUp, Globe } from 'lucide-react';
import { SiteDirectory } from '../components/layout/SiteDirectory';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import UnderwaterServer from '../assets/Underwaterserverfullres.webp';

export function Hardware() {
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
    backgroundImage: `url(${UnderwaterServer})`,
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
                  Bespoke Hardware Solutions
                </h1>
                <p className={`text-base md:text-xl ${textStyle}`}>
                  Unlike most Web3 infrastructure companies, Artifact owns, configures, and upgrades all its hardware in several Tier III colocation facilities across the globe.
                </p>
              </motion.div>
            </div>

            {/* Hardware Features */}
            <div className="container mx-auto px-4 py-12 md:py-20">
              <div className="max-w-6xl mx-auto space-y-8">
                {/* Security */}
                <div className="flex justify-start md:px-6">
                  <motion.div
                    ref={card1Ref}
                    initial={{ opacity: 0, x: -100 }}
                    animate={card1InView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className={`${containerStyle} w-full md:w-[600px]`}
                  >
                    <div className="flex items-center space-x-4 mb-6">
                      <div className={iconContainerStyle}>
                        <Shield className="w-8 h-8 text-white" />
                      </div>
                      <h3 className={`text-2xl font-bold ${headingStyle}`}>Security</h3>
                    </div>
                    <p className={textStyle}>
                      Only select Artifact staff have access to our secure server cabinets, and all of our network traffic runs through fully redundant hardware firewalls that we directly control.
                    </p>
                  </motion.div>
                </div>

                {/* Performance */}
                <div className="flex justify-end md:px-6">
                  <motion.div
                    ref={card2Ref}
                    initial={{ opacity: 0, x: 100 }}
                    animate={card2InView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className={`${containerStyle} w-full md:w-[600px]`}
                  >
                    <div className="flex items-center space-x-4 mb-6">
                      <div className={iconContainerStyle}>
                        <Zap className="w-8 h-8 text-white" />
                      </div>
                      <h3 className={`text-2xl font-bold ${headingStyle}`}>Performance</h3>
                    </div>
                    <p className={textStyle}>
                      We custom-build servers to meet the needs of our clients and procure high-performance systems that cloud providers do not offer.
                    </p>
                  </motion.div>
                </div>

                {/* Competitive Advantage */}
                <div className="flex justify-start md:px-6">
                  <motion.div
                    ref={card3Ref}
                    initial={{ opacity: 0, x: -100 }}
                    animate={card3InView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className={`${containerStyle} w-full md:w-[600px]`}
                  >
                    <div className="flex items-center space-x-4 mb-6">
                      <div className={iconContainerStyle}>
                        <TrendingUp className="w-8 h-8 text-white" />
                      </div>
                      <h3 className={`text-2xl font-bold ${headingStyle}`}>Competitive Advantage</h3>
                    </div>
                    <p className={textStyle}>
                      Artifact's infrastructure costs are fixed, allowing us to budget far into the future. Unlike our cloud-dependent competitors, we are insulated from profit margin compression during bear markets.
                    </p>
                  </motion.div>
                </div>

                {/* Bare Metal Partners */}
                <div className="flex justify-end md:px-6">
                  <motion.div
                    ref={card4Ref}
                    initial={{ opacity: 0, x: 100 }}
                    animate={card4InView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className={`${containerStyle} w-full md:w-[600px]`}
                  >
                    <div className="flex items-center space-x-4 mb-6">
                      <div className={iconContainerStyle}>
                        <Globe className="w-8 h-8 text-white" />
                      </div>
                      <h3 className={`text-2xl font-bold ${headingStyle}`}>Bare Metal Partners</h3>
                    </div>
                    <p className={textStyle}>
                      If you have specific geolocation needs that cannot be met by our data centers, we have partnerships with bare metal providers in 26 locations.
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