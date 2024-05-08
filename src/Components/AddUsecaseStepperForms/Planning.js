import React, { useEffect, useState } from "react";
import { Button, Table } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";
import axios from "axios";
import { useSelector } from "react-redux";
const Planning = () => {
  const setUsecaseId = useSelector((state) => state.addUsecase);
  const UsecaseId = setUsecaseId.useCaseId;
  // const [open, setOpen] = useState(false)
  const [reciveddata, setRecivedData] = useState([]);
  const [open, setOpen] = useState(Array(reciveddata.length).fill(false));

  const toggleRequirement = (index) => {
    const newOpenState = [...open];
    newOpenState[index] = !newOpenState[index];
    setOpen(newOpenState);
  };

  useEffect(() => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `https://m41stqhs8f.execute-api.us-east-1.amazonaws.com/dev/usecase/${UsecaseId}/planning`,
      headers: {
        Accept: "application/json",
      },
    };

    axios
      .request(config)
      .then((response) => {
        // console.log(JSON.stringify(response.data));
        setRecivedData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [setRecivedData]);
  // console.log(reciveddata);

  return (
    <div className="bg-white w-[100%] p-4 h-screen mb-4">
      <div className="flex items-center justify-between mx-5">
        <h2 className="text-base font-medium leading-normal tracking-normal text-left">
          Use Case1
        </h2>
        <Button
          type="primary"
          style={{
            color: "white",
            background: "rgba(24, 144, 255, 1)",
            borderRadius: "0px",
          }}
        >
          Detail View
        </Button>
      </div>
      <div className="w-full mt-5">
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead className="bg-gray-100 border border-x-0 border-t-0 border-b-1">
            <tr>
              <th
                style={{ width: "30%" }}
                className="p-3 font-medium text-left"
              >
                Stages
              </th>
              <th
                style={{ width: "15%" }}
                className="p-3 font-medium border border-y-0 border-r-0 border-l-1"
              >
                Assign to
              </th>
              <th
                style={{ width: "12%" }}
                className="p-3 font-medium border border-y-0 border-r-0 border-l-1"
              >
                Start Date
              </th>
              <th
                style={{ width: "15%" }}
                className="p-3 font-medium border border-y-0 border-r-0 border-l-1"
              >
                Deviation
              </th>
              <th
                style={{ width: "12%" }}
                className="p-3 font-medium border border-y-0 border-r-0 border-l-1"
              >
                End Date
              </th>
              <th
                style={{ width: "15%" }}
                className="p-3 font-medium font-semiblod border border-y-0 border-r-0 border-l-1"
              >
                Deviation
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={6}>
                {reciveddata.map((Data, index) => (
                  <table
                    key={index}
                    style={{ width: "100%", borderCollapse: "collapse" }}
                  >
                    {Object.keys(Data).map((key) => (
                      <tr>
                        <td className="p-4 border border-x-0 border-t-0 border-b-1">
                          <button
                            key={key}
                            onClick={() => toggleRequirement(index)}
                            className="flex justify-between items-center text-base font-normal leading-snug tracking-normal text-left w-[15rem] p-2"
                            style={{ border: "none", padding: "0px" }}
                          >
                            <span className=" text-blue-400">{key}</span>
                            <CaretRightOutlined
                              style={{
                                transform: open[index]
                                  ? "rotate(90deg)"
                                  : "rotate(0deg)",
                              }}
                            />
                          </button>
                        </td>
                      </tr>
                    ))}
                    {open[index] && (
                      <tr>
                        <td>
                          <table
                            style={{
                              width: "100%",
                              borderCollapse: "collapse",
                            }}
                          >
                            <colgroup>
                              <col style={{ width: "30%" }} />
                              <col style={{ width: "15%" }} />
                              <col style={{ width: "12%" }} />
                              <col style={{ width: "15%" }} />
                              <col style={{ width: "12%" }} />
                              <col style={{ width: "15%" }} />
                            </colgroup>
                            {Object.values(Data).map((values) =>
                              Object.values(values).map((valuesdata) =>
                                valuesdata.map((actualData) => (
                                  <tr key={actualData.name}>
                                    <td
                                      style={{ width: "30%" }}
                                      className="font-medium leading-snug text-left py-3 px-5 border border-x-0 border-t-0 border-b-1"
                                    >
                                      {actualData.name}
                                    </td>
                                    <td
                                      style={{ width: "15%" }}
                                      className="font-medium leading-snug text-center py-3 px-5 border border-x-0 border-t-0 border-b-1"
                                    >
                                      {actualData.assigned_to.name}
                                    </td>
                                    <td
                                      style={{ width: "12%" }}
                                      className="font-medium leading-snug text-center py-3 px-5 border border-x-0 border-t-0 border-b-1"
                                    >
                                      {actualData.start_date}
                                    </td>
                                    <td
                                      style={{ width: "15%" }}
                                      className="font-medium leading-snug text-center py-3 px-5 border border-x-0 border-t-0 border-b-1"
                                    >
                                      {actualData.start_deviation}
                                    </td>
                                    <td
                                      style={{ width: "12%" }}
                                      className="font-medium leading-snug text-center py-3 px-5 border border-x-0 border-t-0 border-b-1"
                                    >
                                      {actualData.end_date}
                                    </td>
                                    <td
                                      style={{ width: "15%" }}
                                      className="font-medium leading-snug text-center py-3 px-5 border border-x-0 border-t-0 border-b-1"
                                    >
                                      {actualData.end_deviation}
                                    </td>
                                  </tr>
                                ))
                              )
                            )}
                          </table>
                        </td>
                      </tr>
                    )}
                  </table>
                ))}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Planning;
