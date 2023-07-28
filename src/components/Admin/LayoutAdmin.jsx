/** @format */
import "./LayoutAdmin.scss";

import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DownOutlined,
} from "@ant-design/icons";
import { FaBook, FaReact, FaRegUserCircle } from "react-icons/fa";
import { LuLayoutDashboard } from "react-icons/lu";
import { RiMoneyPoundCircleLine } from "react-icons/ri";

import { useState } from "react";
import {
  Layout,
  Menu,
  Button,
  theme,
  Dropdown,
  Space,
  message,
  Avatar,
} from "antd";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { postLogout } from "../../services/apiService";
import { useDispatch, useSelector } from "react-redux";
import { doLogoutAction } from "../../redux/account/accountSlice";
import { useEffect } from "react";

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem(<Link to="/admin">DashBoard</Link>, "/admin", <LuLayoutDashboard />),
  getItem(<label>Manage User</label>, "manageUser", <FaRegUserCircle />, [
    getItem(<Link to="/admin/user">CRUD</Link>, "/admin/user"),
  ]),
  getItem(<Link to="/admin/book">Manage Book</Link>, "/admin/book", <FaBook />),
  getItem(
    <Link to="/admin/order">Manage Orders</Link>,
    "/admin/order",
    <RiMoneyPoundCircleLine />
  ),
];

const LayoutAdmin = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const { Header, Sider, Content, Footer } = Layout;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const account = useSelector((state) => state.account);
  const url = `${import.meta.env.VITE_BACKEND_URL}/images/avatar/${
    account.user.avatar
  }`;

  let location = useLocation();
  const [current, setCurrent] = useState(location.pathname);

  const handleLogout = async () => {
    const res = await postLogout();
    if (res && res.data) {
      message.success("Đăng xuất thành công");
      dispatch(doLogoutAction());
      navigate("/");
    }
  };

  const itemsAccount = [
    {
      label: <label onClick={() => navigate("/")}>Trang chủ</label>,
      key: "0",
    },
    {
      label: <label>Thông tin tài khoản</label>,
      key: "1",
    },
    {
      label: <label onClick={handleLogout}>Đăng xuất</label>,
      key: "2",
    },
  ];
  useEffect(() => {
    if (location) {
      if (current !== location.pathname) {
        setCurrent(location.pathname);
      }
    }
  }, [location, current]);
  return (
    <div className="admin-layout-container">
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="demo-logo-vertical">
            <span>
              <FaReact />
            </span>
            <div>Admin</div>
          </div>
          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={current}
            items={items}
          />
        </Sider>
        <Layout>
          <Header
            style={{
              padding: 0,
              background: colorBgContainer,
            }}
          >
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />
            <Dropdown
              menu={{
                items: itemsAccount,
              }}
              trigger={["click"]}
            >
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  <Avatar src={url} /> {account?.user?.fullName}
                  <DownOutlined />
                </Space>
              </a>
            </Dropdown>
          </Header>
          <Content
            style={{
              padding: "24px 16px",
              minHeight: 280,
              background: colorBgContainer,
            }}
          >
            <Outlet />
          </Content>
          {/* <Footer
            style={{
              textAlign: "center",
            }}
          >
            Ant Design ©2023 Created by Duc-cute
          </Footer> */}
        </Layout>
      </Layout>
    </div>
  );
};
export default LayoutAdmin;
