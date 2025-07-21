import { useState } from "react";
import { Input, Tabs } from "antd";
import VideoCard from "../components/VideoCard";
import { useYouTubeAPI } from "../hooks/useYouTubeAPI";
import SkeletonLoader from "../components/SkeletonLoader";

const { TabPane } = Tabs;

const SearchPage = () => {
  const { search } = useYouTubeAPI();
  const [query, setQuery] = useState("");
  const [videos, setVideos] = useState<any[]>([]);
  const [channels, setChannels] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (value: string) => {
    if (!value) return;
    setLoading(true);
    const results = await search(value);
    setVideos(results.videos);
    setChannels(results.channels);
    setLoading(false);
  };

  return (
    <div style={{ padding: 20 }}>
      <Input.Search
        placeholder="Поиск видео или каналов"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onSearch={handleSearch}
        style={{ marginBottom: 20, width: "100%" }}
      />
      <Tabs defaultActiveKey="1">
        <TabPane tab="Видео" key="1">
          {loading ? (
            <SkeletonLoader />
          ) : (
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {videos.map((video) => (
                <VideoCard key={video.id} video={video} />
              ))}
            </div>
          )}
        </TabPane>
        <TabPane tab="Каналы" key="2">
          {loading ? (
            <SkeletonLoader />
          ) : (
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {channels.map((channel) => (
                <div key={channel.id} style={{ margin: 10 }}>
                  <img src={channel.avatar} alt={channel.name} width="100" />
                  <div>{channel.name}</div>
                </div>
              ))}
            </div>
          )}
        </TabPane>
      </Tabs>
    </div>
  );
};

export default SearchPage;
