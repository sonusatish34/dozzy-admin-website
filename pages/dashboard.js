import React, { useEffect, useState } from 'react';
import CommonLayout from './components/layout/CommonLayout';
import { IoIosArrowForward } from "react-icons/io";
import Link from 'next/link';
import { useRouter } from 'next/router';
// import { GetUrl } from '../utils/config';
import { GetUrl } from '../utils/config'
const ComponentName = (props) => {

  const router = useRouter()
  const [farmHDetails, setFarmHDetails] = useState(null)
  useEffect(() => {
    const getDashboard = async () => {
      const storedUserPhone = localStorage.getItem("tboo_user_phone");
      const auth = localStorage.getItem("tboo_" + storedUserPhone + "_token");
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
      // .then((response) => response.text())
      // .then((result) => console.log(result,"hello world"))
      // .catch((error) => console.error(error));
    }
    getDashboard()

  }, [])
  return (
    <CommonLayout>
      <div className='lg:pl-8 px-3 lg:py-8'>
        <p className='font-bold text-2xl py-4'>Dashboard</p>
        <div className='bg-white text-black grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 '>
          <table className="table-auto text-left bg-gray-100 rounded-md  pl-2">
            <thead className='pl-3'>
              <tr>
                <th className='pl-3 py-2'>Farmhouses</th>
              </tr>
            </thead>
            <tbody className='flex flex-col gap-3 p-2'>
              <tr className='bg-white rounded-lg'>
                <td><Link href={'/farmhouse/farmhouses-by-status'} className='flex xl:gap-x-24 items-center py-2 pl-2'><span className='xl:w-[300px] lg:w-[250px] w-[230px]'>Total Farmhouse - {farmHDetails?.total_farmhouses ? farmHDetails.total_farmhouses : '0'}</span> <span><IoIosArrowForward size={20} /></span></Link></td>
              </tr>
              <tr className='bg-white rounded-lg'>
                <td><Link href={'/farmhouse/farmhouses-by-status'} className='flex xl:gap-x-24 items-center py-2 pl-2'><span className='xl:w-[300px] lg:w-[250px] w-[230px]'>Online Farmhouse -{farmHDetails?.online_farmhouses ? farmHDetails.online_farmhouses : '0'}</span> <span><IoIosArrowForward size={20} /></span></Link></td>
              </tr>
              <tr className='bg-white rounded-lg'>
                <td><Link href={'/farmhouse/farmhouses-by-status'} className='flex xl:gap-x-24 items-center py-2 pl-2'><span className='xl:w-[300px] lg:w-[250px] w-[230px]'>Offline Farmhouse -{farmHDetails?.offline_farmhouses ? farmHDetails.offline_farmhouses : '0'}</span> <span><IoIosArrowForward size={20} /></span></Link></td>
              </tr>
              <tr className='bg-white rounded-lg'>
                <td><Link href={'/farmhouse/total-bookings'} className='flex xl:gap-x-24 items-center py-2 pl-2'><span className='xl:w-[300px] lg:w-[250px] w-[230px]'>Total Bookings -{farmHDetails?.total_farmhouse_bookings ? farmHDetails.total_farmhouse_bookings : '0'}</span> <span><IoIosArrowForward size={20} /></span></Link></td>
              </tr>
              <tr className='bg-white rounded-lg'>
                <td><Link href={'/farmhouse/bookings-by-status'} className='flex xl:gap-x-24 items-center py-2 pl-2'><span className='xl:w-[300px] lg:w-[250px] w-[230px]'>Upcoming Bookings -{farmHDetails?.upcoming_farmhouse_bookings ? farmHDetails.upcoming_farmhouse_bookings : '0'}</span> <span><IoIosArrowForward size={20} /></span></Link></td>
              </tr>
              <tr className='bg-white rounded-lg'>
                <td><Link href={'/farmhouse/bookings-by-status'} className='flex xl:gap-x-24 items-center py-2 pl-2'><span className='xl:w-[300px] lg:w-[250px] w-[230px]'>Cancelled Bookings  -{farmHDetails?.online_farmhouses ? farmHDetails.online_farmhouses : '0'}</span> <span><IoIosArrowForward size={20} /></span></Link></td>
              </tr>
              <tr className='bg-white rounded-lg'>
                <td><Link href={'/farmhouse/bookings-by-status'} className='flex xl:gap-x-24 items-center py-2 pl-2'><span className='xl:w-[300px] lg:w-[250px] w-[230px]'>In-House   -{farmHDetails?.inhouse_farmhouse_bookings ? farmHDetails.inhouse_farmhouse_bookings : '0'}</span> <span><IoIosArrowForward size={20} /></span></Link></td>
              </tr>

            </tbody>
          </table>
          <table className="table-auto text-left bg-gray-100 rounded-lg p-4  pl-2">
            <thead className='pl-3'>
              <tr>
                <th className='pl-3 py-2'>Hotels</th>
              </tr>
            </thead>
            <tbody className='flex flex-col gap-3 p-2'>
              <tr className='bg-white rounded-lg'>
                <td className=''><Link href={'/ '} className='flex xl:gap-x-24 items-center py-2 pl-2'><span className='xl:w-[300px] lg:w-[250px] w-[230px]'>Total Hotels - 0</span> <span><IoIosArrowForward size={20} /></span></Link></td>
              </tr>
              <tr className='bg-white rounded-lg'>
                <td><Link href={'/'} className='flex xl:gap-x-24 items-center py-2 pl-2'><span className='xl:w-[300px] lg:w-[250px] w-[230px]'>Online Hotels - 0</span> <span><IoIosArrowForward size={20} /></span></Link></td>
              </tr>
              <tr className='bg-white rounded-lg'>
                <td><Link href={'/'} className='flex xl:gap-x-24 items-center py-2 pl-2'><span className='xl:w-[300px] lg:w-[250px] w-[230px]'>Offline Hotels - 0</span> <span><IoIosArrowForward size={20} /></span></Link></td>
              </tr>
              <tr className='bg-white rounded-lg'>
                <td><Link href={'/'} className='flex xl:gap-x-24 items-center py-2 pl-2'><span className='xl:w-[300px] lg:w-[250px] w-[230px]'>Total Hotels - 0</span> <span><IoIosArrowForward size={20} /></span></Link></td>
              </tr>
              <tr className='bg-white rounded-lg'>
                <td><Link href={'/'} className='flex xl:gap-x-24 items-center py-2 pl-2'><span className='xl:w-[300px] lg:w-[250px] w-[230px]'>Upcoming Bookings - 0</span> <span><IoIosArrowForward size={20} /></span></Link></td>
              </tr>
              <tr className='bg-white rounded-lg'>
                <td><Link href={'/'} className='flex xl:gap-x-24 items-center py-2 pl-2'><span className='xl:w-[300px] lg:w-[250px] w-[230px]'>Cancelled Bookings - 0</span> <span><IoIosArrowForward size={20} /></span></Link></td>
              </tr>
              <tr className='bg-white rounded-lg'>
                <td><Link href={'/'} className='flex xl:gap-x-24 items-center py-2 pl-2'><span className='xl:w-[300px] lg:w-[250px] w-[230px]'>In-House - 0</span> <span><IoIosArrowForward size={20} /></span></Link></td>
              </tr>

            </tbody>
          </table>
          <table className="table-auto text-left bg-gray-100 rounded-lg p-4  pl-2">
            <thead className='pl-3'>
              <tr>
                <th className='pl-3 py-2'>Resorts</th>
              </tr>
            </thead>
            <tbody className='flex flex-col gap-3 p-2'>
              <tr className='bg-white rounded-lg'>
                <td className=''><Link href={'/ '} className='flex xl:gap-x-24 items-center py-2 pl-2'><span className='xl:w-[300px] lg:w-[250px] w-[230px]'>Total Resorts - 0</span> <span><IoIosArrowForward size={20} /></span></Link></td>
              </tr>
              <tr className='bg-white rounded-lg'>
                <td><Link href={'/'} className='flex xl:gap-x-24 items-center py-2 pl-2'><span className='xl:w-[300px] lg:w-[250px] w-[230px]'>Online Resorts - 0</span> <span><IoIosArrowForward size={20} /></span></Link></td>
              </tr>
              <tr className='bg-white rounded-lg'>
                <td><Link href={'/'} className='flex xl:gap-x-24 items-center py-2 pl-2'><span className='xl:w-[300px] lg:w-[250px] w-[230px]'>Offline Resorts - 0</span> <span><IoIosArrowForward size={20} /></span></Link></td>
              </tr>
              <tr className='bg-white rounded-lg'>
                <td><Link href={'/'} className='flex xl:gap-x-24 items-center py-2 pl-2'><span className='xl:w-[300px] lg:w-[250px] w-[230px]'>Total Resorts - 0</span> <span><IoIosArrowForward size={20} /></span></Link></td>
              </tr>
              <tr className='bg-white rounded-lg'>
                <td><Link href={'/'} className='flex xl:gap-x-24 items-center py-2 pl-2'><span className='xl:w-[300px] lg:w-[250px] w-[230px]'>Upcoming Bookings - 0</span> <span><IoIosArrowForward size={20} /></span></Link></td>
              </tr>
              <tr className='bg-white rounded-lg'>
                <td><Link href={'/'} className='flex xl:gap-x-24 items-center py-2 pl-2'><span className='xl:w-[300px] lg:w-[250px] w-[230px]'>Cancelled Bookings - 0</span> <span><IoIosArrowForward size={20} /></span></Link></td>
              </tr>
              <tr className='bg-white rounded-lg'>
                <td><Link href={'/'} className='flex xl:gap-x-24 items-center py-2 pl-2'><span className='xl:w-[300px] lg:w-[250px] w-[230px]'>In-House - 0</span> <span><IoIosArrowForward size={20} /></span></Link></td>
              </tr>

            </tbody>
          </table>
          <table className="table-auto text-left bg-gray-100 rounded-lg p-4  pl-2">
            <thead className='pl-3'>
              <tr>
                <th className='pl-3 py-2'>Villas</th>
              </tr>
            </thead>
            <tbody className='flex flex-col gap-3 p-2'>
              <tr className='bg-white rounded-lg'>
                <td className=''><Link href={'/ '} className='flex xl:gap-x-24 items-center py-2 pl-2'><span className='xl:w-[300px] lg:w-[250px] w-[230px]'>Total Villas - 0</span> <span><IoIosArrowForward size={20} /></span></Link></td>
              </tr>
              <tr className='bg-white rounded-lg'>
                <td><Link href={'/'} className='flex xl:gap-x-24 items-center py-2 pl-2'><span className='xl:w-[300px] lg:w-[250px] w-[230px]'>Online Villas - 0</span> <span><IoIosArrowForward size={20} /></span></Link></td>
              </tr>
              <tr className='bg-white rounded-lg'>
                <td><Link href={'/'} className='flex xl:gap-x-24 items-center py-2 pl-2'><span className='xl:w-[300px] lg:w-[250px] w-[230px]'>Offline Villas - 0</span> <span><IoIosArrowForward size={20} /></span></Link></td>
              </tr>
              <tr className='bg-white rounded-lg'>
                <td><Link href={'/'} className='flex xl:gap-x-24 items-center py-2 pl-2'><span className='xl:w-[300px] lg:w-[250px] w-[230px]'>Total Villas - 0</span> <span><IoIosArrowForward size={20} /></span></Link></td>
              </tr>
              <tr className='bg-white rounded-lg'>
                <td><Link href={'/'} className='flex xl:gap-x-24 items-center py-2 pl-2'><span className='xl:w-[300px] lg:w-[250px] w-[230px]'>Upcoming Bookings - 0</span> <span><IoIosArrowForward size={20} /></span></Link></td>
              </tr>
              <tr className='bg-white rounded-lg'>
                <td><Link href={'/'} className='flex xl:gap-x-24 items-center py-2 pl-2'><span className='xl:w-[300px] lg:w-[250px] w-[230px]'>Cancelled Bookings - 0</span> <span><IoIosArrowForward size={20} /></span></Link></td>
              </tr>
              <tr className='bg-white rounded-lg'>
                <td><Link href={'/'} className='flex xl:gap-x-24 items-center py-2 pl-2'><span className='xl:w-[300px] lg:w-[250px] w-[230px]'>In-House - 0</span> <span><IoIosArrowForward size={20} /></span></Link></td>
              </tr>

            </tbody>
          </table>
          <table className="table-auto text-left bg-gray-100 rounded-lg p-4  pl-2">
            <thead className='pl-3'>
              <tr>
                <th className='pl-3 py-2'>Homestays</th>
              </tr>
            </thead>
            <tbody className='flex flex-col gap-3 p-2'>
              <tr className='bg-white rounded-lg'>
                <td className=''><Link href={'/ '} className='flex xl:gap-x-24 items-center py-2 pl-2'><span className='xl:w-[300px] lg:w-[250px] w-[230px]'>Total Homestays - 0</span> <span><IoIosArrowForward size={20} /></span></Link></td>
              </tr>
              <tr className='bg-white rounded-lg'>
                <td><Link href={'/'} className='flex xl:gap-x-24 items-center py-2 pl-2'><span className='xl:w-[300px] lg:w-[250px] w-[230px]'>Online Homestays - 0</span> <span><IoIosArrowForward size={20} /></span></Link></td>
              </tr>
              <tr className='bg-white rounded-lg'>
                <td><Link href={'/'} className='flex xl:gap-x-24 items-center py-2 pl-2'><span className='xl:w-[300px] lg:w-[250px] w-[230px]'>Offline Homestays - 0</span> <span><IoIosArrowForward size={20} /></span></Link></td>
              </tr>
              <tr className='bg-white rounded-lg'>
                <td><Link href={'/'} className='flex xl:gap-x-24 items-center py-2 pl-2'><span className='xl:w-[300px] lg:w-[250px] w-[230px]'>Total Homestays - 0</span> <span><IoIosArrowForward size={20} /></span></Link></td>
              </tr>
              <tr className='bg-white rounded-lg'>
                <td><Link href={'/'} className='flex xl:gap-x-24 items-center py-2 pl-2'><span className='xl:w-[300px] lg:w-[250px] w-[230px]'>Upcoming Bookings - 0</span> <span><IoIosArrowForward size={20} /></span></Link></td>
              </tr>
              <tr className='bg-white rounded-lg'>
                <td><Link href={'/'} className='flex xl:gap-x-24 items-center py-2 pl-2'><span className='xl:w-[300px] lg:w-[250px] w-[230px]'>Cancelled Bookings - 0</span> <span><IoIosArrowForward size={20} /></span></Link></td>
              </tr>
              <tr className='bg-white rounded-lg'>
                <td><Link href={'/'} className='flex xl:gap-x-24 items-center py-2 pl-2'><span className='xl:w-[300px] lg:w-[250px] w-[230px]'>In-House - 0</span> <span><IoIosArrowForward size={20} /></span></Link></td>
              </tr>

            </tbody>
          </table>
          <table className="table-auto text-left bg-gray-100 rounded-lg p-4  pl-2">
            <thead className='pl-3'>
              <tr>
                <th className='pl-3 py-2'>Buses</th>
              </tr>
            </thead>
            <tbody className='flex flex-col gap-3 p-2'>
              <tr className='bg-white rounded-lg'>
                <td className=''><Link href={'/ '} className='flex xl:gap-x-24 items-center py-2 pl-2'><span className='xl:w-[300px] lg:w-[250px] w-[230px]'>Total Buses - 0</span> <span><IoIosArrowForward size={20} /></span></Link></td>
              </tr>
              <tr className='bg-white rounded-lg'>
                <td><Link href={'/'} className='flex xl:gap-x-24 items-center py-2 pl-2'><span className='xl:w-[300px] lg:w-[250px] w-[230px]'>Online Buses - 0</span> <span><IoIosArrowForward size={20} /></span></Link></td>
              </tr>
              <tr className='bg-white rounded-lg'>
                <td><Link href={'/'} className='flex xl:gap-x-24 items-center py-2 pl-2'><span className='xl:w-[300px] lg:w-[250px] w-[230px]'>Offline Buses - 0</span> <span><IoIosArrowForward size={20} /></span></Link></td>
              </tr>
              <tr className='bg-white rounded-lg'>
                <td><Link href={'/'} className='flex xl:gap-x-24 items-center py-2 pl-2'><span className='xl:w-[300px] lg:w-[250px] w-[230px]'>Total Buses - 0</span> <span><IoIosArrowForward size={20} /></span></Link></td>
              </tr>
              <tr className='bg-white rounded-lg'>
                <td><Link href={'/'} className='flex xl:gap-x-24 items-center py-2 pl-2'><span className='xl:w-[300px] lg:w-[250px] w-[230px]'>Upcoming Bookings - 0</span> <span><IoIosArrowForward size={20} /></span></Link></td>
              </tr>
              <tr className='bg-white rounded-lg'>
                <td><Link href={'/'} className='flex xl:gap-x-24 items-center py-2 pl-2'><span className='xl:w-[300px] lg:w-[250px] w-[230px]'>Cancelled Bookings - 0</span> <span><IoIosArrowForward size={20} /></span></Link></td>
              </tr>
              <tr className='bg-white rounded-lg'>
                <td><Link href={'/'} className='flex xl:gap-x-24 items-center py-2 pl-2'><span className='xl:w-[300px] lg:w-[250px] w-[230px]'>In-House - 0</span> <span><IoIosArrowForward size={20} /></span></Link></td>
              </tr>

            </tbody>
          </table>
          
          


        </div>
      </div>

    </CommonLayout>
  );
};

export default ComponentName;