import { Avatar, Card, Typography } from "antd";

interface CommentItemProps {
  comment: {
    author: string;
    authorPhoto?: string | null;
    text: string;
    timestamp: Date;
  };
}

const CommentItem = ({ comment }: CommentItemProps) => {
  return (
    <Card style={{ marginBottom: 10 }}>
      <div style={{ display: "flex", gap: 10 }}>
        <Avatar src={comment.authorPhoto} alt={comment.author} />
        <div>
          <Typography.Text strong>{comment.author}</Typography.Text>
          <div>{comment.text}</div>
          <Typography.Text type="secondary" style={{ fontSize: 12 }}>
            {new Date(comment.timestamp).toLocaleString()}
          </Typography.Text>
        </div>
      </div>
    </Card>
  );
};

export default CommentItem;
