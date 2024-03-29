import React, { useEffect, useState } from 'react';
import { Avatar, Card, Col, Row, Typography, Tooltip, Button, Progress, Radio, Badge } from 'antd';
import { CheckCircleOutlined, IssuesCloseOutlined, ClockCircleOutlined, StopOutlined } from '@ant-design/icons';
import axios from 'axios';
const { Title, Paragraph, Text } = Typography;
const { Meta } = Card;
import { useMediaQuery } from 'react-responsive';
import api from '@/api';
import { notosans } from '@/font/font';
const DashCards = ({ }) => {
  const [size, setSize] = useState('large');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const isSmallScreen = useMediaQuery({ maxWidth: 768 });
  useEffect(() => {
    const fetchData = async () => {
      try {
        // const result = await axios.get('https://jp2malu3r8.execute-api.us-east-1.amazonaws.com/dev/org_projects_overview');
        const result = await api.get('/org_projects_overview');
        setData(result.data);
        console.log(result.data)
      } catch (error) {
        // handle error
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  return (
    <>

      <Row gutter={[16, 16]} className="mt-4 w-full">
        <Col xs={24} sm={12} md={6}>
          <Card
            bordered={false}
            style={{
              boxShadow: '0px 0px 5px 1px rgba(0, 0, 0, 0.2)',
              borderRadius: '5px',
              height: '220px',
              padding: '16px',
            }}
          >
            <div className="flex flex-col">
              <div className="flex items-center justify-between">

                <Title level={4} className={`${notosans.className} m-0`}>
                  Total Projects
                </Title>
                {/* <Badge status="processing" /> */}
                <CheckCircleOutlined className={`${notosans.className} text-blue-400`} />
              </div>
              <Title level={4} style={{ marginTop: '-5px' }} className={notosans.className}>
                {data.total_projects}
              </Title>
              <Title level={5} style={{ marginTop: '5px' }} className={notosans.className}>
                Progress {data.percentage_completed}%
              </Title>
              <hr />
              <Paragraph className={`${notosans.className} pt-2 m-0`}>Total Task {data.total_tasks}</Paragraph>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card
            bordered={false}
            style={{
              boxShadow: '0px 0px 5px 1px rgba(0, 0, 0, 0.2)',
              borderRadius: '5px',
              height: '220px',
              padding: '16px',
            }}
          >
            <div>
              <div className="flex items-center justify-between">
                <Title level={4}>Completed Projects</Title>
                {/* <Badge status="success" /> */}
                <IssuesCloseOutlined className={`${notosans.className} text-green-500`} />
              </div>
              <Title level={2} className={notosans.className}>{data.completed}</Title>
              <Progress
                type="line"
                percent={Math.round((data.completed / data.total_projects) * 100)}
                strokeWidth={isSmallScreen ? 6 : 9}
                strokeLinecap="square"
                strokeColor="#52C41A"
                trailColor="#F6EEFF"
              />
              <Paragraph className={`${notosans.className} py-2`}>Completed Before 05 Days</Paragraph>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card
            bordered={false}
            style={{
              boxShadow: '0px 0px 5px 1px rgba(0, 0, 0, 0.2)',
              borderRadius: '5px',
              height: '220px',
              padding: '16px',
            }}
          >
            <div>
              <div className="flex items-center justify-between">
                <Title level={4} className={notosans.className}>Inprogress Projects</Title>
                {/* <Badge status="warning" /> */}
                <ClockCircleOutlined className={`${notosans.className} text-yellow-400`} />
              </div>
              <Title level={2} className={notosans.className}>{data.in_progress}</Title>
              <Progress
                type="line"
                percent={Math.round((data.in_progress / data.total_projects) * 100)}
                strokeWidth={isSmallScreen ? 6 : 9}
                strokeLinecap="square"
                strokeColor="#F8D236"
                trailColor="#F6EEFF"
              />
              <Paragraph className={`${notosans.className} my-3`}>View Details</Paragraph>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card
            bordered={false}
            style={{
              boxShadow: '0px 0px 5px 1px rgba(0, 0, 0, 0.2)',
              borderRadius: '5px',
              height: '220px',
              padding: '16px',
            }}
          >
            <div>
              <div className="flex items-center justify-between">
                <Title level={4} className={notosans.className}>Unassign Projects</Title>
                {/* <Badge status="error" /> */}
                <StopOutlined className={`${notosans.className} text-red-500`} />
              </div>
              <Title level={2} className={notosans.className}>{data.unassigned}</Title>
              <Progress
                type="line"
                percent={Math.round((data.unassigned / data.total_projects) * 100)}
                strokeWidth={isSmallScreen ? 6 : 9}
                strokeLinecap="square"
                strokeColor="#FF4D4F"
                trailColor="#F6EEFF"
              />
              <Paragraph className={`${notosans.className} py-3`}>View Details</Paragraph>
            </div>
          </Card>
        </Col>
      </Row>

    </>
  )
};
export default DashCards;
