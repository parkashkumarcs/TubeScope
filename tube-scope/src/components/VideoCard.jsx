import React, { useState, useRef, useEffect } from "react";
import { useVideoModal } from "../contexts/VideoModalContext";
import "../styles/VideoCard.css";

function VideoCard({ video }) {
  const { openModal } = useVideoModal();
  const [isHovering, setIsHovering] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const hoverTimeoutRef = useRef(null);
  const previewVideoRef = useRef(null);

  const handleMouseEnter = () => {
    setIsHovering(true);
    // Delay showing preview to avoid flickering on quick hovers
    hoverTimeoutRef.current = setTimeout(() => {
      if (isHovering) { // Only show if still hovering
        setShowPreview(true);
      }
    }, 800);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setShowPreview(false);
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
  };

  useEffect(() => {
    if (showPreview && previewVideoRef.current) {
      // Small delay to ensure iframe is loaded
      const timer = setTimeout(() => {
        if (previewVideoRef.current && showPreview) {
          try {
            // The iframe will auto-play due to autoplay=1 in the URL
            console.log('Preview video loaded for:', video.snippet.title);
          } catch (error) {
            console.log('Preview autoplay blocked:', error);
          }
        }
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [showPreview, video.snippet.title]);

  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  const handleWatchClick = () => {
    openModal(video);
  };

  const formatDuration = () => {
    // This would need to be implemented based on your video data structure
    // For now, returning a placeholder
    return "10:30";
  };

  return (
    <div
      className="video-card"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="video-card-image-container">
        <img
          src={video.snippet.thumbnails.medium.url}
          alt={video.snippet.title}
        />

        {showPreview && (
          <iframe
            ref={previewVideoRef}
            className={`hover-preview-video ${showPreview ? 'visible' : ''}`}
            src={`https://www.youtube.com/embed/${video.id.videoId}?autoplay=1&mute=1&controls=0&showinfo=0&rel=0&loop=1&playlist=${video.id.videoId}`}
            title="Video preview"
            style={{
              pointerEvents: 'none',
              border: 'none'
            }}
            allow="autoplay; encrypted-media"
          />
        )}

        <div className="play-overlay">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z"/>
          </svg>
        </div>

        <div className="video-duration">
          {formatDuration()}
        </div>
      </div>

      <div className="video-card-content">
        <h3>{video.snippet.title}</h3>
        <p>{video.snippet.description ? video.snippet.description.substring(0, 100) + '...' : 'No description available'}</p>
        <button className="watch-btn" onClick={handleWatchClick}>
          ▶ Watch Video
        </button>
      </div>
    </div>
  );
}

export default VideoCard;