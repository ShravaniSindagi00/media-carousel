"use client";

import React, { useState } from 'react';
import Logo from './Logo';
import { Menu, X } from 'lucide-react';

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const links = [
    { text: "Home", action: () => console.log("Navigated to Home") },
    { text: "About us", action: () => console.log("Navigated to About us") },
    { text: "Structure", action: () => console.log("Navigated to Structure") },
    { text: "YouTube Channel", action: () => console.log("Navigated to YouTube Channel") },
    { text: "Hire us", action: () => console.log("Navigated to Hire us") },
    { text: "Contact us", action: () => console.log("Navigated to Contact us") },
  ];

  const handleWaitlistClick = () => {
    console.log("Join waitlist clicked");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-black bg-opacity-80 backdrop-blur-sm">
      {/* Logo */}
      <div className="h-10 w-10">
        <Logo />
      </div>

      {/* Mobile Menu Button */}
      <button 
        className="md:hidden text-white p-2"
        onClick={toggleMenu}
        aria-label="Toggle Menu"
      >
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center space-x-5">
        {links.map((link, index) => (
          <a 
            key={index}
            href="#" 
            onClick={(e) => {
              e.preventDefault();
              link.action();
            }}
            className="text-white text-base font-medium hover:text-[#FF00FF] transition-colors duration-300"
          >
            {link.text}
          </a>
        ))}
      </div>

      {/* Desktop CTA Button */}
      <button 
        className="hidden md:block bg-gradient-to-r from-[#FF00FF] to-[#00FFFF] text-white rounded-full px-5 py-2 font-semibold text-base transition-all duration-300 hover:scale-105 hover:brightness-110"
        onClick={handleWaitlistClick}
      >
        Join the waitlist
      </button>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 flex flex-col pt-20 pb-6 px-6 bg-black bg-opacity-95 md:hidden">
          <div className="flex flex-col space-y-6 flex-grow">
            {links.map((link, index) => (
              <a 
                key={index}
                href="#" 
                onClick={(e) => {
                  e.preventDefault();
                  link.action();
                  setIsMenuOpen(false);
                }}
                className="text-white text-xl font-medium hover:text-[#FF00FF] transition-colors duration-300"
              >
                {link.text}
              </a>
            ))}
          </div>
          <button 
            className="w-full bg-gradient-to-r from-[#FF00FF] to-[#00FFFF] text-white rounded-full py-3 font-semibold text-base transition-all duration-300 hover:scale-105 hover:brightness-110 mt-auto"
            onClick={() => {
              handleWaitlistClick();
              setIsMenuOpen(false);
            }}
          >
            Join the waitlist
          </button>
        </div>
      )}
    </nav>
  );
};

export default NavBar;