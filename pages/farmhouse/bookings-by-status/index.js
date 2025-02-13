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
    const [Loading, setLoading] = useState(true);
    const [bkStatus, setBkStatus] = useState("all");

    const [makeSearch, setMakeSearch] = useState(0);
    const [searchData, setSearchData] = useState('');
    const [showSData, setShowSData] = useState(false);
    const handleSubmit = (e) => {
        e.preventDefault();
        setMakeSearch(makeSearch + 1);
        setShowSData(true);
    }
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
        const fetchSearchData = async () => {
            const storedUserPhone = localStorage.getItem("tboo_user_phone");

            try {
                const response = await fetch(
                    `https://staging.dozzy.com/admin/search-data?${options == 'booking_id' ? 'booking_id' : 'user_phone'}=${search}`,

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
                    setSearchData(data.results);
                    // console.log(data.cities, "data.results");
                } else {
                    setError("Error: Unable to fetch data");
                }
            } catch (error) {
                console.log(error.message);
            } finally {
            }
        };
        if (makeSearch > 0) {
            fetchSearchData();
        }
    }, [makeSearch]); // Dependency on userAuthorization to ensure API call happens after loading user info

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
                setShowSData(false)
            }
        };

        fetchCitiesData();
    }, [loc, bkStatus]); // Dependency on userAuthorization to ensure API call happens after loading user info

    const [filteredPosts, setFilteredPosts] = useState([]);

    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        if (searchQuery) {
            const filtered = bookingData?.results?.filter(post => {
                const bookingId = String(post.booking_id).toLowerCase();
                const propertyName = post.property_name.toLowerCase();
                return bookingId.includes(searchQuery.toLowerCase()) || propertyName.includes(searchQuery.toLowerCase());
            });

            setFilteredPosts(filtered);
        } else {
            setFilteredPosts(bookingData?.results);
        }
    }, [searchQuery, bookingData, bkStatus]);
    const converDate = (data) => {
        const date = new Date(data);
        // Format the date as '14th Sep 2024'
        const formattedDate = format(date, " h:mm a, dd MMM yyyy");
        return formattedDate
    }
    const [search, setSearch] = useState("");
    const [options, setOptions] = useState("");
    const handleSearch = (e) => {
        setSearch(e.target.value);
    }

    // useEffect(() => {
    //     const myHeaders = new Headers();
    //     myHeaders.append("accept", "application/json");
    //     myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX3Bob25lIjoiNzk4OTAzMDc0MSJ9.BInoJaoA8tsI4nZ80q1rs0fkBY3os6hL3N1CrPKojKg");

    //     const requestOptions = {
    //         method: "GET",
    //         headers: myHeaders,
    //         redirect: "follow"
    //     };

    //     fetch("https://staging.dozzy.com/admin/search-data?booking_id=8", requestOptions)
    //         .then((response) => response.text())
    //         .then((result) => console.log(result))
    //         .catch((error) => console.error(error));
    //     if (makeSearch == true) {
    //         fetchSeachData()
    //     }
    // }, [makeSearch])

    return (
        <div>
            {<CommonLayout onSearch={setSearchQuery} placeholderText='search by farmhouse name / Booking id'>

                <div className="flex items-center gap-x-6 pt-10">
                    <p className=" pl-5 text-3xl font-bold  text-black capitalize">{bkStatus.replace('_', ' ')}  Bookings   - {bookingData?.count}</p>
                    <form onSubmit={handleSubmit} className="flex gap-3 items-center">
                        <select
                            id="role2"
                            value={options}
                            onChange={(e) => setOptions(e.target.value)}
                            className="p-3 bg-gray-200 opacity-100 text-black rounded-md"
                        >
                            <option value=" select">Seachy By</option>
                            <option value="user_phone">Customer Number</option>
                            <option value="booking_id">Booking ID</option>
                        </select>

                        <input
                            value={search}
                            type="text"
                            onChange={handleSearch}
                            maxLength={10}
                            className={`overflow-hidden border-2 lg:w-[600px] w-[250px] bg-[#556EE666] py-2 px-2 rounded-md lg:pl-12 placeholder:text-gray-700 `}
                            placeholder={"Type here"}
                        />
                        <button className="bg-[#556EE666] hover:bg-[#556EE699] p-2 rounded-md" type="submit">Search</button>
                        <button className="bg-[#556EE666] hover:bg-[#556EE699] p-2 rounded-md" onClick={()=>{}}>Clear All</button>
                    </form>
                </div>
                <div className="px-4">

                    <div className="flex lg:gap-8 gap-1 py-7 xl:text-xl">
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
                        {Loading ? <LoadingComp /> : (bookingData?.count) && !showSData &&
                            filteredPosts?.map((item, index) => (
                                <Link
                                    href={`/farmhouse/bookings-by-status/${item.property_id}/${item.booking_id}`}
                                    key={index}
                                    className="bg-gray-200 p-3 flex flex-col text-xs lg:text-base lg:flex-row justify-between pr-8"
                                >
                                    <div className="flex gap-3">
                                        <Image
                                            src={`${item?.farmhouse_front_view?.length ? item?.farmhouse_front_view : ''}`}
                                            className="rounded-md w-40 h-40"
                                            height={100}
                                            width={100}
                                            alt="alt"
                                        />
                                        <ul className="flex flex-col gap-1">
                                            <li className="text-x font-bold">Booking id {item?.booking_id}</li>
                                            <li>{item?.property_name}</li>
                                            <li>{item?.property_region}</li>
                                            <li>Partner number : {item?.property_alternate_number}</li>
                                            <li>Watchman number : {item?.property_watch_man_number}</li>
                                            <li>Customer number : {item?.customer_number}</li>

                                        </ul>
                                    </div>
                                    <div>
                                        <ul className="flex gap-4 pt-5">
                                            <li> {converDate(item?.booking_start_date)}</li>
                                            {/* <li className="relative lg:bottom-4 bottom-1 border-b-2 border-black w-40 text-center"><span className=" ">{Math.ceil(Number((item?.booking_hours) / 22))} {Math.ceil(Number((item?.booking_hours) / 22)) == 1 ? 'day' : 'days'} </span></li> */}
                                            <li className="relative lg:bottom-4 bottom-1 border-b-2 border-black w-40 text-center">{Number(item?.booking_hours)} hours</li>
                                            <li>{converDate(item?.booking_end_date)}</li>
                                            {/* <li>Partner Price -{item?.booking_end_date}</li> */}
                                            <li>
                                            </li>
                                        </ul>
                                        <p className="pt-2">Assigned to :  {item?.customer_number}</p>
                                    </div>
                                </Link>
                            ))}
                        {searchData?.length && showSData &&
                            <div className="flex flex-col gap-3">
                                {
                                    searchData?.map((item, index) => (
                                        <Link
                                            href={`/farmhouse/bookings-by-status/${item.property_id}/${item.booking_id}`}
                                            key={index}
                                            className="bg-gray-200 p-3 flex flex-col text-xs lg:text-base lg:flex-row justify-between pr-8"
                                        >
                                            <div className="flex gap-3">
                                                <Image
                                                    src={`${item?.farmhouse_front_view?.length ? item?.farmhouse_front_view : ''}`}
                                                    className="rounded-md w-40 h-40"
                                                    height={100}
                                                    width={100}
                                                    alt="alt"
                                                />
                                                <ul className="flex flex-col gap-1">
                                                    <li className="text-x font-bold">Booking id {item?.booking_id}</li>
                                                    <li>{item?.property_name}</li>
                                                    <li>{item?.property_region}</li>
                                                    <li>Partner number : {item?.property_alternate_number}</li>
                                                    <li>Watchman number : {item?.property_watch_man_number}</li>
                                                    <li>Customer number : {item?.customer_number}</li>

                                                </ul>
                                            </div>
                                            <div>
                                                <ul className="flex gap-4 pt-5">
                                                    <li> {converDate(item?.booking_start_date)}</li>
                                                    <li className="relative lg:bottom-4 bottom-1 border-b-2 border-black w-40 text-center">{Number(item?.booking_hours)} hours</li>
                                                    <li>{converDate(item?.booking_end_date)}</li>
                                                    {/* <li>Partner Price -{item?.booking_end_date}</li> */}
                                                    <li>
                                                    </li>
                                                </ul>
                                                <p className="pt-2">Assigned to :  {item?.customer_number}</p>
                                            </div>
                                        </Link>
                                    ))}
                            </div>}

                    </div>
                </div>
            </CommonLayout>}
        </div>
    );
};

export default OnlineFarmHouses;
