import React, { useState } from "react";
import "../styles/VideoCard.css";

function VideoCard({ video }) {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <div className="video-card">
      <img
        src={video.snippet.thumbnails.medium.url}
        alt={video.snippet.title}
      />
      <h3>{video.snippet.title}</h3>
      <p>{video.snippet.description.substring(0, 100)}...</p>
      <button className="watch-btn" onClick={openModal}>
        ▶ Watch Video
      </button>

      {isOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={closeModal}>✖</button>
            <div className="video-wrapper">
              <iframe
                src={`https://www.youtube.com/embed/${video.id.videoId}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default VideoCard;
