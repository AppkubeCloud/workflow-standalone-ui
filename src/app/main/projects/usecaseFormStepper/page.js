"use client";
import React, { useState, useEffect } from "react";
import { Breadcrumb, Steps, Tooltip } from "antd";
import { TiTick } from "react-icons/ti";
import { useSelector } from "react-redux";

import SubStagesStepper from "./SubStagesStepper";
import UseCasesOverView from "@/Components/AddUsecaseStepperForms/UseCasesOverView";
import Planning from "@/Components/AddUsecaseStepperForms/Planning";
import AssetView from "@/Components/AddUsecaseStepperForms/AssertView";
import { notosans } from "@/font/font";
import { Tabs } from "antd";

const Stepper = () => {
  const projectName = useSelector((state) => state.addProject.ProjectName);
  const UseCaseNames = useSelector((state) => state.addUsecase.UseCaseNames);
  console.log(UseCaseNames);
  const items = [
    {
      key: "1",
      label: "Overview",
      children: <UseCasesOverView />,
    },
    {
      key: "2",
      label: "Workflow View",
      children: <SubStagesStepper />,
    },
    {
      key: "3",
      label: "Asset view",
      children: <AssetView />,
    },
    {
      key: "4",
      label: "Planning",
      children: <Planning />,
    },
  ];

  return (
    <div style={{ margin: "0px", padding: "0px", minHeight: 280 }}>
      <div className="bg-white px-5 pt-5 pb-2 space-y-3">
        <Breadcrumb
          items={[
            {
              path: "/main",
              breadcrumbName: "Home",
            },
            {
              path: "/main/projects",
              breadcrumbName: { projectName },
            },
            {
              path: "/main/projects/developmentUsecases",
              breadcrumbName: "Development WorkFlow",
            },
            {
              title: `${UseCaseNames}`,
            },
          ]}
        />
        <h1 className={`${notosans.className} capitalize text-2xl`}>
          {UseCaseNames}
        </h1>
        <p>
          Form pages are used to collect or verify information to users, and
          basic forms are common in scenarios where there are fewer data items.
        </p>
      </div>
      <Tabs defaultActiveKey="1" className="work-flow-tabs" items={items} />
    </div>
  );
};

export default Stepper;
