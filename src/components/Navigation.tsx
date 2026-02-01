import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [previousActive, setPreviousActive] = useState<string>('');
  const location = useLocation();

  // Close mobile menu when location changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
    document.body.classList.remove('mobile-menu-open');
  }, [location.pathname]);

  // Track previous active state for animation direction
  useEffect(() => {
    const currentPath = location.pathname;
    if (currentPath === '/work' || currentPath === '/sandbox' || currentPath === '/about') {
      if (previousActive && previousActive !== currentPath) {
        // Keep the previous active state for animation direction
        // Update previousActive after animation completes
        setTimeout(() => {
          setPreviousActive(currentPath);
        }, 500); // Match the animation duration
      } else if (!previousActive) {
        setPreviousActive(currentPath);
      }
    }
  }, [location.pathname, previousActive]);

  // Cleanup body class on unmount and force scroll fix
  useEffect(() => {
    // Force remove mobile-menu-open class on mount (in case it's stuck)
    document.body.classList.remove('mobile-menu-open');
    
    return () => {
      document.body.classList.remove('mobile-menu-open');
      // Force re-enable scrolling
      document.body.style.overflow = '';
      document.body.style.position = '';
    };
  }, []);

  const toggleMobileMenu = () => {
    const newState = !isMobileMenuOpen;
    setIsMobileMenuOpen(newState);
    
    // Prevent body scroll when mobile menu is open
    if (newState) {
      document.body.classList.add('mobile-menu-open');
    } else {
      document.body.classList.remove('mobile-menu-open');
    }
  };

  const isActive = (path: string) => {
    if (path === '/work') {
      // Consider work page and project detail pages as active for Work link
      return location.pathname === '/work' || location.pathname.startsWith('/projects/');
    }
    if (path === '/sandbox') {
      // Consider sandbox page and all sandbox-related pages as active for Sandbox link
      return location.pathname === '/sandbox' || 
             location.pathname === '/sandbox-matrix' ||
             location.pathname === '/tufte' ||
             location.pathname === '/tufte-visualizations' ||
             location.pathname.startsWith('/sandbox/');
    }
    return location.pathname === path;
  };



  const shouldShowTertiaryBar = (path: string) => {
    if (path === '/work') {
      // Show tertiary bar for project detail pages, primary for main work page
      return location.pathname.startsWith('/projects/');
    }
    if (path === '/sandbox') {
      // Show tertiary bar for sandbox-related pages, primary for main sandbox page
      return location.pathname === '/sandbox-matrix' ||
             location.pathname === '/tufte' ||
             location.pathname === '/tufte-visualizations' ||
             location.pathname.startsWith('/sandbox/');
    }
    return false;
  };

  const getSlideDirection = (tabPath: string) => {
    if (isActive(tabPath)) return 'active';
    
    // Determine slide direction based on previous active state
    if (tabPath === '/work') {
      return 'left'; // Work: slides out to left, slides in from left
    } else if (tabPath === '/sandbox') {
      if (previousActive === '/work') return 'right'; // From work: slides out to right, slides in from right
      if (previousActive === '/about') return 'left'; // From about: slides out to left, slides in from left
      return 'right'; // Default
    } else if (tabPath === '/about') {
      return 'right'; // About: slides out to right, slides in from right
    }
    return 'right'; // Default
  };

  // Debug logging
  console.log('Current path:', location.pathname, 'Previous active:', previousActive);
  console.log('Work direction:', getSlideDirection('/work'));
  console.log('Sandbox direction:', getSlideDirection('/sandbox'));
  console.log('About direction:', getSlideDirection('/about'));

  console.log('Desktop nav rendered');

  return (
    <>
      {/* Mobile Navigation */}
      <div className="md:hidden">
        {/* Mobile Menu Button - Upper Right */}
        <div className="mobile-menu fixed top-0 right-0 z-[1001]">
          <div 
            className="hamburger_shell cursor-pointer p-4" 
            id="hamburger"
            onClick={toggleMobileMenu}
          >
            <div className={`hamburger transition-all duration-300 ${isMobileMenuOpen ? 'hamburger-first-child' : ''}`}></div>
            <div className={`hamburger transition-all duration-300 ${isMobileMenuOpen ? 'hamburger-nth-child' : ''}`}></div>
            <div className={`hamburger transition-all duration-300 ${isMobileMenuOpen ? 'hamburger-last-child' : ''}`}></div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <nav className={`nav_links fixed top-0 left-0 w-full h-full bg-background z-50 transform transition-transform duration-300 ${
          isMobileMenuOpen ? 'nav_links_show' : 'translate-y-[-100%]'
        }`}>
          <div className="w-full max-w-full px-4 pt-0">
            <div className="flex justify-start mb-8">
              <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
                <img 
                  src="/images/icons/home-icon.svg" 
                  alt="Home" 
                  className="home-icon w-15 h-15"
                />
              </Link>
            </div>
            
            <div className="flex_mobile flex flex-col items-start space-y-6 mb-16">
              <Link 
                to="/work" 
                className={`navigation_mobilemenu text-5xl font-normal relative ${isActive('/work') ? 'text-primary' : 'text-primary'} hover:text-primary`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Work
                {isActive('/work') && (
                  <div className="absolute -bottom-4 left-0 w-full h-1 bg-yellow-400"></div>
                )}
              </Link>
              <Link 
                to="/sandbox" 
                className={`navigation_mobilemenu text-5xl font-normal relative ${isActive('/sandbox') ? 'text-primary' : 'text-primary'} hover:text-primary`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Sandbox
                {isActive('/sandbox') && (
                  <div className="absolute -bottom-4 left-0 w-full h-1 bg-yellow-400"></div>
                )}
              </Link>
              <Link 
                to="/about" 
                className={`navigation_mobilemenu text-5xl font-normal relative ${isActive('/about') ? 'text-primary' : 'text-primary'} hover:text-primary`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
                {isActive('/about') && (
                  <div className="absolute -bottom-4 left-0 w-full h-1 bg-yellow-400"></div>
                )}
              </Link>
            </div>

            <div className="contact_info space-y-4 text-left">
              <div className="contact">
                <p className="contact_bold font-black text-base">Get in touch</p>
                <p className="text-base font-light">weavrk@gmail.com</p>
              </div>
              <div className="contact">
                <p className="contact_bold font-black text-base">Connect</p>
                <p className="contact_link text-base font-light underline">LinkedIn</p>
              </div>
            </div>
          </div>
        </nav>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:block nav-shell_desktop fixed top-0 left-0 w-full z-50 px-4 md:px-page-x py-3 md:py-5" style={{ 
        background: 'rgba(250,250,250,0.7)', 
        backdropFilter: 'blur(12px)'
      }}>
        <div className="flex justify-between items-baseline">
          <Link to="/">
            <h1 className="home text-lg md:text-xl font-semibold tracking-wide text-primary hover:text-primary transition-colors duration-300 ease-out">
              Katherine Weaver
            </h1>
          </Link>

          <div className="nav-bar_desktop flex space-x-6 md:space-x-8">
            <div className="relative pb-2 overflow-hidden">
              <Link 
                to="/work" 
                className={`nav-link_desktop text-base md:text-lg font-semibold tracking-wide transition-colors duration-300 ease-out group ${
                  isActive('/work') ? 'text-primary' : 'text-secondary hover:text-primary'
                }`}
              >
                Work
              </Link>
              <div 
                className={`absolute bottom-0 h-1 transition-all duration-500 ease-out ${
                  isActive('/work') ? 'left-[-8px] w-[calc(100%+20px)]' : 
                  getSlideDirection('/work') === 'left' ? 'left-full w-0' : 'right-full w-0'
                }`}
                style={{
                  backgroundColor: isActive('/work') && shouldShowTertiaryBar('/work') 
                    ? 'var(--color-tertiary)' 
                    : isActive('/work') 
                    ? 'var(--color-accent-yellow-dark)' 
                    : 'transparent'
                }}
              ></div>
            </div>
            
            <div className="relative pb-2 overflow-hidden">
              <Link 
                to="/sandbox" 
                className={`nav-link_desktop text-base md:text-lg font-semibold tracking-wide transition-colors duration-300 ease-out group ${
                  isActive('/sandbox') ? 'text-primary' : 'text-secondary hover:text-primary'
                }`}
              >
                Sandbox
              </Link>
              <div 
                className={`absolute bottom-0 h-1 transition-all duration-500 ease-out ${
                  isActive('/sandbox') ? 'left-[-8px] w-[calc(100%+20px)]' : 
                  location.pathname === '/work' ? 'left-0 w-0 origin-right' : 'left-full w-0'
                }`}
                style={{
                  backgroundColor: isActive('/sandbox') && shouldShowTertiaryBar('/sandbox') 
                    ? 'var(--color-tertiary)' 
                    : isActive('/sandbox') 
                    ? 'var(--color-accent-yellow-dark)' 
                    : 'transparent'
                }}
              ></div>
            </div>
            
            <div className="relative pb-2 overflow-hidden">
              <Link 
                to="/about" 
                className={`nav-link_desktop text-base md:text-lg font-semibold tracking-wide transition-colors duration-300 ease-out group ${
                  isActive('/about') ? 'text-primary' : 'text-secondary hover:text-primary'
                }`}
              >
                About
              </Link>
              <div 
                className={`absolute bottom-0 h-1 transition-all duration-500 ease-out ${
                  isActive('/about') ? 'left-[-8px] w-[calc(100%+20px)]' : 
                  'left-0 w-0 origin-left'
                }`}
                style={{
                  backgroundColor: isActive('/about') && shouldShowTertiaryBar('/about') 
                    ? 'var(--color-tertiary)' 
                    : isActive('/about') 
                    ? 'var(--color-accent-yellow-dark)' 
                    : 'transparent'
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Header */}
      <div className="md:hidden mobile-header-shell fixed top-0 left-0 w-full z-20 bg-background">
        <Link to="/" className="block w-full h-full min-h-[60px]">
          <p className="home-mobile text-lg font-semibold px-4 py-4 text-primary hover:text-primary transition-colors duration-300 ease-out cursor-pointer">
            Katherine Weaver
          </p>
        </Link>
      </div>
    </>
  );
};

export default Navigation; 