import React, { useState, useEffect } from "react";
import { Avatar, Card, Col, Row, Typography, Tooltip, Radio } from "antd";
import { UserOutlined } from "@ant-design/icons";
import api from "@/api";
import { notosans } from "@/font/font";

const { Title, Paragraph } = Typography;
const { Meta } = Card;
const getData = async () => {
  try {
    const response = await api.get("/projects_resource_overview");
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching data: ", error);
  }
};

const Resources = () => {
  const [size, setSize] = useState("All");
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/projects_resource_overview");
        console.log(response.data);
        setData(response.data);
        setFilteredData(response.data);
        console.log(response.data, "Satish");
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const filterData = async () => {
      try {
        if (size === "All Projects") {
          const response = await api.get("/projects_resource_overview");
          setFilteredData(response.data);
        } else {
          const response = await api.get(
            `/projects_resource_overview?status=${size.toLowerCase()}`
          );
          setFilteredData(response.data);
        }
      } catch (error) {
        console.error("Error fetching filtered data: ", error);
      }
    };

    filterData();
  }, [size]);

  return (
    <>
      <div style={{ background: "#FFF", padding: "15px" }}>
        <Row
          gutter={16}
          style={{ marginLeft: "0", marginRight: "0", alignItems: "center" }}
        >
          <Col
            className="gutter-row"
            lg={{ span: 12 }}
            md={{ span: 24 }}
            sm={{ span: 24 }}
            xs={{ span: 24 }}
          >
            <Title level={2} className={`${notosans.className} mb-0 text-2xl`}>
              Project Resources Lists
            </Title>
          </Col>
          <Col
            className="gutter-row"
            lg={{ span: 12 }}
            md={{ span: 24 }}
            sm={{ span: 24 }}
            xs={{ span: 24 }}
            style={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Radio.Group
              value={size}
              onChange={(e) => setSize(e.target.value)}
              defaultValue={size}
              style={{
                marginLeft: "auto",
              }}
            >
              <Radio.Button value="All" className={notosans.className}>
                All
              </Radio.Button>
              <Radio.Button value="In Progress" className={notosans.className}>
                In Progress
              </Radio.Button>
              <Radio.Button value="Completed" className={notosans.className}>
                Completed
              </Radio.Button>
            </Radio.Group>
          </Col>
        </Row>
        <Row
          gutter={[16, 24]}
          className="mt-4"
          style={{ marginLeft: "0", marginRight: "0" }}
        >
          {filteredData.map((item, index) => (
            <Col
              className="gutter-row"
              lg={{ span: 6 }}
              md={{ span: 8 }}
              sm={{ span: 12 }}
              xs={{ span: 24 }}
            >
              <Card
                bordered={false}
                style={{
                  boxShadow: "0px 1px 4px 0px #00000029",
                  borderRadius: "5px",
                  height: "100%",
                  marginBottom: "0px",
                }}
                bodyStyle={{ padding: "15px" }}
              >
                <Tooltip title={item.project_name} placement="bottomLeft">
                  <Title
                    level={4}
                    className={`${notosans.className} capitalize`}
                    style={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {item.project_name}
                  </Title>
                </Tooltip>
                <Meta
                  avatar={<Avatar src={item.image_url} />}
                  title={item.resource_name}
                  description={item.designation}
                  style={{ marginTop: "15px", marginBottom: "15px" }}
                />
                <Title level={5}>
                  Current Task
                  <span className={`${notosans.className}`}>
                    {item.current_task}
                  </span>
                </Title>
                <Paragraph
                  className={`${notosans.className}`}
                  style={{ marginBottom: "5px" }}
                >
                  Created Date: {item.created_date}12/09/2023
                </Paragraph>
                <Paragraph
                  className={`${notosans.className}`}
                  style={{ marginBottom: "5px" }}
                >
                  Due Date: {item.due_date}12/09/2023
                </Paragraph>
                <Paragraph className={`${notosans.className}`}>
                  Total Task: <strong>{item.total_tasks}</strong>
                </Paragraph>
                <Avatar.Group
                  maxCount={4}
                  size="large"
                  maxStyle={{
                    color: "#f56a00",
                    backgroundColor: "#fde3cf",
                  }}
                >
                  {/* <Avatar src={item.project_resources} /> */}
                  <Tooltip title="Ant User" placement="top">
                    <Avatar
                      style={{
                        backgroundColor: "#87d068",
                      }}
                      icon={<UserOutlined />}
                    />
                  </Tooltip>
                </Avatar.Group>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
      ,
    </>
  );
};

export default Resources;
