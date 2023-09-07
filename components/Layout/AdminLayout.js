import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme } from "antd";
import { useRouter } from "next/router";
const { Header, Sider, Content } = Layout;

function AdminLayout({ children }) {
  const router = useRouter()
  const [active, setActive] = useState(router.asPath.split('/')[2] || '');
  console.log("🚀 ~ file: AdminLayout.js:16 ~ AdminLayout ~ active:", active)
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleItemClick = (name) => {
    setActive(name);
    router.push(`/admin/${name}`);
};
  
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="light"
          mode="inline"
          className="min-h-screen"
          defaultSelectedKeys={[active]}
          items={[
            {
              key: "thu-chi",
              icon: <UserOutlined />,
              label: "Thu Chi",
              onClick: () => handleItemClick('thu-chi')
            },
            {
              key: "nhap-thu-chi",
              icon: <VideoCameraOutlined />,
              label: "Nhập Thu Chi",
              onClick: () => handleItemClick('nhap-thu-chi')
            },
            {
              key: "3",
              icon: <UploadOutlined />,
              label: "nav 3",
            },
          ]}
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
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}

export default AdminLayout;
