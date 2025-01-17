import { useEffect, useState } from "react";
import CommonLayout from "@/pages/components/layout/CommonLayout";
// import CommonLayout from "../components/layout/CommonLayout";
import LoadingComp from "@/pages/components/Loading";
import { FiCopy } from "react-icons/fi"; // You can use react-icons for the copy symbol
import { format } from 'date-fns';

import Image from "next/image";
import Link from "next/link";
const OnlineFarmHouses = () => {
    const [cities, setCities] = useState("");
    const [loc, setLoc] = useState("Hyderabad");
    const [bookingData, setBookingData] = useState("");
    const [Loading, setLoading] = useState(false);

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
                    `https://staging.dozzy.com/admin/property-bookings?status=all&location=${loc}`,
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
                    console.log(data, "data.results");
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
    }, [loc]); // Dependency on userAuthorization to ensure API call happens after loading user info
    const converDate = (data) => {
        const date = new Date(data);
        // Format the date as '14th Sep 2024'
        const formattedDate = format(date, " h:mm a, MMM yyyy");
        console.log(formattedDate);
        return formattedDate
    }
    return (
        <div>
            {Loading ? <LoadingComp /> : <CommonLayout>
                <p className=" pl-5 pt-4 text-lg text-black">Completed Bookings -{bookingData?.count}</p>
                <div className="px-4">
                    {/* // <p className="pl-5 pt-4 text-lg text-black">Total Bookings</p> */}
                    <ul className="pl-4 pt-4 p-2 bg-[#f7f7f7] rounded-md flex gap-3 flex-wrap">
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
                    </ul>
                    <div className="text-black pt-3 flex flex-col gap-3">

                        {(bookingData?.count) &&
                            bookingData?.results.map((item, index) => (
                                <div key={item.id} className="bg-gray-200 p-3 flex justify-between pr-8">
                                    <div className="flex gap-3">
                                        <Image
                                            src={`${item?.farmhouse_front_view?.length ? item?.farmhouse_front_view : ''}`}
                                            className="rounded-md w-32 h-32"
                                            height={100}
                                            width={100}
                                            alt="alt"
                                        />
                                        <ul>
                                            <li>{item?.property_name}</li>
                                            {/* <li>{item?.area_name}</li> */}
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
                                        {/* <Link className="underline pt-2" href={`/farmhouse/total-farmhouses/${item.property_id}`}>View more</Link> */}
                                        <p className="pl-1 pt-5">Guest Checkout Time: {converDate(item?.booking_end_date)}</p>
                                        {console.log(format(new Date(item?.booking_end_date), "MM/dd/yyyy 'at' h:mm a"))
                                        }
                                    </div>
                                </div>
                            ))}

                    </div>
                </div>
            </CommonLayout>}
        </div>
    );
};

export default OnlineFarmHouses;
