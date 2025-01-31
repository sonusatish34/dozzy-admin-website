import { useState, useEffect } from 'react'
import CommonLayout from '../components/layout/CommonLayout'
import Image from 'next/image'
import { IoIosArrowDown } from 'react-icons/io'
import { IoIosArrowBack } from 'react-icons/io'
import { IoIosArrowForward } from 'react-icons/io'
import { useRouter } from 'next/router'
import LoadingComp from '../components/Loading'
import swal from 'sweetalert';


const AmenitiesEditModal = ({ showAmenitiesEdit, setShowAmenitiesEdit, totalDetails, onUpdateAmm }) => {

  const [updatedAttributes, setUpdatedAttributes] = useState({});
  const [addedAttributes, setAddedAttributes] = useState({});
  const [newAmenity, setNewAmenity] = useState({ name: '', value: '' });
  const [newGame, setNewGame] = useState({ name: '', value: '' });
  const [updateSubmitData, setUpdateSubmitData] = useState(null);
  const [addSubmitdata, setAddSubmitdata] = useState(null);

  // console.log(updatedAttributes, "updatedAttributes");
  // console.log(addSubmitdata, "addSubmitdata");



  const [values, setValues] = useState({});
  const [gamesValues, setGamesvalues] = useState({});
  // console.log(values, "valuess");
  // console.log(gamesValues, "gamesbvalues");

  const handleDecrement = (index) => {
    setValues((prevValues) => {
      // Get the current value or fallback to attribute_value
      const currentValue = prevValues[index] ?? (totalDetails?.amenities[index]?.attribute_value || 0);
      // Ensure the value doesn't go below 0
      const newValue = Math.max(0, currentValue - 1);
      handleUpdateAttribute('amenities', index, newValue);
      return {
        ...prevValues,
        [index]: newValue,
      };
    });
  };

  const handleIncrement = (index) => {
    setValues((prevValues) => {
      // Get the current value or fallback to attribute_value
      const currentValue = prevValues[index] ?? (totalDetails?.amenities[index]?.attribute_value || 0);
      const newValue = Number(currentValue) + 1;
      handleUpdateAttribute('amenities', index, newValue);
      return {
        ...prevValues,
        [index]: newValue,
      };
    });
  };


  const handleDecrementGame = (index) => {
    setGamesvalues((prevValues) => {
      // Get the current value or fallback to attribute_value
      const currentValue = prevValues[index] ?? (totalDetails.games[index]?.attribute_value || 0);
      // Ensure the value doesn't go below 0
      const newValue = Math.max(0, currentValue - 1);
      handleUpdateAttribute('games', index, newValue);
      return {
        ...prevValues,
        [index]: newValue,
      };
    });
  };

  const handleIncrementGame = (index) => {
    setGamesvalues((prevValues) => {
      // Get the current value or fallback to attribute_value
      const currentValue = prevValues[index] ?? (totalDetails.games[index]?.attribute_value || 0);
      const newValue = Number(currentValue) + 1;
      handleUpdateAttribute('games', index, newValue);
      return {
        ...prevValues,
        [index]: newValue,
      };
    });
  };


  const handleUpdateAttribute = (type, index, value) => {
    setUpdatedAttributes((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        [index]: value,
      },
    }));
  };


  const handleAddNew = async (type, name, value, pid) => {
    if (type === 'amenity') {
      // Add new Amenity to the totalDetails

      totalDetails?.amenities?.push({ property_id: pid, attribute_name: name, attribute_value: value, attribute_type: "string" });

      // Send the new Amenity to the API (assuming a different API endpoint)
      const newAmenityData = {
        attribute_name: name,
        attribute_value: value,
      };
      // await addNewAmenity(newAmenityData);
    } else if (type === 'games') {
      // Add new Game to the totalDetails
      // totalDetails.games.push({ attribute_name: `game_${name}`, attribute_value: value });
      totalDetails?.games?.push({ property_id: pid, attribute_name: `game_${name}`, attribute_value: value, attribute_type: "string" });
      // Send the new Game to the API (assuming a different API endpoint)
      const newGameData = {
        attribute_name: name,
        attribute_value: value,
      };
      // await addNewGame(newGameData);
    }

    // Reset input fields after adding
    setNewAmenity({ name: '', value: '' });
    setNewGame({ name: '', value: '' });
  };


  useEffect(() => {
    const UpdateAttributes = async () => {
      const storedUserPhone = localStorage.getItem("tboo_user_phone");
      const auth = localStorage.getItem("tboo_" + storedUserPhone + "_token");
      const myHeaders = new Headers();
      myHeaders.append("accept", "application/json");
      myHeaders.append("Authorization", auth);
      myHeaders.append("Content-Type", "application/json");
      const raw = JSON.stringify(updateSubmitData);

      const requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      const response = await fetch(`https://staging.dozzy.com/admin/update-amenity`, requestOptions);
      const data = await response.json();
      // Handle API respons
      // console.log(data, "uodpate success");
      if (data?.status == 'success') {
        onUpdateAmm();
        swal({
          title: `${data?.status}`,
          text: `${data?.message}`,
          timer: 2000,
          icon: "success",
          buttons: false,
        })
      }

    };

    if (updateSubmitData?.length >= 1) {
      UpdateAttributes();
    }
    const AddAttributes = async () => {
      const storedUserPhone = localStorage.getItem("tboo_user_phone");
      const auth = localStorage.getItem("tboo_" + storedUserPhone + "_token");
      const myHeaders = new Headers();
      myHeaders.append("accept", "application/json");
      myHeaders.append("Authorization", auth);
      myHeaders.append("Content-Type", "application/json");
      const raw = JSON.stringify(addSubmitdata);

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      const response = await fetch(`https://staging.dozzy.com/admin/add-attribute`, requestOptions);
      const data = await response.json();

      // Handle API response
    };

    if (addSubmitdata?.length >= 1) {
      AddAttributes();
    }

  }, [addSubmitdata, updateSubmitData]);
  // console.log(updatedAttributes,"=======updatedAttributes===");

  const handleSubmit = () => {
    const updatedData = [];

    Object.keys(updatedAttributes).forEach((type) => {
      Object.entries(updatedAttributes[type]).forEach(([index, value]) => {
        const item = totalDetails[type][index];
        updatedData.push({
          attribute_id: String(item.attribute_id) || null,
          attribute_value: String(value),
        });
      });
    });

    // console.log(updatedData,"updatedData");

    if (updatedData?.length >= 1) {
      setUpdateSubmitData(updatedData);
    }
    const joinedArray = [...totalDetails?.amenities.filter(item => item.attribute_id == null), ...totalDetails.games.filter(item => item.attribute_id == null)];

    // const AddAttribues = totalDetails?.games.filter(item => item.attribute_id == null)
    if (joinedArray?.length >= 1) {
      setAddSubmitdata(joinedArray)
    }
    // console.log(rr,"rr");

  };

  return (
    showAmenitiesEdit && (
      <div>
        <div className='text-black fixed inset-0 bg-black bg-opacity-50 z-50 backdrop-blur-sm h-full pt-10'>
          <div className='flex justify-center items-center'>
            <div className='bg-white h-[600px] transition-all duration-300 ease-in-out p-8 rounded-lg shadow-x w-fit'>
              <button
                onClick={() => setShowAmenitiesEdit(false)}
                className='bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 transition'
              >
                Close
              </button>
              <h2 className='text-2xl font-bold mb-4 pt-4'>Edit Amenities & Games</h2>
              <div className='flex flex-col lg:flex-row gap-6 bg-white rounded-md p-1'>
                <ul className='custom-scrollbar flex flex-col gap-2 pr-3 pt-4 text-gray-900 h-60 overflow-y-scroll'>
                  {totalDetails?.amenities.map((item, index) => {
                    const itemValue = values[index] !== undefined ? values[index] : (totalDetails?.amenities[index]?.attribute_value || 0);

                    return (
                      <li key={index} className='capitalize flex justify-between items-center'>
                        {`${item?.attribute_name.replace('no_of_', '').replace('_', ' ')}`}
                        <div className='flex gap-1 items-center'>
                          <button
                            type='button'
                            className='text-2xl border-black border-2 text-black rounded-full h-10 w-10'
                            onClick={() => handleDecrement(index)} // Decrement
                          >
                            -
                          </button>
                          <input
                            type='number'
                            className='border text-center w-12 px-2'
                            value={itemValue}
                            onChange={(e) => {
                              const newValue = parseInt(e.target.value, 10) || 0;
                              setValues((prevValues) => {
                                const updatedValues = { ...prevValues, [index]: newValue };
                                handleUpdateAttribute('amenities', index, newValue);
                                return updatedValues;
                              });
                            }}
                          />
                          <button
                            type='button'
                            className='text-2xl border-black border-2 text-black rounded-full h-10 w-10'
                            onClick={() => handleIncrement(index)} // Increment
                          >
                            +
                          </button>
                        </div>
                      </li>
                    );
                  })}
                </ul>

                {/* <ul className='pl-5 text-gray-700 p-1'>
                  <p className='font-bold py-1'>Games</p>
                  {totalDetails.games.map((item, index) => (
                    <li key={index} className='capitalize flex justify-between items-center'>
                      {item?.attribute_name.replace('no_of_', '')}
                      <input
                        type='number'
                        className='border rounded px-2'
                        defaultValue={item.attribute_value}
                        onChange={(e) => handleUpdateAttribute('games', index, e.target.value)}
                      />
                    </li>
                  ))}
                  {totalDetails?.games.length<1 && <p>No games available</p>}
                </ul> */}
                <ul className='custom-scrollbar flex flex-col  gap-2 pr-3 pt-4 text-gray-900 h-60 overflow-y-scroll'>
                  <p className='font-bold text-2xl'>Games</p>
                  {totalDetails.games.map((item, index) => {
                    const itemValue = gamesValues[index] !== undefined ? gamesValues[index] : (totalDetails.games[index]?.attribute_value || 0);

                    return (
                      <li key={index} className='capitalize flex justify-between items-center'>
                        {`${item?.attribute_name.replace('no_of_', '').replace('_', ' ')}`}
                        <div className='flex gap-1 items-center pl-2'>
                          <button
                            type='button'
                            className='text-2xl border-black border-2 text-black rounded-full h-10 w-10'
                            onClick={() => handleDecrementGame(index)} // Pass the index to handleDecrement
                          >
                            -
                          </button>
                          <input
                            type='number'
                            className='border text-center w-12 px-2'
                            value={itemValue}
                            onChange={(e) => {
                              const newValue = parseInt(e.target.value) || 0;
                              setGamesvalues((prevValues) => {
                                const updatedValues = { ...prevValues, [index]: newValue };
                                handleUpdateAttribute('games', index, newValue);
                                return updatedValues;
                              });
                            }}
                          />
                          <button
                            type='button'
                            className='text-2xl border-black border-2 text-black rounded-full h-10 w-10'
                            onClick={() => handleIncrementGame(index)} // Pass the index to handleIncrement
                          >
                            +
                          </button>
                        </div>

                      </li>
                    );
                  })}
                </ul>
              </div>

              <div className='mt-4'>
                <h3 className='font-bold'>Add New Amenity</h3>
                <input
                  type='text'
                  placeholder='Name'
                  value={newAmenity.name}
                  onChange={(e) => setNewAmenity({ ...newAmenity, name: e.target.value })}
                  className='border rounded px-2 mr-2'
                />
                <input
                  type='number'
                  placeholder='Value'
                  value={newAmenity.value}
                  onChange={(e) => setNewAmenity({ ...newAmenity, value: e.target.value })}
                  className='border rounded px-2 mr-2'
                />
                <button
                  onClick={() => handleAddNew('amenity', newAmenity.name, newAmenity.value, totalDetails?.property_data?.property_id)}
                  className='bg-green-500 text-white py-1 px-3 rounded hover:bg-green-600 transition'
                >
                  Add
                </button>
              </div>

              <div className='mt-4'>
                <h3 className='font-bold'>Add New Game</h3>
                <input
                  type='text'
                  placeholder='Name'
                  value={newGame.name}
                  onChange={(e) => setNewGame({ ...newGame, name: e.target.value })}
                  className='border rounded px-2 mr-2'
                />
                <input
                  type='number'
                  placeholder='Value'
                  value={newGame.value}
                  onChange={(e) => setNewGame({ ...newGame, value: e.target.value })}
                  className='border rounded px-2 mr-2'
                />
                {/* <button
                  onClick={() => handleAddNew('games', newGame.name, newGame.value)}
                  className='bg-green-500 text-white py-1 px-3 rounded hover:bg-green-600 transition'
                > */}
                <button
                  onClick={() => handleAddNew('games', newGame.name, newGame.value, totalDetails?.property_data?.property_id)}
                  className='bg-green-500 text-white py-1 px-3 rounded hover:bg-green-600 transition'
                >
                  Add
                </button>
              </div>

              <button
                onClick={handleSubmit}
                className='bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition mt-4'
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};





const PropertyDetails = ({ propertyId, onUpdate }) => {
  const [propertyDetails, setPropertyDetails] = useState(null)
  const [ammDetails, setAmmDetails] = useState(null)
  const [totalDetails, setTotalDetails] = useState(null)
  const [showProof, setShowProof] = useState(null)
  const [showAmenitiesEdit, setShowAmenitiesEdit] = useState(null)
  const [showReject, setshowReject] = useState(null)
  const [rejectReason, setRejectReason] = useState('')
  const [farmHStatus, setFarmHStatus] = useState(null)
  const [rpAm, setRpAm] = useState(1)
  const router = useRouter('')

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      const userPhone = localStorage.getItem(
        'tboo_user_phone')

      const userAuthorization = localStorage.getItem(
        'tboo_' + userPhone + '_token'
      )

      try {
        const response = await fetch(
          `https://staging.dozzy.com/admin/property-details?property_id=${propertyId}`,
          {
            // const response = await fetch(`https://staging.dozzy.com/admin/property-details?property_id=&approval_user_id=0`, {

            method: 'GET',
            headers: {
              Accept: 'application/json',
              Authorization: userAuthorization
            }
          }
        )
        const data = await response.json()
        if (data.status === 'success') {
          setPropertyDetails(data.results.property_data)
          setTotalDetails(data.results)
          setAmmDetails(data.results.amenities)
        }
      } catch (error) {
        console.error('Error:', error)
      }
    }
    fetchPropertyDetails()
    console.log("in our page")
  }, [propertyId, rpAm])
  // console.log(totalDetails?.amenities,"yyyytttt");
  const [currentIndex, setCurrentIndex] = useState(0)
  const images = totalDetails?.property_images

  // Next image function
  const goToNext = () => {
    setCurrentIndex(prevIndex => (prevIndex + 1) % images.length)
  }

  // Previous image function
  const goToPrevious = () => {
    setCurrentIndex(
      prevIndex => (prevIndex - 1 + images.length) % images.length
    )
  }

  useEffect(() => {
    if (propertyDetails) {
      setFormData(prevFormData => ({
        ...prevFormData,
        property_id: propertyDetails.property_id // Update property_id when propertyDetails changes
      }))
    }
  }, [propertyDetails]) // Only run this when propertyDetails changes

  const [formData, setFormData] = useState({
    property_id: propertyDetails?.property_id,
    status: 'in_progress',
    property_rejected_reason: rejectReason,
    property_price: '0',
    property_weekend_price: '0',
    customer_morning_prices: '0',
    customer_night_prices: '0',
    owner_weekday_prices: '0',
    owner_weekend_prices: '0',
    owner_morning_prices: '0',
    owner_night_prices: '0'
  })
  // console.log(JSON.stringify(formData), "---JSON.stringify(formData)---");
  console.log(formData, "-----formData------");

  const handleChange = e => {

    const { name, value } = e.target

    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }))
  }

  useEffect(() => {
    if (farmHStatus) {
      const RejectFHOUSE = async () => {
        var userPhone = localStorage.getItem('tboo_user_phone')
        var userAuthorization = localStorage.getItem(
          'tboo_' + userPhone + '_token'
        )
        const myHeaders = new Headers()
        myHeaders.append('accept', 'application/json')
        myHeaders.append('Authorization', userAuthorization)
        myHeaders.append('Content-Type', 'application/json')

        const raw = JSON.stringify(formData)

        const requestOptions = {
          method: 'PUT',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        }

        try {
          const response = await fetch(
            'https://staging.dozzy.com/admin/update-property-status',
            requestOptions
          )
          const data = await response.json()
          if (data.status == 'success') {
            swal({
              title: `${farmHStatus} Succcesfully`,
              text: "Succcesfully",
              timer: 2000,
              icon: "success",
              buttons: false,
            });
            setshowReject(false)
            // router.reload()
          }

        } catch (error) {
          console.error('Error:', error)
        }

      }
      RejectFHOUSE()
      onUpdate()
    }
  }, [farmHStatus, formData])
  const [uploadImage, setUploadImage] = useState(false)

  const reuploadFile = async (event, attributeId) => {

    // Ensure a file is selected
    const file = event.target.files[0]; // Get the first file from the input
    if (!file) {
      console.error("No file selected.");
      return;
    }

    const reader = new FileReader();
    reader.onload = async function () {

      const base64String = reader.result.split(",")[1]; // Extract base64 string from the Data URL

      const formData = { attribute_id: attributeId, file_data: base64String };
      const userPhone = localStorage.getItem('tboo_user_phone');
      const userAuthorization = localStorage.getItem("tboo_" + userPhone + "_token");

      const myHeaders = new Headers();
      myHeaders.append("accept", "application/json");
      myHeaders.append("Authorization", userAuthorization);
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify(formData);

      const requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      try {
        const response = await fetch(`https://staging.dozzy.com/admin/update-attribute-image`, requestOptions);

        if (response.ok) {
          const data = await response.json();
          // console.log(data, "data");
          setRpAm(rpAm + 1)
          swal({
            title: "Image Uploaded Successfully",
            text: "",
            timer: 2000,
            icon: "success",
            buttons: false,
          });
        } else {
          swal({
            title: "Upload Failed",
            text: "Something went wrong. Please try again.",
            icon: "error",
            buttons: true,
          });
        }
      } catch (error) {
        console.error("Error uploading file:", error);
        swal({
          title: "Upload Failed",
          text: "An error occurred. Please try again.",
          icon: "error",
          buttons: true,
        });
      }
    };

    // Trigger the file read
    reader.readAsDataURL(file);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [refreshlist, setRefreshlist] = useState('');

  // Function to open modal and set the image
  const openModal = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage('');
  };
  const handleUpdateFHEDetails = () => {
    // fetchFarmhouses();
    setRpAm(rpAm + 1);
  };
  // console.log(formData, "formData");

  return (
    <div className='text-xs xl:text-base text-black'>
      {propertyDetails ? (
        <div className='bg-[#f5f5f5] p-4'>
          <div className='flex lg:flex-row flex-col gap-4 xl:gap-6'>
            <div className=''>
              <div className='z-10 xl:w-[320px] xl:h-[310px] w-full h-[200px]'>
                {/* Image */}
                <Image
                  src={images[currentIndex]?.attribute_value}
                  alt='Farmhouse'
                  className='z-10 rounded-t-2xl object-cover xl:w-[320px] xl:h-[230px] w-full h-[200px]'
                  width={300}
                  height={200}
                  onClick={() => openModal(images[currentIndex]?.attribute_value)} // Open modal on click
                />
                <button
                  onClick={goToPrevious}
                  className='relative z-20 left-2 xl:left-2 bottom-28 *: text-white bg-black bg-opacity-40 p-2 rounded-full shadow-lg'
                >
                  <IoIosArrowBack size={20} />
                </button>

                {/* Right arrow */}
                <button
                  onClick={goToNext}
                  className='relative z-20 left-32 lg:left-48  xl:left-60 bottom-28 text-white bg-black bg-opacity-40 p-2 rounded-full shadow-lg'
                >
                  <IoIosArrowForward size={20} />
                </button>
                {/* Left arrow */}
                <div className='flex gap-2 justify-between pt-1 lg:text-sm'>
                  <p className='text-black  capitalize bg-red- h-16 w-44 break-words'>
                    {images[currentIndex]?.attribute_name.replaceAll('_', ' ')}
                  </p>
                  <div>
                    <button onClick={() => { setUploadImage(true) }} className='underline mb-2'>Reupload Image</button>
                    {uploadImage && <input
                      id={`file_input_${images[currentIndex]?.attribute_id}`}
                      type="file"
                      onChange={(event) => reuploadFile(event, images[currentIndex]?.attribute_id)} // Pass event and dynamic attributeId
                    />}
                  </div>
                </div>
              </div>


              {/* <p className="bg-red-500 text-blue-300 p-3">{images[currentIndex].attribute_status}</p> */}
            </div>
            {/* Modal (Dialog Box) */}
            {isModalOpen && (
              <div className="absolute inset-0 z-50 flex items-center bg-black bg-opacity-50">
                <div className="bg-white p-4 rounded-xl w-fit relative bottom-1 left-[27rem]">
                  <button
                    onClick={closeModal}
                    className="absolute top-4 right-4 text-white bg-red-700 h-10 w-10 rounded-full p-2"
                  >
                    x
                  </button>
                  <img
                    src={selectedImage}
                    alt="Large view"
                    className="w-[500px] h-[500px] object-contain rounded-xl"
                  />
                </div>
              </div>
            )}
            <div className='pt-16 lg:pt-2'>
              <div>
                <div className='flex flex-col text-black gap-2 items-start'>
                  <p className='text-lg text-black font flex justify-between w-full pt-'>

                    <span>Amenities</span><span><button
                      onClick={() => {
                        setShowAmenitiesEdit(true)
                      }}
                      className='underline'
                    >
                      Edit
                    </button></span>
                  </p>

                  <div className="flex flex-col lg:flex-row bg-white rounded-md p-1 h-40 overflow-y-scroll">
                    <ul className=' pl-5 pt-4 text-gray-900 '>
                      {totalDetails?.amenities.map((item, index) => (
                        <li key={index} className='capitalize'>
                          {item.attribute_value > 0 ? `${item.attribute_value} - ${item?.attribute_name.replace('no_of_', '').replace('_', ' ')} ` : ''}
                        </li>
                      ))}
                    </ul>
                    <ul className='pl-5 text-gray-700 p-1'>
                      <p className='font-bold py-1'>Games</p>
                      {totalDetails.games.map((item, index) => (
                        <li key={index} className='capitalize'>
                          {item.attribute_value > 0 ? `${item.attribute_value} - ${item?.attribute_name.replace('Game', '').replace('_', ' ')} ` : ''}
                        </li>
                      ))}
                      {totalDetails?.games.length < 1 && <p className='text-red-400'>NA</p>}
                    </ul>
                  </div>

                  <button
                    onClick={() => {
                      setShowProof(true)
                    }}
                    className='bg-white w-full px-3 py-2 text-black rounded-md'
                  >
                    View Proofs


                  </button>
                  {/* <button onClick={onUpdate}>Update Farmhouse List</button> */}

                  <button className='bg-white w-full px-3 py-2 text-black rounded-md'>
                    Farmhouse Sq. Yards{' '}
                    {totalDetails.property_data.property_square_yards}
                  </button>
                  {/* <button ></button> */}
                </div>
                {showProof && (
                  <div>
                    <div className='text-black fixed inset-0 bg-black bg-opacity-50 z-50 backdrop-blur-sm h-'>
                      <div className='flex justify-center items-center '>
                        <div className='bg-white absolute top-10 h-[600px] transition-all duration-300 ease-in-out p-8 rounded-lg shadow-xl max-w-sm w-full'>
                          <button
                            onClick={() => {
                              setShowProof(false)
                            }}
                            className='bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition'
                          >
                            Close
                          </button>
                          <h2 className='text-2xl font-bold mb-4'>
                            Current Bill
                          </h2>
                          <img
                            src={
                              totalDetails.owner_profile[0]
                                .electricity_bill_image
                            }
                            height={1000}
                            width={1000}
                            alt='dozzy farmhouse logo'
                            className='w-72 h-72 object-contain'
                          />
                          <h2 className='text-2xl font-bold mb-4 pt-4'>
                            Aadhar
                          </h2>
                          <Image
                            src={totalDetails?.owner_profile[0]?.aadhar_image_url}
                            height={1000}
                            width={1000}
                            alt='dozzy farmhouse logo'
                            className='w-40 h-20 object-contain'
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {showAmenitiesEdit && (
                  <AmenitiesEditModal showAmenitiesEdit={showAmenitiesEdit} setShowAmenitiesEdit={setShowAmenitiesEdit} totalDetails={totalDetails} onUpdateAmm={handleUpdateFHEDetails} />
                )}
              </div>
            </div>

            <div className=''>
              <p className='text-black font-bold pb-2'>Farm House Location</p>
              <div className='flex flex-col items-center space-x-4 bg-white p-2 rounded-md h-fit'>
                <div>
                  <p className='text-black font-medium lg:w-32 xl:w-56 p-1 '>
                    {totalDetails.property_data.geo_location}
                  </p>
                </div>
              </div>
            </div>
            <div className=''>
              <p className='font-bold text-black pb-3'>Owner Profile</p>
              <div >
                <div className='flex flex-col gap-y-1 bg-white p-2 rounded-md h-fit'>

                  <p className=' text-gray-500'>
                    Partner Number: {totalDetails.property_data.owner_number}
                  </p>
                  <p className=' text-gray-500'>
                    Alternate Number: {totalDetails.property_data.property_alternate_number}
                  </p>
                  <p className=' text-gray-500'>
                    Watchman Number: {totalDetails.property_data.property_watch_man_number}
                  </p>

                </div>
              </div>
            </div>
          </div>
          <div className='flex lg:flex-row flex-col  gap-14 pt-9'>
            <div className=' '>

              <p className='font-bold text-black pb-4'>Approved By</p>
              <div className='flex bg-white items-center p-2'>

                <div className=' p-4 rounded-md'>

                  <p className=' text-gray-500'>
                    {totalDetails.property_data.approval_team_user_phone ? totalDetails.property_data.approval_team_user_phone : <span className='text-red-600'>Not yet assigned</span>}
                  </p>
                </div>
              </div>

            </div>
            <div className='flex gap-2 '>
              <div className='flex flex-col item space-x-4'>
                <p className='font-bold text-black text-'>Owner Prices</p>
                <div className='flex gap-2 text-black pt-5'>
                  {/* <input type="text" value={'1000'}></input> */}
                  <div>
                    <p className='p-1 bg-white rounded'>
                      <input
                        value={formData.owner_weekday_prices}
                        onChange={handleChange}
                        className='border-2 w-12'
                        name='owner_weekday_prices'
                      />
                      { } Mon-Fri
                    </p>
                    <p className='p-1 bg-white rounded'>
                      <input
                        value={formData.owner_morning_prices}
                        onChange={handleChange}
                        className='border-2 w-12'
                        name='owner_morning_prices'
                      />{' '}
                      Morning
                    </p>
                  </div>
                  <div>
                    <p className='p-1 bg-white rounded'>
                      <input
                        value={formData.owner_weekend_prices}
                        onChange={handleChange}
                        className='border-2 w-12'
                        name='owner_weekend_prices'
                      />
                      { } Fri-Sun
                    </p>
                    <p className='p-1 bg-white rounded'>
                      <input
                        value={formData.owner_night_prices}
                        onChange={handleChange}
                        className='border-2 w-12'
                        name='owner_night_prices'
                      />{' '}
                      Night
                    </p>
                  </div>
                </div>
              </div>
              <div className='flex flex-col item space-x-4'>
                <p className='font-bold text-black text-'>Customer Prices</p>
                <div className='flex gap-2 text-black pt-5'>
                  {/* <input type="text" value={'1000'}></input> */}
                  <div>
                    <p className='p-1 bg-white rounded'>
                      <input
                        value={formData.property_price}
                        onChange={handleChange}
                        className='border-2 w-12'
                        name='property_price'
                      />
                      { } Mon-Fri
                    </p>
                    <p className='p-1 bg-white rounded'>
                      <input
                        value={formData.customer_morning_prices}
                        onChange={handleChange}
                        className='border-2 w-12'
                        name='customer_morning_prices'
                      />{' '}
                      Morning
                    </p>
                  </div>
                  <div>
                    <p className='p-1 bg-white rounded'>
                      <input
                        value={formData.property_weekend_price}
                        onChange={handleChange}
                        className='border-2 w-12'
                        name='property_weekend_price'
                      />
                      { } Fri-Sun
                    </p>
                    <p className='p-1 bg-white rounded'>
                      <input
                        value={formData.customer_night_prices}
                        onChange={handleChange}
                        className='border-2 w-12'
                        name='customer_night_prices'
                      />{' '}
                      Night
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className='flex gap-4 xl:gap-8'>
              <button
                onClick={() => {
                  setshowReject(true)
                }}
                className='p-4 bg-red-500 flex justify-center items-center lg:h-12 lg:w-36 h-8 w-20 rounded-md text-white'
              >
                Reject
              </button>
              {showReject && (
                <div>
                  <div className='text-black fixed inset-0 bg-black bg-opacity-50 z-50 backdrop-blur-sm h-'>
                    <div className='flex justify-center items-center '>
                      <div className='bg-white h-[600px] transition-all duration-300 ease-in-out p-8 rounded-lg shadow-xl max-w-sm w-full relative top-10'>
                        <button
                          onClick={() => {
                            setshowReject(false)
                          }}
                          className='bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition'
                        >
                          Close
                        </button>
                        <h2 className='text-2xl font-bold mb-4 pt-4'>
                          Reason For Blocking
                        </h2>
                        <textarea
                          value={formData.property_rejected_reason}
                          name='property_rejected_reason'
                          onChange={handleChange}
                          className='border- bg-[#f5f5f5] h-56 w-full'
                        >
                          {' '}
                        </textarea>
                        <button
                          onClick={() => {
                            // setRejectFm(true);
                            setFormData(prevFormData => ({
                              ...prevFormData,
                              status: 'rejected'
                            }))
                            setFarmHStatus('rejected')
                          }}
                          className='bg-green-500 text-black py-2 px-4 rounded-md transition'
                        >
                          Proceed
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <button
                onClick={() => {
                  swal({
                    title: "Are you sure?",
                    text: "You are about to approve this item.",
                    icon: "warning",
                    buttons: ["No, cancel", "Yes, approve it!"],
                    dangerMode: true,
                  }).then((willApprove) => {
                    if (willApprove && formData?.owner_morning_prices > 0 && formData?.owner_night_prices > 0 && formData?.owner_weekday_prices > 0 && formData?.owner_weekend_prices > 0 && formData?.customer_morning_prices > 0 && formData?.customer_night_prices > 0 && formData?.property_price > 0 && formData?.property_weekend_price > 0) {
                      // If the user clicks "Yes, approve it!", update the status
                      setFormData(prevFormData => ({
                        ...prevFormData,
                        status: 'approved'
                      }));
                      setFarmHStatus('approved');

                      swal("Approved!", "The item has been approved.", "success").then(() => {
                        onUpdate(); // Call onUpdate after approval
                      });
                    } else {
                      swal("Warning !", "Please fill all the prices fields.", "info");
                    }
                  });
                }}
                className="p-4 bg-[#556EE6] flex justify-center items-center lg:h-12 lg:w-36 h-8 w-20 rounded-md text-white"
              >
                Approve
              </button>


              {/* <button>Approve</button> */}
            </div>
          </div>
        </div>
      ) : (
        // <p>Loading property details...</p>
        <div className=''><LoadingComp /></div>
      )}
    </div>
  )
}

const FarmHouseAccordion = () => {
  const [farmHouses, setFarmHouses] = useState([])
  const [activePropertyId, setActivePropertyId] = useState(null)
  const [rp, setRp] = useState(1);

  useEffect(() => {
    const fetchFarmHouses = async () => {
      const userPhone = localStorage.getItem(
        'tboo_user_phone')
      const userAuthorization = localStorage.getItem(
        'tboo_' + userPhone + '_token'
      )
      const userType = localStorage.getItem(
        'tboo_' + userPhone + '_roleid'
      )

      var userDetails = window.localStorage.getItem('tboo_' + userPhone + "_details");
      var parseDetails = JSON.parse(userDetails);
      var appUserId = parseDetails['id'];

      try {
        const response = await fetch(
          `https://staging.dozzy.com/admin/pending-approvals?status=in_progress&program_id=1&approval_user_id=${userType == '3' ? '0' : appUserId}`,
          {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              Authorization: userAuthorization
            }
          }
        )
        const data = await response.json()
        if (data.status === 'success') setFarmHouses(data.results)
      } catch (error) {
        console.error('Error:', error)
      }
    }
    fetchFarmHouses()
  }, [rp])
  const [filteredPosts, setFilteredPosts] = useState([]);

  const [searchQuery, setSearchQuery] = useState('');
  useEffect(() => {
    if (searchQuery) {
      const filtered = farmHouses.filter(post =>
        post.property_name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredPosts(filtered);
    } else {
      setFilteredPosts(farmHouses);
    }
  }, [searchQuery, farmHouses, rp]);

  const handleUpdateFarmhouseList = () => {
    // fetchFarmhouses();
    console.log("into updating rp +1 ");

    setRp(rp + 1);
  };
  // console.log(rp, "refrsh page");

  return (
    <CommonLayout onSearch={setSearchQuery} placeholderText='search by farmhouse name / id'>
      <div className=' py-2 px-4 pt-10'>
        <h1 className='lg:text-3xl text-2xl pl-5 font-semibold mb-4 text-black'>
          Pending Approvals
        </h1>
        <div className='space-y-4'>
          {filteredPosts.map(farmHouse => (
            <div key={farmHouse.property_id} className='bg-white rounded-md'>
              <button
                className='w-full text-left text-gray-700 capitalize p-4 border-b-2 border-b-gray-200  rounded-t-md focus:outline-none flex justify-between'
                onClick={() =>
                  setActivePropertyId(activePropertyId === farmHouse.property_id ? null : farmHouse.property_id)
                }
              >
                <span>
                  {farmHouse.property_name.replaceAll('_', ' ')}
                </span>
                <span>
                  <IoIosArrowDown
                    className={`${activePropertyId === farmHouse.property_id
                      ? 'rotate-180'
                      : ''
                      } transition-all duration-300 ease-in-out`}
                    size={20}
                  />
                </span>
              </button>
              {activePropertyId === farmHouse.property_id && (
                <PropertyDetails propertyId={farmHouse.property_id} onUpdate={handleUpdateFarmhouseList} />
              )}
            </div>
          ))}
        </div>
      </div>
    </CommonLayout>
  )
}

export default FarmHouseAccordion
