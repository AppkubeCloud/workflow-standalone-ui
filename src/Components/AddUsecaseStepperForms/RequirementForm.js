"use client";
import React, { useEffect, useState, useRef } from "react";
import {
  Form,
  Input,
  Modal,
  Upload,
  notification,
  Button,
  Skeleton,
} from "antd";
import {
  BugOutlined,
  CaretDownOutlined,
  FileProtectOutlined,
  LinkOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { MessageOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import Image from "next/image";

//Doc upload//
import { InboxOutlined } from "@ant-design/icons";
import axios from "axios";
import AssignBtnImg from "../../../public/assets/AssignImg.png";
const { Dragger } = Upload;
//Doc upload//

const RequirementForm = (stepperState) => {
  console.log("propsValue", stepperState);

  const [requiretasks, setrequireTasks] = useState([]);
  const [requireChecklist, setrequireChecklist] = useState();
  const setUsecaseId = useSelector((state) => state.addUsecase);
  const UsecaseId = setUsecaseId.useCaseId;
  const [loading, setLoading] = useState(true);

  const [RolesDetails, setRolesDetails] = useState();
  const [Roles, setRoles] = useState();
  const [teamData, setTeamData] = useState([]);
  const setprojectIds = useSelector((state) => state.addResources);
  const projectId = setprojectIds.id[0].prjectId;
  console.log(UsecaseId);

  useEffect(() => {
    const axios = require("axios");

    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `https://m41stqhs8f.execute-api.us-east-1.amazonaws.com/dev/usecase/${UsecaseId}/task`,
      headers: {
        Accept: "application/json",
      },
    };
    setLoading(true); // Set loading state to true when fetching data

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        console.log(response.data);

        console.log(JSON.stringify(response.data.stages));
        const stages = response.data.stages;
        console.log(stages);
        const propsValue = Object.values(stepperState)[0];
        const stage = stages.filter(
          (obj) => Object.values(stepperState)[0] in obj
        );
        const tasks = stage[0][propsValue].tasks;
        const Docs = tasks.docs;
        console.log(tasks);
        console.log("tasks", JSON.stringify(tasks));
        console.log(Docs);
        const checkList = stage[0][propsValue].checklist;
        setrequireTasks(tasks);
        setrequireChecklist(checkList);

        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://m41stqhs8f.execute-api.us-east-1.amazonaws.com/dev/project/${projectId}/team`
        );
        const responseData = response.data;
        console.log("responsedata ", responseData);
        console.log(JSON.stringify(responseData));
        const data = response.data;
        setRolesDetails(data.map((obj) => Object.values(obj)));
        setRoles(data.map((obj) => Object.keys(obj)));
        setTeamData(responseData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [UsecaseId, stepperState, projectId]);
  console.log(Roles);

  console.log("teamData", teamData);
  console.log("teamDetails", RolesDetails);
  console.log(requiretasks);
  console.log(JSON.stringify(requiretasks));

  let items = [];
  if (Roles) {
    items = Roles.map((data, index) => ({
      label: data,
      items: ["Resource 1", "Resource 2", "Resource 3"],
    }));
  }

  //////////---------------- Doc upload starts here
  const [image, setimage] = useState([]);
  const [fileuploaded, setfileuploaded] = useState(false);
  const [convertedImages, setConvertedImages] = useState([]);
  const [convertedLinkString, setconvertedLinkString] = useState("");
  const [Attachments, setAttachments] = useState([]);
  const [uploadingFiles, setUploadingFiles] = useState([]);
  const [uploadingBase64, setuploadingBase64] = useState([]);

  console.log(Attachments);
  const handleFileChange = (info) => {
    const allFiles = info.fileList;
    const imgarray = allFiles.map((e) => e.originFileObj);
    setfileuploaded(true);
    setUploadingFiles(allFiles);
    convertImagesToBase64(imgarray);
  };

  const convertImagesToBase64 = async (images) => {
    const newConvertedImages = [];
    for (let i = 0; i < images.length; i++) {
      const file = images[i];
      if (file) {
        const reader = new FileReader();
        const base64 = await new Promise((resolve, reject) => {
          reader.onload = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
        newConvertedImages.push({ fileName: file.name, data: base64 });
      }
    }
    setConvertedImages(newConvertedImages);
    setuploadingBase64(newConvertedImages[0].data);
    console.log(
      "NEWcONVERiMAGE",
      newConvertedImages,
      newConvertedImages[0].data
    );
  };
  // const accessToken = getAccessTokenFromCookie();
  const accessToken =
    "eyJraWQiOiJ0WExXYzd1ZGhyaVwvVEhLYldwK3F2bEw4SGtJTXQwZVBhUmlzQXhCd0lwRT0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIwNDA4NjQ2OC1kMDUxLTcwMmQtOTY2Mi1hNWRmNTQ5ZjRlMzQiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLnVzLWVhc3QtMS5hbWF6b25hd3MuY29tXC91cy1lYXN0LTFfSlA1QjRXWGJIIiwiY3VzdG9tOnVzZXJfaWQiOiIyNGUyOTU0Yi05MzQzLTQ3MWQtODI2Yi0wMDAzYTBlNzZiYjEiLCJjdXN0b206b3JnX2lkIjoiNWM3NWE0MDQtMTJhOC00Yzc5LTkwZDgtNmIzMzgyNTE1NDlkIiwiY29nbml0bzp1c2VybmFtZSI6IjA0MDg2NDY4LWQwNTEtNzAyZC05NjYyLWE1ZGY1NDlmNGUzNCIsIm9yaWdpbl9qdGkiOiJjZmZlMzI3MC00ZWM3LTQwYzYtYjQzMC02NTk3OTA0MzNjODUiLCJhdWQiOiI3OXFhMDR1bXY1bzFoc2tvajVmcXRkMnM4cCIsImV2ZW50X2lkIjoiNzYyYjk3M2MtOGZkYS00MWQxLWIyNGQtMGY4N2JhMzk5Y2E1IiwidG9rZW5fdXNlIjoiaWQiLCJhdXRoX3RpbWUiOjE3MTI1Njg3MTgsImV4cCI6MTcxMjY1NTExOCwiY3VzdG9tOnJvbGUiOiJhZG1pbiIsImlhdCI6MTcxMjU2ODcxOCwianRpIjoiYmU0Mzg0NzItNjQ1Yi00ZTdkLWI2YTItNGQyODdlOGYzMzBmIiwiZW1haWwiOiJqZWRlZmVsMTU1QGNlbnRlcmYuY29tIn0.C_IgEAsz3Irzi3UjTHDrNZjb9kgB3k4N-72OP-9KjYJv8yxqZX3i7m26vtaK4pPaJvGQTwcBe-1LcZUo0oilzWzWmrx47LPdYM2WtBaL4nxt1KKToFPDNXJsGTeZHA14l0LarPuxY7Yg-t4dl-ZT9J6hSs3rnawVIgmX9Lq9x-lw6-V4zxF6D31cotvKLHoAq2-SdDgZChPbwtJ9MDeV2S2cyut4tLBu0JxrjfWWTV2Aq4g9FOnFLbzBIy9YuS5W-Xjww1gfmyG0CEs5g90nO7AnCMOvLWpG5cpm8Sg6c3ZFkctXpCYcJjXXf37mEpwAeZwEVwoFCKWjk9k3hYdcGg";

  useEffect(() => {
    if (fileuploaded && convertedImages.length > 0) {
      setfileuploaded(false);
    }
  }, [fileuploaded, convertedImages]);

  const getFileNameFromUrl = (url) => {
    return url.substring(url.lastIndexOf("/") + 1);
  };

  const UploadDocs = () => (
    <Dragger
      multiple
      onChange={(e) => {
        handleFileChange(e);
      }}
    >
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">
        Click or drag file to this area to upload
      </p>
      <p className="ant-upload-hint">
        Support for a single or bulk upload. Strictly prohibited from uploading
        company data or other banned files.
      </p>
    </Dragger>
  );

  /////////--------------  Doc upload ends

  //////---------------Doc Link

  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const inputName = (e) => {
    setName(e.target.value);
  };

  const inputLink = (e) => {
    setLink(e.target.value);
    console.log("link", e.target.value);
  };

  const handleSubmit = async () => {
    if (!link) {
      console.log("No link provided");
      return;
    }

    try {
      // Fetch the image from the provided URL
      const response = await fetch(link);
      const response1 = response.url;
      console.log(response1);
      console.log(response);
      const blob = await response.blob();

      // Convert the blob to base64
      const base64 = await blobToBase64(blob);

      // Prepare data to send to API

      const newAttachments = [];
      const request = {
        // name: name,
        fileName: name,
        data: base64,
      };

      // Send data to API
      const apiResponse = await axios.post(
        "https://68v4n18rx1.execute-api.us-east-1.amazonaws.com/doc/docUpload",
        request,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      // Handle API response
      console.log(apiResponse.data);
      setconvertedLinkString(apiResponse.data.link);
      newAttachments.push(apiResponse.data.link);
      setAttachments([...Attachments, ...newAttachments]);
      setConvertedImages([]); // Reset convertedImages after upload
      setUploadingFiles([]); // Clear uploading files after upload
    } catch (error) {
      // Handle error
      console.error("Error:", error);
    }
  };

  const blobToBase64 = (blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  //////---------------Doc Link End

  const [DocumentAssign, setDocumentAssign] = useState({
    doc_name: "",
  });

  const handleChange = (e) => {
    // Update the project state as the user types
    setDocumentAssign({ ...DocumentAssign, [e.target.name]: e.target.value });
    console.log(DocumentAssign);
  };
  //------------Docs Post
  const UploadingDoc = () => {
    HandleUploadingDoc(), handleCancel();
  };
  const UploadingLink = () => {
    HandleUploadingLink(), handleCancel();
  };

  const HandleUploadingDoc = async () => {
    const response = await fetch(link);
    const response1 = response.url;
    console.log(response1);
    console.log(response);
    const blob = await response.blob();

    // Convert the blob to base64
    const base64 = await blobToBase64(blob);

    let data = JSON.stringify({
      // created_by: "bb933ca1-df71-413a-9f96-f0f289e4417a",
      doc_name: DocumentAssign.doc_name,
      data: uploadingBase64,
    });
    console.log("request :", data);
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `https://m41stqhs8f.execute-api.us-east-1.amazonaws.com/dev/task/${TaskId}/doc`,
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
        if (response.status === 200) {
          const currentTask = requiretasks.at(AssignIndex);
          const updatedDocs = [...currentTask.docs];

          updatedDocs.push({
            doc_name: response.data.doc_name,
            doc_url: response.data.doc_url,
            type: "png",
          });

          const updatedTask = {
            ...currentTask,
            docs: updatedDocs,
          };

          const updatedTasks = [...requiretasks];
          updatedTasks[AssignIndex] = updatedTask;

          setrequireTasks(updatedTasks);
        }
      })
      .catch((error) => {
        console.log(error);
        openNotification("topRight", "error", `${error.response.data.message}`);
      });
  };

  /////-----HandelLinkUpload
  const HandleUploadingLink = async () => {
    let data = JSON.stringify({
      doc_name: name,
      data: link,
    });
    console.log("request :", data);
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `https://m41stqhs8f.execute-api.us-east-1.amazonaws.com/dev/task/${TaskId}/doc`,
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
        if (response.status === 200) {
          const currentTask = requiretasks.at(AssignIndex);
          const updatedDocs = [...currentTask.docs];

          // console.log("Docs", currentTask)
          updatedDocs.push({
            doc_name: name,
            doc_url: response.data.doc_url,

            type: "url",
          }),
            console.log("Docs", currentTask);
          // handleAssignButtonClick(AssignResourseId);
          const updatedTask = {
            ...currentTask,
            docs: updatedDocs,
          };

          // Create a new array with updatedTask at AssignIndex
          const updatedTasks = [...requiretasks];
          updatedTasks[AssignIndex] = updatedTask;

          // Update the state with the new array
          setrequireTasks(updatedTasks);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  ///------------Docs Post

  const [openItemIndex, setOpenItemIndex] = useState(null);
  const [openActionIndex, setopenActionIndex] = useState(null);
  const [openImageIndex, setopenImageIndex] = useState([]);
  const dropdownRef = useRef(null);
  const closedropdownRef = useRef(null);
  const [showOptions, setShowOptions] = useState(
    requiretasks ? Array(requiretasks.length).fill(false) : []
  );
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedSubItem, setSelectedSubItem] = useState(null);
  const [selectedAssign, setSelectedAssign] = useState();
  const [selectedAssignName, setSelectedAssignName] = useState();
  const [AssignName, setAssignName] = useState();
  const [AssignIndex, setAssignIndex] = useState();
  const [AssignDocs, setAssignDocs] = useState();
  const [AssignImg, setAssignImg] = useState();
  const [AssignResourseId, setAssignResurseId] = useState();
  const [TaskId, setTaskId] = useState();

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !event.target.closest(".relative.flex")
      ) {
        setOpenItemIndex(null);
      }
    }

    if (openItemIndex !== null) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openItemIndex, dropdownRef]);

  // action button
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        closedropdownRef.current &&
        !closedropdownRef.current.contains(event.target) &&
        !event.target.closest(".relative")
      ) {
        setopenActionIndex(null);
      }
    }

    if (openActionIndex !== null) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openActionIndex]);

  const openNotification = (placement, type, message) => {
    notification[type]({
      message: message,
      placement: placement,
    });
  };

  const toggleSaved = (index) => {
    setopenImageIndex((prevIndexes) => {
      const currentIndex = prevIndexes.indexOf(index);
      if (currentIndex === -1) {
        return [...prevIndexes, index];
      } else {
        return prevIndexes.filter((i) => i !== index);
      }
    });
  };

  const toggleOptions = (index) => {
    const newShowOptions = [...showOptions];
    newShowOptions[index] = !newShowOptions[index];
    setShowOptions(newShowOptions);
    // setopenActionIndex(openActionIndex === index ? null : index);

    setopenActionIndex(index);
  };
  const handleOptionClick = () => {
    setShowUploadModal(true);
  };
  const handleCancel = () => {
    setShowUploadModal(false);
    setIsModalOpen(false);
  };

  const toggleSubItems = (index) => {
    setOpenItemIndex(openItemIndex === index ? null : index);
  };
  const handleSubItemClick = (subItem) => {
    setSelectedSubItem(subItem);
  };

  const handleTaskId = (taskId) => {
    setTaskId(taskId);
    console.log("selectedTaskId", taskId);
  };
  const handleAssigneName = (name) => {
    setSelectedAssignName(name);
  };
  const assigndbutton = () => {
    const currentTask = requiretasks.at(AssignIndex);
    (currentTask.assigned_to.Id = AssignResourseId),
      (currentTask.assigned_to.name = AssignName),
      (currentTask.assigned_to.image = AssignImg);
    handleAssignButtonClick(AssignResourseId);
    setOpenItemIndex(null);
  };

  const handleAssignButtonClick = (id) => {
    console.log("Selected SubItem:", id);

    const axios = require("axios");

    let config = {
      method: "put",
      maxBodyLength: Infinity,
      url: `https://m41stqhs8f.execute-api.us-east-1.amazonaws.com/dev/task/${TaskId}/assign/${id}`,
      headers: {
        Accept: "application/json",
      },
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        openNotification("topRight", "success", `${response.data.message}`);
        console.log("resporns Datar", response.data);
        const currentTask = requiretasks.at(AssignIndex);
        (currentTask.assigneId = AssignResourseId),
          (currentTask.assigneName = AssignName),
          (currentTask.assigne_image = AssignImg);
        requiretasks[AssignIndex] = currentTask;
        console.log(config);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      {loading ? (
        <p>
          <Skeleton
            active
            paragraph={{
              rows: 6,
            }}
          />
        </p>
      ) : (
        <>
          {requiretasks.map(
            (data, index) => (
              console.log("taskData", data),
              (
                <div className="mb-5 " style={{ zIndex: "0" }} key={index}>
                  <div
                    className="flex items-center justify-between py-3 px-3"
                    style={{ background: "rgba(230, 247, 255, 1)" }}
                  >
                    <h2 className="text-base font-semibold leading-tight tracking-normal text-left">
                      {data.name}
                    </h2>
                  </div>
                  <div
                    className="flex items-start justify-between p-5 bg-gray-100"
                    style={{ minHeight: "5.5rem", maxHeight: "auto" }}
                    key={index}
                  >
                    <div className="Main-Wrap">
                      <div className="flex items-center gap-1">
                        <div
                          ref={dropdownRef}
                          className=" Assinee-Btn relative flex items-center gap-4"
                        >
                          <button
                            onClick={() => toggleSubItems(index)}
                            className="z-0"
                          >
                            <Image src={AssignBtnImg} />
                          </button>

                          {openItemIndex === index && showOptions && (
                            <ul
                              className="absolute top-10 left-0 bg-white text-black shadow-md rounded-md "
                              style={{ zIndex: "10" }}
                            >
                              <div className="flex items-center justify-center">
                                <SearchOutlined className="pl-2" />
                                <input
                                  type="text"
                                  placeholder="Search Role"
                                  className="outline-none ml-2"
                                />
                              </div>
                              {teamData.map(
                                (itemsData, itemIndex) => (
                                  console.log(itemsData),
                                  (
                                    <li key={itemIndex} className="p-2">
                                      <div className="flex items-center justify-between">
                                        {Object.keys(itemsData).map(
                                          (key, inx) => (
                                            console.log(key),
                                            (
                                              <button
                                                key={inx}
                                                onClick={() =>
                                                  handleSubItemClick(
                                                    itemIndex ===
                                                      selectedSubItem
                                                      ? null
                                                      : itemIndex
                                                  )
                                                }
                                                className="font-semibold"
                                              >
                                                {key}
                                              </button>
                                            )
                                          )
                                        )}
                                        <CaretDownOutlined />
                                      </div>
                                      {selectedSubItem === itemIndex &&
                                        itemsData && (
                                          <ul>
                                            <li className=" ">
                                              {Object.values(itemsData).map(
                                                (subItem, i) => (
                                                  <React.Fragment key={i}>
                                                    {Array.isArray(subItem) &&
                                                      subItem.map(
                                                        (item, j) => (
                                                          console.log(
                                                            item.resource_id
                                                          ),
                                                          (
                                                            <button
                                                              key={j}
                                                              className="py-1 w-[100%]"
                                                              style={{
                                                                backgroundColor:
                                                                  selectedAssign ===
                                                                  item.resource_id // Assuming selectedSubItem is the selected name
                                                                    ? "#E6F7FF"
                                                                    : "transparent",
                                                              }}
                                                              onClick={() => {
                                                                setAssignIndex(
                                                                  index
                                                                );
                                                                setAssignResurseId(
                                                                  item.resource_id
                                                                ),
                                                                  setAssignName(
                                                                    item.name
                                                                  ),
                                                                  setAssignImg(
                                                                    items.image_url
                                                                  );

                                                                handleTaskId(
                                                                  data.id
                                                                );
                                                                // handleSelectedResourse(
                                                                //   item.resource_id
                                                                // );

                                                                handleAssigneName(
                                                                  item.name
                                                                );
                                                                setSelectedAssign(
                                                                  item.resource_id
                                                                );
                                                              }}
                                                            >
                                                              {item.name}
                                                              {/* Assuming name is the property to be displayed */}
                                                            </button>
                                                          )
                                                        )
                                                      )}
                                                  </React.Fragment>
                                                )
                                              )}
                                            </li>
                                            <button
                                              ref={dropdownRef}
                                              onClick={() => {
                                                // handleAssignButtonClick(
                                                //   selectedAssign
                                                // );
                                                assigndbutton();
                                                handleSubItemClick(
                                                  itemIndex === selectedSubItem
                                                    ? null
                                                    : itemIndex
                                                );
                                                toggleSaved(index);
                                                // setIsDropdownOpen(false)
                                              }}
                                              style={{
                                                backgroundColor: "#4299e1",
                                                padding: "0.5rem 0.75rem",
                                                color: "#ffffff",
                                                borderRadius: "0.375rem",
                                              }}
                                              // className="action-button bg-sky-500 px-2 py-1 text-white rounded-sm  "
                                            >
                                              Assign
                                            </button>
                                          </ul>
                                        )}
                                    </li>
                                  )
                                )
                              )}
                            </ul>
                          )}
                        </div>
                        <div className="Assignee">
                          {loading ? (
                            <p></p>
                          ) : (
                            <div className="flex gap-2 w-[2]" id="AssigneeImg">
                              <h5>{data.assigned_to.name}</h5>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="Assignee-Doc mt-2">
                        {loading ? (
                          <p></p>
                        ) : (
                          <div
                            className="flex flex-wrap gap-2 "
                            id="AssigneeImg"
                            style={{
                              width: "40rem",
                            }}
                          >
                            {data.docs &&
                              data.docs.length > 0 &&
                              data.docs.map((doc, index) => (
                                <div
                                  key={index}
                                  className="bg-white border relative right-0 text-black p-4 rounded-md flex  flex-col items-center gap-1 "
                                >
                                  {doc.type === "html" && (
                                    <>
                                      <Image
                                        src={doc.doc_url}
                                        alt={doc.doc_name}
                                        height={34}
                                        width={34}
                                      />
                                      <p>{doc.doc_name}</p>
                                    </>
                                  )}
                                  {doc.type === "png" && (
                                    <>
                                      <Image
                                        src={doc.doc_url}
                                        alt={doc.doc_name}
                                        height={34}
                                        width={34}
                                      />
                                      <p>{doc.doc_name}</p>
                                    </>
                                  )}
                                  {doc.type === "url" && (
                                    <a href={doc.doc_url} target="_blank">
                                      {doc.doc_name}
                                    </a>
                                  )}
                                </div>
                              ))}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MessageOutlined style={{ fontSize: "20px" }} />
                      <div className="relative" ref={closedropdownRef}>
                        <button
                          onClick={() => {
                            toggleOptions(index), setAssignIndex(index);
                            setAssignDocs(data.id);
                            handleTaskId(data.id);

                            console.log("selected TaskId", data.id);
                          }}
                          className="bg-blue-500 hover:bg-blue-700 text-white font-semibold px-3 py-2 ml-2 rounded-0"
                        >
                          Action
                        </button>
                        {openActionIndex === index && (
                          <div className=" cursor-pointer absolute z-10 bg-white w-[10rem] p-2 -left-[50%] rounded-lg shadow-lg overflow-hidden">
                            <ul>
                              <li onClick={handleOptionClick}>
                                <FileProtectOutlined /> Upload Document
                              </li>
                              <li onClick={showModal}>
                                <LinkOutlined /> Upload Link
                              </li>
                              <li onClick={handleOptionClick}>
                                <BugOutlined /> Raise Issue
                              </li>
                            </ul>
                          </div>
                        )}

                        <Modal
                          title="Upload Document"
                          visible={showUploadModal}
                          onCancel={handleCancel}
                          footer={null}
                        >
                          <UploadDocs />
                          <Form.Item
                            className="flex items-center ml-4 mt-2 "
                            name={["doc_name"]}
                            label="Enter Document Name"
                            rules={[
                              {
                                message: "Please input the Document Name!",
                              },
                            ]}
                          >
                            <Input
                              name="doc_name"
                              id="DocsName"
                              value={DocumentAssign.doc_name}
                              className="h-6"
                              onChange={handleChange}
                            />
                          </Form.Item>
                          <Button
                            className="mt-1"
                            onClick={() => {
                              UploadingDoc();
                            }}
                          >
                            Upload
                          </Button>
                        </Modal>

                        <Modal
                          title="Document Upload"
                          open={isModalOpen}
                          onOk={() => {
                            handleOk(), handleSubmit();
                            UploadingLink();
                          }}
                          onCancel={handleCancel}
                          footer={[
                            <Button key="cancel" onClick={handleCancel}>
                              Cancel
                            </Button>, // Cancel button
                            <Button
                              key="submit"
                              type="primary"
                              onClick={() => {
                                handleOk();
                                UploadingLink();
                              }}
                              style={{
                                backgroundColor: "#4299e1",
                                padding: "0.2rem 0.75rem",
                                color: "#ffffff",
                                borderRadius: "0.375rem",
                              }}
                            >
                              OK
                            </Button>,
                          ]}
                        >
                          <div className="flex flex-col gap-4">
                            <input
                              onChange={(e) => {
                                inputName(e);
                              }}
                              className="p-2 border rounded "
                              placeholder="Enter Name"
                            ></input>
                            <div className="flex w-full ">
                              <button className="mr-2 border rounded p-2">
                                https://
                              </button>
                              <input
                                onChange={(e) => {
                                  inputLink(e);
                                }}
                                className="p-2 border rounded  w-full"
                                placeholder="Paste link here "
                              ></input>
                            </div>
                          </div>
                        </Modal>
                      </div>
                    </div>
                  </div>
                </div>
              )
            )
          )}
          <div className="mt-5 bg-gray-100 p-3">
            <h2 className="text-l font-medium mb-2">
              Checklist for requirement
            </h2>
            {requireChecklist.map((checklistdata, index) => (
              <div className="py-2 flex items-center gap-2" key={index}>
                <input type="checkbox"></input>
                <p>{checklistdata.description}</p>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center mt-5">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-semibold px-3 py-2 ml-2 rounded-0">
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default RequirementForm;
