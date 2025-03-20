import React, { useState, useEffect } from 'react';
import { Layout } from '../components/layout/Layout';
import { ContactFormContent } from '../components/ui/ContactFormContent';
import { SiteDirectory } from '../components/layout/SiteDirectory';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import PiratesImage from '../assets/Pirates.webp';

export function Contact() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [pageHeight, setPageHeight] = useState(0);
  const [directoryHeight, setDirectoryHeight] = useState(0);

  const [titleRef, titleInView] = useInView({
    triggerOnce: true,
    threshold: 0.2
  });

  const [formRef, formInView] = useInView({
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
    backgroundImage: `url(${PiratesImage})`,
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

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
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
            <div className="container mx-auto px-4 py-16">
              <motion.div
                ref={titleRef}
                initial="hidden"
                animate={titleInView ? "visible" : "hidden"}
                variants={containerVariants}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className={`${containerStyle} max-w-4xl mx-auto text-center mb-12`}
              >
                <h1 className={`text-4xl md:text-5xl font-bold mb-6 ${headingStyle}`}>
                  Contact Us
                </h1>
                <p className={`text-xl ${textStyle}`}>
                  Get in touch with us to learn more about our services and how we can help you.
                </p>
              </motion.div>

              <motion.div
                ref={formRef}
                initial="hidden"
                animate={formInView ? "visible" : "hidden"}
                variants={containerVariants}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                className={`${containerStyle} max-w-4xl mx-auto`}
              >
                <h2 className={`text-2xl font-bold ${headingStyle} mb-6`}>
                  Send us a message
                </h2>
                <ContactFormContent />
              </motion.div>
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