import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config(); // ✅ Load environment variables
const app = express();
app.use(cors());

// 🔑 Your YouTube API key
const API_KEY = process.env.YOUTUBE_API_KEY;

// 🎥 Route: fetch videos from a channel with pagination using uploads playlist
app.get("/api/videos", async (req, res) => {
  try {
    const channelId = req.query.id;
    const pageToken = req.query.pageToken || "";
    const searchQuery = req.query.q || "";

    if (!channelId) {
      return res.status(400).json({ error: "Channel ID is required" });
    }

    // If search query exists, use search.list (limited to 500 results)
    if (searchQuery) {
      const searchUrl = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${channelId}&part=snippet,id&order=date&maxResults=21&pageToken=${pageToken}&q=${encodeURIComponent(searchQuery)}`;

      const searchResponse = await fetch(searchUrl);
      if (!searchResponse.ok) {
        throw new Error(`YouTube API error: ${searchResponse.status}`);
      }

      const searchData = await searchResponse.json();
      return res.json({
        items: searchData.items,
        nextPageToken: searchData.nextPageToken || "",
        prevPageToken: searchData.prevPageToken || "",
        totalResults: searchData.pageInfo?.totalResults || 0,
        resultsPerPage: searchData.pageInfo?.resultsPerPage || 21,
      });
    }

    // For all videos (no search), use uploads playlist (1 unit cost vs 100 units)
    // First get the channel's uploads playlist ID
    const channelResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${channelId}&key=${API_KEY}`
    );

    if (!channelResponse.ok) {
      throw new Error(`YouTube API error: ${channelResponse.status}`);
    }

    const channelData = await channelResponse.json();
    if (!channelData.items || channelData.items.length === 0) {
      return res.status(404).json({ error: "Channel not found" });
    }

    const uploadsPlaylistId = channelData.items[0].contentDetails.relatedPlaylists.uploads;

    // Now get videos from uploads playlist (much cheaper - 1 unit vs 100 units)
    const playlistResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${uploadsPlaylistId}&maxResults=30&pageToken=${pageToken}&key=${API_KEY}`
    );

    if (!playlistResponse.ok) {
      throw new Error(`YouTube API error: ${playlistResponse.status}`);
    }

    const playlistData = await playlistResponse.json();

    // Transform playlist items to match search.list format
    const transformedItems = playlistData.items.map(item => ({
      id: {
        videoId: item.snippet.resourceId.videoId
      },
      snippet: {
        title: item.snippet.title,
        description: item.snippet.description,
        thumbnails: item.snippet.thumbnails,
        channelTitle: item.snippet.channelTitle,
        publishedAt: item.snippet.publishedAt
      }
    }));

    res.json({
      items: transformedItems,
      nextPageToken: playlistData.nextPageToken || "",
      prevPageToken: playlistData.prevPageToken || "",
      totalResults: playlistData.pageInfo?.totalResults || 0,
      resultsPerPage: playlistData.pageInfo?.resultsPerPage || 30,
    });
  } catch (error) {
    console.error("❌ Error fetching videos:", error.message);
    res.status(500).json({ error: "Failed to fetch videos" });
  }
});

// 📊 Route: fetch channel details including banner
app.get("/api/channel", async (req, res) => {
  try {
    const channelId = req.query.id;
    if (!channelId) {
      return res.status(400).json({ error: "Channel ID is required" });
    }

    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics,brandingSettings&id=${channelId}&key=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error(`YouTube API error: ${response.status}`);
    }

    const data = await response.json();
    if (!data.items || data.items.length === 0) {
      return res.status(404).json({ error: "Channel not found" });
    }

    const channelData = {
      title: data.items[0].snippet.title,
      description: data.items[0].snippet.description,
      thumbnail: data.items[0].snippet.thumbnails.high.url,
      subscriberCount: data.items[0].statistics.subscriberCount,
      viewCount: data.items[0].statistics.viewCount,
      videoCount: data.items[0].statistics.videoCount,
      banner: data.items[0].brandingSettings?.image?.bannerExternalUrl || "",
    };

    res.json(channelData);
  } catch (error) {
    console.error("❌ Error fetching channel details:", error.message);
    res.status(500).json({ error: "Failed to fetch channel details" });
  }
});

// 🚀 Start server
app.listen(5000, () => {
  console.log("✅ Server running at http://localhost:5000");
});