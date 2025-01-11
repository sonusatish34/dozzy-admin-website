import React, { useEffect, useState } from 'react';
import CommonLayout from '../components/layout/CommonLayout';
import Image from 'next/image';
const ComponentName = (props) => {
    const [showAddEmployee, setShowAddEmployee] = useState(false);
    const [submited, setSubmited] = useState(false);
    const [error, setError] = useState('');
    const [emplList, setEmplList] = useState('');
    const [empType, setEmpType] = useState('4');

    const [formData, setFormData] = useState({
        user_phone: "",
        profile_name: "",
        role_id: "",
        user_managed_location: "",
    });

    const handleChange = (e) => {
        e.preventDefault()
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    }
    // console.log(formData, "fd00");

    const handleSubmit = async (e) => {

        e.preventDefault();
        setSubmited(true)
        // if (phoneNumber.length === 10 && roleId) {
        //     await sendOtp();
        // } else {
        //     setError('Please enter a valid phone number and select a role.');
        // }
    };

    useEffect(() => {
        const myHeaders = new Headers();
        myHeaders.append("accept", "application/json");
        myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX3Bob25lIjoiNzk4OTAzMDc0MSJ9.BInoJaoA8tsI4nZ80q1rs0fkBY3os6hL3N1CrPKojKg");
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify(formData);

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };
        if (submited == true) {
            fetch("https://staging.dozzy.com/admin/create-employee", requestOptions)
                .then((response) => response.text())
                .then((result) => console.log(result))
                .catch((error) => console.error(error));
        }


    }, [submited])

    useEffect(() => {
        console.log("success");
        
        const myHeaders = new Headers();
        myHeaders.append("accept", "application/json");
        myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX3Bob25lIjoiNzk4OTAzMDc0MSJ9.BInoJaoA8tsI4nZ80q1rs0fkBY3os6hL3N1CrPKojKg");
        myHeaders.append("Content-Type", "application/json");
        const requestOptions2 = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow"
        };

        const getEmployeesList = async () => {
            const response = await fetch(`https://staging.dozzy.com/admin/employees?role_id=${empType}&user_managed_location=hyderabad`, requestOptions2)
            const data = await response.json();
            // console.log(data,"dataaaa----");
            setEmplList(data?.results)
            // .then((response) => response.json())
            // .then((result) => console.log(result, "00000--------111111111"))
            // .catch((error) => console.error(error));
        }
        getEmployeesList()
    }, [empType])
    // console.log(emplList,"emplist");
    console.log(empType,"emoyuyeyuw");
    
    return (
        <div>
            <CommonLayout>
                <div className='pl-1 pt-20'>
                    <div className='px-10'>
                        <div className='flex gap-96 pb-5'>
                            <p className='text-2xl font-bold'>Exployees List</p>
                            <button onClick={() => { setShowAddEmployee(true) }} className='bg-blue-500 text-white p-1 rounded-md'>Add New Employee</button>
                        </div>
                        <ul className='flex gap-4'>
                            <li ><button className={`${empType=='3' && 'border-b-4 border-blue-600 pb-2'}`}  onClick={() => { setEmpType('3') }}> Admin</button></li>
                            <li><button className={`${empType=='4' && 'border-b-4 border-blue-600 pb-2'}`} onClick={() => { setEmpType('4') }}>Approval Team</button> </li>
                        </ul>
                        {showAddEmployee && (
                            <div>
                                <div className='text-black fixed inset-0 bg-black bg-opacity-50 z-50 backdrop-blur-sm h-'>
                                    <div className='flex justify-center items-center '>
                                        <div className='relative top-10 bg-white h-[600px] transition-all duration-300 ease-in-out p-8 pt-11 rounded-lg shadow-xl max-w-sm w-full'>
                                            <button onClick={() => { setShowAddEmployee(false) }}
                                                className='bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition'
                                            >
                                                Close
                                            </button>
                                            <form onSubmit={handleSubmit} className="space-y-4">
                                                <p className="text-2xl font-bold mb-6 text-left pt-6">Add Employee</p>
                                                <div className="flex flex-col gap-3">
                                                    <input
                                                        type='text'
                                                        className='rounded-md p-3 bg-gray-200 opacity-100 text-black placeholder-black'
                                                        placeholder="Employee Name"
                                                        value={formData.profile_name}
                                                        onChange={handleChange}
                                                        name="profile_name"

                                                    />
                                                    <input type="text"
                                                        value={formData.user_phone}
                                                        onChange={handleChange}
                                                        className="rounded-md p-3 bg-gray-200 opacity-100 text-black placeholder-black"
                                                        placeholder="Mobile number"
                                                        maxLength={10}
                                                        name="user_phone"
                                                    />
                                                    <select
                                                        value={formData.role_id}
                                                        onChange={handleChange}
                                                        className="rounded-md p-3 bg-gray-200 opacity-100 text-black pr-9"
                                                        name="role_id"
                                                    >
                                                        <option value="">Select your Job role</option>
                                                        <option value="3">Admin</option>
                                                        <option value="4">Approval Team</option>
                                                    </select>
                                                    <select
                                                        value={formData.user_managed_location}
                                                        onChange={handleChange}
                                                        className="rounded-md p-3 bg-gray-200 opacity-100 text-black pr-9"
                                                        name="user_managed_location"
                                                    >
                                                        <option value="">select your location</option>
                                                        <option value="hyderabad">hyderabad</option>
                                                    </select>
                                                </div>
                                                <button
                                                    type="submit"
                                                    className="w-full py-2 px-4 bg-blue-500 text-white font-bold rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                                                >
                                                    Submit
                                                </button>
                                                {error && <p className="text-red-500">{error}</p>}
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div className='flex flex-col gap-2 pt-7'>
                            {emplList?.length && emplList.map((item, index) => (
                                <div key={index} className='bg-gray-200 flex justify-between rounded-md p-4'>
                                    <ul className='flex flex-col gap-2'>
                                        <li>{item?.profile_name}</li>
                                        <li><span>{(item?.role_id == 4) && 'Approval Team'}</span><span>{(item?.role_id == 3) && 'Admin'}</span></li>
                                        <li></li>
                                        <li>{item?.user_phone}</li>
                                        <li>{item?.user_status}</li>

                                    </ul>
                                    <button>Delete</button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </CommonLayout>
        </div>
    );
};

export default ComponentName;