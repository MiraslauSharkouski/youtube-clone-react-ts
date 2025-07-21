import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import VideoCard from "../components/VideoCard";
import { useYouTubeAPI } from "../hooks/useYouTubeAPI";

const ChannelPage = () => {
  const { id } = useParams<{ id: string }>();
  const { fetchChannel, fetchChannelVideos } = useYouTubeAPI();
  const [channel, setChannel] = useState<any>(null);
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadChannel = async () => {
      if (id) {
        const channelData = await fetchChannel(id);
        setChannel(channelData);
        const channelVideos = await fetchChannelVideos(id);
        setVideos(channelVideos);
        setLoading(false);
      }
    };

    loadChannel();
  }, [id]);

  return (
    <div style={{ padding: 20 }}>
      {loading ? (
        <SkeletonLoader />
      ) : channel ? (
        <>
          <div style={{ display: "flex", gap: 20, marginBottom: 20 }}>
            <img src={channel.avatar} alt={channel.name} width="100" />
            <div>
              <h2>{channel.name}</h2>
              <p>{channel.description}</p>
              <p>Подписчиков: {channel.subscribers}</p>
            </div>
          </div>
          <h3>Видео канала</h3>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {videos.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        </>
      ) : (
        <p>Канал не найден</p>
      )}
    </div>
  );
};

export default ChannelPage;
