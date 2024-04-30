"use client";
import React from "react";
import { UserOutlined, BellOutlined } from "@ant-design/icons";
import { Layout, Badge, Avatar } from "antd";
const { Header } = Layout;
import "./style.css";

const Navbar = () => {
  return (
    <>
      <Header className="flex flex-row items-center justify-between w-full header">
        <h5 className="uppercase bg-[#001529] text-white text-2xl p-4">
          Synectiks
        </h5>
        <div className="w-11"></div>
        {/* <Button theme="light" className='w-1/3' icon={<SearchOutlined />}>Search</Button> */}
        {/* <Input style={{ width: '550px' }} placeholder="search" suffix={<SearchOutlined />} /> */}
        <div className="right-menu-wrapper">
          <div className="flex flex-row items-center justify-between gap-4">
            {/* <QuestionCircleOutlined size={56} className='w-5' style={{ color: "#fff" }} /> */}
            <Badge
              count={1}
              style={{
                fontSize: "10px",
                width: "14px",
                height: "14px",
                lineHeight: "14px",
                minWidth: "14px",
                boxShadow: "none",
              }}
            >
              <BellOutlined size={36} style={{ color: "#fff" }} />
            </Badge>
            <Avatar size={36} icon={<UserOutlined />} />
          </div>
        </div>
      </Header>
    </>
  );
};

export default Navbar;
