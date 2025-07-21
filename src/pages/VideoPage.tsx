interface VideoPageProps {
  params: {
    id: string;
  };
}

const VideoPage = ({ params }: VideoPageProps) => {
  return <div>Видео с ID: {params.id}</div>;
};
export default VideoPage;
