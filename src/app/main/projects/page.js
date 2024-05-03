"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  PlusSquareFilled,
  DownOutlined,
  SettingOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { addProjectId } from "@/Context/AddresourcesSlice/addresourcesSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { addResources } from "@/Context/AddresourcesSlice/addresourcesSlice";
import {
  Avatar,
  Space,
  Button,
  Card,
  Typography,
  Col,
  Row,
  Dropdown,
  message,
  Menu,
  Breadcrumb,
  Skeleton,
} from "antd";
import axios from "axios";
import { Pagination } from "antd";

import { InProgress, Completed, Unassigned } from "@/Components/Badges";
import api from "@/api";
import Meta from "antd/es/card/Meta";
import Image from "next/image";
import slice from "@/Context/Slice";
import { MdOutlineWatchLater } from "react-icons/md";

import {
  updateId,
  updateProjectName,
} from "@/Context/AddNewProjectSlice/addProjectSlice";
import { useRouter } from "next/navigation";
import { notosans } from "@/font/font";
// import { useDispatch } from "react-redux";

const { Title, Paragraph, Text } = Typography;

const ProjectLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [data, setData] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const route = useRouter();

  const getData = async () => {
    try {
      setIsLoading(true);
      const response = await api.get("/project");
      setIsLoading(false);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching data: ", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await getData();
      setData(result.projects);
    };
    fetchData();
  }, []);

  const toggleSider = () => {
    setCollapsed(!collapsed);
  };

  const handleMenuClick = (e) => {
    setSelectedStatus(e.key === "all" ? null : e.key);
  };

  const capitalizeText = (text) => {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  };

  const dropdownText = selectedStatus
    ? `${capitalizeText(selectedStatus)}`
    : "All Projects";

  const menuProps = {
    onClick: handleMenuClick,
  };

  // const filteredData = selectedStatus
  //   ? data.filter((item) => item.status.toLowerCase() === selectedStatus)
  //   : data;

  // const filteredData = data.filter((item) => {
  //   const matchesStatus =
  //     !selectedStatus || item.status.toLowerCase() === selectedStatus;
  //   const matchesSearch =
  //     item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     item.description.toLowerCase().includes(searchTerm.toLowerCase());
  //   return matchesStatus && matchesSearch;
  // });
  console.log("FetchData ", data);
  const filteredData = data.filter((item) => {
    const statusLowerCase = item.status ? item.status.toLowerCase() : null;

    const matchesStatus =
      !selectedStatus ||
      (statusLowerCase && statusLowerCase === selectedStatus);

    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.description &&
        item.description.toLowerCase().includes(searchTerm.toLowerCase()));

    return matchesStatus && matchesSearch;
  });

  const checkStatus = (status) => {
    switch (status.toLowerCase()) {
      case "inprogress":
        return <InProgress />;
      case "completed":
        return <Completed />;
      case "unassigned":
        return <Unassigned />;
      default:
        return null;
    }
  };

  // const totalItems = filteredData.length;
  // const itemsPerPage = 8;
  // const totalPages = Math.ceil(totalItems / itemsPerPage);

  // const paginatedData = filteredData.slice(
  //   (currentPage - 1) * itemsPerPage,
  //   currentPage * itemsPerPage
  // );
  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  // const totalItems = filteredData.length;
  // const paginatedData = filteredData.slice(
  //   (currentPage - 1) * itemsPerPage,
  //   currentPage * itemsPerPage
  // );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset page when search term changes
  };
  const dispatch = useDispatch();
  const ProjectId = (id) => {
    dispatch(updateId(id));
    dispatch(addProjectId(id));
  };
  const updateProjectNames = (name) => {
    dispatch(updateProjectName(name));
  };

  const handleProjectIdUpdate = (id, name) => {
    // ProjectId(id);
    // updateProjectNames(name)
    route.push("/main/projects/workflowlist");
  };

  return (
    <>
      <div style={{ margin: "0px", padding: "0px", minHeight: 280 }}>
        <div className="bg-white px-5 py-5 space-y-3 mb-6">
          <Breadcrumb
            items={[
              {
                title: <a href="/main">Home</a>,
              },
              {
                title: "Projects Overview",
              },
            ]}
          />
          <h1 className={`${notosans.className} capitalize text-2xl`}>
            Projects Overview
          </h1>
          <Row className="flex items-center justify-center">
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={handleSearchChange}
              className={`${notosans.className} border-[1.5px] shadow-slate-400 rounded-none border-gray-900 border-r-0 p-1 w-[38vw] focus:border focus:border-gray-400 focus:outline-none rounded-l transition duration-300`}
            />
            <Button
              type="primary"
              className={`${notosans.className} rounded-none py-1 px-4 bg-[#1890FF] hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 cursor-default text-white hover:text-white`}
            >
              <SettingOutlined className="mr-3" />
              Search
            </Button>
          </Row>
        </div>
        <div className="px-5">
          <div className="bg-white flex flex-row justify-between items-center py-4 px-5 mb-4">
            <Dropdown
              className="border border-gray-300 rounded-none p-2"
              overlay={
                <Menu onClick={handleMenuClick}>
                  <Menu.Item key="all" className={`${notosans.className} `}>
                    All Projects
                  </Menu.Item>
                  <Menu.Item
                    key="inprogress"
                    className={`${notosans.className} `}
                  >
                    In Progress
                  </Menu.Item>
                  <Menu.Item
                    key="completed"
                    className={`${notosans.className} `}
                  >
                    Completed
                  </Menu.Item>
                  <Menu.Item
                    key="unassigned"
                    className={`${notosans.className} `}
                  >
                    Unassigned
                  </Menu.Item>
                </Menu>
              }
            >
              <a key="all" onClick={(e) => e.preventDefault()}>
                <Space>
                  {dropdownText}
                  <DownOutlined />
                </Space>
              </a>
            </Dropdown>
            <div
              className={`${notosans.className} flex items-center space-x-60`}
            >
              <Link
                className="py-2 px-4 bg-blue-500 text-white  hover:bg-blue-700 hover:text-white"
                href="/main/projects/addNewProject"
              >
                {" "}
                <PlusOutlined className={`${notosans.className} mr-4`} />
                Create Project
              </Link>
            </div>
          </div>
          <Row gutter={16}>
            {isLoading ? (
              Array.from({ length: 8 }).map((_, index) => (
                // <Skeleton.Node active headerFontSize={22} bordered={false}>
                //   <Card headerFontSize={22} bordered={false}>
                //     <Skeleton active />
                //   </Card>
                // </Skeleton.Node>
                <Skeleton.Node
                  active
                  style={{
                    width: "220px",
                    height: "200px",
                    padding: "0.2rem",
                    margin: "0.5rem",
                  }}
                >
                  <Col span={8} className="mb-4" key={index}>
                    <Skeleton active />
                  </Col>
                </Skeleton.Node>
              ))
            ) : (
              <>
                {paginatedData.map((item, index) => (
                  <Col span={6} className="mb-4" key={index}>
                    <Card
                      headerFontSize={22}
                      bordered={false}
                      className="cursor-pointer"
                      onClick={() => {
                        ProjectId(item.id),
                          updateProjectNames(item.name),
                          handleProjectIdUpdate(item.id, item.name);
                        // ProjectId(item.id);
                        // updateProjectNames(item.name)
                      }}
                      style={{ borderRadius: "0px" }}
                      bodyStyle={{ padding: "0px" }}
                    >
                      <Meta
                        avatar={
                          <Avatar
                            className={`${notosans.className} bg-blue-200 rounded-full p-2`}
                            src={item.image_url}
                            size={34}
                            shape="square"
                          />
                        }
                        title={item.name}
                        className={`${notosans.className} text-lg flex align-middle`}
                        style={{ padding: "15px 20px" }}
                      />
                      <div
                        className={`${notosans.className} w-full h-[2px] bg-gray-100`}
                      ></div>
                      <div
                        className="w-full d-block"
                        style={{ padding: "15px 20px 20px" }}
                      >
                        <div
                          className={`${notosans.className} flex flex-row justify-start items-center p-0 mt-2`}
                        >
                          <Text className={`${notosans.className} text-xl`}>
                            Total Use cases : {item.total_usecases}
                          </Text>
                        </div>
                        <div
                          className={`${notosans.className} flex flex-row justify-start items-center mt-2 mb-3`}
                        >
                          <h4 className={`${notosans.className}`}>
                            {item.total_resources} Use cases in Progress
                          </h4>
                        </div>
                        <div className="flex ">
                          <MdOutlineWatchLater className="size-5" />
                          <div className={`${notosans.className} pl-1 pb-2`}>
                            7 Days
                          </div>
                        </div>
                        <div
                          className={`${notosans.className} flex items-center justify-between`}
                        >
                          <div
                            className={`${notosans.className} flex flex-row justify-start items-center pt-1`}
                          >
                            {checkStatus(item.status)}
                          </div>

                          <Avatar.Group className="flex">
                            <Avatar src="{}" />
                            <Avatar src="{}" />
                            <Avatar src="{}" />
                          </Avatar.Group>
                        </div>
                      </div>
                    </Card>
                  </Col>
                ))}
              </>
            )}
          </Row>
          <Row>
            <div className="flex ml-auto mb-3">
              <Pagination
                total={totalItems}
                showTotal={(totalItems, range) =>
                  `${range[0]}-${range[1]} of ${totalItems} items`
                }
                pageSize={itemsPerPage}
                current={currentPage}
                onChange={handlePageChange}
                className={`${notosans.className} flex justify-end`}
              />
            </div>
          </Row>
        </div>
      </div>
    </>
  );
};

export default ProjectLayout;
