/** @format */
import "./LayoutAdmin.scss";

import {
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DownOutlined,
} from "@ant-design/icons";
import { FaBook, FaReact, FaRegUserCircle } from "react-icons/fa";
import { LuLayoutDashboard } from "react-icons/lu";
import { RiMoneyPoundCircleLine } from "react-icons/ri";

import { useState } from "react";
import { Layout, Menu, Button, theme, Dropdown, Space } from "antd";
import { Outlet } from "react-router-dom";

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem(<label>DashBoard</label>, "1", <LuLayoutDashboard />),
  getItem(<label>Manage User</label>, "sub1", <FaRegUserCircle />, [
    getItem(<label>CRUD</label>, "3"),
    getItem(<label>Alex</label>, "5"),
  ]),
  getItem(<label>Manage Book</label>, "sub2", <FaBook />),
  getItem(<label>Manage Orders</label>, "9", <RiMoneyPoundCircleLine />),
];

const itemsAccount = [
  {
    label: "Thông tin tài khoản",
    key: "0",
  },
  {
    label: "Đăng xuất",
    key: "1",
  },
];

const LayoutAdmin = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const { Header, Sider, Content, Footer } = Layout;

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
            defaultSelectedKeys={["1"]}
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
                  Welcome I'm Admin
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
