import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false); 
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen((prevState) => !prevState);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuRef]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="logo">
        <Link to="/" className="logo-link">
          <img src="/images/Logo.png" className="logo-image" alt="Logo" />
        </Link>
      </div>

      <div className={`hamburger ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>

      <nav ref={menuRef} className={`nav ${isOpen ? 'open' : ''}`}>
        <ul>
          <li>
            <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
          </li>
          <li className="has-submenu">
            <Link to="/services" onClick={() => setIsOpen(false)}>Services</Link>
            <ul className="submenu">
              <li><Link to="/coins">Coins</Link></li>
            </ul>
          </li>
          <li><Link to="/roadmap" onClick={() => setIsOpen(false)}>Roadmap</Link></li>
          <li><Link to="/about" onClick={() => setIsOpen(false)}>About</Link></li>
        </ul>
      </nav>

      {isOpen && <div className="overlay show" onClick={() => setIsOpen(false)}></div>}
    </header>
  );
}

export default Header;
