"use client ";
import React, { useEffect, useState } from "react";
import { Tabs, Steps } from "antd";
import {
  BarsOutlined,
  ShoppingOutlined,
  RiseOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";
import Image from "next/image";
import user from "../../../public/assets/user.png";
// import { axios } from 'axios';

const UseCasesOverView = () => {
  const [size, setSize] = useState("small");



  const [requireData, setRequireData] = useState();
  const setUsecaseId = useSelector((state) => state.addUsecase);
  const UsecaseId = setUsecaseId.useCaseId;

  console.log(UsecaseId);
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
        console.log(JSON.stringify(response.data));
        const data = response.data;
        console.log(data.usecase.stages);
        setRequireData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [UsecaseId]);

  const mappedSteps =
    requireData && requireData.usecase
      ? requireData.usecase.stages.map((stage) => ({
          title: Object.keys(stage)[0], // Extracting the stage name from the dynamic key
        }))
      : [];
  return (
    <div className="mb-4 flex w-100%">
      <div className="w-[20%] h-screen mr-2 bg-white">
        <h3 className="my-3 text-lg font-medium leading-7 tracking-normal text-center">Use Case Status</h3>
        <Steps
          direction="vertical"
          className=" w-[200px] h-[100%] gap-4 p-2 justify-center "
        >
          {mappedSteps.map((step, index) => (
            <Steps.Step key={index} title={step.title} status="wait" />
          ))}
        </Steps>
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
                    {new Date(parseInt(requireData.usecase.creation_date.substr(6))).toDateString()}
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
        <div className="bg-white rounded-md mt-4 pb-3">
          <Tabs
            className="work-flow-inner-tabs"
            defaultActiveKey="1"
            type="card"
            size={size}
            items={new Array(3).fill(null).map((_, i) => {
              const id = String(i + 1);
              if (id == 1) {
                return {
                  label: `All`,
                  key: id,
                  children: (
                    <div className="flex flex-col pl-3">
                      <div className="flex items-center space-x-3 py-3 work-overview-items">
                        <RiseOutlined
                          style={{
                            background: "rgba(240, 240, 240, 1)",
                            color: "rgba(24, 144, 255, 1)",
                            padding: "5px",
                            fontSize: "1rem",
                          }}
                          className="rounded-lg"
                        />
                        <h3 className="text-base font-semibold leading-normal tracking-normal text-left">
                          Yahiyaalikhan
                        </h3>
                        <p className="text-sm font-normal leading-snug tracking-normal text-left">
                          Created the task about 2 hours ago
                        </p>
                      </div>
                      <div className="flex items-center space-x-3 py-3 work-overview-items">
                        <RiseOutlined
                          style={{
                            background: "rgba(240, 240, 240, 1)",
                            color: "rgba(24, 144, 255, 1)",
                            padding: "5px",
                            fontSize: "1rem",
                          }}
                          className="rounded-lg"
                        />
                        <h3 className="text-base font-semibold leading-normal tracking-normal text-left">
                          Yahiyaalikhan
                        </h3>
                        <p className="text-sm font-normal leading-snug tracking-normal text-left">
                          assign task to Ghouse about 6 hours ago
                        </p>
                      </div>
                      <div className="flex items-center space-x-3 py-3 work-overview-items">
                        <RiseOutlined
                          style={{
                            background: "rgba(240, 240, 240, 1)",
                            color: "rgba(24, 144, 255, 1)",
                            padding: "5px",
                            fontSize: "1rem",
                          }}
                          className="rounded-lg"
                        />
                        <h3 className="text-base font-semibold leading-normal tracking-normal text-left">
                          Ghouse
                        </h3>
                        <p className="text-sm font-normal leading-snug tracking-normal text-left">
                          Filled the task about 6 hours ago
                        </p>
                      </div>
                      <div className="flex items-center space-x-3 py-3 work-overview-items">
                        <RiseOutlined
                          style={{
                            background: "rgba(240, 240, 240, 1)",
                            color: "rgba(24, 144, 255, 1)",
                            padding: "5px",
                            fontSize: "1rem",
                          }}
                          className="rounded-lg"
                        />
                        <h3 className="text-base font-semibold leading-normal tracking-normal text-left">
                          Ghouse
                        </h3>
                        <p className="text-sm font-normal leading-snug tracking-normal text-left">
                          Started the task about 8 hours ago.
                        </p>
                      </div>
                      <div className="flex items-center space-x-3 py-3 work-overview-items">
                        <RiseOutlined
                          style={{
                            background: "rgba(240, 240, 240, 1)",
                            color: "rgba(24, 144, 255, 1)",
                            padding: "5px",
                            fontSize: "1rem",
                          }}
                          className="rounded-lg"
                        />
                        <h3 className="text-base font-semibold leading-normal tracking-normal text-left">
                          Ghouse
                        </h3>
                        <p className="text-sm font-normal leading-snug tracking-normal text-left">
                          completed the task about 12 hours ago
                        </p>
                      </div>
                      <div className="flex items-center space-x-3 py-3">
                        <MessageOutlined
                          style={{
                            background: "rgba(240, 240, 240, 1)",
                            color: "#00000073",
                            padding: "5px",
                            fontSize: "1rem",
                          }}
                          className="rounded-lg"
                        />
                        <div>
                          <h3 className="text-xs font-normal leading-snug tracking-normal text-left">
                            Ghouse
                          </h3>
                          <p className="text-xs font-normal leading-snug tracking-normal text-left">
                            Commented about 12 hours ago
                          </p>
                        </div>
                      </div>
                      <div className="ml-10 mx-10 w-[50%]">
                        <textarea
                          value={
                            "A design system for enterprise-level products. Create an efficient and enjoyable work experience."
                          }
                          className="w-full border p-2 resize-none rounded-sm"
                        ></textarea>
                      </div>
                    </div>
                  ),
                };
              } else if (id == 2) {
                return {
                  label: `Detailed log`,
                  key: id,
                  children: (
                    <div className="flex flex-col pl-3">
                      <div className="flex items-center space-x-3 py-3 work-overview-items">
                        <RiseOutlined
                          style={{
                            background: "rgba(240, 240, 240, 1)",
                            color: "rgba(24, 144, 255, 1)",
                            padding: "5px",
                            fontSize: "1rem",
                          }}
                          className="rounded-lg"
                        />
                        <h3 className="text-base font-semibold leading-normal tracking-normal text-left">
                          Yahiyaalikhan
                        </h3>
                        <p className="text-sm font-normal leading-snug tracking-normal text-left">
                          Created the task about 2 hours ago
                        </p>
                      </div>
                      <div className="flex items-center space-x-3 py-3 work-overview-items">
                        <RiseOutlined
                          style={{
                            background: "rgba(240, 240, 240, 1)",
                            color: "rgba(24, 144, 255, 1)",
                            padding: "5px",
                            fontSize: "1rem",
                          }}
                          className="rounded-lg"
                        />
                        <h3 className="text-base font-semibold leading-normal tracking-normal text-left">
                          Yahiyaalikhan
                        </h3>
                        <p className="text-sm font-normal leading-snug tracking-normal text-left">
                          assign task to Ghouse about 6 hours ago
                        </p>
                      </div>
                      <div className="flex items-center space-x-3 py-3 work-overview-items">
                        <RiseOutlined
                          style={{
                            background: "rgba(240, 240, 240, 1)",
                            color: "rgba(24, 144, 255, 1)",
                            padding: "5px",
                            fontSize: "1rem",
                          }}
                          className="rounded-lg"
                        />
                        <h3 className="text-base font-semibold leading-normal tracking-normal text-left">
                          Ghouse
                        </h3>
                        <p className="text-sm font-normal leading-snug tracking-normal text-left">
                          Filled the task about 6 hours ago
                        </p>
                      </div>
                      <div className="flex items-center space-x-3 py-3 work-overview-items">
                        <RiseOutlined
                          style={{
                            background: "rgba(240, 240, 240, 1)",
                            color: "rgba(24, 144, 255, 1)",
                            padding: "5px",
                            fontSize: "1rem",
                          }}
                          className="rounded-lg"
                        />
                        <h3 className="text-base font-semibold leading-normal tracking-normal text-left">
                          Ghouse
                        </h3>
                        <p className="text-sm font-normal leading-snug tracking-normal text-left">
                          Started the task about 8 hours ago.
                        </p>
                      </div>
                      <div className="flex items-center space-x-3 py-3 work-overview-items">
                        <RiseOutlined
                          style={{
                            background: "rgba(240, 240, 240, 1)",
                            color: "rgba(24, 144, 255, 1)",
                            padding: "5px",
                            fontSize: "1rem",
                          }}
                          className="rounded-lg"
                        />
                        <h3 className="text-base font-semibold leading-normal tracking-normal text-left">
                          Ghouse
                        </h3>
                        <p className="text-sm font-normal leading-snug tracking-normal text-left">
                          completed the task about 12 hours ago
                        </p>
                      </div>
                      <div className="flex items-center space-x-3 py-3 work-overview-items">
                        <RiseOutlined
                          style={{
                            background: "rgba(240, 240, 240, 1)",
                            color: "rgba(24, 144, 255, 1)",
                            padding: "5px",
                            fontSize: "1rem",
                          }}
                          className="rounded-lg"
                        />
                        <h3 className="text-base font-semibold leading-normal tracking-normal text-left">
                          Yahiyaalikhan
                        </h3>
                        <p className="text-sm font-normal leading-snug tracking-normal text-left">
                          Reviewed the task 24 hours ago
                        </p>
                      </div>
                      <div className="flex items-center space-x-3 py-3 work-overview-items">
                        <RiseOutlined
                          style={{
                            background: "rgba(240, 240, 240, 1)",
                            color: "rgba(24, 144, 255, 1)",
                            padding: "5px",
                            fontSize: "1rem",
                          }}
                          className="rounded-lg"
                        />
                        <h3 className="text-base font-semibold leading-normal tracking-normal text-left">
                          Yahiyaalikhan
                        </h3>
                        <p className="text-sm font-normal leading-snug tracking-normal text-left">
                          sended for approval to
                          <span className="text-base font-normal leading-normal tracking-normal text-left">
                            Akbarkhan
                          </span>
                          On February 21st 2024 at 3:00PM
                        </p>
                      </div>
                      <div className="flex items-center space-x-3 py-3">
                        <RiseOutlined
                          style={{
                            background: "rgba(240, 240, 240, 1)",
                            color: "rgba(24, 144, 255, 1)",
                            padding: "5px",
                            fontSize: "1rem",
                          }}
                          className="rounded-lg"
                        />
                        <h3 className="text-base font-semibold leading-normal tracking-normal text-left">
                          Akbarkhan
                        </h3>
                        <p className="text-sm font-normal leading-snug tracking-normal text-left">
                          Approved the design On February 22nd 2024 at 1:00PM
                        </p>
                      </div>
                    </div>
                  ),
                };
              } else if (id == 3) {
                return {
                  label: `Comment`,
                  key: id,
                  children: (
                    <div className="flex flex-col ml-3">
                      <div className="flex items-center space-x-3 my-3">
                        <MessageOutlined
                          style={{
                            background: "rgba(240, 240, 240, 1)",
                            color: "#00000073",
                            padding: "5px",
                            fontSize: "1rem",
                          }}
                          className="rounded-lg"
                        />
                        <div>
                          <h3 className="text-xs font-semibold leading-snug tracking-normal text-left">
                            Ghouse
                          </h3>
                          <p className="text-xs font-normal leading-snug tracking-normal text-left">
                            Commented about 12 hours ago
                          </p>
                        </div>
                      </div>
                      <div className="ml-10">
                        <textarea
                          value={
                            "A design system for enterprise-level products. Create an efficient and enjoyable work experience."
                          }
                          className="w-full border p-2 resize-none rounded-sm"
                        ></textarea>
                      </div>
                    </div>
                  ),
                };
              }
            })}
          />
        </div>
      </div>
    </div>
  );
};

export default UseCasesOverView;
