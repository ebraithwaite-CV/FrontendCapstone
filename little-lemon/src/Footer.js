import React from 'react';
import LargeLittleLemonLogo from './Assets/LittleLemonLogo.jpg';

function Footer() {
  return (
    <footer className="footer">
      <section className="footer-info">
        <img src={LargeLittleLemonLogo} alt="Little Lemon Logo" className="footer-logo" />
        <p>© 2025 Little Lemon. All rights reserved.</p>
      </section>
      
      <section className="footer-nav">
        <h3>Site Navigation</h3>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/menu">Menu</a></li>
          <li><a href="/reservations">Reservations</a></li>
          <li><a href="/order-online">Order Online</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
      </section>
      
      <section className="footer-contact">
        <h3>Contact Us</h3>
        <address>
          123 Main Street<br />
          Chicago, IL 60601<br />
          <a href="tel:+13125551234">312-555-1234</a><br />
          <a href="mailto:info@littlelemon.com">info@littlelemon.com</a>
        </address>
      </section>
      
      <section className="footer-social">
        <h3>Follow Us</h3>
        <ul className="social-links">
          <li><a href="https://facebook.com/littlelemon">Facebook</a></li>
          <li><a href="https://instagram.com/littlelemon">Instagram</a></li>
          <li><a href="https://twitter.com/littlelemon">Twitter</a></li>
        </ul>
      </section>
    </footer>
  );
}

export default Footer;