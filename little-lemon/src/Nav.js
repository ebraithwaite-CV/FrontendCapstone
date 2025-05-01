import React from 'react';
import './Nav.css';

function Nav({ isMobile, closeMenu }) {
  const handleLinkClick = () => {
    if (isMobile && closeMenu) {
      closeMenu();
    }
  };

  return (
    <nav className={`nav ${isMobile ? 'mobile' : ''}`}>
      <ul className="nav-links">
        <li><a href="/" onClick={handleLinkClick}>Home</a></li>
        <li><a href="/about" onClick={handleLinkClick}>About</a></li>
        <li><a href="/menu" onClick={handleLinkClick}>Menu</a></li>
        <li><a href="/reservations" onClick={handleLinkClick}>Reservations</a></li>
        <li><a href="/order-online" onClick={handleLinkClick}>Order Online</a></li>
        <li><a href="/login" onClick={handleLinkClick}>Login</a></li>
      </ul>
    </nav>
  );
}

export default Nav;