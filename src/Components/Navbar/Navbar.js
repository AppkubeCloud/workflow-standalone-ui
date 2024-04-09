// 'use client'
// import React from 'react'
// import {
//   CaretUpFilled,
//   MenuFoldOutlined,
//   MenuUnfoldOutlined,
//   UploadOutlined,
//   UserOutlined,
//   CaretLeftFilled,
//   CaretRightFilled,
//   AccountBookFilled,
//   BellFilled,
//   ProjectFilled,
//   IdcardFilled,
//   SignalFilled,
//   SearchOutlined,
//   VideoCameraOutlined,
//   RightOutlined,
//   LeftOutlined,
//   QuestionCircleOutlined,
//   BellOutlined,
// } from '@ant-design/icons';
// import { Layout, Menu, Button, Input, Badge, Avatar, theme, Card, Row, Col } from 'antd';
// const { Header } = Layout;
// const Navbar = () => {
//   return (
//     <>
//       <Header className='flex flex-row items-center justify-between w-full'
//         style={{ padding: 32, position: 'sticky', top: 0, right: 0, zIndex: 10 }}>
//         {/* <Button theme="light" className='w-1/3' icon={<SearchOutlined />}>Search</Button> */}
//         <Row gutter={18} justify="end" align='middle' className='w-full'>
//           <Col span={6} offset={4}>
//             <Input
//               placeholder="Search"
//               suffix={<SearchOutlined />}
//               style={{
//                 borderRadius: '20px',
//                 width: '550px'
//               }}
//             />
//           </Col>
//           <Col span={6} offset={8}>
//             <div className="flex items-center gap-4">
//               <QuestionCircleOutlined style={{ color: '#888', fontSize: '20px' }} />
//               <Badge count={1} style={{ fontSize: '12px', width: '20px', height: '20px', lineHeight: '20px' }}>
//                 <BellOutlined style={{ color: '#888', fontSize: '20px' }} />
//               </Badge>
//               <Avatar size={40} icon={<UserOutlined />} />
//             </div>
//           </Col>
//         </Row>
//       </Header>
//     </>
//   )
// }

// export default Navbar
"use client";
import React from "react";
import {
  CaretUpFilled,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  CaretLeftFilled,
  CaretRightFilled,
  AccountBookFilled,
  BellFilled,
  ProjectFilled,
  IdcardFilled,
  SignalFilled,
  SearchOutlined,
  VideoCameraOutlined,
  RightOutlined,
  LeftOutlined,
  QuestionCircleOutlined,
  BellOutlined,
} from "@ant-design/icons";
import {
  Layout,
  Menu,
  Button,
  Input,
  Badge,
  Avatar,
  theme,
  Card,
  Dropdown,
} from "antd";
import { removeAccessToken } from "@/utils/getAccessToken";
const { Item } = Menu;
const { Header } = Layout;
import { useRouter } from "next/navigation";
const Navbar = () => {
  const router = useRouter();
  const handleLogout = () => {
    // Clear cookie or local storage here
    removeAccessToken();
    // Navigate to login page
    router.push("/");
  };
  const menu = (
    <Menu>
      <Item key="logout" onClick={handleLogout}>
        Logout
      </Item>
    </Menu>
  );
  return (
    <>
      <Header
        className="flex flex-row items-center justify-between w-full "
        style={{
          padding: 32,
          position: "sticky",
          top: 0,
          right: 0,
          zIndex: 10,
        }}
      >
        <div className="w-11"></div>
        {/* <Button theme="light" className='w-1/3' icon={<SearchOutlined />}>Search</Button> */}
        <Input
          style={{ width: "550px" }}
          placeholder="search"
          suffix={<SearchOutlined />}
        />
        <div className="right-menu-wrapper">
          <div className="flex flex-row items-center justify-between gap-9">
            <QuestionCircleOutlined
              size={56}
              className="w-5"
              style={{ color: "#fff" }}
            />
            <Badge
              count={1}
              style={{
                fontSize: "12px",
                width: "20px",
                height: "20px",
                lineHeight: "20px",
              }}
            >
              <BellOutlined size={64} style={{ color: "#fff" }} />
            </Badge>
            <Dropdown
              overlay={menu}
              placement="bottomRight"
              arrow={{ pointAtCenter: true }}
              trigger={["click"]}
            >
              <button>
                <div>
                  <Avatar size={56} icon={<UserOutlined />} />
                </div>
              </button>
            </Dropdown>
          </div>
        </div>
      </Header>
    </>
  );
};

export default Navbar;
