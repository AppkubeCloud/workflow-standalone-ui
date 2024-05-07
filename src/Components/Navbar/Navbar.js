"use client";
import React from "react";
import { UserOutlined, BellOutlined, SearchOutlined } from "@ant-design/icons";
import { Layout, Badge, Avatar, Input, Button } from "antd";
const { Header } = Layout;
import "./style.css";

const Navbar = () => {
  return (
    <>
      <Header className="flex flex-row items-center justify-between w-full header">
        <h5 className="uppercase bg-[#001529] text-white text-2xl p-4">
          Synectiks
        </h5>
        <Input
          style={{ width: "250px", marginLeft: "auto", marginRight: "20px" }}
          placeholder="search"
          suffix={<SearchOutlined />}
        />
        <div className="right-menu-wrapper">
          <div className="flex flex-row items-center justify-between gap-1">
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
              <BellOutlined size={36} style={{ color: "#ffffff" }} />
            </Badge>
            <Avatar
              size={36}
              icon={<UserOutlined />}
              style={{
                width: "24px",
                height: "24px",
                lineHeight: "24px",
                marginLeft: "20px",
              }}
            />
            <Button
              size="small"
              style={{ color: "#ffffff", border: "none", padding: "0px" }}
            >
              Angela
            </Button>
          </div>
        </div>
      </Header>
    </>
  );
};

export default Navbar;
