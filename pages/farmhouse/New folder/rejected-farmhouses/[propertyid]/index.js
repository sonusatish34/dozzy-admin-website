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
  const [totalDetails, setTotalDetails] = useState(null);
  const [showCurrentBill, setShowCurrentBill] = useState(null);
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

  const converDate = (data) => {
    const date = new Date(data);
    // Format the date as '14th Sep 2024'
    const formattedDate = format(date, " h a , dd MMM ");
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
              <div className="flex lg:flex-row flex-col gap-4 justify-between">

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

                      {/* <button ></button> */}
                    </div>

                    {showCurrentBill && (
                      <div>
                        <div className="text-black fixed inset-0 bg-black bg-opacity-50 z-50 backdrop-blur-sm h- flex justify-center">
                          <div className="bg-white h-[600px] transition-all duration-300 ease-in-out p-8 rounded-lg shadow-xl max-w-sm w-full ">
                            <button
                              onClick={() => {
                                setShowCurrentBill(false);
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

                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className=" flex flex-col gap-2">
                  <p className="font-bold text-black">Partner Aadhar Image</p>
                  <img
                    src={
                      totalDetails.owner_profile[0]
                        .aadhar_image_url
                    }
                    height={400}
                    width={400}
                    alt="dozzy farmhouse logo"
                    className="w-36 h-36"
                  />
                  <div className="flex flex-col items-center space-x-4 bg-white p-4 rounded-md h-fit">
                    <button
                      onClick={() => {
                        setShowCurrentBill(true);
                      }}
                      className="bg-white w-full px-3 py-2 text-black rounded-md flex items-center justify-between "
                    >
                      <span>View Current Bill</span><span><MdKeyboardArrowRight size={30} /></span>
                    </button>
                  </div>
                  <div className="flex flex-col items-center space-x-4 bg-white p-4 rounded-md h-fit">
                    <button className="bg-white w-full px-3 py-2 text-black rounded-md">
                      Farmhouse Sq. Yards{" : "}
                      {totalDetails.property_data.property_square_yards}
                    </button>
                  </div>

                </div>
              </div>
              <div className="flex lg:flex-row flex-col gap-14 pt-3">
                <div className=" flex gap-20">
                  <div className=" h-fit">
                    <p className="text-black font-bold pb-2">Farm House Location</p>
                    <div className="flex flex-col items-center space-x-4 bg-white p-4 rounded-md">

                      <div>
                        <p className="text-black font-medium w-48 pt-">
                          {totalDetails.property_data.geo_location}
                        </p>
                      </div>
                    </div>
                  </div>
                  <ul className="flex flex-col gap-2">
                    <li>
                      <p className="text-black font-bold pb-1">Partner Number</p>
                      <p className="bg-white rounded-md p-1">8985780279</p>
                    </li>
                    <li>
                      <p className="text-black font-bold pb-1">Alternative Number</p>
                      <p className="bg-white rounded-md p-1">8985780279</p>
                    </li>
                    <li>
                      <p className="text-black font-bold pb-1">Partner Number</p>
                      <p className="bg-white rounded-md p-1">8985780279</p>
                    </li>

                  </ul>
                  <div className="flex flex-col items-center space-x-4">
                    <h3 className="text-lg text-black font-bold font- pb-2">
                      Amenities
                    </h3>
                    <div className="flex flex-col lg:flex-row bg-white rounded-md p-1 h-40 overflow-y-scroll">
                      <ul className=" pl-5  text-gray-900 ">
                        {totalDetails?.amenities.map((item, index) => (
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
                  </div>


                </div>

              </div>
              <div className="pt-5 ">
                <h3>Rejected Reason</h3>
                <p className="bg-white p-3 rounded-md h-32">{totalDetails.property_data.property_rejected_reason  }</p>
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
