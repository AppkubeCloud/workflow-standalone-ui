"use client";
import React, { useState, useEffect } from "react";
import mainLogo from "../../../../../public/assets/SYNECTIKS-logo.svg";
import passwordlogo from "../../../../../public/assets/My password-rafiki 1.svg";
import { setNewPass } from "@/Context/Slices/resetPasswordSlice";
import Image from "next/image";
import Link from "next/link";
import { EyeInvisibleOutlined } from "@ant-design/icons";
import { Input, Form, Button } from "antd";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

const page = () => {
  const router = useRouter();
  const [password, setPassword] = useState("");
  useEffect(() => {
    console.log(reset);
  }, []);
  const [valid, setValid] = useState(true);
  const [passMatch, setPassMatch] = useState();
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  //   const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const reset = useSelector((state) => state.resetPassword);
  console.log(reset);

  const signupDetails = async (values) => {
    // setLoading(true);
    console.log("in finish");
    const data = {
      email: "kelcy15828@4yyf.cse445.com",
      //   email: reset.email,
      otp: "275854",
      newPassword:
        values.password === values.confirmpassword &&
        values.password != "" &&
        values.confirmpassword != ""
          ? password
          : "",
    };
    if (
      values.password === values.confirmpassword &&
      values.password != "" &&
      values.confirmpassword != ""
    ) {
      setPassMatch(true);
      try {
        console.log(values.password);
        dispatch(setNewPass(password));
        console.log(reset);
        console.log(password);
        //     console.log("data", data.emp_type);
        console.log(data);
        const response = await axios.post(
          "https://68v4n18rx1.execute-api.us-east-1.amazonaws.com/dev/resetPassword",
          data
        );
        console.log("response", response);
        console.log(response.message);
        //     if (response.status == 200) {
        router.push("/account/password/success");
      } catch (error) {
        console.log(error);
        console.log(error?.response?.data?.message);
        setValid(false);
      }
    } else {
      setPassMatch(false);
      console.log(
        "Password do not match p1",
        values.password,
        "p2",
        values.confirmpassword,
        "?"
      );
      //   setLoading(false);
    }
  };
  return (
    <div>
      <div className="flex items-center justify-evenly">
        <div className="">
          <Link href="/account/password/verification" className="flex mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 19.5 8.25 12l7.5-7.5"
              />
            </svg>
            Back{" "}
          </Link>
          <div className="left-card-wrapper rounded-5  w-[500px] h-[200px]  bg-primary-1 flex flex-col ">
            <div className="font-segoe-ui text-3xl font-bold leading-32 tracking-normal text-left mb-10 text-blue-500">
              <Image src={mainLogo} />
            </div>
            <h1 className="font-segoe-ui text-4xl font-bold leading-11 tracking-tighter text-left mb">
              Workflow Management
            </h1>
            <p className="card-text font-segoe-ui text-l  leading-10 tracking-tighter text-left text-gray-400">
              Create a new password that is different from the old one.
            </p>
          </div>
          <div>
            <h1 className="text-lg font-bold leading-normal text-left mb-5">
              Re-set Password
            </h1>
            <Form
              className="flex flex-col"
              style={{ width: "50vh", fontSize: "1.1rem" }}
              onFinish={signupDetails}
            >
              <Form.Item
                name="Enter new password"
                rules={[
                  {
                    required: true,
                    message: "Enter new password",
                  },
                ]}
              >
                <Input.Password
                  placeholder="Enter new password"
                  style={{
                    fontSize: "1.1rem",
                    borderRadius: "3px",
                    width: "360px",
                    height: "40px",
                    borderRadius: "2px",
                  }}
                  size="large"
                  required={true}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="new-password" // Added attribute
                />
              </Form.Item>
              <Form.Item
                name="Comfirm password"
                rules={[
                  {
                    required: true,
                    message: "Comfirm password",
                  },
                ]}
              >
                <Input.Password
                  placeholder="Comfirm password"
                  style={{
                    fontSize: "1.1rem",
                    borderRadius: "3px",
                    width: "360px",
                    height: "40px",
                    borderRadius: "2px",
                  }}
                  size="large"
                  required={true}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="new-password" // Added attribute
                />
              </Form.Item>
              {!valid && (
                <p className="text-red-500 font-semibold text-[14px] -mt-3 mb-3">
                  Invalid verification code provided, please try again.
                </p>
              )}
              <button
                className="w-[83%]"
                style={{
                  fontSize: "1.2rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  paddingBottom: "5px",
                  paddingTop: "5px",
                  backgroundColor: "#1890FF",
                  color: "white",
                  borderRadius: "3px",
                }}
                size="large"
              >
                Change Password
              </button>
            </Form>
          </div>
        </div>
        <div className="mt-10">
          <Image src={passwordlogo} alt="img" />
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default page;
