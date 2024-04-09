"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import updateImage from "@/../../public/assets/update3.jpg";
// import { useSelector } from "react-redux";

const page = () => {
  // const reset = useSelector((state) => state.resetPassword);
  // console.log(reset);
  return (
    <>
      <div className="flex justify-center items-center bg-gray-200  h-screen ">
        <div className="shadow-lg w-[400px] bg-white  p-9 flex flex-col justify-center items-center">
          <Image
            src={updateImage}
            className="self-center w-[12vw]"
            alt="update img"
          />
          {/* <p className=' flex justify-center'>image ?????</p> */}
          <p className="font-bold  text-2xl  text-center">
            Password Update <br /> successfully
          </p>
          <p className="text-sm font-light ml-4">
            Your password has been update successfully
          </p>
          <Link href="/account/login">
            <button className="bg-blue-500 text-white mt-4 w-[100%] p-2 ">
              Back to login
            </button>{" "}
          </Link>
        </div>
      </div>
    </>
  );
};

export default page;
