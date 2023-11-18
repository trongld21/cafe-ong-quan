import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  LineChartOutlined,
  ShoppingCartOutlined,
  CoffeeOutlined
} from "@ant-design/icons";
import { Layout, Menu, Button, theme } from "antd";
import { useRouter } from "next/router";
import { signOut } from "next-auth/react"
const { Header, Sider, Content } = Layout;

function AdminLayout({ children }) {
  const router = useRouter();
  const [active, setActive] = useState(router.asPath.split("/")[2] || "");
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
              onClick: () => handleItemClick("thu-chi"),
            },
            {
              key: "thu-chi-quan",
              icon: <LineChartOutlined />,
              label: "Thu Chi Quán",
              onClick: () => handleItemClick("thu-chi-quan"),
            },
            {
              key: "nhap-thu-chi",
              icon: <VideoCameraOutlined />,
              label: "Nhập Thu Chi",
              onClick: () => handleItemClick("nhap-thu-chi"),
            },
            {
              key: "nhan-vien",
              icon: <UploadOutlined />,
              label: "Nhân Viên",
              onClick: () => handleItemClick("nhan-vien"),
            },
            {
              key: "ingredient",
              icon: <CoffeeOutlined />,
              label: "Nguyên liệu",
              onClick: () => handleItemClick("ingredient"),
            },
            {
              key: "ingredient/history",
              icon: <ShoppingCartOutlined />,
              label: "Quản lý kho",
              onClick: () => handleItemClick("ingredient/history"),
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          className="justify-between flex items-center"
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
          <Button className="mr-4" onClick={() => signOut()}>Đăng Xuất</Button>
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
