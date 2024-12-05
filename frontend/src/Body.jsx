import React, { useRef, useState, useEffect } from 'react';
import './Body.css';
import dharman from './assets/dharman.mp4';

export function Body() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);  // Track if video is playing

  // Toggle play/pause state when the video is clicked
  const handleVideoClick = () => {
    const videoElement = videoRef.current;
    if (videoElement.paused) {
      videoElement.play();  // Play the video if it's paused
      setIsPlaying(true);  // Update state to playing
    } else {
      videoElement.pause();  // Pause the video if it's playing
      setIsPlaying(false);   // Update state to paused
    }
  };

  useEffect(() => {
    const videoElement = videoRef.current;
    videoElement.loop = true;  // Make sure the video loops
    if (isPlaying) {
      videoElement.play();  // Play the video if it's in the "playing" state
    } else {
      videoElement.pause();  // Pause the video if it's in the "paused" state
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

      <div className="divider"></div> {/* Optional divider */}

      <div className="content">
        <div 
          className={`video-container ${isPlaying ? '' : 'paused'}`}  // Add paused class when video is paused
          onClick={handleVideoClick}
        >
          <video 
            className="dharman" 
            ref={videoRef} 
            autoPlay 
            loop 
            muted={false}  // The video will play with sound
          >
            <source src={dharman} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          {/* Show pause icon when video is paused */}
          {!isPlaying && (
            <div className="pause-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="50" height="50">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" fill="white" />
              </svg>
            </div>
          )}
        </div>

        {/* No control buttons anymore */}
      </div>
    </div>
  );
}
