import React, { useState, useEffect } from 'react';
import { Layout } from '../components/layout/Layout';
import { Shield, Lock, Server } from 'lucide-react';
import { SiteDirectory } from '../components/layout/SiteDirectory';
import { Button } from '../components/ui/Button';
import { ContactForm } from '../components/ui/ContactForm';
import CloudDreamingImage from '../assets/9CloudDreaming.webp';

export function About() {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);
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
    backgroundImage: `url(${CloudDreamingImage})`,
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
            {/* Hero Content */}
            <div className="container mx-auto px-4 py-12 md:py-24">
              <div className="max-w-4xl mx-auto">
                <div className={containerStyle}>
                  <h1 className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 ${headingStyle}`}>
                    Our Mission
                  </h1>
                  <p className={`text-base md:text-xl mb-6 md:mb-8 ${textStyle}`}>
                    Institutional participation in the latest blockchain technology requires complex hardware. Fine-tuned, high end server infrastructure managed by experienced specialists is a necessity. Cloud providers meet this demand with exorbitant costs and lackluster responsiveness. Artifact Systems delivers superior performance and cost efficiency by providing personalized, top of the line hardware solutions for institutions, managed in house by operators that are native to blockchain's cutting edge.
                  </p>
                  <Button size="lg" onClick={() => setIsContactFormOpen(true)}>
                    Get Started
                  </Button>
                </div>
              </div>
            </div>

            {/* Contact Form Modal */}
            <ContactForm 
              isOpen={isContactFormOpen} 
              onClose={() => setIsContactFormOpen(false)} 
            />

            {/* Operational Excellence Content */}
            <div className="container mx-auto px-4 py-12 md:py-20">
              <div className="max-w-7xl mx-auto">
                {/* Title Container */}
                <div className={`${containerStyle} text-center mb-12 max-w-2xl mx-auto`}>
                  <h2 className={`text-2xl md:text-4xl lg:text-5xl font-bold mb-2 md:mb-4 ${headingStyle}`}>
                    Operational Excellence
                  </h2>
                  <p className={`text-lg md:text-xl ${textStyle}`}>
                    Setting the standard in blockchain infrastructure
                  </p>
                </div>

                <div className="flex flex-col space-y-8 md:space-y-12">
                  {/* Infrastructure */}
                  <div className="flex justify-start md:px-6">
                    <div className={`${containerStyle} w-full md:w-[600px]`}>
                      <div className="flex items-center space-x-4 mb-4 md:mb-6">
                        <div className={iconContainerStyle}>
                          <Server className="w-6 h-6 md:w-8 md:h-8 text-white" />
                        </div>
                        <h3 className={`text-lg md:text-xl font-bold ${headingStyle}`}>Infrastructure</h3>
                      </div>
                      <div className="space-y-4 md:space-y-6">
                        <div>
                          <h4 className={`font-semibold ${headingStyle} mb-2`}>High Availability</h4>
                          <p className={textStyle}>
                            Artifact maintains 99.9% uptime through redundant systems and failover capability.
                          </p>
                        </div>
                        <div>
                          <h4 className={`font-semibold ${headingStyle} mb-2`}>Monitoring and Alerting</h4>
                          <p className={textStyle}>
                            We utilize real time system monitoring coupled with 24/7/365 on call alerting.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Security and Compliance */}
                  <div className="flex justify-end md:px-6">
                    <div className={`${containerStyle} w-full md:w-[600px]`}>
                      <div className="flex items-center space-x-4 mb-4 md:mb-6">
                        <div className={iconContainerStyle}>
                          <Lock className="w-6 h-6 md:w-8 md:h-8 text-white" />
                        </div>
                        <h3 className={`text-lg md:text-xl font-bold ${headingStyle}`}>Security and Compliance</h3>
                      </div>
                      <div className="space-y-4 md:space-y-6">
                        <div>
                          <h4 className={`font-semibold ${headingStyle} mb-2`}>Regular Audits</h4>
                          <p className={textStyle}>
                            Artifact engages third parties to perform regular security audits, vulnerability assessments, and cybersecurity penetration tests.
                          </p>
                        </div>
                        <div>
                          <h4 className={`font-semibold ${headingStyle} mb-2`}>Compliance</h4>
                          <p className={textStyle}>
                            Artifact is SOC2 certified and operates out of data centers with the highest levels of physical security.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Operational Resiliency */}
                  <div className="flex justify-start md:px-6">
                    <div className={`${containerStyle} w-full md:w-[600px]`}>
                      <div className="flex items-center space-x-4 mb-4 md:mb-6">
                        <div className={iconContainerStyle}>
                          <Shield className="w-6 h-6 md:w-8 md:h-8 text-white" />
                        </div>
                        <h3 className={`text-lg md:text-xl font-bold ${headingStyle}`}>Operational Resiliency</h3>
                      </div>
                      <div className="space-y-4 md:space-y-6">
                        <div>
                          <h4 className={`font-semibold ${headingStyle} mb-2`}>Distributed Staff</h4>
                          <p className={textStyle}>
                            Our human resources are spread globally to ensure continuous time zone coverage and continuity in case of regional disasters.
                          </p>
                        </div>
                        <div>
                          <h4 className={`font-semibold ${headingStyle} mb-2`}>Geographic Redundancy</h4>
                          <p className={textStyle}>
                            Production hardware and systems are mirrored across multiple geographic regions to ensure service continuity in case of regional failures.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
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