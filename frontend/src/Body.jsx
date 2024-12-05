import React, { useState, useRef } from 'react';
import './Body.css';
import dharman from './assets/dharman.mp4';
import heart from './assets/heart.png';
import comment from './assets/comment.png';
import favorite from './assets/bookmark.png';
import share from './assets/share.png';

export function Body() {
  const [isPlaying, setIsPlaying] = useState(true);  // Track if video is playing
  const [isCommenting, setIsCommenting] = useState(false);  // Track if comment bar is visible
  const [likeCount, setLikeCount] = useState(0);  // Track like count
  const [commentCount, setCommentCount] = useState(0);  // Track comment count
  const videoRef = useRef(null);

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

  const handleLike = () => {
    setLikeCount(likeCount + 1);  // Increment like count
  };

  const handleCommentToggle = () => {
    setIsCommenting(!isCommenting);  // Toggle visibility of the comment input field
  };

  const handleBookmark = () => {
    // Logic for bookmark action (you can add your own functionality here)
  };

  const handleShare = () => {
    // Logic for share action (you can add your own functionality here)
  };

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
        <div className="video-container" onClick={handleVideoClick}>
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

        {/* Comment Bar (conditionally rendered beside video) */}
        {isCommenting && (
          <div className="comment-bar">
            <textarea placeholder="Add a comment..." rows="3"></textarea>
            <button onClick={() => setCommentCount(commentCount + 1)}>Post Comment</button>
          </div>
        )}

        {/* Controls (Heart, Comment, Bookmark, Share) */}
        <div className="controls">
          <div className="control-icon heart-icon" onClick={handleLike}>
            <img src={heart} alt="heart" />
            <span>{likeCount}</span>
          </div>
          <div className="control-icon comment-icon" onClick={handleCommentToggle}>
            <img src={comment} alt="comment" />
            <span>{commentCount}</span>
          </div>
          <div className="control-icon bookmark-icon" onClick={handleBookmark}>
            <img src={favorite} alt="bookmark" />
          </div>
          <div className="control-icon share-icon" onClick={handleShare}>
            <img src={share} alt="share" />
          </div>
        </div>
      </div>
    </div>
  );
}
