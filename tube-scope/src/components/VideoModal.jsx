import React, { useEffect, useRef } from "react";
import { useVideoModal } from "../contexts/VideoModalContext";
import "../styles/VideoModal.css";

function VideoModal() {
  const { currentVideo, isModalOpen, closeModal } = useVideoModal();
  const modalRef = useRef(null);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };

    if (isModalOpen) {
      document.addEventListener('keydown', handleEscape);
      // Focus trap for accessibility
      modalRef.current?.focus();
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isModalOpen, closeModal]);

  if (!isModalOpen || !currentVideo) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <div
      className="enhanced-modal-overlay"
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="enhanced-modal-content"
        ref={modalRef}
        tabIndex={-1}
      >
        <div className="modal-header">
          <h2 id="modal-title" className="modal-title">
            {currentVideo.snippet.title}
          </h2>
          <button
            className="enhanced-close-btn"
            onClick={closeModal}
            aria-label="Close video modal"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M18 6L6 18M6 6L18 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        <div className="enhanced-video-wrapper">
          <iframe
            src={`https://www.youtube.com/embed/${currentVideo.id.videoId}?autoplay=1&rel=1&modestbranding=0&iv_load_policy=3`}
            title={currentVideo.snippet.title}
            style={{ border: 'none' }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>

        <div className="modal-info">
          <div className="video-description">
            <p>{currentVideo.snippet.description || 'No description available for this video.'}</p>
          </div>
          <div className="video-meta">
            <div className="meta-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.89 1 3 1.89 3 3V21C3 22.11 3.89 23 5 23H19C20.11 23 21 22.11 21 21V9M19 9H14V4H5V21H19V9Z"/>
              </svg>
              <span className="channel-name">{currentVideo.snippet.channelTitle}</span>
            </div>
            <div className="meta-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19,3H18V1H16V3H8V1H6V3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M19,19H5V8H19V19Z"/>
              </svg>
              <span className="publish-date">
                {new Date(currentVideo.snippet.publishedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoModal;