import { useEffect, useState } from "react";
import VideoCard from "../components/VideoCard";
import { useYouTubeAPI } from "../hooks/useYouTubeAPI";
import SkeletonLoader from "../components/SkeletonLoader";
import FavoriteButton from "../components/FavoriteButton";
import { onAuthChange } from "../services/firebaseService";
import { User } from "firebase/auth";

const Home = () => {
  const { search, loading, error } = useYouTubeAPI();
  const [videos, setVideos] = useState<any[]>([]);
  const [user, setUser] = useState<User | null>(null);

  // Подписываемся на изменение авторизации
  useEffect(() => {
    const unsubscribe = onAuthChange(setUser);
    return () => unsubscribe(); // Отписка при размонтировании
  }, []);

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
          <div
            key={video.id}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <VideoCard video={video} />
            <FavoriteButton video={video} user={user} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
