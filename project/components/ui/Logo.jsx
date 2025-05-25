"use client";

import React from 'react';
import { Crown } from 'lucide-react';

const Logo = () => {
  return (
    <div className="relative flex items-center justify-center w-full h-full">
      {/* Stylized Monkey Face with Crown Logo */}
      <div className="relative w-full aspect-square">
        {/* Circular face */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#FF00FF] to-[#00FFFF] opacity-90" />
        
        {/* Eyes */}
        <div className="absolute top-1/3 left-1/4 w-1/6 h-1/6 rounded-full bg-white" />
        <div className="absolute top-1/3 right-1/4 w-1/6 h-1/6 rounded-full bg-white" />
        
        {/* Mouth */}
        <div className="absolute bottom-1/4 left-1/3 right-1/3 h-1/12 rounded-full bg-white" />
        
        {/* Crown on top */}
        <div className="absolute -top-1/6 left-1/2 transform -translate-x-1/2 text-yellow-400">
          <Crown size={48} />
        </div>
      </div>
    </div>
  );
};

export default Logo;