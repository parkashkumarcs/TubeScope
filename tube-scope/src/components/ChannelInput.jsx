import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/ChannelInput.css";

const ChannelInput = () => {
  const [channelId, setChannelId] = useState("");
  const navigate = useNavigate();

  // Popular YouTube channels for recommendations
  const popularChannels = [
    { id: "UCblfuW_4rakIf2h6aqANefA", name: "MrBeast", category: "Entertainment" },
    { id: "UCX6OQ3DkcsbYNE6H8uQQuVA", name: "MrBeast Gaming", category: "Gaming" },
    { id: "UCq-Fj5jknLsUf-MWSy4_brA", name: "T-Series", category: "Music" },
    { id: "UC-lHJZR3Gqxm24_Vd_AJ5Yw", name: "PewDiePie", category: "Gaming" },
    { id: "UCYzPXprvl5Y-Sf0g4vX-m6g", name: "jacksepticeye", category: "Gaming" },
    { id: "UCuAXFkgsw1L7xaCfnd5JJOw", name: "Markiplier", category: "Gaming" },
    { id: "UCsooa4yRKGN_zEE8iknghZA", name: "TED", category: "Education" },
    { id: "UCJ0-OtVpF0wOKEqT2Z1HEtA", name: "ElectroBOOM", category: "Education" },
    { id: "UCsXVk37bltHxD1rDPwtNM8Q", name: "Kurzgesagt", category: "Education" },
    { id: "UCHnyfMqiRRG1u-2MsSQLbXA", name: "Veritasium", category: "Science" },
    { id: "UC6nSFpj9HTCZ5t-N3Rm3-HA", name: "Vsauce", category: "Education" },
    { id: "UCBJycsmduvYEL83R_U4JriQ", name: "MKBHD", category: "Tech" }
  ];

  const handleGo = () => {
    if (channelId.trim() !== "") {
      navigate(`/channel/${channelId}`);
    } else {
      alert("Please enter a valid YouTube Channel ID!");
    }
  };

  const handleChannelClick = (id) => {
    navigate(`/channel/${id}`);
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

      {/* Recommended Channels Section */}
      <div className="recommended-section">
        <h3>Or try these popular channels:</h3>
        <div className="recommended-grid">
          {popularChannels.map((channel) => (
            <div
              key={channel.id}
              className="channel-card"
              onClick={() => handleChannelClick(channel.id)}
            >
              <div className="channel-info">
                <h4>{channel.name}</h4>
                <span className="channel-category">{channel.category}</span>
              </div>
              <div className="channel-arrow">→</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChannelInput;
