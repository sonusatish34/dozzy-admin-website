import React from 'react';
import CommonLayout from '../components/layout/CommonLayout';
import Link from 'next/link';
import { IoIosArrowForward } from "react-icons/io";

const ComponentName = (props) => {
    return (
        <CommonLayout>
            <div>
                hiii-farmhouse
                { (
                        <div className="">
                            <ul className="bg-gray-100 w-fit pr-5 flex flex-col gap-3">
                                <li>
                                    <Link className="text-white bg-[#556EE6] text-lg flex items-center gap-16 w-80" href={"/farmhouse/login-but-not-uploaded"}>
                                        <span className="px-6">Login but not uploaded</span><span><IoIosArrowForward /></span>
                                    </Link>
                                </li>
                                <li className="text-white bg-[#556EE6] text-lg flex items-center gap-16 w-80">
                                    {/* <span className="px-6">Pending approvals</span><span><IoIosArrowForward /></span> */}
                                    <Link className="text-white bg-[#556EE6] text-lg flex items-center gap-16 w-80" href={"/farmhouse/pending-approvals"}>
                                        <span className="px-6">Pending approvals</span><span><IoIosArrowForward /></span>
                                    </Link>
                                </li>
                                <li className="text-white bg-[#556EE6] text-lg flex items-center gap-16 w-80">
                                    <span className="px-6">Rejected farmhouses</span><span><IoIosArrowForward /></span>
                                </li>
                            </ul>
                        </div>
                    )}
            </div>
        </CommonLayout>
    );
};

export default ComponentName;