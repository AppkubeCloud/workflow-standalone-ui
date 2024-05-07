"use client";
import api from "@/api";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
  Rectangle,
} from "recharts";

const Barchart = () => {
  const data = [
    {
      name: "Procurement",
      complete: 1025,
      incomplete: 580,
    },
    {
      name: "HRMS",
      complete: 1145,
      incomplete: 745,
    },
    {
      name: "App Kube",
      complete: 1243,
      incomplete: 708,
    },
    {
      name: "EMS",
      complete: 1542,
      incomplete: 1580,
    },
    {
      name: "Xformation",
      complete: 1243,
      incomplete: 708,
    },
    {
      name: "SPM",
      complete: 1752,
      incomplete: 1580,
    },
  ];
  return (
    <>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 0,
            right: 30,
            left: 20,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend
            iconType="circle"
            align="right"
            verticalAlign="top"
            wrapperStyle={{ top: -20, right: 35 }}
          />
          <Bar
            dataKey="complete"
            name="Completed Usecase"
            fill="#FF85C0"
            barSize={36}
            activeBar={<Rectangle fill="#FF85C0" stroke="blue" barSize={12} />}
          />
          <Bar
            dataKey="incomplete"
            name="Incomplete Usecase"
            fill="#B37FEB"
            barSize={36}
            activeBar={
              <Rectangle fill="#B37FEB" stroke="purple" barSize={12} />
            }
          />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

export default Barchart;
