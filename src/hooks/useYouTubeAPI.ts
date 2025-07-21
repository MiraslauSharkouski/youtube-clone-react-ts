import { useState, useEffect } from "react";
import {
  search as searchVideos,
  getVideo,
  getChannel,
  getChannelVideos,
} from "../services/youtubeService";
import type { Video, Channel } from "../types";

type SearchResults = {
  videos: Video[];
  channels: Channel[];
};

export const useYouTubeAPI = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const search = async (query: string): Promise<SearchResults> => {
    setLoading(true);
    setError(null);
    try {
      const results = await searchVideos(query);
      const videos = results
        .filter((item: { id: { videoId: any } }) => item.id.videoId)
        .map(
          (item: {
            id: { videoId: any; channelId: any };
            snippet: {
              title: any;
              thumbnails: { high: { url: any } };
              channelTitle: any;
            };
          }) => ({
            id: item.id.videoId,
            title: item.snippet.title,
            thumbnail: item.snippet.thumbnails.high.url,
            channel: item.snippet.channelTitle,
            channelId: item.id.channelId,
          })
        );

      const channels = results
        .filter((item: { id: { channelId: any } }) => item.id.channelId)
        .map(
          (item: {
            id: { channelId: any };
            snippet: { title: any; thumbnails: { high: { url: any } } };
            contentDetails: { relatedPlaylists: { uploads: any } };
          }) => ({
            id: item.id.channelId,
            name: item.snippet.title,
            avatar: item.snippet.thumbnails.high.url,
            videosCount: item.contentDetails?.relatedPlaylists?.uploads
              ? 0
              : undefined,
          })
        );

      return { videos, channels };
    } catch (err) {
      setError("Ошибка при поиске");
      return { videos: [], channels: [] };
    } finally {
      setLoading(false);
    }
  };

  const fetchVideo = async (videoId: string): Promise<Video | null> => {
    setLoading(true);
    setError(null);
    try {
      const data = await getVideo(videoId);
      if (!data) return null;
      return {
        id: data.id,
        title: data.snippet.title,
        description: data.snippet.description,
        thumbnail: data.snippet.thumbnails.high.url,
        channel: data.snippet.channelTitle,
        channelId: data.snippet.channelId,
        views: data.statistics.viewCount,
        publishedAt: data.snippet.publishedAt,
      };
    } catch (err) {
      setError("Ошибка при загрузке видео");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const fetchChannel = async (channelId: string): Promise<Channel | null> => {
    setLoading(true);
    setError(null);
    try {
      const data = await getChannel(channelId);
      if (!data) return null;
      return {
        id: data.id,
        name: data.snippet.title,
        avatar: data.snippet.thumbnails.high.url,
        description: data.snippet.description,
        subscribers: data.statistics.subscriberCount,
        videosCount: data.contentDetails?.relatedPlaylists?.uploads
          ? 0
          : undefined,
      };
    } catch (err) {
      setError("Ошибка при загрузке канала");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const fetchChannelVideos = async (channelId: string): Promise<Video[]> => {
    setLoading(true);
    setError(null);
    try {
      const results = await getChannelVideos(channelId);
      return results.map(
        (item: {
          id: { videoId: any };
          snippet: {
            title: any;
            thumbnails: { high: { url: any } };
            channelTitle: any;
            channelId: any;
          };
        }) => ({
          id: item.id.videoId,
          title: item.snippet.title,
          thumbnail: item.snippet.thumbnails.high.url,
          channel: item.snippet.channelTitle,
          channelId: item.snippet.channelId,
        })
      );
    } catch (err) {
      setError("Ошибка при загрузке видео канала");
      return [];
    } finally {
      setLoading(false);
    }
  };

  return {
    search,
    fetchVideo,
    fetchChannel,
    fetchChannelVideos,
    loading,
    error,
  };
};
