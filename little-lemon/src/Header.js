import React from 'react';
import Nav from './Nav';
import LittleLemonLogo from './Assets/LittleLemonLogo.jpg';

function Header() {
  return (
    <header 
      className="header"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '20px',
        backgroundColor: '#f8f8f8',
        margin: '0 auto',
      }}
    >
      <img 
        src={LittleLemonLogo} 
        alt="Little Lemon Logo" 
        className="logo" 
        style={{
          width: '150px',
          height: 'auto',
          margin: '0 20px',
        }}
      />
      <Nav />
    </header>
  );
}

export default Header;