import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/Header.css";

// Utility function to format numbers into K/M/B/T format
const formatNumber = (num) => {
  if (!num || isNaN(num)) return "0";

  const number = parseInt(num);

  if (number >= 1000000000000) {
    return (number / 1000000000000).toFixed(1).replace(/\.0$/, '') + 'T';
  }
  if (number >= 1000000000) {
    return (number / 1000000000).toFixed(1).replace(/\.0$/, '') + 'B';
  }
  if (number >= 1000000) {
    return (number / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
  }
  if (number >= 1000) {
    return (number / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
  }
  return number.toString();
};

const Header = ({ onSearch }) => {
  const { id } = useParams(); // channel ID from URL
  const [channel, setChannel] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("videos");

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch && searchQuery.trim()) {
      onSearch(searchQuery.trim());
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const clearSearch = () => {
    setSearchQuery("");
    if (onSearch) {
      onSearch("");
    }
  };

  useEffect(() => {
    const fetchChannelData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/channel?id=${id}`);
        const data = await response.json();
        setChannel(data);
      } catch (error) {
        console.error("Error fetching channel data:", error);
      }
    };
    fetchChannelData();
  }, [id]);

  if (!channel) {
    return (
      <header className="header-banner loading">
        <p>Loading channel details...</p>
      </header>
    );
  }

  return (
    <>
      <header
        className="header-banner"
        style={{
          backgroundImage: channel.banner
            ? `url(${channel.banner})`
            : "linear-gradient(135deg, #2f00ff, #cc0000)",
        }}
      >
        <div className="overlay"></div>
      </header>

      {/* Channel Info Section - Now outside the banner */}
      <div className="channel-profile-section">
          <img
            src={channel.thumbnail}
            alt={channel.title}
            className="channel-logo"
          />
          <div className="channel-info">
            <h1>{channel.title}</h1>
            <p className="channel-handle">@{channel.customUrl || channel.title.replace(/\s+/g, '').toLowerCase()}</p>
            <div className="stats">
              <span className="stat-item">
                <span className="stat-number">{formatNumber(channel.subscriberCount)}</span>
                <span className="stat-label">subscribers</span>
              </span>
              <span className="stat-separator">•</span>
              <span className="stat-item">
                <span className="stat-number">{formatNumber(channel.videoCount)}</span>
                <span className="stat-label">videos</span>
              </span>
              <span className="stat-separator">•</span>
              <span className="stat-item">
                <span className="stat-number">{formatNumber(channel.viewCount)}</span>
                <span className="stat-label">views</span>
              </span>
            </div>
            <p className="channel-desc">{channel.description}</p>
          </div>
        </div>

      {/* Search and Navigation Section */}
      <div className="search-navigation-section">
          <div className="search-container">
            <a href="/" className="home-btn">
              Home
            </a>
            <form onSubmit={handleSearch} className="search-form">
              <div className="search-input-wrapper">
                <input
                  type="text"
                  placeholder="Search videos..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="search-input"
                />
                <svg
                  className="search-icon"
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                </svg>
                {searchQuery && (
                  <button
                    type="button"
                    onClick={clearSearch}
                    className="clear-search-btn"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
                    </svg>
                  </button>
                )}
              </div>
              <button type="submit" className="search-btn">
                Search
              </button>
            </form>

            {/* Videos and Shorts Navigation Buttons */}
            <div className="content-navigation">
              <button
                className={`nav-btn ${activeTab === 'videos' ? 'active' : ''}`}
                onClick={() => setActiveTab('videos')}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M16 8A8 8 0 1 0 0 8a8 8 0 0 0 16 0zM6.79 5.093 11 8 6.79 10.907V5.093z"/>
                </svg>
                Videos
              </button>
              <button
                className={`nav-btn ${activeTab === 'shorts' ? 'active' : ''}`}
                onClick={() => setActiveTab('shorts')}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                  <path d="M6.271 5.055a.5.5 0 0 1 .52.038L11 7.055a.5.5 0 0 1 0 .89L6.791 9.907a.5.5 0 0 1-.791-.389V5.482a.5.5 0 0 1 .271-.427z"/>
                </svg>
                Shorts
              </button>
            </div>
          </div>
        </div>
    </>
  );
};

export default Header;
