import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import VideoCard from "./VideoCard";
import "../styles/VideoList.css";

const VideoList = () => {
  const { id } = useParams(); // channelId from URL
  const [videos, setVideos] = useState([]);
  const [nextPageToken, setNextPageToken] = useState("");
  const [prevPageToken, setPrevPageToken] = useState("");
  const [currentPageNumber, setCurrentPageNumber] = useState(1);

  const fetchVideos = async (pageToken = "") => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/videos?id=${id}&pageToken=${pageToken}`
      );

      setVideos(res.data.items || []);
      setNextPageToken(res.data.nextPageToken || "");
      setPrevPageToken(res.data.prevPageToken || "");
    } catch (err) {
      console.error("Error fetching videos:", err);
    }
  };

  useEffect(() => {
    if (!id) return;
    setCurrentPageNumber(1);
    fetchVideos();
  }, [id]);

  const handleNext = () => {
    if (nextPageToken) {
      fetchVideos(nextPageToken);
      setCurrentPageNumber((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (prevPageToken) {
      fetchVideos(prevPageToken);
      setCurrentPageNumber((prev) => Math.max(prev - 1, 1));
    }
  };

  return (
    <div className="video-list-container">
      {videos.length === 0 ? (
        <p>No videos found for this channel.</p>
      ) : (
        <>
          <div className="video-list">
            {videos.map((video) => (
              <VideoCard key={video.id.videoId} video={video} />
            ))}
          </div>

          <div className="pagination">
            <button onClick={handlePrev} disabled={!prevPageToken}>
              Previous
            </button>
            <span>Page {currentPageNumber}</span>
            <button onClick={handleNext} disabled={!nextPageToken}>
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default VideoList;
