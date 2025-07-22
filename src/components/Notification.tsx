import { useEffect } from "react";
import { message } from "antd";

interface NotificationProps {
  text: string;
  type: "success" | "error" | "info";
}

const Notification = ({ text, type }: NotificationProps) => {
  useEffect(() => {
    message[type](text);
  }, [text, type]);

  return null;
};

export default Notification;
