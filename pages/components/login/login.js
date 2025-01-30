import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import dzlogo from '../../images/dozzylogo.png';

export default function Login() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [roleId, setRoleId] = useState('');
  const [error, setError] = useState('');
  const [otpSuccess, setOtpSuccess] = useState(false);
  const [otpValidated, setOtpValidated] = useState(false);
  const [otp, setOtp] = useState('');
  const [otpError, setOtpError] = useState('');
  const router = useRouter();
  console.log(roleId, "roleeId");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (phoneNumber.length === 10 && roleId) {
      await sendOtp();
    } else {
      setError('Please enter a valid phone number and select a role.');
    }
  };
  useEffect(()=>{
    const usermobile = window.localStorage.getItem('tboo_user_phone');
    const usertoken = window.localStorage.getItem('tboo_' + usermobile + '_token');
    if(usermobile && usertoken)
    {
      router.push('/dashboard')
    }
    else{
      return
    }
  },[])
  console.log(process.env.NEXT_PUBLIC_URL,"process.env.NEXT_PUBLIC_URL");
  
  const sendOtp = async () => {
    const url = `${process.env.NEXT_PUBLIC_URL}/admin/login`;
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
    const url = `https://staging.dozzy.com/admin/otp-validate`;
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
      className="bg-no-repeat flex flex-col items-center bg-cover px-2 py-4 justify-center min-h-screen bg-gray-100 text-black"
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
      <div className="shadow w-full max-w-md p-8 bg-white opacity-65 -md rounded-lg">
        {!otpSuccess ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <p className="text-2xl font-bold mb-6 text-left">Please Login</p>
            <div className="flex flex-col gap-3">
              {/* <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value.trim())}
                className="p-3 bg-gray-200 opacity-100 text-black placeholder-black"
                placeholder="Enter your WhatsApp number"
                maxLength={10}
              /> */}
              <input
                type="text"
                value={phoneNumber}
                onChange={(e) => {
                  const formattedValue = e.target.value.replace(/[^0-9]/g, ''); // Remove all non-numeric characters
                  if (formattedValue.length <= 10) { // Ensure max length is 10 digits
                    setPhoneNumber(formattedValue);
                  }
                }}
                className="rounded-md p-3 bg-gray-200 opacity-100 text-black placeholder-black"
                placeholder="Enter your WhatsApp number"
                maxLength={10}
              />

              {/* <select
                value={roleId}
                onChange={(e) => setRoleId(e.target.value)}
                className="border-none bg-gray-300 p-3"
              >
                <option value="">Select your role ID</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select> */}
              <select
                value={roleId}
                onChange={(e) => setRoleId(e.target.value)}
                className="rounded-md p-3 bg-gray-200 opacity-100 text-black pr-9"
              >
                <option value="">Select your role</option>
                <option value="3">Admin</option>
                <option value="4">Approval Team</option>
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
            <p className="font-bold">{String(phoneNumber).replace(/(\d{4})(\d{3})(\d{3})/, '$1-$2-$3')}</p>
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
