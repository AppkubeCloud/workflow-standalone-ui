"use client";
import React, { useState } from "react";
import { roboto } from "@/font/font";
import {
  AccountBookFilled,
  BellFilled,
  ProjectFilled,
  IdcardFilled,
  SignalFilled,
  SearchOutlined,
  VideoCameraOutlined,
  RightOutlined,
  LeftOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { Layout, Menu, Button } from "antd";
import Navbar from "@/Components/Navbar/Navbar";
import NavLink from "../nav-link";

const { Sider, Content } = Layout;

const MainLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSider = () => {
    setCollapsed(!collapsed);
  };
  const router = useRouter();
  return (
    <>
      <Layout theme="dark" style={{ minHeight: "100vh" }}>
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          theme="light"
          className="fixed "
          style={{ position: "fixed", height: "100vh", top: '64px' }}
        >
          
          {/* ... your existing Sider content */}
          <Menu
            className={`${roboto.className} relative`}
            theme="light"
            mode="inline"
            defaultSelectedKeys={["1"]}
            // selectedKeys={[router.pathname]}
            items={[
              {
                key: "1",
                icon: <ProjectFilled />,
                label: <NavLink href="/main">Dashboard</NavLink>,
              },
              {
                key: "2",
                icon: <VideoCameraOutlined />,
                label: <NavLink href="/main/projects">Projects</NavLink>,
              },
              {
                key: "3",
                icon: <SignalFilled />,
                label: "Team",
              },
              {
                key: "4",
                icon: <IdcardFilled />,
                label: "Reports",
              },
              {
                key: "5",
                icon: <AccountBookFilled />,
                label: "Preference",
              },
              {
                key: "6",
                icon: <BellFilled />,
                label: "Notifications",
              },
            ]}
          />
          <Button
            theme="dark"
            className="bg-white absolute top-2/4 -right-3"
            type="text"
            icon={collapsed ? <RightOutlined className="" /> : <LeftOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 16,
              height: 64,
              clipPath: `polygon(0 0, 100% 21%, 99% 80%, 0% 100%)`,
            }}
          />
        </Sider>
        <Layout
          className={`${collapsed ? 'site-layout left-collapsed' : 'site-layout'}`}
          style={{ marginLeft: collapsed ? 80 : 200 }}
        >
          <Navbar />
          <Content
            style={{ margin: "0px 0px", padding: "0px 4px", minHeight: 280 }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default MainLayout;
