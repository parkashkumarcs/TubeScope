import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/ChannelInput.css";

const ChannelInput = () => {
  const [channelId, setChannelId] = useState("");
  const navigate = useNavigate();

  const handleGo = () => {
    if (channelId.trim() !== "") {
      navigate(`/channel/${channelId}`);
    } else {
      alert("Please enter a valid YouTube Channel ID!");
    }
  };

  return (
    <div className="channel-input-container">
      {/* YouTube logo at top center */}
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg"
        alt="YouTube Logo"
        className="youtube-logo"
      />

      <h2>Enter YouTube Channel ID</h2>
      <input
        type="text"
        value={channelId}
        onChange={(e) => setChannelId(e.target.value)}
        placeholder="Enter Channel ID"
      />
      <button onClick={handleGo}>Go</button>
    </div>
  );
};

export default ChannelInput;
