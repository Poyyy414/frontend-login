import React, { useRef, useState, useEffect } from 'react';
import './Body.css';
import dharman from './assets/dharman.mp4';

export function Body() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);

  // Toggle play/pause state when the video is clicked
  const handleVideoClick = () => {
    const videoElement = videoRef.current;
    if (videoElement.paused) {
      videoElement.play();
      setIsPlaying(true);
    } else {
      videoElement.pause();
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    const videoElement = videoRef.current;
    videoElement.loop = true;
    if (isPlaying) {
      videoElement.play();
    } else {
      videoElement.pause();
    }
  }, [isPlaying]);

  return (
    <div className="main-container">
      <div className="sidebar">
        <h2>For You</h2>
        <h2>Explore</h2>
        <h2>Following</h2>
        <h2>Live</h2>
        <h2>Profile</h2>
      </div>

      <div className="divider"></div>

      <div className="content">
        <div 
          className={`video-container ${isPlaying ? '' : 'paused'}`} 
          onClick={handleVideoClick}
        >
          <video 
            className="dharman" 
            ref={videoRef} 
            autoPlay 
            loop 
            muted={false}
          >
            <source src={dharman} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          {!isPlaying && (
            <div className="pause-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="50" height="50">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" fill="white" />
              </svg>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
