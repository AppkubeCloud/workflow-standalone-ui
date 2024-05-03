"use client";

import { Button, Modal } from "antd";
import { Projectmanager } from "./popup";
import { ApiDeveloper } from "./popup";
import { CiCdResourcePool } from "./popup";
import { TesterResourcePool } from "./popup";
import { UxDesignResourcePool } from "./popup";
import { UiDeveloperResourcePool } from "./popup";
import { UxResearcher } from "./popup";
//Images
import Pmimage from "../../../public/assets/PM.svg";
import UxDesign from "../../../public/assets/UxDesign.svg";
import Uidev from "../../../public/assets/UiDeveloper.svg";
import Api from "../../../public/assets/ApiDeveloper.svg";
import tester from "../../../public/assets/tester.svg";
import UxResearch from "../../../public/assets/Uxresearch.svg";
import CiCd from "../../../public/assets/ci-cd.svg";
import { PlusOutlined } from "@ant-design/icons";
import Image from "next/image";
import "./style.css";

// HOC
import useProject from "@/HOC/Project/Project";
import { useSelector } from "react-redux";
// useRouter
import { useRouter } from "next/navigation";
import { Tabs } from "antd";
import { notosans } from "@/font/font";

const { TabPane } = Tabs;

const items = () => {
  const ProductManagerLength = useSelector(
    (state) => state.addResources.ProjectManagerLength
  );
  const UxDesignerLength = useSelector(
    (state) => state.addResources.UxDesignerLength
  );
  const UIDeveloperLength = useSelector(
    (state) => state.addResources.UIDeveloperLength
  );
  const APIDeveloperLength = useSelector(
    (state) => state.addResources.APIDeveloperLength
  );
  const TesterLength = useSelector((state) => state.addResources.TesterLength);
  const UXResearcherLength = useSelector(
    (state) => state.addResources.UXResearcherLength
  );
  const CICDSpecialistLength = useSelector(
    (state) => state.addResources.CICDSpecialistLength
  );
  return [
    {
      key: "1",
      label: (
        <div className="flex flex-row items-center">
          <div className="input px-5 py-4 border w-[500px] add-resoucre-box">
            <div className="flex justify-between items-center">
              <div className="flex">
                <Image src={Pmimage} />
                <div className="flex flex-col justify-start pl-2">
                  <h2 className="text-black text-base font-normal leading-6 text-start">
                    Project Manager
                  </h2>
                  <p className="text-left members-text">
                    {ProductManagerLength} Members
                  </p>
                </div>
              </div>
              <Button className="flex py-2 px-3 h-8 rounded-none items-center bg-blue-500">
                <PlusOutlined className="text-white" />
                <span className="text-white">Add</span>
              </Button>
            </div>
          </div>
        </div>
      ),
      children: <Projectmanager />,
    },
    {
      key: "2",
      label: (
        <div className="flex flex-row items-center">
          <div className="input px-5 py-4 border w-[500px] add-resoucre-box">
            <div className="flex justify-between items-center">
              <div className="flex">
                <Image src={UxDesign} />
                <div className="flex flex-col justify-start pl-2">
                  <h2 className="text-black text-base font-normal leading-6 text-start">
                    Ux Designer
                  </h2>
                  <p className="text-left members-text">
                    {UxDesignerLength} Members
                  </p>
                </div>
              </div>
              <Button className="flex py-2 px-3 h-8 rounded-none items-center bg-blue-500">
                <PlusOutlined className="text-white" />
                <span className="text-white">Add</span>
              </Button>
            </div>
          </div>
        </div>
      ),
      children: <UxDesignResourcePool />,
    },
    {
      key: "3",
      label: (
        <div className="flex flex-row items-center">
          <div className="input px-5 py-4 border w-[500px] add-resoucre-box">
            <div className="flex justify-between items-center">
              <div className="flex">
                <Image src={Uidev} />
                <div className="flex flex-col justify-start pl-2">
                  <h2 className="text-black text-base font-normal leading-6 text-start">
                    UI Developer
                  </h2>
                  <p className="text-left members-text">
                    {UIDeveloperLength} Members
                  </p>
                </div>
              </div>
              <Button className="flex py-2 px-3 h-8 rounded-none items-center bg-blue-500">
                <PlusOutlined className="text-white" />
                <span className="text-white">Add</span>
              </Button>
            </div>
          </div>
        </div>
      ),
      children: <UiDeveloperResourcePool />,
    },
    {
      key: "4",
      label: (
        <div className="flex flex-row items-center">
          <div className="input px-5 py-4 border w-[500px] add-resoucre-box">
            <div className="flex justify-between items-center">
              <div className="flex">
                <Image src={Api} />
                <div className="flex flex-col justify-start pl-2">
                  <h2 className="flex flex-col justify-start text-start">API Developer</h2>
                  <p className="text-left members-text">
                    {APIDeveloperLength} Members
                  </p>
                </div>
              </div>
              <Button className="flex py-2 px-3 h-8 rounded-none items-center bg-blue-500">
                <PlusOutlined className="text-white" />
                <span className="text-white">Add</span>
              </Button>
            </div>
          </div>
        </div>
      ),
      children: <ApiDeveloper />,
    },
    {
      key: "5",
      label: (
        <div className=" flex flex-row items-center">
          <div className="input px-5 py-4 border w-[500px] add-resoucre-box">
            <div className="flex justify-between items-center">
              <div className="flex">
                <Image src={tester} />
                <div className="flex flex-col justify-start pl-2">
                  <h2 className="flex flex-col justify-start text-start">
                    Tester
                  </h2>
                  <p className="text-left members-text">
                    {TesterLength} Members
                  </p>
                </div>
              </div>
              <Button className="flex py-2 px-3 h-8 rounded-none items-center bg-blue-500">
                <PlusOutlined className="text-white" />
                <span className="text-white">Add</span>
              </Button>
            </div>
          </div>
        </div>
      ),
      children: <TesterResourcePool />,
    },
    {
      key: "6",
      label: (
        <div className=" flex flex-row items-center">
          <div className="input px-5 py-4 border w-[500px] add-resoucre-box">
            <div className="flex justify-between items-center">
              <div className="flex">
                <Image src={UxResearch} />
                <div className="flex flex-col justify-start pl-2">
                  <h2 className="flex flex-col justify-start text-start">
                    UX Researcher
                  </h2>
                  <p className="text-left members-text">
                    {UXResearcherLength} Members
                  </p>
                </div>
              </div>
              <Button className="flex py-2 px-3 h-8 rounded-none items-center bg-blue-500">
                <PlusOutlined className="text-white" />
                <span className="text-white">Add</span>
              </Button>
            </div>
          </div>
        </div>
      ),
      children: <UxResearcher />,
    },
    {
      key: "7",
      label: (
        <div className=" flex flex-row mb-5 items-center">
          <div className="input px-5 py-4 border w-[500px] add-resoucre-box">
            <div className="flex justify-between items-center">
              <div className="flex">
                <Image src={CiCd} />
                <div className="flex flex-col justify-start pl-2">
                  <h2 className="flex flex-col justify-start text-start">
                    CI/CD Specialist
                  </h2>
                  <p className="text-left members-text">
                    {CICDSpecialistLength} Members
                  </p>
                </div>
              </div>
              <Button className="flex py-2 px-3 h-8 rounded-none items-center bg-blue-500">
                <PlusOutlined className="text-white" />
                <span className="text-white">Add</span>
              </Button>
            </div>
          </div>
        </div>
      ),
      children: <CiCdResourcePool />,
    },
  ];
};
const onChange = (key) => {
  console.log(key);
};

export function AddResourcePool2({ result }) {
  const [project, setProject] = useProject({});
  console.log(result);

  const router = useRouter();

  return (
    <>
      <Tabs
        defaultActiveKey="1"
        tabPosition="left"
        onChange={onChange}
        className="custom-tabs overflow h-[62vh]"
      >
        {items().map((item) => (
          <TabPane
            tab={item.label}
            key={item.key}
            className="overflow-y-scroll h-[60vh]"
          >
            {item.children}
          </TabPane>
        ))}
      </Tabs>
    </>
  );
}
