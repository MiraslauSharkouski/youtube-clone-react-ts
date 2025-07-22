import { useState } from "react";
import { Button, Input, Form } from "antd";

interface CommentFormProps {
  onAddComment: (text: string) => void;
  user: {
    displayName: string | null;
    photoURL?: string | null;
  } | null;
}

const CommentForm = ({ onAddComment, user }: CommentFormProps) => {
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim() && user) {
      onAddComment(text);
      setText("");
    }
  };

  if (!user) {
    return <p>Войдите, чтобы оставить комментарий</p>;
  }

  return (
    <Form onSubmitCapture={handleSubmit} style={{ marginBottom: 20 }}>
      <Form.Item label="Ваш комментарий">
        <Input.TextArea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Оставьте комментарий..."
          rows={3}
        />
      </Form.Item>
      <Button type="primary" htmlType="submit" disabled={!text.trim()}>
        Отправить
      </Button>
    </Form>
  );
};

export default CommentForm;
