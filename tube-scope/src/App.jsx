// Importing react components, libraries, and CSS
import React from "react";
import { Routes, Route } from "react-router-dom";
import { VideoModalProvider } from "./contexts/VideoModalContext";
import ChannelInput from "./components/ChannelInput";
import ChannelPage from "./components/ChannelPage";
import VideoModal from "./components/VideoModal";
import "./App.css";

const App = () => {
  return (
    <VideoModalProvider>
      <Routes>
        <Route path="/" element={<ChannelInput />} />
        <Route path="/channel/:id" element={<ChannelPage />} />
        {/* Optional: redirect unmatched routes to home */}
        <Route path="*" element={<ChannelInput />} />
      </Routes>
      <VideoModal />
    </VideoModalProvider>
  );
};

export default App;