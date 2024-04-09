"use client";
import React, { useState } from "react";
import bgImg from "../../../../../public/assets/ResetPasswordBg.svg";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { setEmail } from "@/Context/Slices/resetPasswordSlice";
import Link from "next/link";

const Reset = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const reset = useSelector((state) => state.resetPassword);
  console.log(reset);
  const [email, setEmails] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmails(newEmail);
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailValid = emailPattern.test(newEmail);
    setIsButtonDisabled(!isEmailValid);
  };
  return (
    <>
      <div className="flex pl-8 flex-row items-center h-screen">
        <div className="flex flex-col h-screen p-10">
          <div className="left-card-wrapper rounded-5  w-[500px] h-[200px]  bg-primary-1 flex flex-col ">
            <h2 className="font-segoe-ui text-3xl font-bold leading-32 tracking-normal text-left mb-10 text-blue-500">
              SYNECT<span className="text-red-500">I</span>KS
            </h2>
            <h1 className="font-segoe-ui text-4xl font-bold leading-11 tracking-tighter text-left mb">
              Workflow Management
            </h1>
          </div>
          <div>
            <Link href="/account/login" className="flex mb-6">
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
          </div>
          <form action="/main">
            <div className="login w-96 h-72 flex flex-col ">
              <div className="flex input-main flex-col gap-2">
                <h1 className="font-segoe-ui text-4xl font-bold leading-11 tracking-tighter text-left mb">
                  Forgot Password
                </h1>
                <p className="card-text font-segoe-ui text-l w-[500px]  leading-10 tracking-tighter text-left text-gray-400">
                  Enter your registered email address. we’ll send you a code to
                  reset your password.
                </p>
                <div className="flex items-center input w-[100%] h-10 p-2 text-center border border-blue-500 font-roboto text-base font-normal leading-6 tracking-normal">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1"
                    stroke="blue"
                    class="w-4 h-4"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                    />
                  </svg>

                  <input
                    type="gmail"
                    className="input w-[100%] h-9 outline-none text-center  font-roboto text-base font-normal leading-6 tracking-normal"
                    placeholder="Enter Email Address"
                    onChange={handleEmailChange}
                  ></input>
                </div>
              </div>
            </div>

            <div className="flex new justify-between mt-5"></div>
            <div className="mt-8 flex flex-col gap-2 items-center">
              <div className="w-[100%]">
                <button
                  type="button"
                  value="Send otp"
                  disabled={isButtonDisabled}
                  className={` ${
                    isButtonDisabled
                      ? "bg-slate-400"
                      : "cursor-pointer hover:bg-blue-600 transition-all"
                  } w-[380px] bg-blue-500 text-white px-3 py-2 rounded`}
                  onClick={async () => {
                    console.log(reset);
                    dispatch(setEmail(email));
                    try {
                      const response = await axios.post(
                        "https://68v4n18rx1.execute-api.us-east-1.amazonaws.com/dev/forgotPassword",
                        {
                          email: email,
                        }
                      );
                      console.log(response);
                      if (email) router.push("/account/password/verification");
                      else alert("Enter email first");
                    } catch (e) {
                      console.log(e);
                      alert("some error occured");
                    }
                  }}
                >
                  Send otp
                </button>
              </div>
            </div>
          </form>
        </div>
        <Image src={bgImg} className=" w-[650px] mt-4"></Image>
      </div>
    </>
  );
};

export default Reset;
