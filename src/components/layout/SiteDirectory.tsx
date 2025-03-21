import React from 'react';
import { useNavigate } from 'react-router-dom';
import { XLogo } from '../ui/XLogo';
import { Github } from 'lucide-react';
import { useTransition } from '../../contexts/TransitionContext';

export function SiteDirectory() {
  const navigate = useNavigate();
  const { startTransition } = useTransition();

  const handleNavigation = async (path: string) => {
    await startTransition();
    navigate(path);
    window.scrollTo(0, 0);
  };

  return (
    <div className="border-t border-gray-800">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-2 justify-items-center">
            {/* Company Column */}
            <div className="text-center">
              <h3 className="text-lg font-semibold text-white mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <button 
                    onClick={() => handleNavigation('/about')}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    About
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleNavigation('/hardware')}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Hardware
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleNavigation('/contact')}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Contact
                  </button>
                </li>
              </ul>
            </div>

            {/* Products Column */}
            <div className="text-center">
              <h3 className="text-lg font-semibold text-white mb-4">Products</h3>
              <ul className="space-y-2">
                <li>
                  <button 
                    onClick={() => handleNavigation('/validation')}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Validation
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleNavigation('/rpc')}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    RPC
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleNavigation('/sequencing')}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Sequencing
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleNavigation('/zk-prover')}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    ZK Prover
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleNavigation('/gpu-compute')}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    GPU Compute
                  </button>
                </li>
              </ul>
            </div>

            {/* Social Media Column */}
            <div className="text-center">
              <h3 className="text-lg font-semibold text-white mb-4">Connect</h3>
              <ul className="space-y-2">
                <li>
                  <a 
                    href="https://www.x.com/artifactstaking" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors inline-flex items-center"
                  >
                    <XLogo size={20} />
                  </a>
                </li>
                <li>
                  <a
                    href="https://artifact-staking.medium.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors inline-flex items-center"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      width="20"
                      height="20"
                      fill="currentColor"
                      className="opacity-80 hover:opacity-100 transition-opacity"
                    >
                      <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/>
                    </svg>
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/artifactstaking"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors inline-flex items-center"
                  >
                    <Github size={20} className="opacity-80 hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}