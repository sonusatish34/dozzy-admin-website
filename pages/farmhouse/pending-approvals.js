import { useState, useEffect } from 'react'
import CommonLayout from '../components/layout/CommonLayout'
import Image from 'next/image'
import swal from 'sweetalert'
import { IoIosArrowDown } from 'react-icons/io'
import { IoIosArrowBack } from 'react-icons/io'
import { IoIosArrowForward } from 'react-icons/io'
import { useRouter } from 'next/router'
const PropertyDetails = ({ propertyId }) => {
  const [propertyDetails, setPropertyDetails] = useState(null)
  const [ammDetails, setAmmDetails] = useState(null)
  const [totalDetails, setTotalDetails] = useState(null)
  const [showProof, setShowProof] = useState(null)
  const [showReject, setshowReject] = useState(null)
  const [rejectReason, setRejectReason] = useState('')
  const [farmHStatus, setFarmHStatus] = useState(null)
  const router = useRouter('')
  // const [propertyStatus, setPropertyStatus] = useState("in_progress");
  // console.log(propertyDetails, "propertyDetails");
  // console.log(ammDetails, "ammDetails");
  // https://staging.dozzy.com/admin/pending-approvals?status=in_progress&program_id=1&approval_user_id=0
  useEffect(() => {
    const fetchPropertyDetails = async () => {
      const userPhone = '7989030741'

      var userAuthorization = localStorage.getItem(
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
  }, [propertyId])
  // console.log(totalDetails.amenities,"yyyytttt");
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
    property_price: '110',
    property_weekend_price: '110',
    customer_morning_prices: '110',
    customer_night_prices: '110',
    owner_weekday_prices: '110',
    owner_weekend_prices: '110',
    owner_morning_prices: '110',
    owner_night_prices: '110'
  })
  // console.log(JSON.stringify(formData), "---JSON.stringify(formData)---");
  console.log(formData, '1234567')
  const handleChange = e => {
    console.log('into handle scjanges')

    const { name, value } = e.target
    console.log(name, value, 'nv')

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
            setshowReject(false)
            router.reload()
          }
          console.log(showReject, 'showReject')

          console.log(data, 'data-----')
        } catch (error) {
          console.error('Error:', error)
        }
        // fetch("https://staging.dozzy.com/admin/update-property-status", requestOptions)
        //   .then((response) => response.text())
        //   .then((result) => result.status == 'success' && setshowReject(false))
        //   .catch((error) => console.error(error));
      }
      RejectFHOUSE()
    }
  }, [farmHStatus, formData])
  const [uploadImage, setUploadImage] = useState(false)

  const reuploadFile = async (event, attributeId) => {
    console.log("into lids");

    // Ensure a file is selected
    const file = event.target.files[0]; // Get the first file from the input
    if (!file) {
      console.error("No file selected.");
      return;
    }

    const reader = new FileReader();
    reader.onload = async function () {
      console.log("into onload");

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
          console.log(data, "data");
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


  return (
    <div className='bg-white p-6 rounded-lg shadow-md text-black'>
      {propertyDetails ? (
        <div className='bg-[#f5f5f5] p-2'>
          <div className='flex lg:flex-row flex-col gap-4'>
            {/* Left Section: Image */}
            {/* <div className="col-span-12 md:col-span-4">
              <img
                src={`${totalDetails?.property_images[0].attribute_value}`} // Replace with actual image source
                alt="Farmhouse"
                className="rounded-lg w-72 object-cover"
              />
            </div> */}
            <div className='w-[250px] h-[400px]'>
              <div className=' w-[250px] h-[300px]'>
                {/* Image */}
                <Image
                  src={images[currentIndex]?.attribute_value}
                  alt='Farmhouse'
                  className='rounded-lg w-[250px] h-[300px] '
                  width={200}
                  height={200}
                />
              </div>

              {/* Left arrow */}
              <button
                onClick={goToPrevious}
                className='relative z-20 bottom-36 '
              >
                {/* Left arrow symbol */}
                <IoIosArrowBack size={20} />
              </button>

              {/* Right arrow */}
              <button
                onClick={goToNext}
                className='relative z-20 left-52 bottom-36'
              >
                <IoIosArrowForward size={20} />
              </button>
              <div className='flex gap-2 justify-between pt-3 '>
                <p className='text-black '>
                  {images[currentIndex]?.attribute_name}
                </p>
                <div>
                  <button onClick={() => { setUploadImage(true) }} className='underline mb-2'>Reupload Image</button>
                  {/* <input
                    id={`file_input_${"attributeId"}`}
                    type="file"
                    className=""
                    onChange={() =>  reuploadFile(images[currentIndex]?.attribute_id) } // Dynamically use attributeId
                  /> */}
                  {uploadImage && <input
                    id={`file_input_${images[currentIndex]?.attribute_id}`}
                    type="file"
                    onChange={(event) => reuploadFile(event, images[currentIndex]?.attribute_id)} // Pass event and dynamic attributeId
                  />}
                </div>

              </div>
              {/* <p className="bg-red-500 text-blue-300 p-3">{images[currentIndex].attribute_status}</p> */}
            </div>

            <div className=''>
              <div>
                <div className='flex flex-col text-black gap-2 items-start'>
                  <h3 className='text-lg text-black font-bold font-'>
                    Amenities
                  </h3>
                  <div className='flex flex-col lg:flex-row bg-white rounded-md p-1 h-40 overflow-y-scroll'>
                    <ul className=' pl-5  text-gray-900 '>
                      {totalDetails.amenities.map((item, index) => (
                        <li key={index} className='capitalize'>
                          {item.attribute_name}-{item.attribute_value}
                        </li>
                      ))}
                    </ul>
                    <ul className='pl-5 text-gray-700 p-1'>
                      <p className='font-bold py-1'>Games</p>
                      {totalDetails.games.map((item, index) => (
                        <li key={index} className='capitalize'>
                          {item.attribute_name}-{item.attribute_value}
                        </li>
                      ))}
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
                        <div className='bg-white h-[600px] transition-all duration-300 ease-in-out p-8 rounded-lg shadow-xl max-w-sm w-full'>
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
                            className='w-72 h-72'
                          />
                          <h2 className='text-2xl font-bold mb-4 pt-4'>
                            Aadhar
                          </h2>
                          <Image
                            src={'/pix.jpg'}
                            height={1000}
                            width={1000}
                            alt='dozzy farmhouse logo'
                            className='w-40'
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className='bg-white p-4 rounded-md h-fit'>
              <div className='flex flex-col items-center space-x-4'>
                <p className='text-black font-bold'>Farm House Location</p>

                <div>
                  <p className='text-black font-medium w-48 pt-5'>
                    {totalDetails.property_data.geo_location}
                  </p>
                </div>
              </div>
            </div>
            <div className='bg-white p-4 rounded-md h-fit'>
              <div className='flex flex-col items-center space-x-4'>
                <p className='font-bold text-black'>Owner Profile</p>

                <div>
                  <p className='text-gray-800 font-medium capitalize flex gap-1 items-center'>
                    <span>
                      <img
                        src='https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg' // Replace with avatar
                        alt='Owner'
                        className='rounded-full w-10 h-10'
                      />
                    </span>
                    <span>{totalDetails.property_data.profile_name}</span>
                  </p>
                  <p className='text-sm text-gray-500'>
                    Partner Number: {totalDetails.property_data.owner_number}
                  </p>
                  <p className='text-sm text-gray-500'>
                    Watchman:
                    {totalDetails.property_data.property_watch_man_number}{' '}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className='flex lg:flex-row flex-col items-center gap-14 pt-9'>
            <div className=' '>
              <div className='flex flex-col items-center space-x-4'>
                <p className='font-bold text-black'>Approved By</p>
                <div className='flex bg-white items-center'>
                  <img
                    src='https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg' // Replace with avatar
                    alt='Owner'
                    className='rounded-full w-12 h-12'
                  />
                  <div className=' p-4 rounded-md'>
                    <p className='text-gray-800 font-medium capitalize'>
                      {totalDetails.property_data.profile_name}
                    </p>
                    <p className='text-sm text-gray-500'>
                      {totalDetails.property_data.owner_number}
                    </p>
                  </div>
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
                        value={formData.customer_morning_prices}
                        onChange={handleChange}
                        className='border-2 w-12'
                        name='customer_morning_prices'
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
                        value={formData.property_weekend_price}
                        onChange={handleChange}
                        className='border-2 w-12'
                        name='property_weekend_price'
                      />{' '}
                      Night
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className='flex gap-4'>
              <button
                onClick={() => {
                  setshowReject(true)
                }}
                className='p-4 bg-white h-12 w-36 rounded-md text-black'
              >
                Reject
              </button>
              {showReject && (
                <div>
                  <div className='text-black fixed inset-0 bg-black bg-opacity-50 z-50 backdrop-blur-sm h-'>
                    <div className='flex justify-center items-center '>
                      <div className='bg-white h-[600px] transition-all duration-300 ease-in-out p-8 rounded-lg shadow-xl max-w-sm w-full'>
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
                        {console.log(rejectReason, 'rr')}
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
                  // setRejectFm(true);
                  setFormData(prevFormData => ({
                    ...prevFormData,
                    status: 'approved'
                  }))
                  setFarmHStatus('approved')
                }}
                className='p-4 bg-[#556EE6] h-12 w-36 rounded-md text-black'
              >
                Approve
              </button>
              {/* <button>Approve</button> */}
            </div>
          </div>
        </div>
      ) : (
        <p>Loading property details...</p>
      )}
    </div>
  )
}

const FarmHouseAccordion = () => {
  const [farmHouses, setFarmHouses] = useState([])
  const [activePropertyId, setActivePropertyId] = useState(null)

  useEffect(() => {
    const fetchFarmHouses = async () => {
      const userPhone = '7989030741'
      var userAuthorization = localStorage.getItem(
        'tboo_' + userPhone + '_token'
      )

      try {
        const response = await fetch(
          `https://staging.dozzy.com/admin/pending-approvals?status=in_progress&program_id=1&approval_user_id=0`,
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
  }, [])

  return (
    <CommonLayout>
      <div className='container mx-auto py-6'>
        <h1 className='text-3xl font-semibold mb-4 text-black'>
          Pending Approvals
        </h1>
        <div className='space-y-4'>
          {farmHouses.map(farmHouse => (
            <div key={farmHouse.property_id} className='bg-white rounded-md'>
              <button
                className='w-full text-left text-gray-700 capitalize p-4 border-b-2 border-b-gray-200  rounded-t-md focus:outline-none flex justify-between'
                onClick={() =>
                  setActivePropertyId(
                    activePropertyId === farmHouse.property_id
                      ? null
                      : farmHouse.property_id
                  )
                }
              >
                <span>
                  {farmHouse.property_name} ({farmHouse.property_id})
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
                <PropertyDetails propertyId={farmHouse.property_id} />
              )}
            </div>
          ))}
        </div>
      </div>
    </CommonLayout>
  )
}

export default FarmHouseAccordion
