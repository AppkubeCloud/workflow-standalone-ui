"use client";
import api from "@/api";
import React from "react";
import { useState, useEffect } from "react";
import useProject from "@/HOC/Project/Project";
import user from "../../../../public/assets/user.png";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import {
  addResources,
  addResourcesData,
  addResourcesPMLength,
  addResourcesUxDesignerLength,
  addResourcesUiDeveloperLength,
  addResourcesApiDeveLength,
  addResourcesTesterLength,
  addResourcesUxResearcherLength,
  CICDSpecialistLength,
  addResourcesPM,
  addResourcesUxDesigner,
  addResourcesUiDeveloper,
  addResourcesApiDeveloper,
  addResourcesTester,
  addResourcesUxResearch,
  addResourcesCiCd,
  addResourcesCiCdLength,
} from "@/Context/AddresourcesSlice/addresourcesSlice";
import { addStepperValue } from "@/Context/AddNewProjectSlice/addProjectSlice";

export const Projectmanager = (props) => {
  // All Hooks
  const [projectResource, setprojectResource] = useState({
    resourcePool: [
      {
        projectManager: [],
      },
    ],
  });

  // project
  const [projectManager, setprojectManager] = useState([]);
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(
    projectManager.map(() => false)
  );

  // select User
  const [selectUser, setSelectUser] = useState([]);
  console.log(selectUser);
  // useEffect to fetch all users
  useEffect(() => {
    // Fetch data when the component mounts
    const fetchData = async () => {
      try {
        const response = await api.get("/get_resource_by_role", {
          params: {
            designation: "Project Manager",
          },
        });
        console.log(response.data);
        const data = response.data;
        dispatch(addResourcesPMLength(data.length));

        console.log(data.length);
        setprojectManager(data);
        setIsCheckboxChecked(
          data.map((pm) => checkboxData.includes(pm.emp_id))
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  const dispatch = useDispatch();
  const Data = useSelector((state) => state.addResources);
  const checkboxData = Data.ProjectManager;
  console.log(checkboxData);
  const EditButton = useSelector(
    (state) => state.addProject.ProjectStepperValue
  );
  useEffect(() => {
    if (EditButton === "1") {
      setIsCheckboxChecked((prevState) => prevState.map(() => true)),
        dispatch(addStepperValue(""));
    }
  }, [EditButton]);

  return (
    <div className="flex flex-col gap-4 bg-white w-[100%]">
      <div className="w-[100%] px-2 flex justify-center rounded">
        <div className=" w-[100%] ">
          {/* Project Manager useState Hook Data Map */}
          <div className="flex flex-col gap-6">
            {/* Display a static UI without mapping */}
            {projectManager.map((Manager, index) => (
              <div
                key={index}
                className={`flex items-center justify-start py-3 pr-4 pl-4 gap-40 bg-white shadow-md border rounded-lg ${
                  isCheckboxChecked[index] ? "border-blue-400 border-solid" : ""
                } `}
              >
                <div className="flex items-center gap-6 w-[100%] py-2">
                  <div className="flex items-center gap-3">
                    <Image
                      src={Manager.image ? Manager.image : user}
                      height={35}
                      width={35}
                      alt=""
                    />
                    <div>
                      <h4
                        className={`text-sm leading-tight tracking-normal text-left ${
                          isCheckboxChecked[index] ? "font-bold" : ""
                        } `}
                      >
                        {Manager.resource_name}
                        <span
                          className={` ml-1 ${
                            isCheckboxChecked[index] ? "text-blue-300" : ""
                          }`}
                        >
                          {Manager.work_email}
                        </span>
                      </h4>
                      <h3
                        className={`text-sm  leading-tight tracking-normal text-left ${
                          isCheckboxChecked[index] ? "font-normal" : ""
                        }`}
                      >
                        {Manager.designation}
                      </h3>
                    </div>
                  </div>
                  <div className="flex justify-end w-[100%] pr-3">
                    <input
                      type="checkbox"
                      onClick={(e) => {
                        const isChecked = e.target.checked;
                        if (isChecked) {
                          const selectedData = {
                            id: Manager.emp_id,
                            name: Manager.resource_name,
                            email: Manager.work_email,
                            image: Manager.image,
                            Designation: "Project Manager",
                            isChecked: true,
                          };
                          dispatch(addResources(selectedData));
                          dispatch(addResourcesData(selectedData));
                          dispatch(addResourcesPM(selectedData));
                        } else {
                          const selectedData = {
                            id: Manager.emp_id,
                            isChecked: false,
                          };
                          dispatch(addResources(selectedData));
                          dispatch(addResourcesData(selectedData));
                          dispatch(addResourcesPM(selectedData));
                        }
                        setIsCheckboxChecked((prevState) => {
                          const newState = [...prevState];
                          newState[index] = isChecked;
                          return newState;
                        });
                      }}
                      checked={isCheckboxChecked[index]}
                      className="cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Api Developer
export const ApiDeveloper = (props) => {
  // All Hooks
  // const handleResourcesAdd = (emplyyId) => {
  //   dispatch(addResources({ id: emplyyId }));
  // console.log("dispatch",emplyyId)
  // if (emplyyId) {
  //   console.log("If-Else -dispatch", emplyyId);
  //   ;
  // } else {
  //   console.error("empId is undefined");
  // }
  // dispatch(addResources({id:emplyyId}));

  // API Developer
  const [apiDeveloper, setApiDeveloper] = useState([]);
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(
    apiDeveloper.map(() => false)
  );

  const dispatch = useDispatch();
  // select User
  // useEffect to fetch all API Developers
  useEffect(() => {
    // Fetch data when the component mounts
    const fetchData = async () => {
      try {
        const response = await api.get("/get_resource_by_role", {
          params: {
            designation: "API Developer",
          },
        });
        console.log(response.data);
        const data = response.data;
        dispatch(addResourcesApiDeveLength(data.length));
        setApiDeveloper(data);
        setIsCheckboxChecked(
          data.map((pm) => checkboxData.includes(pm.emp_id))
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  const Data = useSelector((state) => state.addResources);
  const checkboxData = Data.APIDeveloper;
  console.log(checkboxData);
  const EditButton = useSelector(
    (state) => state.addProject.ProjectStepperValue
  );
  useEffect(() => {
    if (EditButton === "1") {
      // Logic to update checkbox states based on shouldNavigateToSecondPage
      // For example, you might want to check all checkboxes
      setIsCheckboxChecked((prevState) => prevState.map(() => true)),
        dispatch(addStepperValue(""));
    }
  }, [EditButton]);
  return (
    <div className="flex flex-col gap-4 bg-white w-[100%]">
      <div className="w-[100%] px-2 flex justify-center rounded">
        <div className=" w-[100%] ">
          {/* Project Manager useState Hook Data Map */}
          <div className="flex flex-col gap-6">
            {/* Display a static UI without mapping */}
            {apiDeveloper.map((Manager, index) => (
              <div
                key={index}
                className={`flex items-center justify-start py-3 pr-4 pl-4 gap-40 bg-white shadow-md border rounded-lg ${
                  isCheckboxChecked[index] ? "border-blue-400 border-solid" : ""
                } `}
              >
                <div className="flex items-center gap-6 w-[100%] py-2">
                  <div className="flex items-center gap-3">
                    <Image
                      src={Manager.image ? Manager.image : user}
                      height={35}
                      width={35}
                      alt=""
                    />
                    <div>
                      <h4
                        className={`text-sm leading-tight tracking-normal text-left ${
                          isCheckboxChecked[index] ? "font-bold" : ""
                        } `}
                      >
                        {Manager.resource_name}
                        <span
                          className={` ml-1 ${
                            isCheckboxChecked[index] ? "text-blue-300" : ""
                          }`}
                        >
                          {Manager.work_email}
                        </span>
                      </h4>
                      <h3
                        className={`text-sm  leading-tight tracking-normal text-left ${
                          isCheckboxChecked[index] ? "font-normal" : ""
                        }`}
                      >
                        {Manager.designation}
                      </h3>
                    </div>
                  </div>
                  <div className="flex justify-end w-[100%] pr-3">
                    {/* CheckBox Button */}
                    <input
                      type="checkbox"
                      onClick={(e) => {
                        const isChecked = e.target.checked;
                        if (isChecked) {
                          const selectedData = {
                            id: Manager.emp_id,
                            name: Manager.resource_name,
                            email: Manager.work_email,
                            image: Manager.image,
                            Designation: "API Developer",
                            isChecked: true,
                          };
                          dispatch(addResources(selectedData));
                          dispatch(addResourcesData(selectedData));
                          dispatch(addResourcesApiDeveloper(selectedData));
                        } else {
                          const selectedData = {
                            id: Manager.emp_id,
                            isChecked: false,
                          };
                          dispatch(addResources(selectedData));
                          dispatch(addResourcesData(selectedData));
                          dispatch(addResourcesApiDeveloper(selectedData));
                        }
                        setIsCheckboxChecked((prevState) => {
                          const newState = [...prevState];
                          newState[index] = isChecked;
                          return newState;
                        });
                      }}
                      checked={isCheckboxChecked[index]}
                      className="cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// cicd
export const CiCdResourcePool = (props) => {
  const [CiCd, setCiCd] = useState([]);
  const [selectUser, setSelectUser] = useState([]);
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(
    CiCd.map(() => false)
  );

  // useProject
  const [project, setProject] = useProject({
    resourcePool: [
      {
        cicd: [],
      },
    ],
  });

  const Data = useSelector((state) => state.addResources);
  const checkboxData = Data.CICDSpecialist;
  console.log(checkboxData);
  const EditButton = useSelector(
    (state) => state.addProject.ProjectStepperValue
  );
  useEffect(() => {
    if (EditButton === "1") {
      // Logic to update checkbox states based on shouldNavigateToSecondPage
      // For example, you might want to check all checkboxes
      setIsCheckboxChecked((prevState) => prevState.map(() => true)),
        dispatch(addStepperValue(""));
    }
  }, [EditButton]);

  // console.log(project);

  // useEffect to fetch all users
  useEffect(() => {
    // Fetch data when the component mounts
    const fetchData = async () => {
      try {
        const response = await api.get("/get_resource_by_role", {
          params: {
            designation: "CI/CD Specialist",
          },
        });

        console.log(response.data);
        const data = response.data;
        console.log("CICD", data);
        dispatch(addResourcesCiCdLength(data.length));
        setCiCd(data);
        setIsCheckboxChecked(
          data.map((pm) => checkboxData.includes(pm.emp_id))
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col gap-4 bg-white w-[100%]">
      <div className="w-[100%] px-2 flex justify-center rounded">
        <div className=" w-[100%] ">
          {/* Project Manager useState Hook Data Map */}
          <div className="flex flex-col gap-6">
            {/* Display a static UI without mapping */}
            {CiCd.map((Manager, index) => (
              <div
                key={index}
                className={`flex items-center justify-start py-3 pr-4 pl-4 gap-40 bg-white shadow-md border rounded-lg ${
                  isCheckboxChecked[index] ? "border-blue-400 border-solid" : ""
                } `}
              >
                <div className="flex items-center gap-6 w-[100%] py-2">
                  <div className="flex items-center gap-3">
                    <Image
                      src={Manager.image ? Manager.image : user}
                      height={35}
                      width={35}
                      alt=""
                    />
                    <div>
                      <h4
                        className={`text-sm leading-tight tracking-normal text-left ${
                          isCheckboxChecked[index] ? "font-bold" : ""
                        } `}
                      >
                        {Manager.resource_name}
                        <span
                          className={` ml-1 ${
                            isCheckboxChecked[index] ? "text-blue-300" : ""
                          }`}
                        >
                          {Manager.work_email}
                        </span>
                      </h4>
                      <h3
                        className={`text-sm  leading-tight tracking-normal text-left ${
                          isCheckboxChecked[index] ? "font-normal" : ""
                        }`}
                      >
                        {Manager.designation}
                      </h3>
                    </div>
                  </div>
                  <div className="flex justify-end w-[100%] pr-3">
                    {/* CheckBox Button */}
                    <input
                      type="checkbox"
                      onClick={(e) => {
                        const isChecked = e.target.checked;
                        if (isChecked) {
                          const selectedData = {
                            id: Manager.emp_id,
                            name: Manager.resource_name,
                            email: Manager.work_email,
                            image: Manager.image,
                            Designation: "CI/CD developer",
                            isChecked: true,
                          };
                          dispatch(addResources(selectedData));
                          dispatch(addResourcesData(selectedData));
                          dispatch(addResourcesCiCd(selectedData));
                        } else {
                          const selectedData = {
                            id: Manager.emp_id,
                            isChecked: false,
                          };
                          dispatch(addResources(selectedData));
                          dispatch(addResourcesData(selectedData));
                          dispatch(addResourcesCiCd(selectedData));
                        }
                        setIsCheckboxChecked((prevState) => {
                          const newState = [...prevState];
                          newState[index] = isChecked;
                          return newState;
                        });
                      }}
                      checked={isCheckboxChecked[index]}
                      className="cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Tester
export const TesterResourcePool = (props) => {
  const [Tester, setTester] = useState([]);
  const [selectUser, setSelectUser] = useState([]);
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(
    Tester.map(() => false)
  );

  // useProject
  const [projectResource, setprojectResource] = useState({
    Tester: [],
  });
  const Data = useSelector((state) => state.addResources);
  const checkboxData = Data.Tester;
  console.log(checkboxData);
  const EditButton = useSelector(
    (state) => state.addProject.ProjectStepperValue
  );
  useEffect(() => {
    if (EditButton === "1") {
      // Logic to update checkbox states based on shouldNavigateToSecondPage
      // For example, you might want to check all checkboxes
      setIsCheckboxChecked((prevState) => prevState.map(() => true)),
        dispatch(addStepperValue(""));
    }
  }, [EditButton]);
  useEffect(() => {
    // Fetch data when the component mounts
    const fetchData = async () => {
      try {
        const response = await api.get("/get_resource_by_role", {
          params: {
            designation: "Tester",
          },
        });
        console.log(response.data);
        const data = response.data;
        dispatch(addResourcesTesterLength(data.length));
        setIsCheckboxChecked(
          data.map((pm) => checkboxData.includes(pm.emp_id))
        );
        setTester(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  var dispatch = useDispatch();

  return (
    <div className="flex flex-col gap-4 bg-white w-[100%]">
      <div className="w-[100%] px-2 flex justify-center rounded">
        <div className=" w-[100%] ">
          {/* Project Manager useState Hook Data Map */}
          <div className="flex flex-col gap-6">
            {/* Display a static UI without mapping */}
            {Tester.map((Manager, index) => (
              <div
                key={index}
                className={`flex items-center justify-start py-3 pr-4 pl-4 gap-40 bg-white shadow-md border rounded-lg ${
                  isCheckboxChecked[index] ? "border-blue-400 border-solid" : ""
                } `}
              >
                <div className="flex items-center gap-6 w-[100%] py-2">
                  <div className="flex items-center gap-3">
                    <Image
                      src={Manager.image ? Manager.image : user}
                      height={35}
                      width={35}
                      alt=""
                    />
                    <div>
                      <h4
                        className={`text-sm leading-tight tracking-normal text-left ${
                          isCheckboxChecked[index] ? "font-bold" : ""
                        } `}
                      >
                        {Manager.resource_name}
                        <span
                          className={` ml-1 ${
                            isCheckboxChecked[index] ? "text-blue-300" : ""
                          }`}
                        >
                          {Manager.work_email}
                        </span>
                      </h4>
                      <h3
                        className={`text-sm  leading-tight tracking-normal text-left ${
                          isCheckboxChecked[index] ? "font-normal" : ""
                        }`}
                      >
                        {Manager.designation}
                      </h3>
                    </div>
                  </div>
                  <div className="flex justify-end w-[100%] pr-3">
                    {/* CheckBox Button */}
                    <input
                      type="checkbox"
                      onClick={(e) => {
                        const isChecked = e.target.checked;
                        if (isChecked) {
                          const selectedData = {
                            id: Manager.emp_id,
                            name: Manager.resource_name,
                            email: Manager.work_email,
                            image: Manager.image,
                            Designation: "Tester",
                            isChecked: true,
                          };
                          dispatch(addResources(selectedData));
                          dispatch(addResourcesData(selectedData));
                          dispatch(addResourcesTester(selectedData));
                        } else {
                          const selectedData = {
                            id: Manager.emp_id,
                            isChecked: false,
                          };
                          dispatch(addResources(selectedData));
                          dispatch(addResourcesData(selectedData));
                          dispatch(addResourcesTester(selectedData));
                        }
                        setIsCheckboxChecked((prevState) => {
                          const newState = [...prevState];
                          newState[index] = isChecked;
                          return newState;
                        });
                      }}
                      checked={isCheckboxChecked[index]}
                      className="cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const UxDesignResourcePool = (props) => {
  // /get_resource_by_role

  const [uxDesigner, setUxDesigners] = useState([]);
  const [selectUser, setSelectUser] = useState([]);
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(
    uxDesigner.map(() => false)
  );

  // useProject
  const [project, setProject] = useProject({
    resourcePool: [
      {
        uiDesigner: [],
      },
    ],
  });
  const Data = useSelector((state) => state.addResources);
  const checkboxData = Data.UXDesigner;
  console.log(checkboxData);
  const EditButton = useSelector(
    (state) => state.addProject.ProjectStepperValue
  );
  useEffect(() => {
    if (EditButton === "1") {
      // Logic to update checkbox states based on shouldNavigateToSecondPage
      // For example, you might want to check all checkboxes
      setIsCheckboxChecked((prevState) => prevState.map(() => true)),
        dispatch(addStepperValue(""));
    }
  }, [EditButton]);

  console.log(selectUser);

  // console.log(project);

  // useEffect to fetch all users
  useEffect(() => {
    // Fetch data when the component mounts
    const fetchData = async () => {
      try {
        const response = await api.get("/get_resource_by_role", {
          params: {
            designation: "UX Designer",
          },
        });
        console.log(response.data);
        const data = response.data;
        dispatch(addResourcesUxDesignerLength(data.length));
        setIsCheckboxChecked(
          data.map((pm) => checkboxData.includes(pm.emp_id))
        );
        setUxDesigners(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col gap-4 bg-white w-[100%]">
      <div className="w-[100%] px-2 flex justify-center rounded">
        <div className=" w-[100%] ">
          <div className="flex flex-col gap-6">
            {uxDesigner.map((Manager, index) => (
              <div
                key={index}
                className={`flex items-center justify-start py-3 pr-4 pl-4 gap-40 bg-white shadow-md border rounded-lg ${
                  isCheckboxChecked[index] ? "border-blue-400 border-solid" : ""
                } `}
              >
                <div className="flex items-center gap-6 w-[100%] py-2">
                  <div className="flex items-center gap-3">
                    <Image
                      src={Manager.image ? Manager.image : user}
                      height={35}
                      width={35}
                      alt=""
                    />
                    <div>
                      <h4
                        className={`text-sm leading-tight tracking-normal text-left ${
                          isCheckboxChecked[index] ? "font-bold" : ""
                        } `}
                      >
                        {Manager.resource_name}
                        <span
                          className={` ml-1 ${
                            isCheckboxChecked[index] ? "text-blue-300" : ""
                          }`}
                        >
                          {Manager.work_email}
                        </span>
                      </h4>
                      <h3
                        className={`text-sm  leading-tight tracking-normal text-left ${
                          isCheckboxChecked[index] ? "font-normal" : ""
                        }`}
                      >
                        {Manager.designation}
                      </h3>
                    </div>
                  </div>
                  <div className="flex justify-end w-[100%] pr-3">
                    <input
                      type="checkbox"
                      onClick={(e) => {
                        const isChecked = e.target.checked;
                        if (isChecked) {
                          const selectedData = {
                            id: Manager.emp_id,
                            name: Manager.resource_name,
                            email: Manager.work_email,
                            image: Manager.image,
                            Designation: "UX Designer",
                            isChecked: true,
                          };
                          dispatch(addResources(selectedData));
                          dispatch(addResourcesData(selectedData));
                          dispatch(addResourcesUxDesigner(selectedData));
                        } else {
                          const selectedData = {
                            id: Manager.emp_id,
                            isChecked: false,
                          };
                          dispatch(addResources(selectedData));
                          dispatch(addResourcesData(selectedData));
                          dispatch(addResourcesUxDesigner(selectedData));
                        }
                        setIsCheckboxChecked((prevState) => {
                          const newState = [...prevState];
                          newState[index] = isChecked;
                          return newState;
                        });
                      }}
                      checked={isCheckboxChecked[index]}
                      className="cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const UiDeveloperResourcePool = (props) => {
  const [uiDeveloper, setuiDeveloper] = useState([]);
  const [selectUser, setSelectUser] = useState([]);
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(
    uiDeveloper.map(() => false)
  );

  // useProject
  const [project, setProject] = useProject({
    resourcePool: [
      {
        uiDeveloper: [],
      },
    ],
  });
  const Data = useSelector((state) => state.addResources);
  const checkboxData = Data.UIDeveloper;
  console.log(checkboxData);
  const EditButton = useSelector(
    (state) => state.addProject.ProjectStepperValue
  );
  useEffect(() => {
    if (EditButton === "1") {
      // Logic to update checkbox states based on shouldNavigateToSecondPage
      // For example, you might want to check all checkboxes
      setIsCheckboxChecked((prevState) => prevState.map(() => true)),
        dispatch(addStepperValue(""));
    }
  }, [EditButton]);
  console.log(selectUser);

  // console.log(project);

  // useEffect to fetch all users
  useEffect(() => {
    // Fetch data when the component mounts
    const fetchData = async () => {
      try {
        const response = await api.get("/get_resource_by_role", {
          params: {
            designation: "UI Developer",
          },
        });
        console.log(response.data);
        const data = response.data;
        dispatch(addResourcesUiDeveloperLength(data.length));
        setIsCheckboxChecked(
          data.map((pm) => checkboxData.includes(pm.emp_id))
        );
        setuiDeveloper(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col gap-4 bg-white w-[100%]">
      <div className="w-[100%] px-2 flex justify-center rounded">
        <div className=" w-[100%] ">
          {/* Project Manager useState Hook Data Map */}
          <div className="flex flex-col gap-6">
            {/* Display a static UI without mapping */}
            {uiDeveloper.map((Manager, index) => (
              <div
                key={index}
                className={`flex items-center justify-start py-3 pr-4 pl-4 gap-40 bg-white shadow-md border rounded-lg ${
                  isCheckboxChecked[index] ? "border-blue-400 border-solid" : ""
                } `}
              >
                <div className="flex items-center gap-6 w-[100%] py-2">
                  <div className="flex items-center gap-3">
                    <Image
                      src={Manager.image ? Manager.image : user}
                      height={35}
                      width={35}
                      alt=""
                    />
                    <div>
                      <h4
                        className={`text-sm leading-tight tracking-normal text-left ${
                          isCheckboxChecked[index] ? "font-bold" : ""
                        } `}
                      >
                        {Manager.resource_name}
                        <span
                          className={` ml-1 ${
                            isCheckboxChecked[index] ? "text-blue-300" : ""
                          }`}
                        >
                          {Manager.work_email}
                        </span>
                      </h4>
                      <h3
                        className={`text-sm  leading-tight tracking-normal text-left ${
                          isCheckboxChecked[index] ? "font-normal" : ""
                        }`}
                      >
                        {Manager.designation}
                      </h3>
                    </div>
                  </div>
                  <div className="flex justify-end w-[100%] pr-3">
                    {/* CheckBox Button */}
                    <input
                      type="checkbox"
                      onClick={(e) => {
                        const isChecked = e.target.checked;
                        if (isChecked) {
                          const selectedData = {
                            id: Manager.emp_id,
                            name: Manager.resource_name,
                            email: Manager.work_email,
                            image: Manager.image,
                            Designation: "UI Developer",
                            isChecked: true,
                          };
                          dispatch(addResources(selectedData));
                          dispatch(addResourcesData(selectedData));
                          dispatch(addResourcesUiDeveloper(selectedData));
                        } else {
                          const selectedData = {
                            id: Manager.emp_id,
                            isChecked: false,
                          };
                          dispatch(addResources(selectedData));
                          dispatch(addResourcesData(selectedData));
                          dispatch(addResourcesUiDeveloper(selectedData));
                        }
                        setIsCheckboxChecked((prevState) => {
                          const newState = [...prevState];
                          newState[index] = isChecked;
                          return newState;
                        });
                      }}
                      checked={isCheckboxChecked[index]}
                      className="cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const UxResearcher = (props) => {
  const [uxResearcher, setuxResearcher] = useState([]);
  const [selectUser, setSelectUser] = useState([]);
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(
    uxResearcher.map(() => false)
  );

  // useProject
  const [project, setProject] = useProject({
    resourcePool: [
      {
        uxResearcher: [],
      },
    ],
  });

  // useEffect to fetch all users
  useEffect(() => {
    // Fetch data when the component mounts
    const fetchData = async () => {
      try {
        const response = await api.get("/get_resource_by_role", {
          params: {
            designation: "Ux Researcher",
          },
        });
        console.log("uxResearcher", response.data);
        const data = response.data;
        dispatch(addResourcesUxResearcherLength(data.length));
        setIsCheckboxChecked(
          data.map((pm) => checkboxData.includes(pm.emp_id))
        );
        setuxResearcher(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  const dispatch = useDispatch();
  const Data = useSelector((state) => state.addResources);
  const checkboxData = Data.UXResearcher;
  console.log(checkboxData);
  const EditButton = useSelector(
    (state) => state.addProject.ProjectStepperValue
  );
  useEffect(() => {
    if (EditButton === "1") {
      // Logic to update checkbox states based on shouldNavigateToSecondPage
      // For example, you might want to check all checkboxes
      setIsCheckboxChecked((prevState) => prevState.map(() => true)),
        dispatch(addStepperValue(""));
    }
  }, [EditButton]);
  return (
    <div className="flex flex-col gap-4 bg-white w-[100%]">
      <div className="w-[100%] px-2 flex justify-center rounded">
        <div className=" w-[100%] ">
          {/* Project Manager useState Hook Data Map */}
          <div className="flex flex-col gap-6">
            {/* Display a static UI without mapping */}
            {uxResearcher.map((Manager, index) => (
              <div
                key={index}
                className={`flex items-center justify-start py-3 pr-4 pl-4 gap-40 bg-white shadow-md border rounded-lg ${
                  isCheckboxChecked[index] ? "border-blue-400 border-solid" : ""
                } `}
              >
                <div className="flex items-center gap-6 w-[100%] py-2">
                  <div className="flex items-center gap-3">
                    <Image
                      src={Manager.image ? Manager.image : user}
                      height={35}
                      width={35}
                      alt=""
                    />
                    <div>
                      <h4
                        className={`text-sm leading-tight tracking-normal text-left ${
                          isCheckboxChecked[index] ? "font-bold" : ""
                        } `}
                      >
                        {Manager.resource_name}
                        <span
                          className={` ml-1 ${
                            isCheckboxChecked[index] ? "text-blue-300" : ""
                          }`}
                        >
                          {Manager.work_email}
                        </span>
                      </h4>
                      <h3
                        className={`text-sm  leading-tight tracking-normal text-left ${
                          isCheckboxChecked[index] ? "font-normal" : ""
                        }`}
                      >
                        {Manager.designation}
                      </h3>
                    </div>
                  </div>
                  <div className="flex justify-end w-[100%] pr-3">
                    {/* CheckBox Button */}
                    <input
                      type="checkbox"
                      onClick={(e) => {
                        const isChecked = e.target.checked;
                        if (isChecked) {
                          const selectedData = {
                            id: Manager.emp_id,
                            name: Manager.resource_name,
                            email: Manager.work_email,
                            image: Manager.image,
                            Designation: "UX Designer",
                            isChecked: true,
                          };
                          dispatch(addResources(selectedData));
                          dispatch(addResourcesData(selectedData));
                          dispatch(addResourcesUxDesigner(selectedData));
                        } else {
                          const selectedData = {
                            id: Manager.emp_id,
                            isChecked: false,
                          };
                          dispatch(addResources(selectedData));
                          dispatch(addResourcesData(selectedData));
                          dispatch(addResourcesUxDesigner(selectedData));
                        }
                        setIsCheckboxChecked((prevState) => {
                          const newState = [...prevState];
                          newState[index] = isChecked;
                          return newState;
                        });
                      }}
                      checked={isCheckboxChecked[index]}
                      className="cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
