"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Play } from 'lucide-react';

const VideoThumbnail = ({ video, isMobile, isPlaying, onPlay, onPause }) => {
  const [localIsPlaying, setLocalIsPlaying] = useState(false);
  const videoRef = useRef(null);

  // Sync local state with parent state
  useEffect(() => {
    console.log(`Video ${video.id}: isPlaying=${isPlaying}, localIsPlaying=${localIsPlaying}`);
    if (isPlaying && !localIsPlaying) {
      // If this video is now the currently playing one, play it
      if (videoRef.current) {
        console.log(`Playing video ${video.id} because it became the currently playing video`);
        videoRef.current.play().catch(error => {
          console.error(`Failed to play video ${video.id}:`, error);
        });
        setLocalIsPlaying(true);
      }
    } else if (!isPlaying && localIsPlaying) {
      // If this video is no longer the currently playing one, pause it
      if (videoRef.current) {
        console.log(`Pausing video ${video.id} because another video started`);
        videoRef.current.pause();
        setLocalIsPlaying(false);
      }
    }
  }, [isPlaying, localIsPlaying, video.id]);

  const handlePlayClick = async () => {
    if (videoRef.current) {
      try {
        await videoRef.current.play();
        console.log(`Video ${video.id} started playing via button click`);
        setLocalIsPlaying(true);
        onPlay(); // Notify parent that this video is playing
      } catch (error) {
        console.error(`Failed to play video ${video.id}:`, error);
      }
    }
  };

  const handlePause = () => {
    console.log(`Video ${video.id} paused`);
    setLocalIsPlaying(false);
    onPause(); // Notify parent that this video has paused
  };

  const handleEnded = () => {
    console.log(`Video ${video.id} ended`);
    setLocalIsPlaying(false);
    onPause(); // Notify parent that this video has ended
  };

  const handleError = (e) => {
    console.error(`Error with video ${video.id}:`, e);
  };

  return (
    <div 
      className={`relative group ${isMobile ? 'mb-4' : 'mx-3'}`}
      style={{
        width: isMobile ? '200px' : '300px',
        height: isMobile ? '300px' : '400px',
      }}
    >
      <div className="absolute inset-0 overflow-hidden rounded-lg shadow-lg">
        <video 
          ref={videoRef}
          src={video.videoSrc} // Use videoSrc from props
          className="absolute inset-0 w-full h-full object-cover filter grayscale transition-all duration-300 transform group-hover:grayscale-0 group-hover:scale-105"
          controls={localIsPlaying} // Show controls only when playing
          onPause={handlePause} // Update state when paused
          onEnded={handleEnded} // Update state when video ends
          onError={handleError} // Log errors if video fails to load/play
        />
        
        {/* Overlay to darken the image */}
        <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-20 transition-opacity duration-300" />
        
        {/* Video Title */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
          <h3 className="text-white font-semibold text-lg">{video.title}</h3>
        </div>
      </div>
      
      {/* Play Button - Show only when video is not playing */}
      {!localIsPlaying && (
        <button 
          onClick={handlePlayClick}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white bg-opacity-80 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-opacity-100"
          aria-label="Play video"
        >
          <Play size={24} className="text-[#1A0B2E] ml-1" />
        </button>
      )}
    </div>
  );
};

export default VideoThumbnail;