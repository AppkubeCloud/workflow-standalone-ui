"use client";
import React, { useState, useEffect } from "react";
import "./stepper.css";
import user from "../../../../../public/assets/user.png";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import RequirementForm from "@/Components/AddUsecaseStepperForms/RequirementForm";
import {
  BarsOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";

const SubStagesStepper = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [stepperState, setStepperState] = useState("");
  const [complete, setComplete] = useState(false);
  const setUsecaseId = useSelector((state) => state.addUsecase);
  const UsecaseId = setUsecaseId.useCaseId;
  const [requireData, setRequireData] = useState();
  const [activeStepTitle, setActiveStepTitle] = useState("");

  useEffect(() => {
    const axios = require("axios");
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://m41stqhs8f.execute-api.us-east-1.amazonaws.com/dev/usecase/${UsecaseId}`,
          {
            headers: {
              Accept: "application/json",
            },
          }
        );
        console.log(response.data);
        setRequireData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [UsecaseId]);

  useEffect(() => {
    // Automatically set the first step as active when component mounts
    if (
      requireData &&
      requireData.usecase &&
      requireData.usecase.stages.length > 0
    ) {
      const firstStepTitle = Object.keys(requireData.usecase.stages[0])[0];
      setActiveStepTitle(firstStepTitle);
    }
  }, [requireData]);

  useEffect(() => {
    // Set stepperState to the title of the first step when requireData is loaded
    if (
      requireData &&
      requireData.usecase &&
      requireData.usecase.stages.length > 0
    ) {
      const firstStepTitle = Object.keys(requireData.usecase.stages[0])[0];
      setStepperState(firstStepTitle);
    }
  }, [requireData]);

  const mappedSteps =
    requireData && requireData.usecase
      ? requireData.usecase.stages.map((stage) => ({
          title: Object.keys(stage)[0], // Extracting the stage name from the dynamic key
        }))
      : [];

  const handleStepClick = (stepIndex, title) => {
    setCurrentStep(stepIndex + 1);
    setActiveStepTitle(title);
    setStepperState(title);
    console.log(title);
  };

  const dispatch = useDispatch();
  console.log("maap step", mappedSteps);

  return (
    <>
      <div className="mb-4 flex w-100%">
        <div className="w-[20%] h-screen mr-2 bg-white">
          <h3 className="my-3 text-lg font-medium leading-7 tracking-normal text-center">
            Workflow view
          </h3>
          {mappedSteps?.map((step, i) => (
            <div
              key={i}
              className={`step-item ${currentStep === i + 1 && "active"} ${
                i + 1 < currentStep || complete ? "complete" : ""
              } `}
              onClick={() => handleStepClick(i, step.title)}
            >
              <div className="step cursor-pointer">
                {i + 1 < currentStep || complete ? i + 1 : i + 1}
              </div>
              <p className="text-gray-500 text-lg ml-1 whitespace-pre-wrap cursor-pointer ">
                {step.title}
              </p>
            </div>
          ))}
        </div>
        <div className="w-[80%] h-screen ml-2">
          {requireData && (
            <div className="flex space-x-5 items-center bg-white p-4 mb-3">
              <div>
                <Image
                  height={64}
                  width={64}
                  src={requireData.image ? requireData.image : user}
                  // src={user}
                  className="w-[7rem] h-[7rem] rounded-md"
                />
              </div>
              <div>
                <h2 className="my-3 text-xl font-medium leading-7 tracking-normal text-left">
                  {requireData.assignee_name}
                </h2>
                <div className="my-3 flex space-x-2">
                  <ShoppingOutlined style={{ fontSize: "1rem" }} />
                  <h3 className="text-base font-normal leading-normal tracking-normal text-left space-y-4">
                    {requireData.role}
                  </h3>
                </div>
                <div className="my-3 flex space-x-2">
                  <BarsOutlined style={{ fontSize: "1rem" }} />
                  <h3 className="text-base font-normal leading-normal tracking-normal text-left space-y-4">
                    {requireData.total_task}
                  </h3>
                </div>
              </div>
              <div>
                <div class="flex flex-col space-y-4">
                  <div class="flex space-x-3">
                    <p class="text-sm font-medium leading-snug tracking-normal text-left">
                      Assigned date
                    </p>
                    <h3 class="text-base font-normal leading-tight tracking-normal text-left">
                      {requireData.usecase.creation_date}
                    </h3>
                  </div>
                  <div class="flex space-x-3">
                    <p class="text-sm font-medium leading-snug tracking-normal text-left">
                      Planned date
                    </p>
                    <h3 class="text-base font-normal leading-tight tracking-normal text-left">
                      {requireData.usecase.end_date}
                    </h3>
                  </div>
                </div>
              </div>
              <div>
                <div class="flex flex-col space-y-4">
                  <div class="flex space-x-3">
                    <p class="text-sm font-medium leading-snug tracking-normal text-left">
                      Start date
                    </p>
                    <h3 class="text-base font-normal leading-tight tracking-normal text-left">
                      {requireData.usecase.start_date}
                    </h3>
                  </div>
                  <div class="flex space-x-3">
                    <p class="text-sm font-medium leading-snug tracking-normal text-left">
                      Deviation
                    </p>
                    <h3 class="text-base font-normal leading-tight tracking-normal text-left">
                      03days
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="bg-white rounded-md mt-4 p-4">
            <RequirementForm stepperState={stepperState} />
          </div>
        </div>
      </div>
    </>
  );
};

export default SubStagesStepper;
