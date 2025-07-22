import { useState, useEffect } from "react";
import { Button, Avatar, Dropdown, Menu } from "antd";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import {
  onAuthChange,
  signInWithGoogle,
  logout,
} from "../services/firebaseService";

interface AuthButtonProps {
  onLogin: (user: any) => void;
  onLogout: () => void;
}

const AuthButton = ({ onLogin, onLogout }: AuthButtonProps) => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = onAuthChange((firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        onLogin(firebaseUser);
      } else {
        setUser(null);
        onLogout();
      }
    });

    return () => unsubscribe();
  }, [onLogin, onLogout]);

  const handleLogin = async () => {
    const user = await signInWithGoogle();
    if (user) {
      setUser(user);
      onLogin(user);
    }
  };

  const handleLogout = async () => {
    await logout();
    setUser(null);
    onLogout();
  };

  const menu = (
    <Menu>
      <Menu.Item key="logout" icon={<LogoutOutlined />}>
        <span onClick={handleLogout}>Выход</span>
      </Menu.Item>
    </Menu>
  );

  return (
    <div>
      {user ? (
        <Dropdown overlay={menu} trigger={["click"]}>
          <Avatar
            src={user.photoURL}
            alt={user.displayName}
            icon={<UserOutlined />}
            style={{ cursor: "pointer" }}
          />
        </Dropdown>
      ) : (
        <Button onClick={handleLogin}>Войти через Google</Button>
      )}
    </div>
  );
};

export default AuthButton;
