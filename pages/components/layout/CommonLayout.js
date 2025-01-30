import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { IoIosArrowForward, IoLogoUsd, IoIosArrowDown } from "react-icons/io";
import { useRouter } from "next/router";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { IoMdLogOut } from "react-icons/io";
import { TbWindowMinimize } from "react-icons/tb";
import { TbWindowMaximize } from "react-icons/tb";
import { RiSearchLine } from "react-icons/ri";

function CommonLayout({ Content, children, canonicalUrl, placeholderText, onSearch = () => { } }) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [isMinimized, setIsMinimized] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  // Handle search input
  const handleSearch = (e) => {
    setSearch(e.target.value);
    onSearch(e.target.value);
  };

  // Handle minimize/maximize sidebar
  const handleMinimize = () => setIsMinimized(true);
  const handleMaximize = () => setIsMinimized(false);

  // Handle logout
  const handleLogout = () => {
    localStorage.clear();
    router.push("/");
  };

  // Close mobile menu when clicking outside
  const menuRef = useRef(null);
  const buttonRef = useRef(null);
  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target) && buttonRef.current && !buttonRef.current.contains(event.target)) {
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
  const [isFarmhouseOpen, setIsFarmhouseOpen] = useState(false);
  const handleFarmhouseClick = () => {
    setIsFarmhouseOpen((prev) => !prev); // Toggle the Farmhouse dropdown
  };
  return (
    <div className="flex h-screen mont-font">
      {/* Sidebar for large screens */}
      <nav className={`bg-[#556EE6] h-full text-2xl hidden lg:flex flex-col gap-2 items-start transition-all duration-300 ease-in-out ${isMinimized ? "w-16" : "w-64"}`}>
        <Link href={"/dashboard"}>
          <Image
            src={"/logo-light.png"}
            height={500}
            width={500}
            className={`w-full p-4 ${isMinimized ? "invisible h-20 w-20" : ""}`}
            alt="logo"
          />
        </Link>

        <Link href={"/dashboard"} className={`${router.pathname === "/dashboard" ? "bg-white text-[#556EE6]" : ""} w-full`}>
          <div className={`flex items-center text-black-300 hover:text-blue-500 cursor-pointer pl-3 py-1 mb-2 `}>
            <TbLayoutDashboardFilled />
            {!isMinimized && <span>Dashboard</span>}
          </div>
        </Link>

        <Link href={"/farmhouse"} className={`${router.pathname.includes("farmhouse") ? "bg-white text-[#556EE6]" : ""} w-full`}>
          <div className={`flex items-center text-black-300 hover:text-blue-500 cursor-pointer pl-3 py-1 mb-2`}>
            <Image src={"/Frame 4 (1).png"} height={500} width={500} className="w-8" alt="farmhouse" />
            {!isMinimized && <span>Farmhouse</span>}
          </div>
        </Link>

        <button onClick={handleLogout} className="flex gap-3 items-center text-black-300 hover:text-blue-500 cursor-pointer rounded-md p-2 mb-2">
          <IoMdLogOut />
          {!isMinimized && <span>Logout</span>}
        </button>

        <div className="p-2">
          {isMinimized ? (
            <button onClick={handleMaximize}><TbWindowMaximize /></button>
          ) : (
            <button onClick={handleMinimize}><TbWindowMinimize /></button>
          )}
        </div>
      </nav>

      {/* Main content */}
      <main className="flex-1 bg-white overflow-auto">
        <div className={`bg-white flex justify-between lg:justify-normal px-4 items-center lg:gap-40 gap-2 pt-8 lg:pl-10 ${isMinimized ? "" : "hidden"}`}>
          <Link href={"/dashboard"}>
            <Image src={"/Dozzy.png"} height={500} width={500} className="lg:w-32 lg:h-12 lg:block hidden" alt="logo" />
          </Link>
          <input
            value={search}
            type="text"
            onChange={handleSearch}
            maxLength={10}
            className={`overflow-hidden border-2 lg:w-[600px] w-[250px] bg-[#556EE666] py-2 px-2 rounded-full lg:pl-12 placeholder:text-gray-700 ${router.pathname == '/dashboard' ? 'invisible' : ''}`}
            placeholder={placeholderText || "Search here"}
          />
          {console.log(router.pathname)
          }
        </div>

        {/* Hamburger button for mobile */}
        <div className="lg:hidden block">
          <button ref={buttonRef} className="relative left-4 bottom-10 text-black flex items-center" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
            <svg className="w-7 h-7 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path fillRule="evenodd" clipRule="evenodd" d="M4 6h16v2H4V6zm0 5h16v2H4v-2zm0 5h16v2H4v-2z" />
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        <nav ref={menuRef} className={`h-fit absolute top-20 w-4/5 bg-[#556ee6] min-h-screen p-2 pt- lg:pr-16 z-50 transition-transform duration-300 ease-in-out ${isOpen ? "block" : "hidden"}`} style={{ transform: isOpen ? "translateX(0)" : "translateX(-100%)" }}>
          <Link href={"/dashboard"}>
            <Image src={"/logo-light.png"} height={500} width={500} className="w-full p-4" alt="logo" />
          </Link>

          <Link href={"/dashboard"}>
            <div className={`flex items-center gap-1 text-black-300 hover:text-blue-500 cursor-pointer pl-3 py-1 mb-2`}>
              <TbLayoutDashboardFilled />
              <span>Dashboard</span>
            </div>
          </Link>

          {/* Farmhouse link with dropdown toggle */}
          <div>
            <div onClick={handleFarmhouseClick}>
              <div className={`flex items-center gap-1 text-black-300 cursor-pointer pl-3 py-1 mb-2`}>
                <Image src={"/Frame 4 (1).png"} height={500} width={500} className="w-6" alt="farmhouse" />
                <span>Farmhouse</span>
              </div>
            </div>

            {/* Accordion-style submenu */}
            {isFarmhouseOpen && (
              <div className="pl-1">
                <ul className="w-fit pr-5 flex flex-col gap-3">
                  <li>
                    <Link
                      className="text-white bg-[#556EE6] text-sm flex items-center justify-between  gap-2 w-full"
                      href={"/farmhouse/login-but-not-uploaded"}
                    >
                      <span className="">Login but not uploaded</span>
                      <span>
                        <IoIosArrowForward />
                      </span>
                    </Link>
                  </li>
                  <li className="text-white bg-[#556EE6] text-sm flex items-center justify-between  gap-2 w-full">
                    {/* <span className="">Pending approvals</span><span><IoIosArrowForward /></span> */}
                    <Link
                      className="text-white bg-[#556EE6] text-sm flex items-center justify-between  gap-2 w-full"
                      href={"/farmhouse/pending-approvals"}
                    >
                      <span className="">Pending approvals</span>
                      <span>
                        <IoIosArrowForward />
                      </span>
                    </Link>
                  </li>
                  {/* <li className="text-white bg-[#556EE6] text-sm flex items-center justify-between pr- gap-2 w-full">
                <Link
                  className="text-white bg-[#556EE6] text-sm flex items-center justify-between  gap-2 w-full"
                  href={"/farmhouse/rejected-farmhouses"}
                >
                  <span className="">Rejected farmhouses</span>
                  <span>
                    <IoIosArrowForward />
                  </span>
                </Link>

              </li> */}

                  <li>
                    <Link
                      className="text-white bg-[#556EE6] text-sm flex items-center justify-between  gap-2 w-full"
                      href={"/farmhouse/farmhouses-by-status"}
                    >
                      <span className=" capitalize">Farmhouses By Status
                        {/* - {farmHDetails?.total_farmhouses ? farmHDetails.total_farmhouses : '0'} */}
                      </span>
                      <span>
                        <IoIosArrowForward />
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-white bg-[#556EE6] text-sm flex items-center justify-between  gap-2 w-full"
                      href={"/farmhouse/online-farmhouses"}
                    >
                      <span className=" capitalize">online farmhouses </span>
                      <span>
                        <IoIosArrowForward />
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-white bg-[#556EE6] text-sm flex items-center justify-between  gap-2 w-full"
                      href={"/farmhouse/offline-farmhouses"}
                    >
                      <span className=" capitalize">Offline farmhouses </span>
                      <span>
                        <IoIosArrowForward />
                      </span>
                    </Link>
                  </li>
                 
                  <li>
                    <Link
                      className="text-white bg-[#556EE6] text-sm flex items-center justify-between  gap-2 w-full"
                      href={"/farmhouse/bookings-by-status"}
                    >
                      <span className=" capitalize">Bookings By Status</span>
                      <span>
                        <IoIosArrowForward />
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-white bg-[#556EE6] text-sm flex items-center justify-between  gap-2 w-full"
                      href={"/farmhouse/employees-login"}
                    >
                      <span className=" capitalize">Employee Logins</span>
                      <span>
                        <IoIosArrowForward />
                      </span>
                    </Link>
                  </li>
                
                  { <li>
                    <Link
                      className="text-white bg-[#556EE6] text-sm flex items-center justify-between  gap-2 w-full"
                      href={"/farmhouse/documents-pending"}
                    >
                      <span className=" capitalize">Documents pending</span>
                      <span>
                        <IoIosArrowForward />
                      </span>
                    </Link>
                  </li>}
                </ul>
              </div>
            )}
          </div>


          <button onClick={handleLogout} className="flex gap-3 items-center text-black-300 hover:text-blue-500 cursor-pointer rounded-md p-2 mb-2">
            <IoMdLogOut />
            <span>Logout</span>
          </button>

        </nav>

        {/* Content */}
        <div>{Content || children}</div>
      </main>
    </div>
  );
}

export default CommonLayout;
