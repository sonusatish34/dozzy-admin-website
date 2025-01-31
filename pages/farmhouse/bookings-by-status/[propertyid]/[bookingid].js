import React from "react";
import CommonLayout from "@/pages/components/layout/CommonLayout";
import { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import Image from "next/image";
import { useRouter } from "next/router";
import { IoMdArrowBack } from "react-icons/io";
import { MdArrowForwardIos } from "react-icons/md";
import { MdKeyboardArrowUp } from "react-icons/md";
import { format } from "date-fns";
import { MdKeyboardArrowRight } from "react-icons/md";

const ComponentName = (props) => {

    const router = useRouter()
    const [propertyDetails, setPropertyDetails] = useState(null);
    const [ammDetails, setAmmDetails] = useState(null);
    const [totalDetails, setTotalDetails] = useState(null);
    const [bookingDetails, setBookingDetails] = useState(null);
    const [showProof, setShowProof] = useState(null);
    const [showBank, setShowBank] = useState(null);
    const [bankDetails, setBankDetails] = useState(null);
    const [showAllBookings, setShowAllBookings] = useState(false);
    // const { propertyid } = router.query;
    const { propertyid, bookingid } = router.query; // Destructure both parameters

    const { slug } = router.query; // dynamic part
    const propertyId = router.query.property_id; // query part
    const bookingId = router.query.booking_id; // query par
    console.log(propertyid, "[pp");
    console.log(bookingid, "[bid");
    const BackBtn = () => {
        router.back()
    }

    useEffect(() => {
        const fetchPropertyDetails = async () => {
            const userPhone = localStorage.getItem("tboo_user_phone");

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
    useEffect(() => {
        const fetchBookingDetails = async () => {
            const userPhone = localStorage.getItem("tboo_user_phone");

            var userAuthorization = localStorage.getItem(
                "tboo_" + userPhone + "_token"
            );

            try {
                const response = await fetch(
                    `https://staging.dozzy.com/admin/booking-data?booking_id=${bookingid}`,
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
                    console.log(data, "data.results for bookings");
                    setBookingDetails(data)
                    //   setTotalDetails(data?.results);
                }
            } catch (error) {
                console.error("Error:", error);
            }
        };

        fetchBookingDetails();
    }, [bookingid]);
    console.log(bookingDetails, "bookingDetailss");

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
    const convertDate = (data) => {
        const date = new Date(data);  // Create a Date object from the input string
        // Format the date as '13th Jan 2025, 3:00 PM'
        const formattedDate = format(date, "do MMM yyyy, h:mm a");
        console.log(formattedDate);  // Log the formatted date and time
        return formattedDate;
    }

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');
    const openModal = (image) => {
        console.log("insode");

        setSelectedImage(image);
        setIsModalOpen(true);
    };

    // Function to close the modal
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedImage('');
    };

    return (
        <div>
            <CommonLayout>
                <div className="bg-white p-6 rounded-lg">
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
                                <div className=" ">
                                    <div className="relative w-[300px] h-[300px]">
                                        {/* Image */}
                                        <Image
                                            src={
                                                images[currentIndex]?.attribute_value
                                                    ? images[currentIndex]?.attribute_value
                                                    : "/"
                                            }
                                            alt="Farmhouse"
                                            className="rounded-lg w-72 h-[300px] object-cover"
                                            height={1000}
                                            width={1000}
                                            onClick={() => openModal(images[currentIndex]?.attribute_value)} // Open modal on click
                                        />
                                    </div>

                                    <button
                                        onClick={goToPrevious}
                                        className='relative z-20 left-2 xl:left-2 bottom-36 *: text-white bg-black bg-opacity-40 p-2 rounded-full shadow-lg'
                                    >
                                        <IoIosArrowBack size={20} />
                                    </button>

                                    {/* Right arrow */}
                                    <button
                                        onClick={goToNext}
                                        className='relative z-20 left-32 xl:left-52 bottom-36 text-white bg-black bg-opacity-40 p-2 rounded-full shadow-lg'
                                    >
                                        <IoIosArrowForward size={20} />
                                    </button>
                                    <p className="pb-2 pl-2 capitalize text-black">
                                        {images[currentIndex]?.attribute_name.replaceAll('_', ' ')}
                                    </p>
                                    {/* <p className="bg-red-500 text-blue-300 p-3">{images[currentIndex].attribute_status}</p> */}
                                    {isModalOpen && (
                                        <div className="absolute inset-0 z-50 flex items-center w-[700px]">
                                            <div className="bg-white p-10 rounded-xl  relative bottom-1 left-[27rem]">
                                                <button
                                                    onClick={closeModal}
                                                    className="absolute top-0 right-4 w-10 h-10 text-white bg-red-500  rounded-full p-2"
                                                >
                                                    x
                                                </button>
                                                <Image
                                                    src={selectedImage}
                                                    alt="Large view"
                                                    width={500}
                                                    height={500}
                                                    className="w-[500px] h-[500px] object-contain"
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="">
                                    <div>
                                        <div className="flex flex-col text-black gap-2 items-start">
                                            <h3 className="text-lg text-black font-bold font-">
                                                Amenities
                                            </h3>
                                            <div className="flex flex-col lg:flex-row bg-white rounded-md p-1 h-40 overflow-y-scroll">
                                                <ul className=" pl-5  text-gray-900 ">
                                                    {totalDetails?.amenities.map((item, index) => (
                                                        <li key={index} className="capitalize">
                                                            {item?.attribute_value >= 1 && <span> {item.attribute_name.replace('no_of_', '')}-{item.attribute_value}</span>}
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
                                                className="bg-white w-full px-3 py-2 text-black rounded-md"
                                            >
                                                View Proofs
                                            </button>
                                            <button className="bg-white w-full px-3 py-2 text-black rounded-md">
                                                Farmhouse Sq. Yards{" : "}
                                                {totalDetails.property_data.property_square_yards}
                                            </button>
                                            {/* <button ></button> */}
                                        </div>
                                        {showProof && (
                                            <div>
                                                <div className="text-black fixed inset-0 bg-black bg-opacity-50 z-50 backdrop-blur-sm h-">
                                                    <div className="flex justify-center items-center ">
                                                        <div className="bg-white absolute top-9 h-[680px] w-[300px] transition-all duration-300 ease-in-out p-8 pb-3 rounded-lg">
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
                                                                alt="current bill"
                                                                className="h-[300px] w-full object-cover rounded-lg"
                                                            />
                                                            <h2 className="text-2xl font-bold mb-4 pt-4">
                                                                Aadhar Card
                                                            </h2>
                                                            <Image
                                                                src={totalDetails.owner_profile[0].aadhar_image_url}
                                                                height={1000}
                                                                width={1000}
                                                                alt="aadhar card"
                                                                className="w-full h-[150px] rounded-lg"
                                                            />
                                                            <div className="pt-3">

                                                                <button
                                                                    onClick={() => {
                                                                        setShowProof(false);
                                                                    }}
                                                                    className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition w-full "
                                                                >
                                                                    Ok
                                                                </button>
                                                            </div>
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
                                                            <ul className="capitalize flex flex-col gap-2">
                                                                <li>bank account name : {item.bank_account_name}</li>
                                                                <li>bank name : {item.bank_name}</li>
                                                                <li>bank account number : {item.bank_account_number}</li>
                                                                <li>bank ifsc code : {item.bank_ifsc_code}</li>
                                                                <li className="pt-3">
                                                                    <Image
                                                                        height={1000}
                                                                        width={1000}
                                                                        src={item.passbook_image_url}
                                                                        className="w-full h-[150px] rounded-lg object-contain"
                                                                    />
                                                                </li>
                                                            </ul>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="bg-white p-4 rounded-md h-fit">
                                    <div className="flex flex-col items-center space-x-4">
                                        <p className="text-black font-bold">Farm House Location</p>

                                        <div>
                                            <p className="text-black font-medium w-48 pt-5">
                                                {totalDetails.property_data.geo_location}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-white p-4 rounded-md h-fit">
                                    <div className="flex flex-col items-center space-x-4">
                                        <p className="font-bold text-black">Owner Profile</p>
                                        <div>
                                            <p className="text-gray-800 font-medium capitalize flex gap-1 items-center">
                                                <span>
                                                    <img
                                                        src="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg" // Replace with avatar
                                                        alt="Owner"
                                                        className="rounded-full w-10 h-10"
                                                    />
                                                </span>
                                                <span>{totalDetails.property_data.profile_name}</span>
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                Partner Number:{" "}
                                                {totalDetails.property_data.owner_number}
                                            </p>
                                            <p className="text-sm text-gray-500">
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
                            <div className="flex lg:flex-row flex-col  gap-14 pt-9">
                                <div className="flex flex-col gap-4">
                                    <div className="flex flex-col gap-y-2">
                                        <p className="font-bold text-black">Assigned To</p>
                                        <p className="bg-white p-2 rounded-md">{totalDetails.property_data.approval_team_user_phone}</p>
                                    </div>
                                    <div className="flex flex-col items-center space-x-4">
                                        <p className="font-bold text-black">Customer Details</p>
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
                                                <p className="text-sm text-gray-500">
                                                    {totalDetails.property_data.owner_number}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className=" ">
                                    <div className="flex flex-col gap-2 text-black ">
                                        <p className="font-bold text-">Bookings </p>
                                        <div className=" bg-gray-100 ">
                                            <table className="table-auto border-collapse border border-gray-300">
                                                <thead>
                                                    <tr>
                                                        <th className="px-6 py-4 border-b border-gray-300 text-left">
                                                            Customer Details
                                                        </th>
                                                        <th className="px-6 py-4 border-b border-gray-300 text-left">
                                                            Customer Details
                                                        </th>
                                                        <th className="px-6 py-4 border-b border-gray-300 text-left">
                                                            Customer Paid
                                                        </th>
                                                        <th className="px-6 py-4 border-b border-gray-300 text-left">
                                                            Owner Earnings
                                                        </th>
                                                        <th className="px-6 py-4 border-b border-gray-300 text-left">
                                                            Dozzy Earnings
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr className="tracking-wide">
                                                        <td className="px-6 py-4 border-b border-gray-300">
                                                            <p>Booking Id: {bookingDetails?.booking_details.id}</p>
                                                            <p>
                                                                Check In:

                                                                {bookingDetails?.booking_details.booking_start_date && <span> {convertDate(bookingDetails?.booking_details.booking_start_date)}</span>}
                                                            </p>
                                                            <p>
                                                                Check Out:
                                                                {bookingDetails?.booking_details.booking_end_date && <span> {convertDate(bookingDetails?.booking_details.booking_end_date)}</span>}
                                                            </p>
                                                            <p>Duration: {bookingDetails?.booking_details.booking_hours}</p>
                                                        </td>
                                                        <td className=" px-6 py-4 border-b border-gray-300">
                                                            {bookingDetails?.customer_phone}
                                                        </td>
                                                        <td className="px-6 py-4 border-b border-gray-300">
                                                            {bookingDetails?.booking_details.final_amount}
                                                        </td>
                                                        <td className="px-6 py-4 border-b border-gray-300">
                                                            {bookingDetails?.booking_details.owner_booking_price}
                                                        </td>
                                                        <td className="px-6 py-4 border-b border-gray-300">
                                                            {bookingDetails?.booking_details.booking_price}
                                                        </td>
                                                    </tr>
                                                    {showAllBookings && totalDetails.all_bookings.map((item, index) => (
                                                        <tr key={index}>
                                                            <td className="px-6 py-4 border-b border-gray-300">
                                                                <p>Booking Id: {item?.booking_id}</p>
                                                                <p>
                                                                    Check In:
                                                                    {bookingDetails?.booking_details.booking_start_date && <span> {convertDate(bookingDetails?.booking_details.booking_start_date)}</span>}
                                                                </p>
                                                                <p>
                                                                    Check Out:
                                                                    {bookingDetails?.booking_details.booking_end_date && <span> {convertDate(bookingDetails?.booking_details.booking_end_date)}</span>}
                                                                </p>
                                                                <p>Duration: {item?.booking_hours}</p>
                                                            </td>
                                                            <td className="px-6 py-4 border-b border-gray-300">
                                                                {item?.customer_phone}
                                                            </td>
                                                            <td className="px-6 py-4 border-b border-gray-300">
                                                                {item?.final_amount}
                                                            </td>
                                                            <td className="px-6 py-4 border-b border-gray-300">
                                                                {item?.owner_booking_price}
                                                            </td>
                                                            <td className="px-6 py-4 border-b border-gray-300">
                                                                {item?.booking_price}
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                            <p className="flex justify-center pt-3">
                                                {!showAllBookings && <button onClick={() => { setShowAllBookings(true) }} className="text-center flex gap-1 items-center"><span>View More Bookings</span><span><MdArrowForwardIos /></span></button>}

                                                {showAllBookings && <button onClick={() => { setShowAllBookings(false) }} className="text-center flex gap-1 items-center"><span>Show Less</span><span><MdKeyboardArrowUp size={20} /></span></button>}
                                                {/* <button onClick={() => { setShowAllBookings(false) }} className="">Show Less</button> */}
                                            </p>
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
