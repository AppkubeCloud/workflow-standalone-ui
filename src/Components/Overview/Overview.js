import React from "react";
import Image from "next/image";
import { addToggleValue } from "@/Context/useCaseSlice/useCaseSlice";
import Overviewimage from "../../../public/assets/overviewbg.svg";
import Selecttemplate from "../../../public/assets/Selecttemplate.svg";
import Createtemplate from "../../../public/assets/Createtemplate.svg";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { Row, Col } from "antd";

function Overview() {
  const dispatch = useDispatch();
  return (
    <>
      <div className="w-full h-screen bg-white rounded mb-3">
        <Row align="middle" className="h-full">
          <Col span={10}>
            <Image src={Overviewimage} className="ml-8" alt="Overview" />
          </Col>
          <Col span={14}>
            <Row gutter={2} justify="space-around" align="middle">
              <Col span={8}>
                <div className="flex border-gray-200 h-40 text-center items-center border-2 rounded-lg">
                  <Link
                    href="/main/projects/addStages"
                    onClick={() => dispatch(addToggleValue("1"))}
                    className="w-full flex flex-col items-center"
                  >
                    <Image
                      src={Selecttemplate}
                      className="mb-4"
                      alt="Select Template"
                    />
                    <h2>Select Template</h2>
                  </Link>
                </div>
              </Col>
              <Col span={8}>
                <div className="flex border-gray-200 h-40 text-center items-center border-2 rounded-lg">
                  <Link
                    href="/main/projects/addStages"
                    onClick={() => dispatch(addToggleValue("2"))}
                    className="w-full flex flex-col items-center"
                  >
                    <Image
                      src={Createtemplate}
                      className="mb-4"
                      alt="Create Template"
                    />
                    <h2>Create Template</h2>
                  </Link>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Overview;
