import React, { useState, useEffect } from 'react';
import Nav from './Nav';
import LittleLemonLogo from './Assets/LittleLemonLogo.jpg';
import './Header.css';

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setMobileMenuOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="header">
      <div className="container header-container">
        <img 
          src={LittleLemonLogo} 
          alt="Little Lemon Logo" 
          className="logo" 
        />
        
        {/* Desktop Navigation */}
        {!isMobile && (
          <div className="desktop-nav">
            <Nav />
          </div>
        )}
        
        {/* Mobile Menu Button */}
        {isMobile && (
          <button 
            className="mobile-menu-button" 
            onClick={toggleMobileMenu}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            <div className={`hamburger ${mobileMenuOpen ? 'open' : ''}`}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </button>
        )}
        
        {/* Mobile Navigation */}
        {isMobile && (
          <div className={`mobile-nav ${mobileMenuOpen ? 'open' : ''}`}>
            <Nav isMobile={true} closeMenu={() => setMobileMenuOpen(false)} />
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;