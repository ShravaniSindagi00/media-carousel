"use client";

import React from 'react';
import { MessageCircle } from 'lucide-react';

const ChatButton = () => {
  const handleClick = () => {
    console.log("Chat button clicked");
  };

  return (
    <button 
      onClick={handleClick}
      className="fixed bottom-5 right-5 w-10 h-10 rounded-full bg-gradient-to-r from-[#FF00FF] to-[#00FFFF] flex items-center justify-center transition-all duration-300 hover:scale-110 hover:brightness-110 shadow-lg z-50"
      aria-label="Open chat"
    >
      <MessageCircle size={20} className="text-white" />
    </button>
  );
};

export default ChatButton;