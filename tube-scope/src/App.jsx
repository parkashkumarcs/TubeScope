// Importing react components, libraries, and CSS
import React from "react";
import { Routes, Route } from "react-router-dom";
import ChannelInput from "./components/ChannelInput";
import ChannelPage from "./components/ChannelPage";
import "./App.css";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<ChannelInput />} />
      <Route path="/channel/:id" element={<ChannelPage />} />
      {/* Optional: redirect unmatched routes to home */}
      <Route path="*" element={<ChannelInput />} />
    </Routes>
  );
};

export default App;