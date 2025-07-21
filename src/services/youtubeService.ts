import axios from "axios";

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
const BASE_URL = "https://www.googleapis.com/youtube/v3 ";

const youtubeApi = axios.create({
  baseURL: BASE_URL,
  params: {
    key: API_KEY,
  },
});

export const search = async (query: string) => {
  const response = await youtubeApi.get("/search", {
    params: {
      q: query,
      part: "snippet",
      type: "video,channel",
      maxResults: 10,
    },
  });
  return response.data.items;
};

export const getVideo = async (videoId: string) => {
  const response = await youtubeApi.get("/videos", {
    params: {
      part: "snippet,contentDetails,statistics",
      id: videoId,
    },
  });
  return response.data.items[0];
};

export const getChannel = async (channelId: string) => {
  const response = await youtubeApi.get("/channels", {
    params: {
      part: "snippet,statistics",
      id: channelId,
    },
  });
  return response.data.items[0];
};

export const getChannelVideos = async (channelId: string) => {
  const response = await youtubeApi.get("/search", {
    params: {
      channelId,
      part: "snippet",
      type: "video",
      maxResults: 20,
      order: "date",
    },
  });
  return response.data.items;
};
