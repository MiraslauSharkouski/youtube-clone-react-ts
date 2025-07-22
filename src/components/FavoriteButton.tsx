import { Button } from "antd";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import { useState, useEffect } from "react";
import {
  addToFavorites,
  removeFromFavorites,
  getFavorites,
} from "../services/firebaseService";

interface FavoriteButtonProps {
  video: {
    id: string;
    title: string;
    thumbnail: string;
  };
  user: any;
}

const FavoriteButton = ({ video, user }: FavoriteButtonProps) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const checkFavorite = async () => {
      const favorites = await getFavorites(user.uid);
      setIsFavorite(favorites.some((v) => v.id === video.id));
    };

    if (user) {
      checkFavorite();
    }
  }, [user, video.id]);

  const toggleFavorite = async () => {
    if (isFavorite) {
      await removeFromFavorites(user.uid, video.id);
    } else {
      await addToFavorites(user.uid, video);
    }
    setIsFavorite(!isFavorite);
  };

  return (
    <Button
      icon={isFavorite ? <HeartFilled /> : <HeartOutlined />}
      onClick={toggleFavorite}
      style={{ marginLeft: 10 }}
    >
      {isFavorite ? "Удалить из избранного" : "Добавить в избранное"}
    </Button>
  );
};

export default FavoriteButton;
