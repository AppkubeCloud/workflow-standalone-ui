import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { useState, useEffect } from "react";

const StackedBarChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/resources_task_status"); // Replace with your API endpoint
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const ChartData = [
    {
      name: "Andy",
      pending: 5,
      inprogress: 24,
      complete: 8,
    },
    {
      name: "Benny",
      pending: 9,
      inprogress: 10,
      complete: 7,
    },
    {
      name: "Angela",
      pending: 10,
      inprogress: 14,
      complete: 8,
    },
    {
      name: "Della",
      pending: 19,
      inprogress: 10,
      complete: 12,
    },
    {
      name: "Cytheria",
      pending: 10,
      inprogress: 14,
      complete: 8,
    },
    {
      name: "oliver",
      pending: 20,
      inprogress: 5,
      complete: 8,
    },
    {
      name: "tony",
      pending: 19,
      inprogress: 10,
      complete: 12,
    },
    {
      name: "Andy",
      pending: 5,
      inprogress: 24,
      complete: 8,
    },
    {
      name: "Benny",
      pending: 9,
      inprogress: 10,
      complete: 7,
    },
    {
      name: "john",
      pending: 10,
      inprogress: 14,
      complete: 8,
    },
    {
      name: "alex",
      pending: 19,
      inprogress: 10,
      complete: 12,
    },
    {
      name: "jack",
      pending: 10,
      inprogress: 14,
      complete: 8,
    },
    {
      name: "petter",
      pending: 20,
      inprogress: 5,
      complete: 8,
    },
    {
      name: "adam",
      pending: 19,
      inprogress: 10,
      complete: 12,
    },
  ];
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        width={'100%'}
        height={300}
        data={ChartData}
        margin={{
          top: 0,
          right: 0,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend iconType="circle" align="right" verticalAlign="top" wrapperStyle={{top: -20, right: 0}} />
        <Bar dataKey="pending" barSize={40} name="Pending Task" stackId="a" fill="#006D75" />
        <Bar dataKey="inprogress" barSize={40} name="In progress Task " stackId="a" fill="#13C2C2" />
        <Bar dataKey="complete" barSize={40} name="Completed Task" stackId="a" fill="#87E8DE" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default StackedBarChart;

