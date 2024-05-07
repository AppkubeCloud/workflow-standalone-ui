"use client";
import { useState } from "react";
import StackedBarChart from "../Graphs/BarChart";
import Image from "next/image";
import { Button } from "antd";

import useProject from "@/HOC/Project/Project";
import Overview from "../Overview/Overview";
const WorkFlowList3 = () => {
  const [project, setProject] = useProject([]);

  const projectVariable =
    project.projectName !== "" ? project.projectName : " ";
  // modal function
  const [isAddWorkFlow, setIsAddWorkFlow] = useState(false);

  return (
    <main>
      {isAddWorkFlow === false && (
        <section className="flex flex-col w-auto h-auto">
          <div className="flex flex-row justify-between py-2 items-center w-auto bg-white px-5">
            <h2 className="text-black font-sans text-xl font-semibold">
              Workflows
            </h2>
          </div>
          <section className="flex flex-wrap justify-center items-center bg-white h-[300px] gap-3 px-7 ">
            <div>
              <div className=" flex flex-col w-[632px] h-[185px] text-center   rounded-sm p-3 px-[40px] py-[40px]  justify-center items-center gap-7 border-dashed border-2 border-gray-300">
                <p className="text-gray-300 font-sans text-[16px] not-italic font-medium leading-6">
                  Right Now there is no workflow, Click on below button to add
                  workflow
                </p>
                {/* <WorkFlowDropDown setunSavedTamplate={setunSavedTamplate} /> */}
                <Button
                  type="primary"
                  size={50}
                  className="bg-blue-500 hover:bg-blue-400"
                  onClick={() => setIsAddWorkFlow(true)}
                >
                  Add Workflow
                </Button>
              </div>
            </div>
          </section>
        </section>
      )}
      {isAddWorkFlow === true && (
        <section>
          <Overview />
        </section>
      )}
    </main>
  );
};

export default WorkFlowList3;
