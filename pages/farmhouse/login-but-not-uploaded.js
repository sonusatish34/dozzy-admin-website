import { useEffect, useState } from 'react';
import CommonLayout from '../components/layout/CommonLayout';
const LoginButNotUploaded = () => {
  const [loginData, setLoginData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const userPhone = '7989030741';
  const userAuthorization = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOiIxNzM0NjA0NjcyIiwidXNlcl9waG9uZSI6Ijc5ODkwMzA3NDEifQ.vjmA3MVcLU6IS6yliwJw5ulQ8V8U3hO5nCLNgLHeFOo";
  const userDetails = '{"id":120,"user_phone":"7989030741","role_id":3,"login_otp":0,"is_user_online":"yes","user_status":"active","razorpay_contact_id":null,"device_fcm_token":null,"user_managed_location":null,"created_on":"2024-08-29T04:41:15","updated_on":"2024-12-17T09:39:08"}';
  const parseDetails = JSON.parse(userDetails);

  useEffect(() => {
    // Make API call
    const fetchLoginData = async () => {
      try {
        const response = await fetch(`https://api.dozzy.com/admin/login-not-uploaded`, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            Authorization: userAuthorization,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const data = await response.json();
        if (data.status === 'success') {
          setLoginData(data.results);
        } else {
          setError('Error: Unable to fetch data');
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLoginData();
  }, []);
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    if (openIndex === index) {
      setOpenIndex(null); // Close if already open
    } else {
      setOpenIndex(index); // Open the clicked accordion item
    }
  };

  return (
    <CommonLayout>
      <div className="container mx-auto px-4 py-8">
      <div className="row">
      <div className="col-xl-12">
      <div className="rounded-lg shadow-lg p-4">
        <h4 className="text-xl font-semibold text-black">
          Login But Not Uploaded - <span>{loginData.length}</span>
        </h4>

        <div className="mt-4">
          <div className="space-y-2">
            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {!loading && !error && loginData.length > 0 ? (
              loginData.map((value, key) => {
                const isOpen = openIndex === key;

                return (
                  <div
                    key={key}
                    className={`bg-white shadow-md rounded-lg ${key === 0 ? 'rounded-tl-lg rounded-tr-lg' : ''}`}
                  >
                    <h2>
                      <button
                        onClick={() => toggleAccordion(key)}
                        className={`w-full text-left py-2 px-4 bg-gray-100 text-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 flex justify-between items-center`}
                      >
                        <div className="text-lg">{value.user_phone}</div>
                        <i className="ion ion-md-copy text-gray-600"></i>
                      </button>
                    </h2>

                    <div
                      className={`transition-all duration-300 ease-in-out ${isOpen ? 'max-h-screen' : 'max-h-0 overflow-hidden'} `}
                    >
                      <div className="p-4 text-gray-600">
                        Information
                      </div>
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



