import React from "react";
import signupbg from "../../../../public/assets/signupBg.svg";
import mainLogo from "../../../../public/assets/SYNECTIKS-logo.svg";
import Image from "next/image";
import Link from "next/link";

const Signup = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="flex px-6 flex-row items-center h-screen">
        <div className="flex flex-col h-[100%] px-5">
          <div className="left-card-wrapper rounded-5 w-[500px] h-[150px] mt-10 bg-primary-1 flex flex-col">
            <div className="mt-5 mb-10">
              <Image src={mainLogo} />
            </div>
            <h1 className="font-segoe-ui text-4xl font-medium leading-11 tracking-tighter text-left mb">
              Workflow Management
            </h1>
            <p className="card-text font-segoe-ui text-l leading-10 tracking-tighter text-left text-gray-400">
              Manage your project and the team in easy way
            </p>
          </div>
          <form action="/main">
            <div className="login w-96 py-6 h-72 flex flex-col justify-between">
              <div>
                <h2 className="font-segoe-ui text-3xl font-medium leading-11 tracking-tighter text-left mb">
                  Sign up as an User
                </h2>
                <p className="card-text font-segoe-ui text-sm leading-8 mb-10 tracking-tighter text-left text-gray-400">
                  Create Your Account
                </p>
              </div>
              <div className="flex input-main flex-col gap-3">
                <input
                  type="text"
                  className="input w-[100%] h-10 p-2 border border-gray-300 font-roboto text-base font-normal leading-6 tracking-normal"
                  placeholder="Email"
                ></input>
                <input
                  type="Password"
                  className="input w-[100%] h-10 p-2 border border-gray-300 font-roboto text-base font-normal leading-6 tracking-normal"
                  placeholder="Password(6 digits at least, case sensitive)"
                ></input>
                <input
                  type="Password"
                  className="input w-[100%] h-10 p-2 border border-gray-300 font-roboto text-base font-normal leading-6 tracking-normal"
                  placeholder="Comfirm password"
                ></input>
              </div>
              <div className="mt-5 flex flex-col gap-2 items-center">
                <input
                  type="button"
                  value="Create Account"
                  className="cursor-pointer w-[100%] bg-blue-500 text-white px-3 py-2 rounded w-28"
                />
                <p>
                  <span className="text-blue-500">
                    <Link href="/account/login">Have an account ? Sign in</Link>
                  </span>
                </p>
              </div>
            </div>
          </form>
        </div>
        <Image src={signupbg} className="w-[625px] mt-4"></Image>
      </div>
    </main>
  );
};

export default Signup;
