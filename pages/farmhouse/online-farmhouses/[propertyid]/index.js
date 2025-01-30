import React from "react";
import CommonLayout from "@/pages/components/layout/CommonLayout";
import { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import { MdKeyboardArrowRight } from "react-icons/md";
import { IoIosArrowForward } from "react-icons/io";
import Image from "next/image";
import { useRouter } from "next/router";
import { IoMdArrowBack } from "react-icons/io";
import { format } from "date-fns";
const ComponentName = (props) => {
  const router = useRouter()
  const [propertyDetails, setPropertyDetails] = useState(null);
  const [ammDetails, setAmmDetails] = useState(null);
  const [totalDetails, setTotalDetails] = useState(null);
  const [showProof, setShowProof] = useState(null);
  const [showBank, setShowBank] = useState(null);
  const [bankDetails, setBankDetails] = useState(null);
  const { propertyid } = router.query;
  console.log(propertyid, "[pp");
  const BackBtn = () => {
    router.back()
  }
  useEffect(() => {
    const fetchPropertyDetails = async () => {
      const userPhone = "7989030741";

      var userAuthorization = localStorage.getItem(
        "tboo_" + userPhone + "_token"
      );

      try {
        const response = await fetch(
          `https://staging.dozzy.com/admin/property-details?property_id=${propertyid}`,
          {
            // const response = await fetch(`https://staging.dozzy.com/admin/property-details?property_id=&approval_user_id=0`, {

            method: "GET",
            headers: {
              Accept: "application/json",
              Authorization: userAuthorization,
            },
          }
        );
        const data = await response.json();
        if (data.status === "success") {
          // setPropertyDetails(data.results.property_data);
          // setTotalDetails(data.results);
          // setAmmDetails(data.results.amenities);
          console.log(data.results, "data.results");
          setTotalDetails(data?.results);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchPropertyDetails();
  }, [propertyid]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = totalDetails?.property_images;

  // Next image function
  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  // Previous image function
  const goToPrevious = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };
  useEffect(() => {
    const fetchBank = async () => {
      const myHeaders = new Headers();
      myHeaders.append("accept", "application/json");
      myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkZXRhaWxzIjoibm8tZXhwaXJ5IiwidXNlcl9waG9uZSI6IjkxODI0NTA3NzAifQ.Q2_P8r9NnbXdji3TgHt-qAK0REDTXMt8HyikMcRAj8U");

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
      };

      fetch(`https://staging.dozzy.com/admin/bank-details?app_user_id=${totalDetails?.property_data?.app_user_id}`, requestOptions)
        .then((response) => response.json())
        .then((result) => setBankDetails(result))
        .catch((error) => console.error(error));
    }
    // if(s=true)
    // {
    //   fetchBank();
    // }
    if (showBank == true) {

      fetchBank()
    }
  }, [showBank])
  console.log(bankDetails, "bdd");
   const converDate = (data) => {
          const date = new Date(data);
          // Format the date as '14th Sep 2024'
          const formattedDate = format(date, " h a , dd MMM YYY ");
          console.log(formattedDate);
          return formattedDate
      }
  return (
    <div>
      <CommonLayout>
        <div className="bg-white p-6 rounded-lg shadow-md text-xs xl:text-base">
          {totalDetails ? (
            <div className="bg-[#f5f5f5] p-2">
              <div className="flex items-center text-black gap-2">
                <button className="text-black py-2" onClick={BackBtn}><IoMdArrowBack size={20} /></button>
                <p>{totalDetails.property_data.property_name}</p>

              </div>
              <div className="flex lg:flex-row flex-col gap-4">
                {/* Left Section: Image */}
                {/* <div className="col-span-12 md:col-span-4">
                      <img
                        src={`${totalDetails?.property_images[0].attribute_value}`} // Replace with actual image source
                        alt="Farmhouse"
                        className="rounded-lg w-72 object-cover"
                      />
                    </div> */}
                <div className="col-span-12 md:col-span-4 relative">
                  <div className="relative w-full h-[300px]">
                    {/* Image */}
                    <img
                      src={
                        images[currentIndex]?.attribute_value
                          ? images[currentIndex]?.attribute_value
                          : "/"
                      }
                      alt="Farmhouse"
                      className="rounded-lg w-[400px]  h-[250px] object-cover"
                    />
                  </div>

                  {/* Left arrow */}
                  <button
                    onClick={goToPrevious}
                    className="absolute top-1/2 left-0 transform -translate-y-1/2  "
                  >
                    {/* Left arrow symbol */}
                    <IoIosArrowBack size={20} />
                  </button>

                  {/* Right arrow */}
                  <button
                    onClick={goToNext}
                    className="absolute top-1/2 right-0 transform -translate-y-1/2 rounded-full"
                  >
                    <IoIosArrowForward size={20} />
                  </button>
                  <p className="text-black pt-3">
                    {images[currentIndex]?.attribute_name}
                  </p>
                  {/* <p className="bg-red-500 text-blue-300 p-3">{images[currentIndex].attribute_status}</p> */}
                </div>

                <div className="">
                  <div>
                    <div className="flex flex-col text-black gap-2 items-start">
                      <h3 className="text-lg text-black font-bold font-">
                        Amenities
                      </h3>
                      <div className="flex flex-col lg:flex-row bg-white rounded-md p-1 h-40 overflow-y-scroll">
                        <ul className=" pl-5  text-gray-900 ">
                          {totalDetails.amenities.map((item, index) => (
                            <li key={index} className="capitalize">
                              {item.attribute_name}-{item.attribute_value}
                            </li>
                          ))}
                        </ul>
                        <ul className="pl-5 text-gray-700 p-1">
                          <p className="font-bold py-1">Games</p>
                          {totalDetails.games.map((item, index) => (
                            <li key={index} className="capitalize">
                              {item.attribute_name}-{item.attribute_value}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <button
                        onClick={() => {
                          setShowProof(true);
                        }}
                        className="bg-white w-full px-3 py-2 text-black rounded-md flex items-center justify-between "
                      >
                        <span>View Proofs</span><span><MdKeyboardArrowRight size={30} /></span>
                      </button>
                      <button className="bg-white w-full px-3 py-2 text-black rounded-md">
                        Farmhouse Sq. Yards{" "}
                        {totalDetails.property_data.property_square_yards}
                      </button>
                      {/* <button ></button> */}
                    </div>
                    {showProof && (
                      <div>
                        <div className="text-black fixed inset-0 bg-black bg-opacity-50 z-50 backdrop-blur-sm h-">
                          <div className="flex justify-center items-center ">
                            <div className="bg-white h-[600px] transition-all duration-300 ease-in-out p-8 rounded-lg shadow-xl max-w-sm w-full">
                              <button
                                onClick={() => {
                                  setShowProof(false);
                                }}
                                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
                              >
                                Close
                              </button>
                              <h2 className="text-2xl font-bold mb-4">
                                Current Bill
                              </h2>
                              <img
                                src={
                                  totalDetails.owner_profile[0]
                                    .electricity_bill_image
                                }
                                height={1000}
                                width={1000}
                                alt="dozzy farmhouse logo"
                                className="w-72 h-72"
                              />
                              <h2 className="text-2xl font-bold mb-4 pt-4">
                                Aadhar
                              </h2>
                              <Image
                                src={"/pix.jpg"}
                                height={1000}
                                width={1000}
                                alt="dozzy farmhouse logo"
                                className="w-40"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    {showBank && (
                      <div>
                        <div className="text-black fixed inset-0 bg-black bg-opacity-50 z-50 backdrop-blur-sm h- flex justify-center">
                          <div className="bg-white h-[600px] transition-all duration-300 ease-in-out p-8 rounded-lg shadow-xl max-w-sm w-full ">
                            <button
                              onClick={() => {
                                setShowBank(false);
                              }}
                              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
                            >
                              Close
                            </button>
                            <h2 className="text-2xl font-bold mb-4">
                              Bank Details
                            </h2>

                            {bankDetails?.data?.results && bankDetails?.data?.results.map((item, index) => (
                              <ul>
                                <li>bank_account_name {item.bank_account_name}</li>
                                <li>bank_name {item.bank_name}</li>
                                <li>bank_account_number {item.bank_account_number}</li>
                                <li>bank_ifsc_code {item.bank_ifsc_code}</li>
                              </ul>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className=" h-fit">
                  <p className="text-black font-bold">Farm House Location</p>
                  <div className="flex flex-col items-center space-x-4 bg-white p-4 rounded-md">

                    <div>
                      <p className="text-black font-medium w-48 pt-">
                        {totalDetails.property_data.geo_location}
                      </p>
                    </div>
                  </div>
                </div>
                <div className=" flex flex-col gap-2">
                  <p className="font-bold text-black">Owner Profile</p>
                  <div className="flex flex-col items-center space-x-4 bg-white p-4 rounded-md h-fit">
                    <div>
                      <p className="text-gray-800 font-medium capitalize flex gap-1 items-center">
                        <span>
                          <img
                            src={totalDetails.property_data.profile_photo_url} // Replace with avatar
                            alt="Owner"
                            className="rounded-full w-10 h-10 object-cover"
                          />
                        </span>
                        <span>{totalDetails.property_data.profile_name}</span>
                      </p>
                      <p className=" text-gray-500">
                        Partner Number:{" "}
                        {totalDetails.property_data.owner_number}
                      </p>
                      <p className=" text-gray-500">
                        Watchman:
                        {
                          totalDetails.property_data.property_watch_man_number
                        }{" "}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-center space-x-4 bg-white p-4 rounded-md h-fit">
                    <button
                      onClick={() => {
                        setShowBank(true);
                      }}
                      className="bg-white w-full px-3 py-2 text-black rounded-md flex items-center justify-between "
                    >
                      <span>Bank Details</span><span><MdKeyboardArrowRight size={30} /></span>
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex lg:flex-row flex-col gap-14 pt-3">
                <div className=" ">
                  <div className="flex flex-col items-center space-x-4">
                    <p className="font-bold text-black">Approved By</p>
                    <div className="flex bg-white items-center">
                      <img
                        src="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg" // Replace with avatar
                        alt="Owner"
                        className="rounded-full w-12 h-12"
                      />
                      <div className=" p-4 rounded-md">
                        <p className="text-gray-800 font-medium capitalize">
                          {totalDetails.property_data.profile_name}
                        </p>
                        <p className=" text-gray-500">
                          {totalDetails.property_data.owner_number}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className=" ">
                  <div className="flex flex-col gap-2 text-black ">
                    <p className="font-bold text-">Bookings </p>
                    <div className="flex justify-center items-center bg-gray-100">
                      <table className="table-auto bg-white rounded-md">
                        <thead>
                          <tr>
                            <th className="p-2 border-b  border-gray-300 text-left">
                              Booking Details
                            </th>
                            <th className="p-2 border-b border-l border-gray-300 text-left">
                              Customer Details
                            </th>
                            <th className="p-2 border-b border-l border-gray-300 text-left">
                              Customer Paid
                            </th>
                            <th className="p-2 border-b border-l border-gray-300 text-left">
                              Owner Earnings
                            </th>
                            <th className="p-2 border-b border-l border-gray-300 text-left">
                              Dozzy Earnings
                            </th>
                            <th className="p-2 border-b border-l border-gray-300 text-left">
                              Reviews
                            </th>
                           
                          </tr>
                        </thead>
                        <tbody>
                          {totalDetails.all_bookings.map((item, index) => (
                            <tr key={index}>
                              <td className="p-2 border-b  border-gray-300">
                                <p>Booking Id: {item?.booking_id}</p>
                                <p>
                                  Check In: 
                                  {converDate(item.booking_start_date)}
                                </p>
                                <p>
                                  Check Out: 
                                  {converDate(item.booking_end_date)}
                                </p>
                                <p>Duration: {item?.booking_hours} Hours</p>
                              </td>
                              <td className="p-2 border-b border-l border-gray-300">
                                {item?.customer_phone}
                              </td>
                              <td className="p-2 border-b border-l border-gray-300">
                                Number: {item?.booking_price}
                              </td>
                              <td className="p-2 border-b border-l border-gray-300">
                                {item?.booking_price}
                              </td>
                              <td className="p-2 border-b border-l border-gray-300">
                                {item?.booking_price}
                              </td>
                              <td className="p-2 border-b border-l border-gray-300 underline">
                                View Reviews
                              </td>
                              
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <p>Loading property details...</p>
          )}
        </div>
      </CommonLayout>
    </div>
  );
};

export default ComponentName;
