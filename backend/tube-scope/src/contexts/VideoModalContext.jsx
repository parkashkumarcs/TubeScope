import React, { createContext, useContext, useState } from 'react';

const VideoModalContext = createContext();

export const useVideoModal = () => {
  const context = useContext(VideoModalContext);
  if (!context) {
    throw new Error('useVideoModal must be used within a VideoModalProvider');
  }
  return context;
};

export const VideoModalProvider = ({ children }) => {
  const [currentVideo, setCurrentVideo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (video) => {
    setCurrentVideo(video);
    setIsModalOpen(true);
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setCurrentVideo(null);
    setIsModalOpen(false);
    // Restore body scroll
    document.body.style.overflow = 'unset';
  };

  const value = {
    currentVideo,
    isModalOpen,
    openModal,
    closeModal
  };

  return (
    <VideoModalContext.Provider value={value}>
      {children}
    </VideoModalContext.Provider>
  );
};