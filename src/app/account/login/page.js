"use client";
import React, { useState } from "react";
import login from "../../../../public/assets/loginbg1.svg";
import Image from "next/image";
import Link from "next/link";
import reset from "../password/reset/page";
import mainLogo from "../../../../public/assets/SYNECTIKS-logo.svg";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";

const Login = () => {
  const route = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [errorMsg, setErrorMsg] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  // const onSubmit = (data) => {
  //   if (data.username === "" && data.password === "") {
  //     alert("Logged in successfully!");

  //     route.push("/main")
  //   } else {
  //     setErrorMsg("Invalid username or password.");
  //   }
  // };

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    validateForm(newEmail, password);
  };

  const validateForm = (newEmail, newPassword) => {
    // Email pattern for validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Password pattern for validation
    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    // Check if email and password match the specified patterns
    const isEmailValid = emailPattern.test(newEmail);
    const isPasswordValid = passwordPattern.test(newPassword);

    // Enable button only if both email and password are valid
    setIsButtonDisabled(!(isEmailValid && isPasswordValid));
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    validateForm(email, newPassword);
  };

  const setCookie = (name, value, expiresInDays) => {
    const date = new Date();
    date.setTime(date.getTime() + expiresInDays * 24 * 60 * 60 * 1000);
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
  };
  const onSubmit = async (values) => {
    // setLoading(true);

    const data = {
      email: email,
      password: password,
      // {
      //   "email": "user@example.com",
      //   "password": "string@S123"
      // }
    };
    try {
      // console.log("data", data.emp_type);
      const response = await axios.post(
        "https://68v4n18rx1.execute-api.us-east-1.amazonaws.com/dev/signin",
        data
      );
      // console.log("response", response);

      if (response.status == 200) {
        //getting accesstoken from response
        const accessToken = response.data.AccessToken;

        // console.log("hr Id", response.data.Result.id);
        // dispatchfun(response.data.Result.id);

        // Set the access token in a cookie
        // localStorage.setItem("hrId", response.data.Result.id);
        setCookie("accessToken", accessToken, 1);
        route.push("/main");
        // if (response.data.Result.first_name && response.data.Result.number) {
        //   route.push("/hrms");
        // } else {
        //   route.push("/onboarding");

        //   // router.push("/hrms");
        // }
      } else {
        setValid(false);
      }
    } catch (error) {
      // console.log("error", error);
      // console.log(error.response?.data?.message);
      // console.log(error.request.status);
      setErrorMsg(error.response?.data?.message);

      // if (
      //   error.request.status == 403 ||
      //   error.response?.data?.message == "User is not confirmed."
      // ) {
      //   setEmailVerified(false);
      //   setValid(true);
      // } else {
      //   setValid(false);
      //   setEmailVerified(true);
      // }
    }
    //  finally {
    //   setLoading(false); // Set loading state to false after response or error is received
    // }
  };

  return (
    <>
      <div className="flex px-6 flex-row items-center h-screen">
        <div className="flex flex-col h-screen p-10">
          <div className="left-card-wrapper rounded-5  w-[500px] h-[200px]  bg-primary-1 flex flex-col ">
            <div className="font-segoe-ui text-3xl font-bold leading-32 tracking-normal text-left mb-10 text-blue-500">
              <Image src={mainLogo} />
            </div>
            <h1 className="font-segoe-ui text-4xl font-bold leading-11 tracking-tighter text-left mb">
              Workflow Management
            </h1>
            <p className="card-text font-segoe-ui text-l  leading-10 tracking-tighter text-left text-gray-400">
              Sign in to Manage your project and the team in easy way
            </p>
          </div>
          <form action="/main" onSubmit={handleSubmit(onSubmit)}>
            <div className="login w-96 h-72 flex flex-col justify-between">
              <div>
                <h2 className="font-segoe-ui text-3xl font-bold leading-11 tracking-tighter text-left mb">
                  Welcome 👋
                </h2>
                <p className="card-text font-segoe-ui text-sm  leading-10 tracking-tighter text-left text-gray-400">
                  Please login here
                </p>
              </div>
              <div className="flex input-main flex-col gap-7">
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
                    type="email"
                    className="input w-[100%] h-9 outline-none text-center  font-roboto text-base font-normal leading-6 tracking-normal"
                    placeholder="Enter your Email"
                    {...register("username", {
                      required: "Username is required",
                    })}
                    onChange={handleEmailChange}
                  ></input>
                </div>
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
                      d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                    />
                  </svg>

                  <input
                    type="text"
                    className="input w-[100%] h-9 outline-none text-center  font-roboto text-base font-normal leading-6 tracking-normal"
                    placeholder="Enter Password"
                    {...register("password", {
                      required: "Password is required",
                    })}
                    onChange={handlePasswordChange}
                  ></input>
                </div>
                <p
                  style={{ fontSize: "11px" }}
                  className="text-gray-400 -mt-5  -mb-3"
                >
                  Password 8 characters long and include alphanumeric and
                  special characters.
                </p>
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
                <button
                  disabled={isButtonDisabled}
                  className={` w-[100%] ${
                    isButtonDisabled
                      ? "bg-slate-400"
                      : "cursor-pointer hover:bg-blue-600 transition-all"
                  } bg-blue-500 text-white px-3 py-2 rounded w-28 text-center`}
                >
                  {/* <input
                
                  value="Sign In"
                  className="cursor-pointer w-[100%] bg-blue-500 text-white px-3 py-2 rounded w-28"
                /> */}
                  submit
                </button>
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
        <Image src={login} className=" w-[650px] mt-4"></Image>
      </div>
    </>
  );
};

export default Login;
