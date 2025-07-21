import { useState } from "react";
import { Button, Input, Form } from "antd";

interface CommentFormProps {
  videoId: string;
  onAddComment: (text: string) => void;
}

const CommentForm = ({ videoId, onAddComment }: CommentFormProps) => {
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAddComment(text);
      setText("");
    }
  };

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
