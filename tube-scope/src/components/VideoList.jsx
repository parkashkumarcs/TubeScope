import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import VideoCard from "./VideoCard";
import "../styles/VideoList.css";

const VideoList = ({ searchQuery }) => {
  const { id } = useParams(); // channelId from URL
  const [videos, setVideos] = useState([]);
  const [nextPageToken, setNextPageToken] = useState("");
  const [prevPageToken, setPrevPageToken] = useState("");
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [resultsPerPage, setResultsPerPage] = useState(51);
  const [loading, setLoading] = useState(false);
  const [paginationLoading, setPaginationLoading] = useState(false);
  const [currentSearch, setCurrentSearch] = useState("");
  const [error, setError] = useState(null);

  const fetchVideos = async (pageToken = "", query = "", isPagination = false) => {
    // Use different loading states for initial load vs pagination
    if (isPagination) {
      setPaginationLoading(true);
    } else {
      setLoading(true);
    }

    setError(null);

    try {
      let url = `http://localhost:5000/api/videos?id=${id}&pageToken=${pageToken}`;
      if (query) {
        url += `&q=${encodeURIComponent(query)}`;
      }

      const res = await axios.get(url);

      setVideos(res.data.items || []);
      setNextPageToken(res.data.nextPageToken || "");
      setPrevPageToken(res.data.prevPageToken || "");
      setTotalResults(res.data.totalResults || 0);
      setResultsPerPage(res.data.resultsPerPage || 51);
      setCurrentSearch(query);
    } catch (err) {
      console.error("Error fetching videos:", err);
      setError("Failed to load videos. Please try again.");
      setVideos([]);
    } finally {
      setLoading(false);
      setPaginationLoading(false);
    }
  };

  useEffect(() => {
    if (!id) return;
    setCurrentPageNumber(1);
    setNextPageToken("");
    setPrevPageToken("");
    fetchVideos("", searchQuery);
  }, [id, searchQuery]);

  const handleNext = () => {
    if (nextPageToken && !paginationLoading) {
      fetchVideos(nextPageToken, currentSearch, true);
      setCurrentPageNumber((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (prevPageToken && !paginationLoading) {
      fetchVideos(prevPageToken, currentSearch, true);
      setCurrentPageNumber((prev) => Math.max(prev - 1, 1));
    }
  };

  const getTotalPages = () => {
    return Math.ceil(totalResults / resultsPerPage);
  };

  return (
    <div className="video-list-container">
      {currentSearch && (
        <div className="search-info">
          <h3>Search Results for: "{currentSearch}"</h3>
          <p>{totalResults} videos found</p>
        </div>
      )}

      {error && (
        <div className="error-container">
          <p className="error-message">{error}</p>
          <button
            onClick={() => fetchVideos("", currentSearch)}
            className="retry-btn"
          >
            Try Again
          </button>
        </div>
      )}

      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading videos...</p>
        </div>
      ) : videos.length === 0 ? (
        <div className="no-results">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="64"
            height="64"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
          </svg>
          <h3>No videos found</h3>
          <p>{currentSearch ? `No videos match "${currentSearch}"` : "This channel has no videos yet."}</p>
        </div>
      ) : (
        <>
          <div className={`video-list ${paginationLoading ? 'loading' : ''}`}>
            {videos.map((video) => (
              <VideoCard key={video.id.videoId} video={video} />
            ))}
          </div>

          <div className={`pagination-container ${paginationLoading ? 'loading' : ''}`}>
            <div className="pagination-info">
              <span>
                Showing {((currentPageNumber - 1) * resultsPerPage) + 1} - {Math.min(currentPageNumber * resultsPerPage, totalResults)} of {totalResults} videos
              </span>
            </div>

            <div className="pagination">
              <button
                onClick={handlePrev}
                disabled={!prevPageToken || paginationLoading}
                className={`pagination-btn prev-btn ${paginationLoading ? 'loading' : ''}`}
              >
                {paginationLoading ? (
                  <div className="btn-spinner"></div>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                  </svg>
                )}
                Previous
              </button>

              <div className="page-info">
                <span className="page-number">Page {currentPageNumber}</span>
                {getTotalPages() > 0 && (
                  <span className="page-number">of {getTotalPages()}</span>
                )}
              </div>
              {paginationLoading && (
                  <p className="loading-indicator">Loading...</p>
                )}

              <button
                onClick={handleNext}
                disabled={!nextPageToken || paginationLoading}
                className={`pagination-btn next-btn ${paginationLoading ? 'loading' : ''}`}
              >
                Next
                {paginationLoading ? (
                  <div className="btn-spinner"></div>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                  </svg>
                )}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default VideoList;
