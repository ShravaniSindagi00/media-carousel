"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Play } from 'lucide-react';

const VideoThumbnail = ({ video, isMobile, isPlaying, onPlay, onPause }) => {
  const [localIsPlaying, setLocalIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    if (isPlaying && !localIsPlaying && !hasError) {
      if (videoRef.current) {
        videoRef.current.play().catch(error => {
          console.error(`Failed to play video ${video.id}:`, error);
          setHasError(true);
        });
        setLocalIsPlaying(true);
      }
    } else if (!isPlaying && localIsPlaying) {
      if (videoRef.current) {
        videoRef.current.pause();
        setLocalIsPlaying(false);
      }
    }
  }, [isPlaying, localIsPlaying, video.id, hasError]);

  const handlePlayClick = async (e) => {
    e.preventDefault();
    if (videoRef.current) {
      try {
        if (hasError) setHasError(false);

        if (videoRef.current.paused) {
          await videoRef.current.play();
          setLocalIsPlaying(true);
          onPlay();
        } else {
          videoRef.current.pause();
          setLocalIsPlaying(false);
          onPause();
        }
      } catch (error) {
        console.error(`Video ${video.id}: Error during play/pause:`, error);
        setHasError(true);
      }
    }
  };

  const handlePause = () => {
    setLocalIsPlaying(false);
    onPause();
  };

  const handleEnded = () => {
    setLocalIsPlaying(false);
    onPause();
  };

  const handleError = (e) => {
    console.error(`Video ${video.id}: Error:`, e);
    setHasError(true);
    setLocalIsPlaying(false);
    onPause();
  };

  return (
    <div 
      className={`relative group cursor-pointer ${isMobile ? 'mb-4' : 'mx-3'}`}
      style={{
        width: isMobile ? '200px' : '300px',
        height: isMobile ? '300px' : '400px',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handlePlayClick}
    >
      <div className="absolute inset-0 overflow-hidden rounded-lg shadow-lg transition-all duration-300 ease-in-out">
        <video 
          ref={videoRef}
          className={`
            absolute inset-0 w-full h-full object-cover transition-all duration-300 ease-in-out
            ${localIsPlaying ? 'scale-105 filter-none' : 'grayscale'}
            ${isHovered && !localIsPlaying ? 'scale-105 grayscale-0' : ''}
          `}
          controls={localIsPlaying && !hasError}
          onPause={handlePause}
          onEnded={handleEnded}
          onError={handleError}
        >
          <source src={video.videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div
          className={`
            absolute inset-0 transition-opacity duration-300 ease-in-out
            ${localIsPlaying || isHovered ? 'bg-black bg-opacity-20' : 'bg-black bg-opacity-30'}
          `}
        />

        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
          <h3 className="text-white font-semibold text-lg">{video.title}</h3>
        </div>

        {hasError && (
          <div className="absolute inset-0 flex items-center justify-center text-white bg-black bg-opacity-50">
            <p>Failed to load video</p>
          </div>
        )}
      </div>

      {(!localIsPlaying || hasError) && (
        <button 
          className={`
            absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
            w-14 h-14 rounded-full bg-white bg-opacity-80 flex items-center justify-center 
            transition-all duration-300 ease-in-out hover:scale-110 hover:bg-opacity-100
          `}
          aria-label="Play video"
        >
          <Play size={24} className="text-[#1A0B2E] ml-1" />
        </button>
      )}
    </div>
  );
};

export default VideoThumbnail;
