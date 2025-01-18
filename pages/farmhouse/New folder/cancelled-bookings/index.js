// import { useEffect, useState } from "react";
// import CommonLayout from "@/pages/components/layout/CommonLayout";
// // import CommonLayout from "../components/layout/CommonLayout";
// import LoadingComp from "@/pages/components/Loading";
// import { FiCopy } from "react-icons/fi"; // You can use react-icons for the copy symbol
// import { format } from 'date-fns';
// import useFetchCities from "@/pages/components/hooks/useFetchCities";
// import Image from "next/image";
// import Link from "next/link";
// const OnlineFarmHouses = () => {
//     // const [cities, setCities] = useState("");
//     const [loc, setLoc] = useState("Hyderabad");
//     const [bookingData, setBookingData] = useState("");
//     const [loadingC, setLoadingC] = useState(false);
//     const { cities, loading, error } = useFetchCities();


//     useEffect(() => {
//         if (typeof window !== "undefined") {
//             const storedUserPhone = localStorage.getItem("tboo_user_phone");
//             const storedUserAuthorization = localStorage.getItem(
//                 "tboo_" + storedUserPhone + "_token"
//             );
//             const storedUserDetails = localStorage.getItem(
//                 "tboo_" + storedUserPhone + "_details"
//             );
//         }
//         // Make API call
//         const fetchCitiesData = async () => {
//             setLoadingC(true);
//             const storedUserPhone = localStorage.getItem("tboo_user_phone");
//             try {
//                 const response = await fetch(
//                     `https://api.dozzy.com/admin/property-bookings?status=canceled&location=${loc}`,
//                     {
//                         method: "GET",
//                         headers: {
//                             Accept: "application/json",
//                             Authorization: localStorage.getItem(
//                                 "tboo_" + storedUserPhone + "_token"
//                             ),
//                         },
//                     }
//                 );

//                 if (!response.ok) {
//                     throw new Error("Failed to fetch data");
//                 }

//                 const data = await response.json();
//                 if (data.status === "success") {
//                     // setCities(data.cities);
//                     setBookingData(data);
//                     console.log(data, "data.results");
//                 } else {
//                     setError("Error: Unable to fetch data");
//                 }
//             } catch (error) {
//                 console.log(error.message);
//             } finally {
//                 setLoadingC(false);
//             }
//         };

//         fetchCitiesData();
//     }, [loc]); // Dependency on userAuthorization to ensure API call happens after loading user info
//     const converDate = (data) => {
//         const date = new Date(data);
//         // Format the date as '14th Sep 2024'
//         const formattedDate = format(date, "do,MMM yyyy");
//         console.log(formattedDate);
//         return formattedDate
//     }
//     return (
//         <div className="text-sm">
//             {<CommonLayout>
//                 <div>
//                     <p className=" pl-5 pt-4 text-lg text-black">Total Bookings -{bookingData?.count}</p>
//                     <div className="px-4">
//                         {/* // <p className="pl-5 pt-4 text-lg text-black">Total Bookings</p> */}
//                         <ul className="pl-4 pt-4 p-2 bg-[#f7f7f7] rounded-md flex gap-3 flex-wrap">
//                             {cities?.length &&
//                                 cities?.map((item, index) => (
//                                     <li
//                                         onClick={() => {
//                                             setLoc(item);
//                                         }}
//                                         className={`capitalize cursor-pointer text-black ${loc == item ? "text-blue-400" : ""}`}
//                                     >
//                                         {item}
//                                     </li>
//                                 ))}
//                                 { (loading) && <p>Loading...</p>};
//                                 {(error) && <p>{error}</p>};

//                         </ul>
//                         <div className="text-black pt-3 flex flex-col gap-3">
//                             {console.log(bookingData?.results, "bookingData?.results")}
//                             {(!loadingC) ?
//                                 bookingData?.results?.map((item, index) => (
//                                     <Link href={`/farmhouse/total-bookings/${item.property_id}`} key={item.id} className="bg-gray-200 p-3 flex flex-col lg:flex-row justify-between pr-8">
//                                         <div className="flex gap-6 bg-yellow-10 xl:w-[600px] lg:w-[500px]">
//                                             <Image
//                                                 src={`${item?.farmhouse_front_view_duplicate?.length ? item?.farmhouse_front_view_duplicate : item?.farmhouse_front_view?.length ? item?.farmhouse_front_view : ''}`}
//                                                 className="rounded-md w-36 h-36 object-cover"
//                                                 height={200}
//                                                 width={200}
//                                             />
//                                             <ul className="flex flex-col gap-2">
//                                                 <li className="font-bold capitalize">{item?.property_name}</li>
//                                                 <li>{item?.area_name || ''}</li>
//                                                 <li>Partner number -{item?.property_alternate_number}</li>
//                                                 <li>Watchman number -{item?.property_watch_man_number}</li>
//                                             </ul>
//                                         </div>
//                                         <div className="font-semibold">
//                                             <ul className="flex gap-4 pt-5 pb-2">
//                                                 <li> {converDate(item?.booking_start_date)}</li>
//                                                 <li className="border-b-2 border-b-black relative bottom-3 w-20 text-center"><span className="relative ">{Math.ceil(Number((item?.booking_hours) / 24))} {Math.ceil(Number((item?.booking_hours) / 24)) == 1 ? 'day' : 'days'} </span></li>
//                                                 {/* <li>{Number((item?.booking_hours)/24)}</li> */}
//                                                 <li>{converDate(item?.booking_end_date)}</li>
//                                                 {/* <li>Partner Price -{item?.booking_end_date}</li> */}
//                                                 <li>
//                                                 </li>
//                                             </ul>
//                                             {/* <Link className="underline pt-2" href={`/farmhouse/total-farmhouses/${item.property_id}`}>View more</Link> */}
//                                             <p>Assigned To : 8838392789</p>
//                                         </div>
//                                     </Link>
//                                 )) : <LoadingComp />}
//                             <p className="pt-10 pl-5 text-2xl text-red-500">{bookingData?.results < 1 && "Sorry No FarmHouses To Show"}</p>

//                         </div>
//                     </div>
//                 </div>
//             </CommonLayout>}
//         </div>
//     );
// };

// export default OnlineFarmHouses;
import React from 'react';

const ComponentName = (props) => {
  return (
    <div>
      
    </div>
  );
};

export default ComponentName;