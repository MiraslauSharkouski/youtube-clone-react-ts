export interface Video {
  id: string;
  title: string;
  description?: string;
  thumbnail: string;
  channel: string;
  channelId: string;
  views?: string;
  publishedAt?: string;
}

export interface Channel {
  id: string;
  name: string;
  avatar: string;
  description?: string;
  subscribers?: string;
  videosCount?: number;
}
