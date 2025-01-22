import React from "react";
import { useEffect, useState } from "react";
import CommonLayout from "../components/layout/CommonLayout";
import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";
import { useRouter } from "next/router";

const ComponentName = (props) => {

  const [isOpen, setIsOpen] = useState(false); // state to toggle accordion

  const [farmHDetails, setFarmHDetails] = useState(null)
  useEffect(() => {
    const getDashboard = async () => {
      const storedUserPhone = localStorage.getItem("tboo_user_phone");
      const auth = localStorage.getItem("tboo_" + storedUserPhone + "_token");
      const myHeaders = new Headers();
      myHeaders.append("accept", "application/json");
      myHeaders.append("Authorization", auth);

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
      };

      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/admin/dashboard`, requestOptions)
      const data = await response.json();
      setFarmHDetails(data?.results?.farmhouse_details)
      console.log(data, "1234567890");


      // .then((response) => response.text())
      // .then((result) => console.log(result,"hello world"))
      // .catch((error) => console.error(error));
    }
    getDashboard()

  }, [])

  return (
    <CommonLayout>
      <div>
        {
          <div className="lg:pt-28">
            <ul className="w-fit pr-5 flex flex-col gap-3">
              <li>
                <Link
                  className="text-white bg-[#556EE6] text-lg flex items-center justify-between pr-4 gap-16 w-96"
                  href={"/farmhouse/login-but-not-uploaded"}
                >
                  <span className="px-6">Login but not uploaded</span>
                  <span>
                    <IoIosArrowForward />
                  </span>
                </Link>
              </li>
              <li className="text-white bg-[#556EE6] text-lg flex items-center justify-between pr- gap-16 w-96">
                {/* <span className="px-6">Pending approvals</span><span><IoIosArrowForward /></span> */}
                <Link
                  className="text-white bg-[#556EE6] text-lg flex items-center justify-between pr-4 gap-16 w-96"
                  href={"/farmhouse/pending-approvals"}
                >
                  <span className="px-6">Pending approvals</span>
                  <span>
                    <IoIosArrowForward />
                  </span>
                </Link>
              </li>
              {/* <li className="text-white bg-[#556EE6] text-lg flex items-center justify-between pr- gap-16 w-96">
                <Link
                  className="text-white bg-[#556EE6] text-lg flex items-center justify-between pr-4 gap-16 w-96"
                  href={"/farmhouse/rejected-farmhouses"}
                >
                  <span className="px-6">Rejected farmhouses</span>
                  <span>
                    <IoIosArrowForward />
                  </span>
                </Link>

              </li> */}
             
              <li>
                <Link
                  className="text-white bg-[#556EE6] text-lg flex items-center justify-between pr-4 gap-16 w-96"
                  href={"/farmhouse/farmhouses-by-status"}
                >
                  <span className="px-6 capitalize">Farmhouses By Status 
                    {/* - {farmHDetails?.total_farmhouses ? farmHDetails.total_farmhouses : '0'} */}
                    </span>
                  <span>
                    <IoIosArrowForward />
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  className="text-white bg-[#556EE6] text-lg flex items-center justify-between pr-4 gap-16 w-96"
                  href={"/farmhouse/online-farmhouses"}
                >
                  <span className="px-6 capitalize">online farmhouses - {farmHDetails?.online_farmhouses ? farmHDetails.online_farmhouses : '0'}</span>
                  <span>
                    <IoIosArrowForward />
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  className="text-white bg-[#556EE6] text-lg flex items-center justify-between pr-4 gap-16 w-96"
                  href={"/farmhouse/offline-farmhouses"}
                >
                  <span className="px-6 capitalize">Offline farmhouses - {farmHDetails?.offline_farmhouses ? farmHDetails.offline_farmhouses : '0'}</span>
                  <span>
                    <IoIosArrowForward />
                  </span>
                </Link>
              </li>
              {/* <li>
                <Link
                  className="text-white bg-[#556EE6] text-lg flex items-center justify-between pr-4 gap-16 w-96"
                  href={"/farmhouse/total-bookings"}
                >
                  <span className="px-6 capitalize">Total Bookings {farmHDetails?.total_farmhouses ? farmHDetails.total_farmhouses : '0'}</span>
                  <span>
                    <IoIosArrowForward />
                  </span>
                </Link>
              </li> */}
              {/* <li>
                <Link
                  className="text-white bg-[#556EE6] text-lg flex items-center justify-between pr-4 gap-16 w-96"
                  href={"/farmhouse/online-farmhouses"}
                >
                  <span className="px-6 capitalize">Upcoming Bookings - {farmHDetails?.upcoming_farmhouse_bookings ? farmHDetails.upcoming_farmhouse_bookings : '0'}</span>
                  <span>
                    <IoIosArrowForward />
                  </span>
                </Link>
              </li> */}
              {/* <li>
                <Link
                  className="text-white bg-[#556EE6] text-lg flex items-center justify-between pr-4 gap-16 w-96"
                  href={"/farmhouse/online-farmhouses"}
                >
                  <span className="px-6 capitalize">Cancelled Bookings - {farmHDetails?.canceled_farmhouse_bookings ? farmHDetails.canceled_farmhouse_bookings : '0'}</span>
                  <span>
                    <IoIosArrowForward />
                  </span>
                </Link>
              </li> */}
              {/* <li>
                <Link
                  className="text-white bg-[#556EE6] text-lg flex items-center justify-between pr-4 gap-16 w-96"
                  href={"/farmhouse/online-farmhouses"}
                >
                  <span className="px-6 capitalize">In House - {farmHDetails?.inhouse_farmhouse_bookings ? farmHDetails.inhouse_farmhouse_bookings : '0'}</span>
                  <span>
                    <IoIosArrowForward />
                  </span>
                </Link>
              </li> */}
              <li>
                <Link 
                  className="text-white bg-[#556EE6] text-lg flex items-center justify-between pr-4 gap-16 w-96"
                  href={"/farmhouse/bookings-by-status"}
                >
                  <span className="px-6 capitalize">Bookings By Status</span>
                  <span>
                    <IoIosArrowForward />
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  className="text-white bg-[#556EE6] text-lg flex items-center justify-between pr-4 gap-16 w-96"
                  href={"/farmhouse/employees-login"}
                >
                  <span className="px-6 capitalize">Employee Logins</span>
                  <span>
                    <IoIosArrowForward />
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  className="text-white bg-[#556EE6] text-lg flex items-center justify-between pr-4 gap-16 w-96"
                  href={"/farmhouse/online-farmhouses"}
                >
                  <span className="px-6 capitalize">Blocked more than 1 day</span>
                  <span>
                    <IoIosArrowForward />
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  className="text-white bg-[#556EE6] text-lg flex items-center justify-between pr-4 gap-16 w-96"
                  href={"/farmhouse/documents-pending"}
                >
                  <span className="px-6 capitalize">Documents pending</span>
                  <span>
                    <IoIosArrowForward />
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        }
      </div>
    </CommonLayout>
  );
};

export default ComponentName;
