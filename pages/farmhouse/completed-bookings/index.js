import { useEffect, useState } from "react";
import CommonLayout from "@/pages/components/layout/CommonLayout";
// import CommonLayout from "../components/layout/CommonLayout";
import LoadingComp from "@/pages/components/Loading";
import { FiCopy } from "react-icons/fi"; // You can use react-icons for the copy symbol
import { format } from 'date-fns';

import Image from "next/image";
import Link from "next/link";
import { MdKayaking } from "react-icons/md";
const OnlineFarmHouses = () => {
    const [cities, setCities] = useState("");
    const [loc, setLoc] = useState("Hyderabad");
    const [bookingData, setBookingData] = useState("");
    const [Loading, setLoading] = useState(false);
    const [bkStatus, setBkStatus] = useState("all");

    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedUserPhone = localStorage.getItem("tboo_user_phone");
            const storedUserAuthorization = localStorage.getItem(
                "tboo_" + storedUserPhone + "_token"
            );
            const storedUserDetails = localStorage.getItem(
                "tboo_" + storedUserPhone + "_details"
            );
        }
        // Make API call
        const fetchCities = async () => {
            setLoading(true);
            const storedUserPhone = localStorage.getItem("tboo_user_phone");

            try {
                const response = await fetch(
                    `https://staging.dozzy.com/admin/property-cities`,

                    {
                        method: "GET",
                        headers: {
                            Accept: "application/json",
                            Authorization: localStorage.getItem(
                                "tboo_" + storedUserPhone + "_token"
                            ),
                        },
                    }
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }

                const data = await response.json();
                if (data.status === "success") {
                    setCities(data.cities);
                    // console.log(data.cities, "data.results");
                } else {
                    setError("Error: Unable to fetch data");
                }
            } catch (error) {
                console.log(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCities();
    }, []); // Dependency on userAuthorization to ensure API call happens after loading user info

    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedUserPhone = localStorage.getItem("tboo_user_phone");
            const storedUserAuthorization = localStorage.getItem(
                "tboo_" + storedUserPhone + "_token"
            );
            const storedUserDetails = localStorage.getItem(
                "tboo_" + storedUserPhone + "_details"
            );
        }
        // Make API call
        const fetchCitiesData = async () => {
            setLoading(true);
            const storedUserPhone = localStorage.getItem("tboo_user_phone");
            try {
                const response = await fetch(
                    `https://staging.dozzy.com/admin/property-bookings?status=${bkStatus}&location=${loc}`,
                    {
                        method: "GET",
                        headers: {
                            Accept: "application/json",
                            Authorization: localStorage.getItem(
                                "tboo_" + storedUserPhone + "_token"
                            ),
                        },
                    }
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }

                const data = await response.json();
                if (data.status === "success") {
                    // setCities(data.cities);
                    setBookingData(data);
                    // console.log(data, "data.results");
                } else {
                    setError("Error: Unable to fetch data");
                }
            } catch (error) {
                console.log(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCitiesData();
    }, [loc,bkStatus]); // Dependency on userAuthorization to ensure API call happens after loading user info
    const converDate = (data) => {
        const date = new Date(data);
        // Format the date as '14th Sep 2024'
        const formattedDate = format(date, " h:mm a, MMM yyyy");
        return formattedDate
    }

    return (
        <div>
            {<CommonLayout>
                <p className=" pl-5 pt-4 text-lg text-black">Completed Bookings -{bookingData?.count}</p>
                <div className="px-4">
                    {/* // <p className="pl-5 pt-4 text-lg text-black">Total Bookings</p> */}
                    {/* <ul className="pl-4 pt-4 p-2 bg-[#f7f7f7] rounded-md flex gap-3 flex-wrap">
                        {cities?.length &&
                            cities?.map((item, index) => (
                                <li
                                    onClick={() => {
                                        setLoc(item);
                                    }}
                                    className={`text-black ${loc == item ? "text-blue-400" : ""}`}
                                >
                                    {item}
                                </li>
                            ))}
                    </ul> */}
                    <div className="flex gap-5 pt-7">
                        <select
                            className="p-2 bg-[#f7f7f7] rounded-md"
                            onChange={(e) => setLoc(e.target.value)}
                            value={loc}
                        >
                            <option value="" disabled>Select a city</option>
                            {cities?.length ? (
                                cities.map((item, index) => (
                                    <option key={index} value={item} className="capitalize">
                                        {item}
                                    </option>
                                ))
                            ) : (
                                "loading" ? <option>Loading...</option> : <option>{error}</option>
                            )}
                        </select>
                        {/* ---------------------------- */}

                        <select
                            className="p-2 bg-[#f7f7f7] rounded-md"
                            onChange={(e) => setBkStatus(e.target.value)}
                            value={bkStatus}
                        >
                            <option value="all" >All</option>
                            <option value="rejected" >rejected</option>
                            <option value="in_progress" >In progress</option>
                            <option value="canceled" >cancelled</option>
                            <option value="replaced" >replaced</option>

                        </select>
                    </div>
                    <div className="text-black pt-3 flex flex-col gap-3">
                        {Loading ? <LoadingComp /> : (bookingData?.count) &&
                            bookingData?.results.map((item, index) => (
                                <Link
                                    href={`/farmhouse/completed-bookings/${item.property_id}/${item.booking_id}`}
                                    key={index}
                                    className="bg-gray-200 p-3 flex justify-between pr-8"
                                >
                                    <div className="flex gap-3">
                                        <Image
                                            src={`${item?.farmhouse_front_view?.length ? item?.farmhouse_front_view : ''}`}
                                            className="rounded-md w-32 h-32"
                                            height={100}
                                            width={100}
                                            alt="alt"
                                        />
                                        <ul className="flex flex-col gap-1">
                                            <li className="text-xl font-bold">Booking id {item?.booking_id}</li>
                                            <li>{item?.property_name}</li>
                                            <li>{item?.area_name}</li>
                                            <li>Partner number {item?.property_alternate_number}</li>
                                            <li>Watchman number {item?.property_watch_man_number}</li>
                                            <li>Customer number {item?.customer_number}</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <ul className="flex gap-4 pt-5">
                                            <li> {converDate(item?.booking_start_date)}</li>
                                            <li><span className="relative bottom-3 left-24">{Math.ceil(Number((item?.booking_hours) / 24))} {Math.ceil(Number((item?.booking_hours) / 24)) == 1 ? 'day' : 'days'} </span>---------------------</li>
                                            {/* <li>{Number((item?.booking_hours)/24)}</li> */}
                                            <li>{converDate(item?.booking_end_date)}</li>
                                            {/* <li>Partner Price -{item?.booking_end_date}</li> */}
                                            <li>
                                            </li>
                                        </ul>
                                        <p className="pt-2">Assigned to :  {item?.customer_number}</p>
                                    </div>
                                </Link>
                            ))}

                    </div>
                </div>
            </CommonLayout>}
        </div>
    );
};

export default OnlineFarmHouses;
