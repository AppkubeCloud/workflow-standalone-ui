"use client"
import React, { useState } from "react";
import login from "../../../../public/assets/loginbg1.svg";
import Image from "next/image";
import Link from "next/link";
import reset from "../password/reset/page";
import mainLogo from "../../../../public/assets/SYNECTIKS-logo.svg";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

const Login = () => {
  const route = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [errorMsg, setErrorMsg] = useState("");

  const onSubmit = (data) => {
    if (data.username === "" && data.password === "") {
      alert("Logged in successfully!");

      route.push("/main")
    } else {
      setErrorMsg("Invalid username or password.");
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="flex px-6 flex-row items-center h-screen">
        <div className="flex flex-col h-screen p-10">
          <div className="left-card-wrapper rounded-5 w-[500px] h-[200px] bg-primary-1 flex flex-col">
            <div className="mt-5 mb-10">
              <Image src={mainLogo} />
            </div>
            <h1 className="font-segoe-ui text-4xl font-medium leading-11 tracking-tighter text-left mb">
              Workflow Management
            </h1>
            <p className="card-text font-segoe-ui text-l leading-10 tracking-tighter text-left text-gray-400">
              Sign in to Manage your project and the team in easy way
            </p>
          </div>
          <form action="/main" onSubmit={handleSubmit(onSubmit)}>
            <div className="login w-96 h-72 flex flex-col justify-between">
              <div>
                <h2 className="font-segoe-ui text-3xl font-medium leading-11 tracking-tighter text-left mb">
                  Welcome 👋
                </h2>
                <p className="card-text font-segoe-ui text-sm leading-6 tracking-tighter text-left text-gray-400 mb-5">
                  Please login here
                </p>
              </div>
              <div className="flex input-main flex-col gap-7">
                <div className="flex items-center input w-[100%] h-10 p-2 text-center border border-gray-300 font-roboto text-base font-normal leading-6 tracking-normal">
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
                    type="email"
                    className="input w-[100%] h-9 outline-none text-center  font-roboto text-base font-normal leading-6 tracking-normal"
                    placeholder="username: admin or user"
                    {...register("username", {
                      required: "Username is required",
                    })}
                  ></input>
                </div>
                <div className="flex items-center input w-[100%] h-10 p-2 text-center border border-gray-300 font-roboto text-base font-normal leading-6 tracking-normal">
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
                      d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                    />
                  </svg>

                  <input
                    type="text"
                    className="input w-[100%] h-9 outline-none text-center  font-roboto text-base font-normal leading-6 tracking-normal"
                    placeholder="Password:Synectiks design"
                    {...register("password", {
                      required: "Password is required",
                    })}
                  ></input>
                </div>
                {errors.password && (
                  <p className="text-red-500">{errors.password.message}</p>
                )}
                {errorMsg && <p className="text-red-500">{errorMsg}</p>}
              </div>

              <div className="flex new justify-between mt-5">
                <div className="flex cbx gap-1">
                  <input type="checkbox" /> <span> Remember me</span>
                </div>

                <Link href="/account/password/reset" className="text-blue-500">
                  Forgot your Password?
                </Link>
              </div>

              <div className="mt-8 flex flex-col gap-2 items-center">
                <Link href="/main" className="cursor-pointer w-[100%] bg-blue-500 text-white px-3 py-2 rounded w-28 text-center">
                {/* <input
                
                  value="Sign In"
                  className="cursor-pointer w-[100%] bg-blue-500 text-white px-3 py-2 rounded w-28"
                /> */}
                Sign In
                </Link>
                <p>
                  Need an account?{" "}
                  <span className="text-blue-500">
                    <Link href="/account/emailsignup">Create one</Link>
                  </span>
                </p>
              </div>
            </div>
          </form>
        </div>
        <Image src={login} className="w-[625px] mt-4"></Image>
      </div>
    </main>
  );
};

export default Login;
