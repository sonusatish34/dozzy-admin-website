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
  const { bookid } = router.query;
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
          `https://staging.dozzy.com/admin/booking-data?booking_id=${bookid}`,
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
          setTotalDetails(data);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchPropertyDetails();
  }, [bookid]);
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
   const converDate = (data) => {
          const date = new Date(data);
          // Format the date as '14th Sep 2024'
          const formattedDate = format(date, " h a , dd MMM ");
          return formattedDate
      }
  return (
    <div>
      <CommonLayout>
        
      </CommonLayout>
    </div>
  );
};

export default ComponentName;
