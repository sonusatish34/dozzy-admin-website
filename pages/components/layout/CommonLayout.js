import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { IoIosArrowForward, IoLogoUsd } from "react-icons/io";
import { useRouter } from "next/router";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { IoMdLogOut } from "react-icons/io";
import { TbWindowMinimize } from "react-icons/tb";
import { TbWindowMaximize } from "react-icons/tb";
import { RiSearchLine } from "react-icons/ri";

function CommonLayout({ Content, children, canonicalUrl, placeholderText }) {
  // console.log(canonicalUrl, "-----canonicalUrl----");
  const router = useRouter();
  // console.log(router.pathname, "rq");

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
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  const handleClickOutside = (event) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);
  return (
    <>
      <div className="flex h-screen mont-font">
        <nav
          className={` border-r bg-[#556EE6] h-full text-2xl hidden lg:flex flex-col gap-2 items-start  transition-all duration-300 ease-in-out ${
            isMinimized ? "w-24" : "w-64"
          }`} // Conditional width based on isMinimized
        >
          <Link href={"/dashboard"}>
            <Image
              src={"/logo-light.png"}
              height={500}
              width={500}
              className={`w-full p-4 ${
                isMinimized ? "invisible h-20 w-20" : ""
              }`}
              alt="sash"
            />
          </Link>

          <Link
            className={`${
              router.pathname === "/dashboard" ? "bg-white text-[#556EE6]" : ""
            } w-full`}
            href={"/dashboard"}
            aria-label={"dashboard"}
          >
            <div
              className={`flex items-center text-black-300 hover:text-blue-500 cursor-pointer pl-3 py-1 mb-2`}
            >
              <p className="flex items-center gap">
                <span>
                  <TbLayoutDashboardFilled />
                </span>
                {!isMinimized && <span>{"Dashboard"}</span>}
                <span>{!isMinimized && <IoIosArrowForward />}</span>
              </p>
            </div>
          </Link>

          {/* <Link className="pt-1" href={"/farmhouse"} aria-label={"farmhouse"}> */}
          <Link
            className={`${
              router.pathname === "/farmhouse" ? "bg-white text-[#556EE6]" : ""
            } w-full`}
            href={"/farmhouse"}
            aria-label={"farmhouse"}
          >
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
                    alt="ds"
                  />
                </span>
                {!isMinimized && <span>{"Farmhouse"}</span>}
                <span>{!isMinimized && <IoIosArrowForward />}</span>
              </p>
            </div>
          </Link>
          <div
            className={`flex gap-3 items-center text-black-300 hover:text-blue-500 cursor-pointer rounded-md p-2 mb-2`}
          >
            <span>
              <IoMdLogOut />
            </span>
            {!isMinimized && <button onClick={handleLogout}>{"Logout"}</button>}
          </div>

          <div className="p-2">
            {isMinimized ? (
              <button
                onClick={() => {
                  handleMaximize();
                }}
              >
                {" "}
                <TbWindowMaximize />
              </button>
            ) : (
              <button
                onClick={() => {
                  handleMinimize();
                }}
              >
                {" "}
                <TbWindowMinimize />
              </button>
            )}
          </div>
        </nav>

        <main className="flex-1 bg-white overflow-auto">
          <div
            className={`bg-white flex items-center gap-40 pt-8 pl-10 ${
              isMinimized ? "" : "hidden"
            }`}
          >
            <Link href={"/dashboard"}>
              <Image
                src={"/Dozzy.png"}
                height={500}
                width={500}
                className={`w-36 h-16 ${isMinimized ? "" : "hidden"}`}
                alt="sash"
              />
            </Link>
            <div className="">
              <label>
                <span className="relative z-10">
                  <RiSearchLine
                    className="text-black absolute top-1/2 transform -translate-y-1/2 left-3 pointer-events-none"
                    size={20}
                  />
                </span>{" "}
              </label>
              <input
                className="border-2 w-[600px] bg-[#556EE666] py-2 rounded-full pl-12" // Increased padding
                type="text"
                placeholder={`${placeholderText}`}
              />
            </div>
          </div>
          <div className="lg:hidden block">
            <button
              ref={buttonRef}
              className="relative left-8 top-4  text-black flex items-center"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              <svg
                className="w-7 h-7 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M4 6h16v2H4V6zm0 5h16v2H4v-2zm0 5h16v2H4v-2z"
                />
              </svg>
            </button>
          </div>

          {/* mobile nav bar hamburger */}
          <nav
            ref={menuRef}
            className={` h-fit absolute top-20 w-4/5  bg-[#556ee6] min-h-screen p-2 pt- lg:pr-16 z-50 transition-transform duration-300 ease-in-out ${
              isOpen ? "block" : "hidden"
            }`}
            style={{
              transform: isOpen ? "translateX(0)" : "translateX(-100%)",
            }}
          >
            <div>
              <Link href={"/dashboard"}>
                <Image
                  src={"/logo-light.png"}
                  height={500}
                  width={500}
                  className={`w-full p-4 ${
                    isMinimized ? "invisible h-20 w-20" : ""
                  }`}
                  alt="sash"
                />
              </Link>

              <Link
                className={`${
                  router.pathname === "/dashboard"
                    ? "bg-white text-[#556EE6]"
                    : ""
                } w-full`}
                href={"/dashboard"}
                aria-label={"dashboard"}
              >
                <div
                  className={`flex items-center text-black-300 hover:text-blue-500 cursor-pointer pl-3 py-1 mb-2`}
                >
                  <p className="flex items-center gap">
                    <span>
                      <TbLayoutDashboardFilled />
                    </span>
                    {!isMinimized && <span>{"Dashboard"}</span>}
                    <span>
                      <IoIosArrowForward />
                    </span>
                  </p>
                </div>
              </Link>

              {/* <Link className="pt-1" href={"/farmhouse"} aria-label={"farmhouse"}> */}
              <Link
                className={`${
                  router.pathname === "/farmhouse"
                    ? "bg-white text-[#556EE6]"
                    : ""
                } w-full`}
                href={"/farmhouse"}
                aria-label={"farmhouse"}
              >
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
                        alt="ds"
                      />
                    </span>
                    {!isMinimized && <span>{"Farmhouse"}</span>}
                    <span>{!isMinimized && <IoIosArrowForward />}</span>
                  </p>
                </div>
              </Link>
              <div
                className={`flex gap-3 items-center text-black-300 hover:text-blue-500 cursor-pointer rounded-md p-2 mb-2`}
              >
                <span>
                  <IoMdLogOut />
                </span>
                {!isMinimized && (
                  <button onClick={handleLogout}>{"Logout"}</button>
                )}
              </div>

              <div>
                {isMinimized ? (
                  <button
                    onClick={() => {
                      handleMaximize();
                    }}
                  >
                    {" "}
                    <TbWindowMaximize />
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      handleMinimize();
                    }}
                  >
                    <TbWindowMinimize />
                  </button>
                )}
              </div>
            </div>
          </nav>
          <div className={` `}> {Content || children}</div>
        </main>
      </div>
    </>
  );
}

export default CommonLayout;
