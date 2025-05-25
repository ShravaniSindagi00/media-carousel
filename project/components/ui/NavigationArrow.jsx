"use client";

import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const NavigationArrow = ({ direction, onClick, className }) => {
  return (
    <button 
      onClick={onClick}
      className={`w-15 h-15 rounded-full bg-[#1A0B2E] p-0.5 transition-all duration-300 hover:scale-110 hover:brightness-110 ${className}`}
      aria-label={`Navigate ${direction}`}
    >
      <div className="w-full h-full rounded-full bg-[#1A0B2E] flex items-center justify-center p-3 border-2 border-transparent" 
        style={{
          backgroundClip: 'padding-box',
          borderImage: 'linear-gradient(45deg, #FF00FF, #00FFFF) 1',
        }}
      >
        {direction === 'left' ? (
          <ChevronLeft size={30} className="text-white" />
        ) : (
          <ChevronRight size={30} className="text-white" />
        )}
      </div>
    </button>
  );
};

export default NavigationArrow;