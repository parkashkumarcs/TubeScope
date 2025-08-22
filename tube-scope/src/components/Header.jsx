import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/Header.css";

const Header = ({ onSearch }) => {
  const { id } = useParams(); // channel ID from URL
  const [channel, setChannel] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

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
    <header
      className="header-banner"
      style={{
        backgroundImage: channel.banner
          ? `url(${channel.banner})`
          : "linear-gradient(135deg, #2f00ff, #cc0000)",
      }}
    >
      <div className="overlay"></div>
      <div className="header-content">
        <img
          src={channel.thumbnail}
          alt={channel.title}
          className="channel-logo"
        />
        <div className="channel-info">
          <h1>{channel.title}</h1>
          <p className="channel-desc">{channel.description}</p>
          <div className="stats">
            <span className="stat">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M16 8A8 8 0 1 0 0 8a8 8 0 0 0 16 0zM6.79 5.093 11 8 6.79 10.907V5.093z"/>
              </svg>{" "}
              {channel.videoCount} Videos
            </span>
            <span className="stat">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M5 3.5a2.5 2.5 0 1 1 5 0 2.5 2.5 0 0 1-5 0zM4 8c-1.5 0-4 .75-4 2v2h8v-2c0-1.25-2.5-2-4-2zM10 8c-1.5 0-4 .75-4 2v2h8v-2c0-1.25-2.5-2-4-2z"/>
              </svg>{" "}
              {channel.subscriberCount} Subscribers
            </span>
            <span className="stat">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zm-8 4a4 4 0 1 1 0-8 4 4 0 0 1 0 8z"/>
                <path d="M8 5a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"/>
              </svg>{" "}
              {channel.viewCount} Views
            </span>
          </div>

          <div className="search-container">
            <form onSubmit={handleSearch} className="search-form">
              <div className="search-input-wrapper">
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
                <input
                  type="text"
                  placeholder="Search videos..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="search-input"
                />
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
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
