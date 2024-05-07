"use client";
import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Breadcrumb, Tabs } from "antd";
import Templates from "@/Components/AddingTemplateAndCreating/SelectingTemplate";
import CreatingTemplate from "@/Components/AddingTemplateAndCreating/CreatingTemplate";
import { notosans } from "@/font/font";
import "./style.css";
const onChange = (key) => {
  console.log(key);
};
const items = [
  {
    key: "1",
    label: "Select Template",
    children: <Templates />,
  },
  {
    key: "2",
    label: "Create Template",
    children: <CreatingTemplate />,
  },
];
const page = () => {
  const DefaultToggleValue = useSelector(
    (state) => state.addUsecase.StagesToggleValue
  );
  console.log("pageToggle", DefaultToggleValue);
  const [activeSection, setActiveSection] = useState("Procurement");
  const projectName = useSelector((state) => state.addProject.ProjectName);

  const toggleSection = (section) => {
    setActiveSection(section);
  };

  return (
    <div style={{ margin: "0px", padding: "0px", minHeight: 280 }}>
      <div className="bg-white px-5 py-5 space-y-3">
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
        <p className="my-0">
          Form pages are used to collect or verify information to users, and
          basic forms are common in scenarios where there are fewer data items.
        </p>
      </div>
      <Tabs
        className="work-flow-tabs"
        defaultActiveKey={DefaultToggleValue}
        items={items}
        onChange={onChange}
      />
    </div>
  );
};

export default page;
