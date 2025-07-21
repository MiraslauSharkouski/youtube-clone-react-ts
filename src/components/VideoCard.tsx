import { Link } from "react-router-dom";
import { Card } from "antd";

interface VideoCardProps {
  video: {
    id: string;
    title: string;
    thumbnail: string;
    channel: string;
    views?: string;
  };
}

const VideoCard = ({ video }: VideoCardProps) => {
  return (
    <Link to={`/video/${video.id}`}>
      <Card
        cover={
          <img
            src={video.thumbnail}
            alt={video.title}
            style={{ width: "100%" }}
          />
        }
        title={video.title}
        style={{ width: 300, margin: 10 }}
      >
        <div>{video.channel}</div>
        {video.views && <div>{video.views} просмотров</div>}
      </Card>
    </Link>
  );
};

export default VideoCard;
