import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config(); // ✅ Load environment variables
const app = express();
app.use(cors());

// 🔑 Your YouTube API key
const API_KEY = process.env.YOUTUBE_API_KEY;

// 🎥 Route: fetch videos from a channel with pagination
app.get("/api/videos", async (req, res) => {
  try {
    const channelId = req.query.id;
    const pageToken = req.query.pageToken || "";

    if (!channelId) {
      return res.status(400).json({ error: "Channel ID is required" });
    }

    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${channelId}&part=snippet,id&order=date&maxResults=21&pageToken=${pageToken}`
    );

    if (!response.ok) {
      throw new Error(`YouTube API error: ${response.status}`);
    }

    const data = await response.json();

    // Return items and pagination tokens
    res.json({
      items: data.items,
      nextPageToken: data.nextPageToken || "",
      prevPageToken: data.prevPageToken || "",
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
