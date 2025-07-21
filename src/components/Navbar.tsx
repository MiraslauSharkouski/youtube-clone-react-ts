import { Link } from "react-router-dom";
import { Layout, Menu } from "antd";

const { Header } = Layout;

const Navbar = () => {
  return (
    <Header>
      <div
        style={{
          color: "white",
          fontSize: 20,
          fontWeight: "bold",
          float: "left",
        }}
      >
        YouTube Clone
      </div>
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
        <Menu.Item key="1">
          <Link to="/">Главная</Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to="/search">Поиск</Link>
        </Menu.Item>
      </Menu>
    </Header>
  );
};

export default Navbar;
