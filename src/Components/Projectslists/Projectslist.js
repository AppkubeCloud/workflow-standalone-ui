import React, { useEffect, useState } from "react";
import { Card, Col, Row, Typography, Progress, Radio, Alert } from "antd";
import { InProgress, Completed, Unassigned } from "@/Components/Badges";
import api from "@/api";
import { notosans } from "@/font/font";
import dayjs from "dayjs";

const { Title, Paragraph } = Typography;
const getData = async () => {
  try {
    // const response = await axios.get('https://jp2malu3r8.execute-api.us-east-1.amazonaws.com/dev/projects_overview?');
    const response = await api.get("/projects_overview");
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching data: ", error);
  }
};

const ProjectsList = () => {
  const [size, setSize] = useState("All Projects");
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getData();
      setData(result);
    };
    fetchData();
  }, []);

  // Check Status and return badge according to the badge
  const checkStatus = (status) => {
    switch (status.toLowerCase()) {
      case "inprogress":
        return <InProgress />;
      case "completed":
        return <Completed />;
      case "unassigned":
        return <Unassigned />;
      // Add more cases if needed
      default:
        return null; // Default case
    }
  };
  const filteredData = () => {
    switch (size) {
      case "In Progress":
        return data.filter(
          (item) => item.status.toLowerCase() === "inprogress"
        );
      case "Unassigned":
        return data.filter(
          (item) => item.status.toLowerCase() === "unassigned"
        );
      case "Completed":
        return data.filter((item) => item.status.toLowerCase() === "completed");
      default:
        return data;
    }
  };

  return (
    <>
      <div style={{ background: "#FFF", padding: "15px 15px" }}>
        <Row gutter={16} style={{ marginLeft: "0", marginRight: "0" }}>
          <div className="flex flex-row justify-between items-start w-full">
            <Title level={2} className={`${notosans.className} mb-0 text-2xl`}>
              Project Lists
            </Title>
            <Radio.Group
              value={size}
              onChange={(e) => setSize(e.target.value)}
              defaultValue={size}
            >
              <Radio.Button value="All Projects" className={notosans.className}>
                All Projects
              </Radio.Button>
              <Radio.Button value="In Progress" className={notosans.className}>
                IN progress
              </Radio.Button>
              <Radio.Button value="Completed" className={notosans.className}>
                Completed
              </Radio.Button>
            </Radio.Group>
          </div>
        </Row>
        <Row
          gutter={[16, 24]}
          className="mt-4"
          style={{ marginLeft: "0", marginRight: "0" }}
        >
          {filteredData().map((item, index) => (
            <Col className="gutter-row" span={6}>
              <Card
                bordered={false}
                style={{
                  boxShadow: "0px 1px 4px 0px #00000029",
                  borderRadius: "5px",
                  height: "100%",
                  marginBottom: "20px",
                }}
                bodyStyle={{ padding: "15px" }}
              >
                <Title level={4} className={`${notosans.className} capitalize`}>
                  {item.project_name}
                </Title>
                {checkStatus(item.status)}
                <Title level={5} className={`${notosans.className} mt-3`}>
                  Total Usecase {item.total_usecases}
                </Title>
                <Paragraph className={notosans.className}>
                  Due Date {dayjs(item.due_date).format("MMMM D, YYYY")}
                </Paragraph>
                <div className="w-100 my-3 d-block text-center">
                  <Progress
                    type="circle"
                    percent={item.completed_tasks_percentage}
                    strokeWidth={22}
                    strokeLinecap="square"
                    strokeColor="#F8D236"
                    trailColor="#F6EEFF"
                  />
                </div>
                <Title
                  level={5}
                  className={`${notosans.className} mt-2 mx-auto text-center`}
                >
                  Task Completed
                </Title>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
};
export default ProjectsList;
