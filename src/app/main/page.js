"use client";

import Image from "next/image";
import { roboto } from "@/font/font";
// importing ant d components
import { Divider } from "antd";
import StackedBarChart from "@/Components/Charts/StackedBarChart";
import { useRouter } from "next/navigation";
import ProjectsList from "@/Components/Projectslists/Projectslist";
import Resources from "@/Components/Resources/Resources";
import Barchart from "@/Components/Charts/Barchart";
import DashCards from "@/Components/Cards/Cards";

const Dashboard = () => {
  return (
    <>
      <div className={`mx-3 space-y-7 mt-4`}>
        <h1 className={`${roboto.className} text-3xl font-medium`}>
          Workflow Management
        </h1>
        <div className="flex flex-row gap-5 w-full">
          <DashCards />
        </div>
        <div className="flex flex-col space-y-6">
          <div className="bg-white mb-3 p-0 pb-2">
            <div className="flex flex-col">
              <h2 className={`${roboto.className} text-2xl p-5 mb-5`}>
                Project Overview
              </h2>
              <Barchart />
            </div>
          </div>
        </div>
        <div className="bg-white my-6 pt-5 pr-10 pb-5 pl-10">
          <div className="flex flex-col justify-center items-start">
            <div className="flex flex-col">
              <h2 className={`${roboto.className} text-2xl`}>
                Top Project Resources
              </h2>
              <p className={`${roboto.className} text-[14px] mb-5`}>
                Top most resources working on top projects
              </p>
            </div>
            <StackedBarChart />
          </div>
        </div>
        <div className="my-5">
          <ProjectsList />
        </div>
        <div>
          <Resources />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
