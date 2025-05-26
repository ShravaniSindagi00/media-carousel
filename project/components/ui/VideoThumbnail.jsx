"use client";

import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import { Play } from 'lucide-react';

const VideoThumbnail = forwardRef(({ video, isMobile, isPlaying, onPlay, onPause, onReset }, ref) => {
  const [localIsPlaying, setLocalIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);
  const videoRef = useRef(null);

  // Expose video element and methods to parent component
  useImperativeHandle(ref, () => ({
    resetVideo: () => {
      const videoEl = videoRef.current;
      if (videoEl) {
        videoEl.pause();
        videoEl.currentTime = 0;
        setLocalIsPlaying(false);
      }
    },
    pauseVideo: () => {
      const videoEl = videoRef.current;
      if (videoEl) {
        videoEl.pause();
        setLocalIsPlaying(false);
      }
    }
  }), []);

  // Listen for reset from parent
  useEffect(() => {
    if (onReset && !isPlaying && localIsPlaying) {
      const videoEl = videoRef.current;
      if (videoEl) {
        videoEl.pause();
        videoEl.currentTime = 0;
        setLocalIsPlaying(false);
      }
    }
  }, [onReset, isPlaying, localIsPlaying]);

  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl) return;

    if (isPlaying) {
      if (!localIsPlaying && !hasError) {
        videoEl.play()
          .then(() => setLocalIsPlaying(true))
          .catch(err => {
            console.error(`Failed to play video ${video.id}:`, err);
            setHasError(true);
          });
      }
    } else {
      if (localIsPlaying) {
        videoEl.pause();
        setLocalIsPlaying(false);
      }
    }
  }, [isPlaying, hasError, localIsPlaying, video.id]);

  const handleClick = async (e) => {
    e.preventDefault();
    const videoEl = videoRef.current;
    if (!videoEl) return;

    try {
      if (hasError) {
        setHasError(false);
      }

      if (videoEl.paused) {
        onPlay(video.id); // Call onPlay first to handle switching logic
        await videoEl.play();
        setLocalIsPlaying(true);
      } else {
        videoEl.pause();
        setLocalIsPlaying(false);
        onPause();
      }
    } catch (err) {
      console.error(`Error toggling video ${video.id}:`, err);
      setHasError(true);
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
    console.error(`Error loading video ${video.id}:`, e);
    setHasError(true);
    setLocalIsPlaying(false);
    onPause();
  };

  return (
    <div
      onClick={handleClick}
      className={`relative cursor-pointer group ${isMobile ? 'mb-4' : 'mx-3'}`}
      style={{
        width: isMobile ? '200px' : '300px',
        height: isMobile ? '300px' : '400px',
      }}
    >
      {/* Video Container */}
      <div className="absolute inset-0 rounded-lg overflow-hidden shadow-lg">
        <video
          ref={videoRef}
          className={`
            w-full h-full object-cover absolute inset-0
            transition-all duration-300 ease-in-out
            ${localIsPlaying ? 'scale-105' : 'grayscale'}
            ${!localIsPlaying ? 'group-hover:scale-105 group-hover:grayscale-0' : ''}
          `}
          controls={localIsPlaying && !hasError}
          onPause={handlePause}
          onEnded={handleEnded}
          onError={handleError}
        >
          <source src={video.videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Overlay */}
        <div className={`
          absolute inset-0 
          ${localIsPlaying ? 'bg-black bg-opacity-20' : 'bg-black bg-opacity-30 group-hover:bg-opacity-20'}
          transition-opacity duration-300 ease-in-out
        `} />

        {/* Title */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
          <h3 className="text-white text-lg font-semibold">{video.title}</h3>
        </div>

        {/* Error Message */}
        {hasError && (
          <div className="absolute inset-0 flex items-center justify-center text-white bg-black bg-opacity-50">
            <p>Failed to load video</p>
          </div>
        )}
      </div>

      {/* Play Button */}
      {(!localIsPlaying || hasError) && (
        <button
          aria-label="Play video"
          className="
            absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
            w-14 h-14 rounded-full bg-white bg-opacity-80
            flex items-center justify-center
            transition-all duration-300 ease-in-out
            hover:scale-110 hover:bg-opacity-100
          "
        >
          <Play size={24} className="text-[#1A0B2E] ml-1" />
        </button>
      )}
    </div>
  );
});

VideoThumbnail.displayName = 'VideoThumbnail';

export default VideoThumbnail;