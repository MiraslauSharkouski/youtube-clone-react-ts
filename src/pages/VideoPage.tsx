import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import VideoPlayer from "../components/VideoPlayer";
import CommentForm from "../components/CommentForm";
import CommentItem from "../components/CommentItem";
import SkeletonLoader from "../components/SkeletonLoader";
import { useYouTubeAPI } from "../hooks/useYouTubeAPI";
import {
  onAuthChange,
  getCommentsByVideoId,
  addComment,
} from "../services/firebaseService";
import { User } from "firebase/auth";

const VideoPage = () => {
  const { id } = useParams<{ id: string }>();
  const { fetchVideo } = useYouTubeAPI();
  const [video, setVideo] = useState<any>(null);
  const [comments, setComments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const loadVideo = async () => {
      if (id) {
        const data = await fetchVideo(id);
        setVideo(data);
      }
    };

    const loadComments = async () => {
      if (id) {
        const commentList = await getCommentsByVideoId(id);
        setComments(commentList);
      }
    };

    const unsubscribe = onAuthChange(setUser);

    loadVideo();
    loadComments();
    setLoading(false);

    return () => unsubscribe();
  }, [id]);

  const handleAddComment = async (text: string) => {
    if (!user || !id) return;
    await addComment(id, user, text);
    const updatedComments = await getCommentsByVideoId(id);
    setComments(updatedComments);
  };

  return (
    <div style={{ padding: 20 }}>
      {loading ? (
        <SkeletonLoader />
      ) : video ? (
        <>
          <VideoPlayer videoId={video.id} />
          <h2>{video.title}</h2>
          <p>{video.description}</p>
          <h3>Комментарии</h3>
          {user ? (
            <CommentForm onAddComment={handleAddComment} user={user} />
          ) : (
            <p>Войдите, чтобы оставить комментарий</p>
          )}
          {comments.length > 0 ? (
            comments.map((comment, index) => (
              <CommentItem key={index} comment={comment} />
            ))
          ) : (
            <p>Нет комментариев</p>
          )}
        </>
      ) : (
        <p>Видео не найдено</p>
      )}
    </div>
  );
};

export default VideoPage;
