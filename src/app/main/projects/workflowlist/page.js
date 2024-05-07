"use client";
import React, { useState } from "react";
import { Breadcrumb, Tabs } from "antd";
import Resourcepool from "./Resourcepool";
import WorkFlowOverView from "@/Components/WorkFlowOverView/WorkFlowOverView";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { notosans } from "@/font/font";
import "./style.css";

const page = () => {
  const [size, setSize] = useState("small");
  const router = useRouter();
  const projectData = useSelector((state) => state.addProject);
  const projectName = useSelector((state) => state.addProject.ProjectName);
  console.log(projectName);
  console.log(projectData);

  return (
    <div style={{ margin: "0px", padding: "0px", minHeight: 280 }}>
      <div className="bg-white px-5 pt-5 pb-2 space-y-3">
        <Breadcrumb
          items={[
            {
              title: <a href="/main"> Home</a>,
            },
            {
              title: <a href="/main/projects">Projects Overview</a>,
            },
            {
              title: `${projectName}`,
            },
          ]}
        />
        <h1 className={`${notosans.className} capitalize text-2xl`}>
          {projectName}
        </h1>
        <p className="mb-0 mt-2">
          Procurement is the systematic process of identifying, acquiring, and
          managing the goods, services, or works needed by an organization to
          meet its operational requirements.
        </p>
      </div>
      <Tabs
        defaultActiveKey="1"
        size={size}
        className="work-flow-tabs"
        items={new Array(2).fill(null).map((_, i) => {
          const id = String(i + 1);
          if (id == 1) {
            return {
              label: `Overview`,
              key: id,
              children: <WorkFlowOverView />,
            };
          } else if (id == 2) {
            return {
              label: `Resource pool`,
              key: id,
              children: <Resourcepool />,
            };
          }
        })}
      />
    </div>
  );
};

export default page;
