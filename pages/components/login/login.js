// // pages/login.js
// import { useState } from 'react';
// import { useRouter } from 'next/router';
// import Image from 'next/image';
// import dzlogo from '../../images/dozzylogo.png'
// export default function Login() {
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [role, setRole] = useState('');
//   const [roleId, setRoleId] = useState('');
//   const [error, setError] = useState('');
//   const [otpSuccess, setOtpSuccess] = useState(false);
//   const [otpValidated, setOtpValidated] = useState(false);
//   const [otp, setOtp] = useState('');
//   const [otpError, setOtpError] = useState('');
//   const [phoneNumber2, setPhoneNumber2] = useState('');
//   const router = useRouter();


//   const handleSubmit = (e) => {
//     e.preventDefault();
//     sendOtp();
//     console.log({ phoneNumber, role });
//   };

//   async function sendOtp() {
//     // Define the URL and request options
//     const url = 'https://staging.dozzy.com/admin/login';
//     const options = {
//       method: 'POST',
//       headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({
//         mobile_number: phoneNumber,
//         role_id: roleId
//       })
//     };
//     console.log(phoneNumber, roleId, "phoneNumber");

//     // Perform the fetch request
//     fetch(url, options)
//       .then(response => {
//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }
//         return response.json();
//       })
//       .then(data => {
//         console.log('Success:', data);
//         setOtpSuccess(true);
//       })
//       .catch(error => {
//         console.error('Error:', error);
//         setOtpSuccess(false);
//       });

//   }

//   async function validateOtp() {
//     // Define the URL and request options
//     const url = 'https://staging.dozzy.com/admin/otp-validate';
//     const options = {
//       method: 'POST',
//       headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({
//         otp: otp,
//         mobile_number: phoneNumber,
//         role_id: roleId
//       })
//     };

//     // Perform the fetch request
//     fetch(url, options)
//       .then(response => {
//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }
//         return response.json();
//       })
//       .then(data => {
//         console.log('Success:', data);
//         setOtpValidated(true);
//       })
//       .catch(error => {
//         console.error('Error:', error);
//         setOtpValidated(false);
//       });
      

//   }
//   if(otpValidated)
//     {
//       router.push('/dashboard')
//     }
//   return (
//     <div  style={{ backgroundImage: "url('/pix.jpg')",backgroundSize:"cover "}} className=" bg-no-repeat flex flex-col items-center bg-cove justify-center min-h-screen bg-gray-100 text-black">
//       <div className='flex flex-col justify-center items-center'>
//         <Image
//         src={dzlogo}
//         height={1000}
//         width={1000}
//         alt='dozzy farmhouse logo'
//         className='w-72'
//         >

//         </Image>
//         <p className='text-white font-bold text-2xl py-3'>Welcome To Our Website</p>
//         </div>
//       <div className="shad w-full max-w-md p-8 bg-white opacity-65 shadow-md rounded-lg">
//         {!otpSuccess ? (
//           <form onSubmit={handleSubmit} className={`space-y-4`}>
//             <h1 className="text-2xl font-bold mb-6 text-center">Login Details</h1>
//             <div className='flex flex-col gap-3 bg-white '>
//               <input
//                 type="text"
//                 id="phoneNumber"
//                 value={phoneNumber}
//                 onChange={(e) => setPhoneNumber(e.target.value)}
//                 className="p-3 bg-gray-200 opacity-100 text-black placeholder-black"
//                 placeholder="Enter your WhatsApp number"
//               />
//               <select
//                 id="role"
//                 value={roleId}
//                 onChange={(e) => setRoleId(e.target.value)}
//                 className="border-none bg-gray-300 p-3"
//               >
//                 <option value="select role no">Selct your role id</option>
//                 <option value="one">1</option>
//                 <option value="two team"> 2</option>
//                 <option value="3"> 3</option>
//               </select>
//               <select
//                 id="role2"
//                 value={role}
//                 onChange={(e) => setRole(e.target.value)}
//                 className="p-3 bg-gray-200 opacity-100 text-black"
//               >
//                 <option value=" sel role">Selct your role</option>
//                 <option value="admin">Admin</option>
//                 <option value="app team">Approval Team</option>
//               </select>
//             </div>
           
              
              
          
//             <button
//               type="submit"
//               className="w-full py-2 px-4 bg-blue-500 text-white font-bold rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
//             >
//               Submit
//             </button>
//             {error && <p className="text-red-500">{error}</p>}
//           </form>
        
