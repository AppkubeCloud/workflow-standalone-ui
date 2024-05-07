"use client";
import React from "react";
import { Button, notification, Input } from "antd";
import { Progress } from "antd";
import { useState, useEffect } from "react";
import { addProjectId } from "@/Context/AddresourcesSlice/addresourcesSlice";
import { useDispatch } from "react-redux";
import { addWorkFlowId } from "@/Context/AddresourcesSlice/addresourcesSlice";
import { useSelector } from "react-redux";
import user from "../../../../../public/assets/user.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { PlusCircleFilled, SearchOutlined } from "@ant-design/icons";

const Resourcepool = () => {
  const axios = require("axios");
  const [workflowData, setWorkflowData] = useState([]);
  const [teamData, setTeamData] = useState([]);
  const testerData = teamData.find((team) => team.TesterId);
  const productManagerIdData = teamData.find((team) => team.UxResearcherId);
  const uiDeveloperData = teamData.find((team) => team.UiDesignerId);
  const apiDeveloperIdData = teamData.find((team) => team.ApiDeveloperId);
  const projectName = useSelector((state) => state.addProject.ProjectName);
  const route = useRouter();
  const ProjectId = (ProjectId) => {
    dispatch(addProjectId(ProjectId));
    // console.log(ProjectId)
  };
  const projectId = useSelector((state) => state.addProject.id);
  console.log(projectId);
  useEffect(() => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `https://m41stqhs8f.execute-api.us-east-1.amazonaws.com/dev/project/${projectId}/workflow`,
      headers: {
        Accept: "application/json",
      },
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        setWorkflowData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const dispatch = useDispatch();
  const WorkflowId = (ProjectId) => {
    dispatch(addWorkFlowId(ProjectId));
    // console.log(ProjectId)
  };
  console.log(workflowData);
  const openNotification = (placement, type, message) => {
    notification[type]({
      message: message,
      placement: placement,
    });
  };

  const handleDevUseCases = (data) => {
    if (data > 0) {
      route.push("/main/projects/developmentUsecases");
    } else {
      openNotification("topRight", "error", "No Usecases Added");
    }
  };

  const handleUseCasesForn = (data) => {};

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://m41stqhs8f.execute-api.us-east-1.amazonaws.com/dev/project/${projectId}/team`
        );
        const responseData = response.data;
        console.log("responsedata ", responseData);
        console.log(JSON.stringify(responseData));
        setTeamData(responseData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [projectId]);
  console.log("teamData", teamData);

  return (
    <main>
      <div className="mb-3">
        <div className="p-3 rounded-t-lg bg-white">
          <div className="flex justify-between">
            <h1 className="font-semibold text-2xl leading-normal tracking-normal text-left">
              {projectName}
            </h1>
            <Button
              className="bg-blue-500 text-white"
              type="primary"
              size="large"
              icon={<PlusCircleFilled />}
            >
              Workflow
            </Button>
          </div>
        </div>
        <div className="px-3 pb-3 rounded-b-lg bg-white flex gap-2 items-start overflow-x-auto">
          {workflowData.map((data, index) => {
            console.log("mapingData: ", data);
            console.log(data.workflow_name);
            return (
              <div className="flex cursor-pointer mt-0">
                <div
                  className="border border-grey-300 rounded-lg px-3 py-3 w-[18rem]"
                  onClick={() => {
                    WorkflowId(data.workflow_id),
                      handleDevUseCases(data.total_usecases);
                  }}
                >
                  <div key={index}>
                    <div className="flex items-center w-[100%] justify-between mb-2">
                      <h3 className="font-semibold text-blue-600">
                        {data.workflow_name}
                      </h3>
                      <Button
                        className="bg-blue-500 text-white"
                        type="primary"
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          WorkflowId(data.workflow_id);
                          route.push("/main/projects/usecaseForm");
                        }}
                      >
                        Add
                      </Button>
                    </div>
                    <p>
                      Total Usecases -{" "}
                      <span className="text-blue-600">
                        {data.total_usecases}
                      </span>
                    </p>
                    <Progress percent={data.total_usecases} showInfo={false} />
                    <p>
                      Completed Task -{" "}
                      <span className="text-orange-600">
                        {data.task_completed}%
                      </span>
                    </p>
                    <Progress
                      percent={data.task_completed}
                      showInfo={false}
                      strokeColor={"orange"}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-white rounded-lg flex flex-col py-3 px-3 mb-3">
        <div className="flex justify-between mb-3">
          <h1 className="text-2xl font-semibold leading-normal tracking-normal text-left">
            Procurement Resource Pool
          </h1>
          <Input
            style={{ width: "250px", marginLeft: "auto", marginRight: "20px", borderRadius: "0px" }}
            placeholder="Search employee"
            suffix={<SearchOutlined />}
          />
          <Button
            className="bg-blue-500 text-white"
            type="primary"
            size="large"
            icon={<PlusCircleFilled />}
          >
            Resources
          </Button>
        </div>
        <div className="flex space-x-2 overflow-x-scroll">
          {teamData.map((data) => (
            <div className="flex flex-col w-1/4 border border-gray-200 rounded-lg p-4">
              {Object.entries(data).map(([key, innerData], index) => (
                <div key={index}>
                  <div className="pl-1 pb-2 border border-x-0 border-t-0 border-b-gray-300">
                    <h1 className="font-semibold text-xl">
                      {innerData[0].designation}
                    </h1>
                    <p className="text-gray-400">{innerData.length} Members</p>
                  </div>
                  {innerData.map((team, index) => (
                    <div
                      key={index}
                      className="flex space-x-4 items-center w-[15.625rem] h-[2.625rem] my-3"
                    >
                      <Image
                        src={team.image_url ? team.image_url : user}
                        height={35}
                        width={35}
                      />
                      <div>
                        <p className="font-semibold">{team.name}</p>
                        <p className="text-gray-400">{team.designation}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
              <Button type="link" size={"small"} className="px-0 text-end">
                View All
              </Button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Resourcepool;
