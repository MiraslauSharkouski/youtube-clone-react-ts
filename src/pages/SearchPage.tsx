interface ChannelPageProps {
  params: {
    id: string;
  };
}

const ChannelPage = ({ params }: ChannelPageProps) => {
  return <div>Канал с ID: {params.id}</div>;
};
export default ChannelPage;
