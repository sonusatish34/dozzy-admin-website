import { useEffect, useState } from "react";
import CommonLayout from "../components/layout/CommonLayout";
import { FiCopy } from "react-icons/fi"; // You can use react-icons for the copy symbol
import { IoIosArrowDown } from "react-icons/io";
import { useRouter } from "next/router";
const LoginButNotUploaded = () => {
  const [loginData, setLoginData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userPhone, setUserPhone] = useState(null);
  const [userAuthorization, setUserAuthorization] = useState(null);
  const [parseDetails, setParseDetails] = useState(null);
  const [count, setCount] = useState(null);
  const router = useRouter()
  useEffect(() => {
    // Check if localStorage is available
    if (typeof window !== "undefined") {
      const storedUserPhone = localStorage.getItem("tboo_user_phone");
      const storedUserAuthorization = localStorage.getItem(
        "tboo_" + storedUserPhone + "_token"
      );
      const storedUserDetails = localStorage.getItem(
        "tboo_" + storedUserPhone + "_details"
      );

      if (storedUserPhone && storedUserAuthorization && storedUserDetails) {
        setUserPhone(storedUserPhone);
        setUserAuthorization(storedUserAuthorization);
        setParseDetails(JSON.parse(storedUserDetails));
      }
      if (!storedUserAuthorization) {
        router.push('/')
      }
    }
  }, []);

  useEffect(() => {
    // Make API call
    const fetchLoginData = async () => {
      if (!userAuthorization) return; // Do nothing if there's no authorization

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_URL}/admin/login-not-uploaded`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              Authorization: userAuthorization,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        if (data.status === "success") {
          setLoginData(data.results);
        } else {
          setError("Error: Unable to fetch data");
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLoginData();
  }, [userAuthorization]); // Dependency on userAuthorization to ensure API call happens after loading user info

  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    if (openIndex === index) {
      setOpenIndex(null); // Close if already open
    } else {
      setOpenIndex(index); // Open the clicked accordion item
    }
  };

  const copyToClipboard = async (mobileNumber) => {
    console.log("Copying mobile number:", mobileNumber); // Debugging line
    try {
      await navigator.clipboard.writeText(mobileNumber);
      console.log("Copied to clipboard!"); // Success message
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };
  const [filteredPosts, setFilteredPosts] = useState([]);

  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (searchQuery) {
      const filtered = loginData.filter(post =>
        post.user_phone.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredPosts(filtered);
    } else {
      setFilteredPosts(loginData);
    }
  }, [searchQuery, loginData]);

  return (
    <CommonLayout onSearch={setSearchQuery} placeholderText='search by mobile number/ booking id'>
      <div className="container lg:px-4 lg:py-8">
        <div className="row">
          <div className="col-xl-12">
            <div className="rounded-lg p-4">
              <h4 className="text-xl font-semibold text-black">
                Login But Not Uploaded - <span>{loginData.length}</span>
              </h4>

              <div className="mt-4">
                <div className="space-y-4">
                  {loading && <p>Loading...</p>}
                  {error && <p className="text-red-500">{error}</p>}
                  {!loading && !error && loginData.length > 0 ? (
                    filteredPosts.map((value, key) => {
                      const isOpen = openIndex === key;

                      return (
                        <div
                          key={key}
                          className={`bg-white rounded-lg ${key === 0 ? "rounded-tl-lg rounded-tr-lg" : ""
                            }`}
                        >
                          <h2>
                            <button
                              onClick={() => toggleAccordion(key)}
                              className={`w-full text-left py-2 px-4 bg-gray-100 text-gray-800  focus:outline-none focus:ring-2 focus:ring-indigo-500 flex gap-3 justify-between items-center ${key==0?'rounded-t-3xl':''}`}
                            >
                              <div className="text-lg">
                                <p className="flex gap-3">
                                  {value.user_phone}{" "}
                                  <button
                                    onClick={() => {
                                      copyToClipboard(String(value.user_phone));
                                    }}
                                    className="text-[#556ee6]"
                                  >
                                    <FiCopy />
                                  </button>
                                </p>
                                <p>{value.user_status}{" "}</p>
                              </div>
                              <IoIosArrowDown
                                className={`font-bold ${isOpen ? "rotate-180" : ""
                                  } transition-all duration-300 ease-in-out`}
                                size={30}
                              />
                            </button>
                          </h2>
                          <div
                            className={`transition-all duration-300 ease-in-out ${isOpen
                              ? "max-h-screen"
                              : "max-h-0 overflow-hidden"
                              }`}
                          >
                            <div className="p-4 text-gray-600">Information</div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <p>No data found</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CommonLayout>
  );
};
export default LoginButNotUploaded;
