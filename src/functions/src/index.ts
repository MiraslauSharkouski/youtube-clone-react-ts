import * as functions from "firebase-functions";
import * as axios from "axios";

const YOUTUBE_API_KEY = "AIzaSyBLzYuI5mCY0Uj1VEKrGrdRn33Yb_8Wdw4"; // ← ваш ключ

export const youtubeProxy = functions.https.onRequest(async (req, res) => {
  const { endpoint, ...params } = req.query;

  // CORS
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.set("Access-Control-Allow-Headers", "Content-Type");

  // Preflight
  if (req.method === "OPTIONS") {
    res.status(204).send("");
    return;
  }

  try {
    const response = await axios.default.get(
      `https://www.googleapis.com/youtube/v3/ ${endpoint}`,
      {
        params: {
          key: YOUTUBE_API_KEY,
          ...params,
        },
      }
    );

    res.status(200).json(response.data);
  } catch (error: any) {
    functions.logger.error("YouTube API error:", error.message);
    res.status(500).json({ error: "Failed to fetch from YouTube API" });
  }
});
