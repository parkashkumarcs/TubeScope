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
    { id: "UCuAXFkgsw1L7xaCfnd5JJOw", name: "Rick Astley", category: "Music" },
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
      {/* Header Section */}
      <div className="header-section">
        <div className="brand-logo">
          <div className="logo-icon">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
          </div>
          <h1>TubeScope</h1>
        </div>
        <p className="subtitle">Discover and explore YouTube channels with ease</p>
      </div>

      {/* Input Section */}
      <div className="input-section">
        <h2>Enter YouTube Channel ID</h2>
        <div className="input-wrapper">
          <input
            type="text"
            value={channelId}
            onChange={(e) => setChannelId(e.target.value)}
            placeholder="Paste channel ID here (e.g., UCblfuW_4rakIf2h6aqANefA)"
            className="channel-input"
          />
          <button onClick={handleGo} className="go-button">
            <span>Explore</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
        <p className="help-text">
          Find channel ID from any YouTube channel URL or profile page
        </p>
      </div>

      {/* Recommended Channels Section */}
      <div className="recommended-section">
        <h3>Popular Channels</h3>
        <p className="section-subtitle">Click any channel below to start exploring</p>
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
              <div className="channel-arrow">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChannelInput;
