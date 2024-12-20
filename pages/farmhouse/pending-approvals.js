import { useState, useEffect } from 'react';
import CommonLayout from '../components/layout/CommonLayout';

const PropertyDetails = ({ propertyId }) => {
  const [propertyDetails, setPropertyDetails] = useState(null);
  const [ammDetails, setAmmDetails] = useState(null);
  console.log(propertyDetails,"propertyDetails");
  console.log(ammDetails,"ammDetails");
  
  useEffect(() => {
    const fetchPropertyDetails = async () => {
      const userAuthorization = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOiIxNzM0NjA0NjcyIiwidXNlcl9waG9uZSI6Ijc5ODkwMzA3NDEifQ.vjmA3MVcLU6IS6yliwJw5ulQ8V8U3hO5nCLNgLHeFOo";
      
      try {
        const response = await fetch(`https://api.dozzy.com/admin/property-details?property_id=${atob(propertyId)}`, {
          method: 'GET',
          headers: { Accept: "application/json", Authorization: userAuthorization }
        });
        const data = await response.json();
        if (data.status === "success") {
          setPropertyDetails(data.results.property_data);
          setAmmDetails(data.results.amenities);

        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchPropertyDetails();
  }, [propertyId]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      {propertyDetails ? (
        <div className="flex gap-4">
          {/* Left Section: Image */}
          <div className="col-span-12 md:col-span-4">
            <img
              src="https://via.placeholder.com/300x200" // Replace with actual image source
              alt="Farmhouse"
              className="rounded-lg w-full object-cover"
            />
          </div>

          {/* Right Section: Details */}
          <div className="col-span-12 md:col-span-8 space-y-4">
            {/* <div>
              <h2 className="text-2xl font-semibold">{propertyDetails.property_name}</h2>
              <p className="text-gray-500">Farmhouse Sq. Yards: {propertyDetails.property_square_yards}</p>
            </div> */}

            <div>
              <h3 className="text-lg font-medium">Amenities</h3>
              <ul className="list-disc pl-5 text-gray-700 h-40 overflow-y-scroll">
                {ammDetails.map((item,index)=>(
                  <li className='capitalize'>{item.attribute_name}</li>
                ))}
                
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-medium">Games</h3>
              <ul className="list-disc pl-5 text-gray-700">
                <li>Chess</li>
                <li>Carrom</li>
              </ul>
            </div>

            {/* Price */}
            <div className="flex justify-between items-center bg-gray-100 p-3 rounded-md">
              <div>
                <span className="block text-gray-600">12000/ mon-fri</span>
                <span className="block text-gray-600">12000/ Sat - Sun</span>
              </div>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md">Approve</button>
            </div>
          </div>

          {/* Owner Info */}
          <div className="col-span-12 mt-4 bg-gray-50 p-4 rounded-md">
            <div className="flex items-center space-x-4">
              <img
                src="https://via.placeholder.com/50" // Replace with avatar
                alt="Owner"
                className="rounded-full w-12 h-12"
              />
              <div>
                <p className="text-gray-800 font-medium">Monkey D Luffy</p>
                <p className="text-sm text-gray-500">Partner Number: 9876543124</p>
                <p className="text-sm text-gray-500">Watchman: 9876543124</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading property details...</p>
      )}
    </div>
  );
};

const FarmHouseAccordion = () => {
  const [farmHouses, setFarmHouses] = useState([]);
  const [activePropertyId, setActivePropertyId] = useState(null);

  useEffect(() => {
    const fetchFarmHouses = async () => {
      const userAuthorization = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOiIxNzM0NjA0NjcyIiwidXNlcl9waG9uZSI6Ijc5ODkwMzA3NDEifQ.vjmA3MVcLU6IS6yliwJw5ulQ8V8U3hO5nCLNgLHeFOo";
      
      try {
        const response = await fetch(`https://api.dozzy.com/admin/pending-approvals?status=in_progress&program_id=1&approval_user_id=0`, {
          method: 'GET',
          headers: { Accept: "application/json", Authorization: userAuthorization }
        });
        const data = await response.json();
        if (data.status === "success") setFarmHouses(data.results);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchFarmHouses();
  }, []);

  return (
    <CommonLayout>
      <div className="container mx-auto py-6">
        <h1 className="text-3xl font-semibold mb-4">Pending Approvals</h1>
        <div className="space-y-4">
          {farmHouses.map((farmHouse) => (
            <div key={farmHouse.property_id} className="bg-white shadow-md rounded-md">
              <button
                className="w-full text-left p-4 bg-blue-500 text-white rounded-t-md focus:outline-none"
                onClick={() => setActivePropertyId(
                  activePropertyId === farmHouse.property_id ? null : farmHouse.property_id
                )}
              >
                {farmHouse.property_name} ({farmHouse.property_id})
              </button>
              {activePropertyId === farmHouse.property_id && (
                <PropertyDetails propertyId={btoa(farmHouse.property_id)} />
              )}
            </div>
          ))}
        </div>
      </div>
    </CommonLayout>
  );
};

export default FarmHouseAccordion;
