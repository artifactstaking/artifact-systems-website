import React, { useEffect, useState } from 'react';
import { Menu, ChevronDown } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ROUTES } from '../../utils/constants';
import LogoDark from '../../assets/Artifact-logo-dark.svg';
import { useTransition } from '../../contexts/TransitionContext';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isProductsOpen, setIsProductsOpen] = React.useState(false);
  const [isCompanyOpen, setIsCompanyOpen] = React.useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { startTransition } = useTransition();

  const handleNavigation = async (path: string) => {
    if (location.pathname === path) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    
    await startTransition();
    navigate(path);
    window.scrollTo({ top: 0 });
  };

  const handleLogoClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    await handleNavigation('/');
  };

  const productItems = [
    { label: 'Validation', href: ROUTES.VALIDATION },
    { label: 'RPC', href: ROUTES.RPC },
    { label: 'Sequencing', href: ROUTES.SEQUENCING },
    { label: 'ZK Prover', href: ROUTES.ZK_PROVER },
    { label: 'GPU Compute', href: ROUTES.GPU_COMPUTE }
  ];

  const companyItems = [
    { label: 'About', href: ROUTES.ABOUT },
    { label: 'Hardware', href: ROUTES.HARDWARE },
  ];

  const navigationItems = [
    { label: 'Home', href: ROUTES.HOME },
    { label: 'Company', href: '#' },
    { label: 'Products', href: '#' },
    { label: 'Contact', href: ROUTES.CONTACT }
  ];

  const handleProductClick = async (href: string) => {
    setIsProductsOpen(false);
    setIsMenuOpen(false);
    if (href.startsWith('/')) {
      await handleNavigation(href);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#000000] text-white border-b border-gray-800 backdrop-blur-sm bg-opacity-90">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <a href="/" onClick={handleLogoClick}>
              <img 
                src={LogoDark}
                alt="Artifact Systems" 
                className="h-8"
              />
            </a>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <ul className="flex space-x-8">
              {navigationItems.map((item) => (
                <li key={item.label}>
                  {item.label === 'Products' ? (
                    <div className="relative">
                      <button
                        onClick={() => setIsProductsOpen(!isProductsOpen)}
                        onBlur={() => setTimeout(() => setIsProductsOpen(false), 200)}
                        className="flex items-center space-x-1 text-white hover:text-gray-200 transition-all duration-600"
                      >
                        <span>Products</span>
                        <ChevronDown className="h-4 w-4" />
                      </button>
                      {isProductsOpen && (
                        <div className="absolute top-full left-0 mt-2 w-48 rounded-md shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5 transition-all duration-600">
                          <div className="py-1" role="menu" aria-orientation="vertical">
                            {productItems.map((product) => (
                              <button
                                key={product.label}
                                onClick={() => handleProductClick(product.href)}
                                className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-700 transition-all duration-600"
                                role="menuitem"
                              >
                                {product.label}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : item.label === 'Company' ? (
                    <div className="relative">
                      <button
                        onClick={() => setIsCompanyOpen(!isCompanyOpen)}
                        onBlur={() => setTimeout(() => setIsCompanyOpen(false), 200)}
                        className="flex items-center space-x-1 text-white hover:text-gray-200 transition-all duration-600"
                      >
                        <span>Company</span>
                        <ChevronDown className="h-4 w-4" />
                      </button>
                      {isCompanyOpen && (
                        <div className="absolute top-full left-0 mt-2 w-48 rounded-md shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5 transition-all duration-600">
                          <div className="py-1" role="menu" aria-orientation="vertical">
                            {companyItems.map((item) => (
                              <button
                                key={item.label}
                                onClick={() => handleProductClick(item.href)}
                                className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-700 transition-all duration-600"
                                role="menuitem"
                              >
                                {item.label}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <button 
                      onClick={() => handleNavigation(item.href)}
                      className="text-white hover:text-gray-200 transition-all duration-600"
                    >
                      {item.label}
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button 
              className="p-2 text-white hover:bg-gray-800 rounded-md transition-all duration-600"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden pb-4">
            <ul className="space-y-2">
              {navigationItems.map((item) => (
                <li key={item.label}>
                  {item.label === 'Products' ? (
                    <>
                      <button
                        onClick={() => setIsProductsOpen(!isProductsOpen)}
                        className="flex items-center justify-between w-full px-4 py-2 text-white hover:bg-gray-800 hover:text-white rounded-md transition-all duration-600"
                      >
                        <span>Products</span>
                        <ChevronDown className={`h-4 w-4 transform transition-transform duration-600 ${isProductsOpen ? 'rotate-180' : ''}`} />
                      </button>
                      {isProductsOpen && (
                        <div className="pl-4 space-y-2 mt-2 bg-gray-800 rounded-md">
                          {productItems.map((product) => (
                            <button
                              key={product.label}
                              onClick={() => handleProductClick(product.href)}
                              className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-700 rounded-md transition-all duration-600"
                            >
                              {product.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </>
                  ) : item.label === 'Company' ? (
                    <>
                      <button
                        onClick={() => setIsCompanyOpen(!isCompanyOpen)}
                        className="flex items-center justify-between w-full px-4 py-2 text-white hover:bg-gray-800 hover:text-white rounded-md transition-all duration-600"
                      >
                        <span>Company</span>
                        <ChevronDown className={`h-4 w-4 transform transition-transform duration-600 ${isCompanyOpen ? 'rotate-180' : ''}`} />
                      </button>
                      {isCompanyOpen && (
                        <div className="pl-4 space-y-2 mt-2 bg-gray-800 rounded-md">
                          {companyItems.map((item) => (
                            <button
                              key={item.label}
                              onClick={() => handleProductClick(item.href)}
                              className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-700 rounded-md transition-all duration-600"
                            >
                              {item.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <button
                      onClick={() => {
                        handleNavigation(item.href);
                        setIsMenuOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-white hover:bg-gray-800 hover:text-white rounded-md transition-all duration-600"
                    >
                      {item.label}
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}