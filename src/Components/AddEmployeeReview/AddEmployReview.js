"use client";
import React, { useState } from "react";
import { Button } from "antd";
import { Input } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import {
  addProjectId,
  removeResources,
  removeResourcesInfo,
} from "@/Context/AddresourcesSlice/addresourcesSlice";

import Image from "next/image";

import user from "../../../public/assets/user.png";
import { useRouter } from "next/navigation";
import {
  addStepperValue,
  removeFormData,
  resourcePoolID,
  updateId,
  updateProjectName,
} from "@/Context/AddNewProjectSlice/addProjectSlice";
import dayjs from "dayjs";

const { Search } = Input;

const onSearch = (value, _e, info) => console.log(info?.source, value);

const AddEmployReview = () => {
  const ProductManager = useSelector(
    (state) => state.addResources.ProjectManager
  );
  const Uxdesigner = useSelector((state) => state.addResources.UXDesigner);
  const UiDesigner = useSelector((state) => state.addResources.UIDeveloper);
  const ApiDeveloper = useSelector((state) => state.addResources.APIDeveloper);
  const Tester = useSelector((state) => state.addResources.Tester);
  const UxResearcher = useSelector((state) => state.addResources.UXResearcher);
  const CiCd = useSelector((state) => state.addResources.CICDSpecialist);
  const ResourcesInfo = useSelector((state) => state.addResources);
  const [data, setData] = useState([]);
  const projectId = useSelector((state) => state.addProject.id);
  const projectData = useSelector((state) => state.addProject.Projectform);
  // const projectId = useSelector((state) => state.addProject.id);

  // console.log(projectId);
  console.log(projectData);
  const ResourceAdded = ResourcesInfo.resoucesInfo;
  console.log(ResourceAdded);

  const handleDelete = (resource) => {
    dispatch(removeResources(resource));
    console.log(resource);
  };
  const dispatch = useDispatch();

  const route = useRouter();
  const routerFunction = (data) => {
    route.push(data);
  };
  const ProjectId = (ProjectId) => {
    // dispatch(resourcePoolID(ProjectId))

    console.log("Dispatched-ProjectID", ProjectId);
  };

  const Apisubmit = async (projectData) => {
    console.log("Clicked");
    const projectname = projectData.projectName;
    console.log(projectname);
    let data = JSON.stringify({
      name: projectData.ProjectName,
      description: projectData.projectDescription,
      department: projectData.projectDepartment,
      start_date: projectData.startDate,
      end_date: projectData.endDate,
      image_url: "https://i.imgur.com/PujQY5Y.png",
      // image_url: projectData.image_url,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://m41stqhs8f.execute-api.us-east-1.amazonaws.com/dev/project",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        const result = response.data;
        console.log("success:", result, result.id);
        dispatch(updateId(result.id));
        dispatch(addProjectId(result.id));
        dispatch(updateProjectName(projectData.ProjectName));
        // Update projectId in local storage

        handleCreatingTeam(result.id);
      })
      .catch((error) => {
        console.log(error);
        const errorStatus = error.response.data.message;
        console.log(errorStatus);
        openNotification("topRight", "error", ` ${errorStatus}`);
      });
  };

  const handleCreatingTeam = async (id) => {
    const roles = [
      { ProductManagerId: ProductManager },
      { UxdesignerId: Uxdesigner },
      { UiDesignerId: UiDesigner },
      { ApiDeveloperId: ApiDeveloper },
      { TesterId: Tester },
      { UxResearcherId: UxResearcher },
      { CiCdId: CiCd },
    ];

    const filteredRoles = roles.filter(
      (role) => Object.values(role)[0].length > 0
    );

    console.log("filteredRoles", filteredRoles);

    // console.log("TesterId", TesterId)
    // console.log(object)

    const postData = {
      project_id: id,
      team_name: projectData.ProjectName,
      created_by_id: "550e8400-e29b-41d4-a716-446655440001",
      roles: filteredRoles,
    };

    console.log("Before PUT request");
    // console.log(project.projectId);
    console.log(JSON.stringify(postData));
    console.log("projectData", postData);

    let config = {
      method: "put",
      maxBodyLength: Infinity,
      url: `https://m41stqhs8f.execute-api.us-east-1.amazonaws.com/dev/project/${id}/team`,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      data: postData,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        dispatch(removeResourcesInfo([]));
        dispatch(removeFormData({}));
        routerFunction("/main/projects/workflowlist");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const axios = require("axios");

  return (
    <div className="d-block">
      <div className="rounded-md mt-5 space-y-5 p-5 bg-white">
        <div className="flex justify-between">
          <h1 className="text-xl font-bold leading-snug tracking-normal text-left">
            Setup project
          </h1>
          <div className="space-x-3">
            <Button
              icon={<EditOutlined />}
              onClick={() => {
                dispatch(addStepperValue("0"));
              }}
              className="rounded-none"
            >
              Edit
            </Button>

            <Button
              type="primary"
              className="bg-blue-500 rounded-none"
              onClick={() => {
                Apisubmit(projectData);
              }}
            >
              create
            </Button>
          </div>
        </div>
        <div className="flex space-x-10 w-100 items-center">
          <div>
            <img
              src={projectData.image_url}
              className="w-[7rem] h-[7rem] rounded-md"
            />
          </div>
          <div className="flex  ">
            <div className="p-5 space-y-10 mx-5">
              <div>
                <p>Project Name</p>
                <h3 className="font-semibold">{projectData.ProjectName}</h3>
              </div>
              <div>
                <p>Project department</p>
                <h3 className="font-semibold">
                  {projectData.projectDepartment}
                </h3>
              </div>
            </div>

            <div className="p-5 space-y-10 mx-5">
              <div>
                <p>Project Description</p>
                <h3 className="font-semibold">
                  {projectData.projectDescription}
                </h3>
              </div>
              <div>
                <p>Project Duration</p>
                <h3 className="font-semibold">
                  {dayjs(projectData.startDate).format("MMMM D, YYYY")}{" "}
                  <span className="mx-2">To</span>{" "}
                  {dayjs(projectData.endDate).format("MMMM D, YYYY")}
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* //REsourcess------------------------------ */}

      <div className="mt-5 flex flex-col space-y-5 bg-white rounded-md p-5">
        <div className="flex justify-between">
          <h1 className="text-2xl font-semibold leading-normal tracking-normal text-left">
            Resource Pool
          </h1>
          <div>
            <Search
              placeholder="Search employe"
              onSearch={onSearch}
              style={{
                width: "16.5rem",
                height: "2rem",
                borderRadius: "0px"
              }}
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y">
            <thead className="bg-gray-50">
              <tr>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-black tracking-wider pl-10 "
                  style={{ width: "30%" }}
                >
                  Name
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-black tracking-wider border border-y-0 border-r-0 border-l-2"
                  style={{ width: "20%" }}
                >
                  Designation
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-black tracking-wider pl-10 border border-y-0 border-r-0 border-l-2"
                  style={{ width: "20%" }}
                >
                  Mail ID
                </th>
                <th
                  className="px-6 ml-9 py-3 text-left text-xs font-medium text-black tracking-wider border border-y-0 border-r-0 border-l-2"
                  colSpan={2}
                  style={{ width: "20%" }}
                >
                  Actions
                </th>
              </tr>
            </thead>
            {ResourceAdded.map((resource, index) => (
              <tbody key={index} className="bg-white divide-y divide-gray-200">
                <tr className="bg-white">
                  <td className="py-2 whitespace-nowrap">
                    <div className="flex items-center space-x-5 pl-1">
                      <Image
                        src={resource.image ? resource.image : user}
                        height={35}
                        width={35}
                      />
                      <div className="text-sm font-medium text-gray-900">
                        {resource.name}
                      </div>
                    </div>
                  </td>
                  <td className="py-2 pl-5 text-sm text-left font-medium text-gray-900">
                    {resource.Designation}
                  </td>
                  <td className="py-2 pl-5 text-sm font-medium text-gray-900">
                    {resource.email}
                  </td>
                  <td className="py-2 whitespace-nowrap text-sm space-x-5 pl-2">
                    <Button
                      icon={<EditOutlined />}
                      onClick={() => {
                        dispatch(addStepperValue("1"));
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      type="primary"
                      danger
                      icon={<DeleteOutlined />}
                      onClick={() => handleDelete(resource.id)}
                    >
                      Remove
                    </Button>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      </div>
    </div>
  );
};
export default AddEmployReview;
