"use client";

import React, { useState, useEffect, useRef } from 'react';
import VideoThumbnail from './ui/VideoThumbnail';
import NavigationArrow from './ui/NavigationArrow';
import ChatButton from './ui/ChatButton';
import Logo from './ui/Logo';

const VideoCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null);

  // Store refs for each video by ID
  const videoRefs = useRef({});

  const videos = [
    { id: 1, title: 'Video 1', videoSrc: '/SampleVideo_1280x720_1mb.mp4' },
    { id: 2, title: 'Video 2', videoSrc: '/SampleVideo_1280x720_1mb.mp4' },
    { id: 3, title: 'Video 3', videoSrc: '/SampleVideo_1280x720_1mb.mp4' },
    { id: 4, title: 'Video 4', videoSrc: '/SampleVideo_1280x720_1mb.mp4' },
    { id: 5, title: 'Video 5', videoSrc: '/SampleVideo_1280x720_1mb.mp4' },
    { id: 6, title: 'Video 6', videoSrc: '/SampleVideo_1280x720_1mb.mp4' },
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? Math.max(0, videos.length - (isMobile ? 1 : 3)) : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex >= videos.length - (isMobile ? 1 : 3) ? 0 : prevIndex + 1
    );
  };

  const getVisibleVideos = () => {
    return isMobile
      ? videos.slice(currentIndex, currentIndex + 1)
      : videos.slice(currentIndex, currentIndex + 3);
  };

  const handlePlay = (videoId) => {
    // Reset all other videos before playing the new one
    videos.forEach(video => {
      if (video.id !== videoId) {
        const videoRef = videoRefs.current[video.id];
        if (videoRef && videoRef.resetVideo) {
          videoRef.resetVideo();
        }
      }
    });
    
    setCurrentlyPlaying(videoId);
  };

  const handlePause = () => {
    // Don't reset currentTime when pausing - let it stay where it is
    setCurrentlyPlaying(null);
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-gradient-to-br from-[#1A0B2E] to-[#2E1A47]">
      {/* Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-1/2 opacity-20">
          <Logo />
        </div>
      </div>

      {/* Carousel */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} items-center transition-all duration-500 ease-in-out`}>
          {getVisibleVideos().map((video) => (
            <VideoThumbnail
              key={video.id}
              video={video}
              isMobile={isMobile}
              isPlaying={currentlyPlaying === video.id}
              onPlay={() => handlePlay(video.id)}
              onPause={handlePause}
              ref={(el) => {
                videoRefs.current[video.id] = el;
              }}
            />
          ))}
        </div>
      </div>

      {/* Navigation */}
      <NavigationArrow
        direction="left"
        onClick={handlePrevious}
        className="absolute left-5 top-1/2 transform -translate-y-1/2"
      />
      <NavigationArrow
        direction="right"
        onClick={handleNext}
        className="absolute right-5 top-1/2 transform -translate-y-1/2"
      />

      {/* Chat */}
      <ChatButton />
    </div>
  );
};

export default VideoCarousel;