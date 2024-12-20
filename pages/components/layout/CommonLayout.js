import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { IoIosArrowForward, IoLogoUsd } from "react-icons/io";
import { useRouter } from "next/router";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { IoMdLogOut } from "react-icons/io";
import { TbWindowMinimize } from "react-icons/tb";
import { TbWindowMaximize } from "react-icons/tb";

function CommonLayout({ Content, children, canonicalUrl }) {
  // console.log(canonicalUrl, "-----canonicalUrl----");
  const router = useRouter();
  console.log(router, "rq");

  const [islogout, setIsLogout] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  const handleMinimize = () => {
    setIsMinimized(true); // Minimize sidebar
  };

  const handleMaximize = () => {
    setIsMinimized(false); // Maximize sidebar
  };
  function handleLogout() {
    localStorage.clear();
    window.location.reload(false);
  }

  return (
    <>
      {/* Main container div */}
      <div className="flex h-screen">
        {/* Navigation sidebar */}
        <nav
          className={ `hidden border-r bg-[#556EE6] h-full text-2xl flex flex-col gap-2 items-start px-6 pt-3 transition-all duration-300 ease-in-out ${
            isMinimized ? "w-16" : "w-64"
          }`} // Conditional width based on isMinimized
        >
          <Link href={"/dashboard"}>
            <Image
              src={"/logo-light.png"}
              height={500}
              width={500}
              className={`w-48 ${isMinimized ? "hidden" : ""}`} // Hide image in minimized state
            />
          </Link>

          {/* Dashboard Link */}
          <Link className="pt-6" href={"/dashboard"} aria-label={"dashboard"}>
            <div
              className={`flex items-center text-black-300 hover:text-blue-500 cursor-pointer pl-3 py-1 mb-2`}
            >
              <p className="flex items-center gap">
                <span>
                  <TbLayoutDashboardFilled />
                </span>
                {/* Show text only if not minimized */}
                {!isMinimized && <span>{"Dashboard"}</span>}
                <span>
                  <IoIosArrowForward />
                </span>
              </p>
            </div>
          </Link>

          {/* Farmhouse Link */}
          <Link className="pt-1" href={"/farmhouse"} aria-label={"farmhouse"}>
            <div
              className={`flex items-center text-black-300 hover:text-blue-500 cursor-pointer pl-3 py-1 mb-2`}
            >
              <p className="flex items-center gap">
                <span>
                  <Image
                    src={"/Frame 4 (1).png"}
                    height={500}
                    width={500}
                    className="w-8"
                  />
                </span>
                {!isMinimized && <span>{"Farmhouse"}</span>}
                <span>
                  <IoIosArrowForward />
                </span>
              </p>
            </div>
          </Link>

          {/* Logout Button */}
          <div
            className={`flex gap-3 items-center text-black-300 hover:text-blue-500 cursor-pointer rounded-md p-2 mb-2`}
          >
            <span>
              <IoMdLogOut />
            </span>
            <button onClick={handleLogout}>{"Logout"}</button>
          </div>

         <div >{isMinimized?<button onClick={()=>{handleMaximize()}}> <TbWindowMaximize /></button>:<button onClick={()=>{handleMinimize()}}> <TbWindowMinimize /></button>}</div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 bg-white overflow-auto">
          <div className={`${isMinimized ? "hidden" : ""} pt-24 pl-`}>
            {" "}
            {/* Hide content in minimized state */}
            {Content || children}
          </div>
        </main>
      </div>
    </>
  );
}

export default CommonLayout;
