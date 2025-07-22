import axios from "axios";

// 🔁 Все запросы идут через ваш Firebase Proxy
const PROXY_URL = "http://localhost:5002/clone-e2514/us-central1/youtubeProxy";

export const search = async (query: string) => {
  const response = await axios.get(PROXY_URL, {
    params: {
      endpoint: "search",
      q: query,
      part: "snippet",
      type: "video,channel",
      maxResults: 10,
    },
  });
  return response.data.items;
};

export const getVideo = async (videoId: string) => {
  const response = await axios.get(PROXY_URL, {
    params: {
      endpoint: "videos", // ← передаётся в прокси
      id: videoId,
      part: "snippet,contentDetails,statistics",
    },
  });
  return response.data.items[0];
};

export const getChannel = async (channelId: string) => {
  const response = await axios.get(PROXY_URL, {
    params: {
      endpoint: "channels",
      id: channelId,
      part: "snippet,statistics",
    },
  });
  return response.data.items[0];
};

export const getChannelVideos = async (channelId: string) => {
  const response = await axios.get(PROXY_URL, {
    params: {
      endpoint: "search",
      channelId,
      part: "snippet",
      type: "video",
      maxResults: 20,
      order: "date",
    },
  });
  return response.data.items;
};
