import { useEffect, useState } from "react";
import CommonLayout from "@/pages/components/layout/CommonLayout";
// import CommonLayout from "../components/layout/CommonLayout";
import { FiCopy } from "react-icons/fi"; // You can use react-icons for the copy symbol
import Image from "next/image";
import Link from "next/link";
const OnlineFarmHouses = () => {
  const [cities, setCities] = useState("");
  const [loc, setLoc] = useState("Hyderabad");
  const [locData, setLocData] = useState("");

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
        // setLoading(false);
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
      const storedUserPhone = localStorage.getItem("tboo_user_phone");
      try {
        const response = await fetch(
          `https://staging.dozzy.com/admin/online-properties?location=${loc}`,

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
          setLocData(data?.results);
          // console.log(data.results, "data.results");
        } else {
          setError("Error: Unable to fetch data");
        }
      } catch (error) {
        console.log(error.message);
      } finally {
        // setLoading(false);
      }
    };

    fetchCitiesData();
  }, [loc]); // Dependency on userAuthorization to ensure API call happens after loading user info
  const [filteredPosts, setFilteredPosts] = useState([]);

  const [searchQuery, setSearchQuery] = useState('');
  useEffect(() => {
    if (searchQuery) {
      const filtered = locData.filter(post =>
        post.property_name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredPosts(filtered);
    } else {
      setFilteredPosts(locData);
    }
  }, [searchQuery, locData, loc]);
  return (
    <CommonLayout onSearch={setSearchQuery} placeholderText='search by farmhouse name / id'>
      <div className="px-4 text-sm">
        <p className="py-4 lg:py-10 pl-4 lg:text-3xl font-bold text-black">Online Farmhouses -{locData?.length}</p>
        <ul className="pl-4 pt-4 p-2 bg-[#f7f7f7] rounded-md flex gap-3 flex-wrap">
          {cities?.length &&
            cities?.map((item, index) => (
              <li
                onClick={() => {
                  setLoc(item);
                }}
                className={`cursor-pointer text-black ${loc == item ? "text-blue-400" : ""}`}
              >
                {item}
              </li>
            ))}
        </ul>
        <div className="text-black pt-3 flex flex-col gap-3">
          {filteredPosts?.length &&
            filteredPosts?.map((item, index) => (
              <div key={index} className="bg-gray-200 py-2 flex justify-between px-4">
                <div className="flex gap-6 bg-yellow-10 w-[600px]">
                  <Image
                    src={`${item?.farmhouse_front_view_duplicate?.length ? item?.farmhouse_front_view_duplicate : item?.farmhouse_front_view?.length ? item?.farmhouse_front_view : ''}`}
                    className="rounded-md w-28 h-28 object-cover"
                    height={200}
                    width={200}
                  />
                  <ul className="flex flex-col gap-2">
                    <li className="font-bold ">{item?.property_name}</li>
                    <li>{item?.area_name || ''}</li>
                    <li>Partner number : {item?.property_alternate_number}</li>
                    <li>Watchman number : {item?.property_watch_man_number}</li>
                  </ul>
                </div>
                <div className="bg-red-20 w-[177px]">
                  <ul className="flex flex-col gap-3">
                    <li>Owner Price : {item?.owner_morning_prices}</li>
                    <li>Customer Price : {item?.customer_morning_prices}</li>
                    <li>
                      <Link className="underline" href={`/farmhouse/online-farmhouses/${item.id}`}>View more</Link>
                    </li>
                  </ul>
                </div>
              </div>
            ))}
        </div>
      </div>
    </CommonLayout>
  );
};  

export default OnlineFarmHouses;
