"use client";
import React, { useState, useEffect } from "react";
import { Button, message, Steps, Breadcrumb } from "antd";
import { AddResourcePool2 } from "@/Components/AddResourcePool/AddresoucrePool2";
import AddNewProjectForm from "@/Components/AddNewProjectForm/AddNewProjectForm";
import AddEmployReview from "@/Components/AddEmployeeReview/AddEmployReview";
import { useDispatch, useSelector } from "react-redux";
import { addStepperValue } from "@/Context/AddNewProjectSlice/addProjectSlice";

const { Step } = Steps;

const steps = [
  {
    title: "Set up Project",
    content: <AddNewProjectForm />,
  },
  {
    title: "Resource pool",
    content: <AddResourcePool2 />,
  },
  {
    title: "Review",
    content: <AddEmployReview />,
  },
];

export default function page({ formNext }) {
  const projectData = useSelector((state) => state.addProject.Projectform);
  const EditButton = useSelector(
    (state) => state.addProject.ProjectStepperValue
  );

  const [fetchProject, setfetchProject] = useState();
  const axios = require("axios");
  useEffect(() => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "https://m41stqhs8f.execute-api.us-east-1.amazonaws.com/dev/project",
      headers: {
        Accept: "application/json",
      },
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        setfetchProject(response.data.projects);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const [current, setCurrent] = useState(0);

  const handleSubmit = async () => {
    if (
      !projectData.ProjectName ||
      !projectData.projectDescription ||
      !projectData.projectDepartment ||
      !projectData.startDate ||
      !projectData.endDate
    ) {
      message.error(
        "Please fill in all fields before proceeding to the next step"
      );
      return;
    }

    let projectExists = false;

    for (let i = 0; i < fetchProject.length; i++) {
      if (fetchProject[i].name === projectData.ProjectName) {
        projectExists = true;
        break;
      }
    }
    if (projectExists) {
      message.error("ProjectName Already exists");
      return;
    }

    if (EditButton === "0") {
      setCurrent(current + 2);
    } else {
      setCurrent(current + 1);
    }

    dispatch(addStepperValue(""));
  };

  const dispatch = useDispatch();

  useEffect(() => {
    if (EditButton === "0") {
      setCurrent(current - 2); // Dispatch action to update stepper's current step
    } else if (EditButton === "1") {
      setCurrent(current - 1);
    }
  }, [EditButton]);

  return (
    <>
      <div className="w-auto py-2 px-1 mb-2 bg-white">
        <Breadcrumb
          className="p-2"
          items={[
            {
              title: <a href="/main"> Home</a>,
            },
            {
              title: <a href="/main/projects">Projects Overview</a>,
            },
            {
              title: "Create Project",
            },
          ]}
        />
        <div className="p-2">
          <h1 className="text-2xl font-semibold mb-2">Create Project</h1>
          <p>
            Form pages are used to collect or verify information to users, and
            basic forms are common in scenarios where there are fewer data
            items.
          </p>
        </div>
      </div>
      <div className="w-auto bg-white m-5">
        <Steps current={current} className="px-[10rem] py-[3rem]">
          {steps.map((item) => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
        {steps[current].content}

        <div className="d-flex justify-content-center text-center w-100 py-[3rem]">
          {current < steps.length - 1 && (
            <Button
              type="primary"
              onClick={handleSubmit}
              className="rounded-sm bg-blue-500 text-white leading-3"
            >
              Next
            </Button>
          )}
        </div>
      </div>
    </>
  );
}
