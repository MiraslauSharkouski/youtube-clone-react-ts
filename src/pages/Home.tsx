import { useEffect, useState } from "react";
import VideoCard from "../components/VideoCard";
import { useYouTubeAPI } from "../hooks/useYouTubeAPI";
import SkeletonLoader from "../components/SkeletonLoader";
import  FavoriteButton from '../components/FavoriteButton'

const Home = () => {
  const { search, loading, error } = useYouTubeAPI();
  const [videos, setVideos] = useState<any[]>([]);

  useEffect(() => {
    const fetchPopularVideos = async () => {
      const results = await search("popular");
      setVideos(results.videos);
    };

    fetchPopularVideos();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Популярные видео</h2>
      {loading && <SkeletonLoader />}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {videos.map((video) => (
          <VideoCard key={video.id} video={video} />
          <FavoriteButton video={video} user={user} />
        ))}
      </div>
    </div>
  );
};

export default Home;
