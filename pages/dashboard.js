import React, { useEffect, useState } from 'react';
import CommonLayout from './components/layout/CommonLayout';
import { IoIosArrowForward } from "react-icons/io";
import Link from 'next/link';
import { useRouter } from 'next/router';
// import { GetUrl } from '../utils/config';
import {GetUrl} from '../utils/config'
const ComponentName = (props) => {
    
  const router = useRouter()
  const [farmHDetails, setFarmHDetails] = useState(null)
  useEffect(() => {
    const getDashboard = async () => {
      const storedUserPhone = localStorage.getItem("tboo_user_phone");
      const auth=localStorage.getItem("tboo_" + storedUserPhone + "_token");
      const myHeaders = new Headers();
      myHeaders.append("accept", "application/json");
      myHeaders.append("Authorization", auth);

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
      };

      const response = await fetch(`${GetUrl()}/admin/dashboard`, requestOptions)
      const data = await response.json();
      setFarmHDetails(data?.results?.farmhouse_details)
      console.log(data, "1234567890");


      // .then((response) => response.text())
      // .then((result) => console.log(result,"hello world"))
      // .catch((error) => console.error(error));
    }
    getDashboard()

  }, [])
  return (
    <CommonLayout>
      <div className='lg:pl-8 px-3 pt-'>
          <p className='font-bold text-2xl py-4'>Dashboard</p>
        <div className='bg-white text-black grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 '>
          <table className="table-auto text-left bg-gray-100 border-2 border-gray-50 rounded p-4  pl-2">
            <thead className='pl-3'>
              <tr>
                <th className='pl-4'>Farmhouse</th>
              </tr>
            </thead>
            <tbody className='flex flex-col gap-3'>
              <tr className='bg-white'>
                <td><Link href={'/farmhouse/farmhouses-by-status'}  className='flex items-center justify-between pr-6 py-1'><span>Total Farmhouse - {farmHDetails?.total_farmhouses ? farmHDetails.total_farmhouses : '0'}</span> <span><IoIosArrowForward /></span></Link></td>
              </tr>
              <tr className='bg-white'>
                <td><Link href={'/farmhouse/farmhouses-by-status'} className='flex items-center justify-between pr-6 py-1'><span>Online Farmhouse -{farmHDetails?.online_farmhouses ? farmHDetails.online_farmhouses : '0'}</span> <span><IoIosArrowForward /></span></Link></td>
              </tr>
              <tr className='bg-white'>
                <td><Link href={'/farmhouse/farmhouses-by-status'} className='flex items-center justify-between pr-6 py-1'><span>Offline Farmhouse -{farmHDetails?.offline_farmhouses ? farmHDetails.offline_farmhouses : '0'}</span> <span><IoIosArrowForward /></span></Link></td>
              </tr>
              <tr className='bg-white'>
                <td><Link href={'/farmhouse/total-bookings'} className='flex items-center justify-between pr-6 py-1'><span>Total Bookings -{farmHDetails?.total_farmhouse_bookings ? farmHDetails.total_farmhouse_bookings : '0'}</span> <span><IoIosArrowForward /></span></Link></td>
              </tr>
              <tr className='bg-white'>
                <td><Link href={'/farmhouse/bookings-by-status'} className='flex items-center justify-between pr-6 py-1'><span>Upcoming Bookings -{farmHDetails?.upcoming_farmhouse_bookings ? farmHDetails.upcoming_farmhouse_bookings : '0'}</span> <span><IoIosArrowForward /></span></Link></td>
              </tr>
              <tr className='bg-white'>
                <td><Link href={'/farmhouse/bookings-by-status'} className='flex items-center justify-between pr-6 py-1'><span>Cancelled Bookings  -{farmHDetails?.online_farmhouses ? farmHDetails.online_farmhouses : '0'}</span> <span><IoIosArrowForward /></span></Link></td>
              </tr>
              <tr className='bg-white'>
                <td><Link href={'/farmhouse/bookings-by-status'} className='flex items-center justify-between pr-6 py-1'><span>In-House   -{farmHDetails?.inhouse_farmhouse_bookings ? farmHDetails.inhouse_farmhouse_bookings : '0'}</span> <span><IoIosArrowForward /></span></Link></td>
              </tr>

            </tbody>
          </table>
          <table className="table-auto text-left bg-gray-100 border-2 border-gray-50 rounded p-4  pl-2">
            <thead className='pl-3'>
              <tr>
                <th className='pl-4'>Hotels</th>
              </tr>
            </thead>
            <tbody className='flex flex-col gap-3'>
              <tr className='bg-white'>
                <td><div className='flex items-center justify-between pr-6 py-1'><span>Total Hotels -0</span> <span><IoIosArrowForward /></span></div></td>
              </tr>
              <tr className='bg-white'>
                <td><div className='flex items-center justify-between pr-6 py-1'><span>Online Hotels -0</span> <span><IoIosArrowForward /></span></div></td>
              </tr>
              <tr className='bg-white'>
                <td><div className='flex items-center justify-between pr-6 py-1'><span>Offline Hotels -0</span> <span><IoIosArrowForward /></span></div></td>
              </tr>
              <tr className='bg-white'>
                <td><div className='flex items-center justify-between pr-6 py-1'><span>Total Bookings -0</span> <span><IoIosArrowForward /></span></div></td>
              </tr>
              <tr className='bg-white'>
                <td><div className='flex items-center justify-between pr-6 py-1'><span>Upcoming Bookings -0</span> <span><IoIosArrowForward /></span></div></td>
              </tr>
              <tr className='bg-white'>
                <td><div className='flex items-center justify-between pr-6 py-1'><span>Cancelled Bookings -0</span> <span><IoIosArrowForward /></span></div></td>
              </tr>
              <tr className='bg-white'>
                <td><div className='flex items-center justify-between pr-6 py-1'><span>In-House   -0</span> <span><IoIosArrowForward /></span></div></td>
              </tr>
            
            </tbody>
          </table>
          <table className="table-auto text-left bg-gray-100 border-2 border-gray-50 rounded p-4  pl-2">
            <thead className='pl-3'>
              <tr>
                <th className='pl-4'>Resorts</th>
              </tr>
            </thead>
            <tbody className='flex flex-col gap-3'>
              <tr className='bg-white'>
                <td><div className='flex items-center justify-between pr-6 py-1'><span>Total Resorts -0</span> <span><IoIosArrowForward /></span></div></td>
              </tr>
              <tr className='bg-white'>
                <td><div className='flex items-center justify-between pr-6 py-1'><span>Online Resorts -0</span> <span><IoIosArrowForward /></span></div></td>
              </tr>
              <tr className='bg-white'>
                <td><div className='flex items-center justify-between pr-6 py-1'><span>Offline Resorts -0</span> <span><IoIosArrowForward /></span></div></td>
              </tr>
              <tr className='bg-white'>
                <td><div className='flex items-center justify-between pr-6 py-1'><span>Total Bookings -0</span> <span><IoIosArrowForward /></span></div></td>
              </tr>
              <tr className='bg-white'>
                <td><div className='flex items-center justify-between pr-6 py-1'><span>Upcoming Bookings -0</span> <span><IoIosArrowForward /></span></div></td>
              </tr>
              <tr className='bg-white'>
                <td><div className='flex items-center justify-between pr-6 py-1'><span>Cancelled Bookings -0</span> <span><IoIosArrowForward /></span></div></td>
              </tr>
              <tr className='bg-white'>
                <td><div className='flex items-center justify-between pr-6 py-1'><span>In-House   -0</span> <span><IoIosArrowForward /></span></div></td>
              </tr>

            </tbody>
          </table>
          <table className="table-auto text-left bg-gray-100 border-2 border-gray-50 rounded p-4  pl-2">
            <thead className='pl-3'>
              <tr>
                <th className='pl-4'>Villa</th>
              </tr>
            </thead>
            <tbody className='flex flex-col gap-3'>
              <tr className='bg-white'>
                <td><div className='flex items-center justify-between pr-6 py-1'><span>Total Villa -0</span> <span><IoIosArrowForward /></span></div></td>
              </tr>
              <tr className='bg-white'>
                <td><div className='flex items-center justify-between pr-6 py-1'><span>Online Villa -0</span> <span><IoIosArrowForward /></span></div></td>
              </tr>
              <tr className='bg-white'>
                <td><div className='flex items-center justify-between pr-6 py-1'><span>Offline Villa -0</span> <span><IoIosArrowForward /></span></div></td>
              </tr>
              <tr className='bg-white'>
                <td><div className='flex items-center justify-between pr-6 py-1'><span>Total Bookings -0</span> <span><IoIosArrowForward /></span></div></td>
              </tr>
              <tr className='bg-white'>
                <td><div className='flex items-center justify-between pr-6 py-1'><span>Upcoming Bookings -0</span> <span><IoIosArrowForward /></span></div></td>
              </tr>
              <tr className='bg-white'>
                <td><div className='flex items-center justify-between pr-6 py-1'><span>Cancelled Bookings -0</span> <span><IoIosArrowForward /></span></div></td>
              </tr>
              <tr className='bg-white'>
                <td><div className='flex items-center justify-between pr-6 py-1'><span>In-House   -0</span> <span><IoIosArrowForward /></span></div></td>
              </tr>

            </tbody>
          </table>
          <table className="table-auto text-left bg-gray-100 border-2 border-gray-50 rounded p-4  pl-2">
            <thead className='pl-3'>
              <tr>
                <th className='pl-4'>Homestay</th>
              </tr>
            </thead>
            <tbody className='flex flex-col gap-3'>
              <tr className='bg-white'>
                <td><div className='flex items-center justify-between pr-6 py-1'><span>Total Homestay -0</span> <span><IoIosArrowForward /></span></div></td>
              </tr>
              <tr className='bg-white'>
                <td><div className='flex items-center justify-between pr-6 py-1'><span>Online Homestay -0</span> <span><IoIosArrowForward /></span></div></td>
              </tr>
              <tr className='bg-white'>
                <td><div className='flex items-center justify-between pr-6 py-1'><span>Offline Homestay -0</span> <span><IoIosArrowForward /></span></div></td>
              </tr>
              <tr className='bg-white'>
                <td><div className='flex items-center justify-between pr-6 py-1'><span>Total Bookings -0</span> <span><IoIosArrowForward /></span></div></td>
              </tr>
              <tr className='bg-white'>
                <td><div className='flex items-center justify-between pr-6 py-1'><span>Upcoming Bookings -0</span> <span><IoIosArrowForward /></span></div></td>
              </tr>
              <tr className='bg-white'>
                <td><div className='flex items-center justify-between pr-6 py-1'><span>Cancelled Bookings -0</span> <span><IoIosArrowForward /></span></div></td>
              </tr>
              <tr className='bg-white'>
                <td><div className='flex items-center justify-between pr-6 py-1'><span>In-House   -0</span> <span><IoIosArrowForward /></span></div></td>
              </tr>

            </tbody>
          </table>
          <table className="table-auto text-left bg-gray-100 border-2 border-gray-50 rounded p-4  pl-2">
            <thead className='pl-3'>
              <tr>
                <th className='pl-4'>Bus</th>
              </tr>
            </thead>
            <tbody className='flex flex-col gap-3'>
              <tr className='bg-white'>
                <td><div className='flex items-center justify-between pr-6 py-1'><span>Total Bus -0</span> <span><IoIosArrowForward /></span></div></td>
              </tr>
              <tr className='bg-white'>
                <td><div className='flex items-center justify-between pr-6 py-1'><span>Online Bus -0</span> <span><IoIosArrowForward /></span></div></td>
              </tr>
              <tr className='bg-white'>
                <td><div className='flex items-center justify-between pr-6 py-1'><span>Offline Bus -0</span> <span><IoIosArrowForward /></span></div></td>
              </tr>
              <tr className='bg-white'>
                <td><div className='flex items-center justify-between pr-6 py-1'><span>Total Bookings -0</span> <span><IoIosArrowForward /></span></div></td>
              </tr>
              <tr className='bg-white'>
                <td><div className='flex items-center justify-between pr-6 py-1'><span>Upcoming Bookings -0</span> <span><IoIosArrowForward /></span></div></td>
              </tr>
              <tr className='bg-white'>
                <td><div className='flex items-center justify-between pr-6 py-1'><span>Cancelled Bookings -0</span> <span><IoIosArrowForward /></span></div></td>
              </tr>
              <tr className='bg-white'>
                <td><div className='flex items-center justify-between pr-6 py-1'><span>In-House   -0</span> <span><IoIosArrowForward /></span></div></td>
              </tr>

            </tbody>
          </table>
        
        </div>
      </div>

    </CommonLayout>
  );
};

export default ComponentName;