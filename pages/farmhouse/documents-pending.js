import React, { useEffect, useState } from 'react';
import CommonLayout from '../components/layout/CommonLayout';
import Image from 'next/image';
import { format } from 'date-fns';
const ComponentName = (props) => {

    const [stopAppr, setStopAppr] = useState(false)
    const [dataRes, setDataRes] = useState(null)
    const [refDoc, setRefDoc] = useState(1)
    const [updatedData, setUpdatedData] = useState({})
    const [updatedBKAData, setUpdatedBKAData] = useState({})
    useEffect(() => {
        const new8 = async () => {
            const myHeaders = new Headers();
            myHeaders.append("accept", "application/json");
            myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX3Bob25lIjoiNzk4OTAzMDc0MSJ9.BInoJaoA8tsI4nZ80q1rs0fkBY3os6hL3N1CrPKojKg");
            myHeaders.append("Content-Type", "application/json");

            const raw = JSON.stringify({
                "app_user_id": 111,
                "role_id": 4
            });

            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: raw,
                redirect: "follow"
            };

            const respo = await fetch("https://staging.dozzy.com/admin/assign-aadhars", requestOptions);
            const data = await respo.json();
            setDataRes(data);
            // .then((response) => response.json())
            // .then((result) => console.log(result,"done"))
            // .catch((error) => console.error(error));
        }
        new8();

    }, [refDoc])
    console.log(refDoc, "refDoc");

    useEffect(() => {
        const StopApprovals = async () => {
            const storedUserPhone = localStorage.getItem("tboo_user_phone");
            const auth = localStorage.getItem("tboo_" + storedUserPhone + "_token");
            const myHeaders = new Headers();
            myHeaders.append("accept", "application/json");
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", auth);

            const requestOptions = {
                method: "DELETE",
                headers: myHeaders,
                redirect: "follow",
            };

            const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/admin/remove-assign-doc?app_user_id=111`, requestOptions);
            const data = await response.json();
            console.log(data, " resp in stop appr");

            // Handle API response
        };
        if (stopAppr) {
            StopApprovals()
        }

    }, [stopAppr])


    const convertDate = (data) => {
        const date = new Date(data);  // Create a Date object from the input string
        // Format the date as '13th Jan 2025, 3:00 PM'
        const formattedDate = format(date, "do, MMM yyyy, h:mm a");
        return formattedDate;
    }
    useEffect(() => {
        async function UpdateUserDocuments() {
            const myHeaders = new Headers();
            myHeaders.append("accept", "application/json");
            myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX3Bob25lIjoiNzk4OTAzMDc0MSJ9.BInoJaoA8tsI4nZ80q1rs0fkBY3os6hL3N1CrPKojKg");
            myHeaders.append("Content-Type", "application/json");

            const raw = JSON.stringify(updatedData);

            const requestOptions = {
                method: "PUT",
                headers: myHeaders,
                body: raw,
                redirect: "follow"
            };

            fetch("https://staging.dozzy.com/admin/update-user-documents", requestOptions)
                .then((response) => response.text())
                .then((result) => console.log(result))
                .catch((error) => console.error(error));
        }

        if (Object.keys(updatedData).length !== 0) {
            setRefDoc(refDoc + 1)
            UpdateUserDocuments()
        }
    }, [updatedData])
    useEffect(() => {
        async function UpdateupdatedBKADocuments() {
            const myHeaders = new Headers();
            myHeaders.append("accept", "application/json");
            myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX3Bob25lIjoiNzk4OTAzMDc0MSJ9.BInoJaoA8tsI4nZ80q1rs0fkBY3os6hL3N1CrPKojKg");
            myHeaders.append("Content-Type", "application/json");

            const raw = JSON.stringify(updatedBKAData);

            const requestOptions = {
                method: "PUT",
                headers: myHeaders,
                body: raw,
                redirect: "follow"
            };

            fetch("https://staging.dozzy.com/admin/update-booking-aadhar-status", requestOptions)
                .then((response) => response.text())
                .then((result) => console.log(result))
                .catch((error) => console.error(error));
        }

        if (Object.keys(updatedBKAData).length !== 0) {
            setRefDoc(refDoc + 1)
            UpdateupdatedBKADocuments()
        }
    }, [updatedBKAData])

    return (
        <div>
            <CommonLayout>
                <div className='pt-10 pl-10 text-lg'>
                    <p className='font-bold text-2xl'>Pending documents</p>
                    <ul className='flex gap-3 justify-center py-7'>
                        <li className='bg-orange-400 p-2 rounded-md w-72 text-center'><button onClick={() => { setStopAppr(true) }}>Stop Approvals</button>  </li>
                        <li className='bg-blue-400 p-2 rounded-md w-72 text-center'>Move To Next Profile </li>
                    </ul>
                    <div className='flex flex-col gap-3 pt-7'>
                        <p><span className='font-bold'>Customer Name :</span> {dataRes?.customer_profile?.profile_name}</p>
                        <p><span className='font-bold'>Customer Number:</span> {dataRes?.customer_profile?.customer_phone}</p>
                    </div>
                    <div className='flex  gap-12 pt-7'>
                        <p><span className='font-bold'>Booking Id : </span>{dataRes?.booking_details?.id}</p>
                        <p><span className='font-bold'>Property Name :</span>  {dataRes?.booking_details?.property_name}</p>
                        {(dataRes?.booking_details?.booking_start_date) && <p><span className='font-bold'>Start Date :</span>{convertDate(dataRes?.booking_details?.booking_start_date)}</p>}
                        {(dataRes?.booking_details?.booking_end_date) && <p><span className='font-bold'>End Date :</span>{convertDate(dataRes?.booking_details?.booking_end_date)}</p>}
                    </div>
                    <div className='pt-6 grid grid-cols-3 gap-10 font-bold pr-7'>
                        <div className='flex flex-col items-center gap-2 border-[2px] border-gray-400 p-2 rounded-md capitalize h-full'>
                            <p cl>Aadhar front image</p>
                            <p>Status : {dataRes?.customer_profile?.aadhar_front_image_url_status}</p>
                            <div className='w-52 h-full rounded-md'>
                                <Image
                                    src={dataRes?.customer_profile?.aadhar_front_image_url}
                                    width={500}
                                    height={500}
                                    className='rounded-md'
                                    alt='image'
                                />
                            </div>
                            <ul className='flex gap-5 items-center pt-3 text-white'>
                                <li className='px-3 bg-green-500 rounded'><button onClick={() => {
                                    setUpdatedData({ app_user_id: dataRes?.customer_profile?.app_user_id, key: "aadhar_front_image_url_status", value: "approved" })
                                }}>Approve</button></li>
                                <li className='px-3 bg-red-500 rounded'><button onClick={() => {
                                    setUpdatedData({ app_user_id: dataRes?.customer_profile?.app_user_id, key: "aadhar_front_image_url_status", value: "rejected" })
                                }}>Reject</button></li>
                            </ul>
                        </div>
                        <div className='flex flex-col items-center gap-2 border-[2px] border-gray-400 p-2 rounded-md capitalize h-full'>
                            <p>Aadhar BACK image</p>
                            <p>Status : {dataRes?.customer_profile?.aadhar_back_image_url_status}</p>
                            <div className='w-52 h6'>
                                <Image
                                    src={"/dataRes?.customer_profile?.aadhar_back_image_url || 0"}
                                    width={500}
                                    height={500}
                                    alt='image'
                                />
                            </div>
                            <ul className='flex gap-5 items-center pt-3 text-white'>
                                <li className='px-3 bg-green-500 rounded'><button onClick={() => {
                                    setUpdatedData({ app_user_id: dataRes?.customer_profile?.app_user_id, key: "aadhar_back_image_url_status", value: "approved" })
                                }}>Approve</button></li>
                                <li className='px-3 bg-red-500 rounded'><button onClick={() => {
                                    setUpdatedData({ app_user_id: dataRes?.customer_profile?.app_user_id, key: "aadhar_back_image_url_status", value: "rejected" })
                                }}>Reject</button></li>
                            </ul>
                        </div>
                        <div className='flex flex-col items-center gap-2 border-[2px] border-gray-400 p-2 rounded-md capitalize h-full'>
                            <p cl>Profile Image</p>
                            <p>Status : {dataRes?.customer_profile?.profile_photo_url_status}</p>
                            <div className='w-52 h-72'>
                                <Image
                                    src={dataRes?.customer_profile?.profile_photo_url}
                                    width={500}
                                    height={300}
                                    className='h-72 rounded-md'
                                    alt='image'
                                />
                            </div>
                            <ul className='flex gap-5 items-center pt-3 text-white'>
                                <li className='px-3 bg-green-500 rounded'><button onClick={() => {
                                    setUpdatedData({ app_user_id: dataRes?.customer_profile?.app_user_id, key: "profile_photo_url_status", value: "approved" })
                                }}>Approve</button></li>
                                <li className='px-3 bg-red-500 rounded'><button onClick={() => {
                                    setUpdatedData({ app_user_id: dataRes?.customer_profile?.app_user_id, key: "profile_photo_url_status", value: "rejected" })
                                }}>Reject</button></li>
                            </ul>
                        </div>
                    </div>
                    {console.log(dataRes?.booking_details.guest_adhaar_details && JSON.parse(dataRes?.booking_details.guest_adhaar_details), " dataRes?.customer_profile.adhaar_json_response")}
                    <p className='pt-7 text-xl font-bold'>Guest Aadhar Details</p>
                    <div className='pt-6 grid grid-cols-2 gap-10 font-bold py-8 pr-7'>
                        {dataRes?.booking_details.guest_adhaar_details && JSON.parse(dataRes?.booking_details.guest_adhaar_details).map((item, index) => (
                            <div className=''>
                                <div>
                                    <div className='flex flex- items-center gap-2 border-[2px] border-gray-400 p-2 rounded-md capitalize h-full'>
                                        <div className='flex flex-col gap-2'>
                                            <p>Aadhar Front image</p>
                                            <p>Profile Name : <span className='font-normal'>{item.aadhar_api_returned_name}</span></p>
                                            <p>Status : {item.guest_adhaar_status}</p>
                                            <p>Number : {item.aadhar_number}</p>
                                            <p>DOB : {item.aadhar_api_returned_dob}</p>
                                            <p>Address : {item.address}</p>
                                        </div>

                                        <div className='w-52 h-full'>
                                        </div>
                                        <Image
                                            src={item.aadhar_image_url}
                                            width={500}
                                            height={500}
                                            alt='image'
                                            className='rounded-md'
                                        />
                                    </div>
                                    <ul className='flex gap-5 items-center pt-3 text-white'>
                                        <li className='px-3 bg-green-500 rounded'><button onClick={() => {
                                            setUpdatedBKAData({ attribute_id: item?.id, status: "approved" })
                                        }}>Approve</button></li>
                                        <li className='px-3 bg-red-500 rounded'><button onClick={() => {
                                            setUpdatedBKAData({ attribute_id: item?.id, status: "rejected" })
                                        }}>Reject</button></li>
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* <div className='pt-6 grid grid-cols-2 gap-10 font-bold py-8 pr-7'>
                        {dataRes?.booking_aadhars.map((item, index) => (
                            <div className=' ga'>
                                <div>{item.attribute_name === 'aadhar_1_front' && <div className='flex flex-col items-center gap-2 border-[2px] border-gray-400 p-2 rounded-md capitalize h-full'>
                                    <p >Aadhar Front image</p>
                                    <p>Status : {item.attribute_status}</p>
                                    <div className='w-52 h-full'>
                                        <Image
                                            src={item.attribute_value}
                                            width={500}
                                            height={500}
                                            alt='image'
                                        />
                                    </div>
                                    <ul className='flex gap-5 items-center pt-3 text-white'>
                                        <li className='px-3 bg-green-500 rounded'><button onClick={() => {
                                            setUpdatedBKAData({ attribute_id: item?.id, status: "approved" })
                                        }}>Approve</button></li>
                                        <li className='px-3 bg-red-500 rounded'><button onClick={() => {
                                            setUpdatedBKAData({ attribute_id: item?.id, status: "rejected" })
                                        }}>Reject</button></li>
                                    </ul>
                                </div>
                                }
                                </div>
                                <div>{item.attribute_name === 'aadhar_1_back' && <div className='flex flex-col items-center gap-2 border-[2px] border-gray-400 p-2 rounded-md capitalize h-full'>
                                    <p >Aadhar Back image</p>
                                    <p>Status : {item.attribute_status}</p>
                                    <div className='w-52 h-full'>
                                        <Image
                                            src={item.attribute_value}
                                            width={500}
                                            height={500}
                                            alt='image'
                                        />
                                    </div>
                                    <ul className='flex gap-5 items-center pt-3 text-white'>
                                        <li className='px-3 bg-green-500 rounded'><button onClick={() => {
                                            setUpdatedBKAData({ attribute_id: String(item?.id), status: "approved" })
                                        }}>Approve</button></li>
                                        <li className='px-3 bg-red-500 rounded'><button onClick={() => {
                                            setUpdatedBKAData({ attribute_id: String(item?.id), status: "rejected" })
                                        }}>Reject</button></li>
                                    </ul>
                                </div>}
                                </div>
                            </div>
                        ))}
                    </div> */}
                </div>

            </CommonLayout>
        </div>
    );
};

export default ComponentName;