//         ) : (
//           <div className="flex flex-col gap-3">
//             <p className='font-bold text-xl'>Please check WhatsApp</p>
//             <p className='font-bold '>{phoneNumber}</p>
//             <div>
//               <input
//                 type="text"
//                 id="otp"
//                 value={otp}
//                 onChange={(e) => setOtp(e.target.value)}
//                 className="mt-1 block w-full p-2 rounded-md shadow-md bg-gray-200 placeholder-black text-black"
//                 placeholder="Enter OTP"
//               />
//             </div>
//             <button
//               type="button"
//               onClick={validateOtp}
//               className="w-full py-2 px-4 bg-blue-500 text-white font-bold rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
//             >
//               Verify OTP
//             </button>
//             {otpError && <p className="text-red-500">{otpError}</p>}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
import { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import dzlogo from '../../images/dozzylogo.png';

export default function Login() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [role, setRole] = useState('');
  const [roleId, setRoleId] = useState('');
  const [error, setError] = useState('');
  const [otpSuccess, setOtpSuccess] = useState(false);
  const [otpValidated, setOtpValidated] = useState(false);
  const [otp, setOtp] = useState('');
  const [otpError, setOtpError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (phoneNumber.length === 10 && roleId) {
      await sendOtp();
    } else {
      setError('Please enter a valid phone number and select a role.');
    }
  };

  const sendOtp = async () => {
    const url = 'https://staging.dozzy.com/admin/login';
    const options = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        mobile_number: phoneNumber,
        role_id: roleId,
      }),
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      if (response.ok && data.status === 'success') {
        setOtpSuccess(true);
      } else {
        setError('Failed to send OTP.');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred while sending OTP.');
    }
  };

  const validateOtp = async () => {
    const url = 'https://staging.dozzy.com/admin/otp-validate';
    const options = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        otp: otp,
        mobile_number: phoneNumber,
        role_id: roleId,
      }),
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      if (response.ok && data.status === 'success') {
        setOtpValidated(true);
        // Store data in localStorage
        window.localStorage.setItem('tboo_user_phone', phoneNumber);
        window.localStorage.setItem('tboo_' + phoneNumber + '_roleid', roleId);
        window.localStorage.setItem('tboo_' + phoneNumber + '_role', data.role_name);
        window.localStorage.setItem('tboo_' + phoneNumber + '_token', data.jwt_token);
        window.localStorage.setItem('tboo_' + phoneNumber + '_expiry', data.expiry);
        window.localStorage.setItem('tboo_' + phoneNumber + '_details', JSON.stringify(data.app_user_data));

        // Redirect to dashboard
        setTimeout(() => {
          router.push('/dashboard');
        }, 500);
      } else {
        setOtpError('Invalid OTP.');
      }
    } catch (error) {
      console.error('Error:', error);
      setOtpError('An error occurred while validating OTP.');
    }
  };

  return (
    <div
      style={{ backgroundImage: "url('/pix.jpg')", backgroundSize: 'cover' }}
      className="bg-no-repeat flex flex-col items-center bg-cover justify-center min-h-screen bg-gray-100 text-black"
    >
      <div className="flex flex-col justify-center items-center">
        <Image
          src={dzlogo}
          height={1000}
          width={1000}
          alt="dozzy farmhouse logo"
          className="w-72"
        />
        <p className="text-white font-bold text-2xl py-3">Welcome To Our Website</p>
      </div>
      <div className="shadow w-full max-w-md p-8 bg-white opacity-65 shadow-md rounded-lg">
        {!otpSuccess ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <h1 className="text-2xl font-bold mb-6 text-center">Login Details</h1>
            <div className="flex flex-col gap-3">
              <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="p-3 bg-gray-200 opacity-100 text-black placeholder-black"
                placeholder="Enter your WhatsApp number"
              />
              <select
                value={roleId}
                onChange={(e) => setRoleId(e.target.value)}
                className="border-none bg-gray-300 p-3"
              >
                <option value="">Select your role ID</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="p-3 bg-gray-200 opacity-100 text-black"
              >
                <option value="">Select your role</option>
                <option value="admin">Admin</option>
                <option value="approval_team">Approval Team</option>
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
        ) : (
          <div className="flex flex-col gap-3">
            <p className="font-bold text-xl">Please check WhatsApp</p>
            <p className="font-bold">{phoneNumber}</p>
            <div>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="mt-1 block w-full p-2 rounded-md shadow-md bg-gray-200 placeholder-black text-black"
                placeholder="Enter OTP"
              />
            </div>
            <button
              type="button"
              onClick={validateOtp}
              className="w-full py-2 px-4 bg-blue-500 text-white font-bold rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Verify OTP
            </button>
            {otpError && <p className="text-red-500">{otpError}</p>}
          </div>
        )}
      </div>
    </div>
  );
}
