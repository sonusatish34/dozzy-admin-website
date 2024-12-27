import { useEffect, useState } from "react";
import CommonLayout from "@/pages/components/layout/CommonLayout";
// import CommonLayout from "../components/layout/CommonLayout";
import { FiCopy } from "react-icons/fi"; // You can use react-icons for the copy symbol
import Image from "next/image";
import Link from "next/link";
const OnlineFarmHouses = () => {
  const [cities, setCities] = useState("");
  const [loc, setLoc] = useState("Aler");
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
          console.log(data.results, "data.results");
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
  return (
    <CommonLayout>
      <div className="px-4">
        <p className="pl-5 pt-4 text-lg text-black">Online Farmhouses</p>
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
          {/* {cities?.forEach(element => {
            console.log(element,"----");
            
          })} */}
          {/* {locData?.length && locData?.map((item,index)=>(
            <p>{item?.area_name}</p>
          ))} */}

          {locData?.length &&
            locData?.map((item, index) => (
              <div key={index} className="bg-gray-200 p-3 flex justify-between pr-8">
                <div className="flex gap-3">
                  <Image
                    src={`${item?.farmhouse_front_view?.length ?item?.farmhouse_front_view:''}`}
                    className="rounded-md w-30 h-30"
                    height={100}
                    width={100}
                  />
                  <ul>
                    <li>{item?.property_name}</li>
                    <li>{item?.area_name}</li>

                    <li>Partner number -{item?.property_alternate_number}</li>
                    <li>Owner number -{item?.owner_phone}</li>
                  </ul>
                </div>
                <div>
                  <ul>
                    <li>Owner Price -{item?.owner_night_prices}</li>
                    <li>Partner Price -{item?.customer_morning_prices}</li>
                    <li>
                        <Link href={`/farmhouse/online-farmhouses/${item.id}`}>View more</Link> 
                        </li>
                  </ul>
                </div>
              </div>
            ))}
          {/* <div className="bg-gray-200 p-3 flex justify-between pr-8">
            <div className="flex gap-3">
              <Image
                src={"/pix.jpg"}
                className="rounded-md"
                height={100}
                width={100}
              />
              <ul>
                <li>{item?.property_name}</li>
                <li>{item?.area_name}</li>

                <li>Partner number -{item?.property_alternate_number}</li>
                <li>Owner number -{item?.owner_phone}</li>
              </ul>
            </div>
            <div>
              <ul>
                <li>Owner Price -{item?.owner_night_prices}</li>
                <li>Partner Price -{item?.customer_morning_prices}</li>
              </ul>
            </div>
          </div> */}
        </div>
      </div>
    </CommonLayout>
  );
};

export default OnlineFarmHouses;
