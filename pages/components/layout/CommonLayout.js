import React, { useState } from "react";

import Link from "next/link";
function CommonLayout({ Content, children }) {
    const location = "";
    const [islogout, setIsLogout] = useState(false);
    function handleLogout() {
        localStorage.clear()
        // setIsLogout(true)
        window.location.reload(false);


    }
    const links = [
        { to: "/dashboard", icon: "faHome", label: "Dashboard" },
        { to: "/Accounts", icon: "faUser", label: "Accounts" },
        { to: "/Post/New", icon: "faPlus", label: "Create Post" },
        { to: "/Posts", icon: "faFileAlt", label: "All Posts" },
        { to: "/Categories", icon: "faFolder", label: "Categories" },
        { to: "/DeletedPosts", icon: "faTrash", label: "Deleted Posts" },
        //  { to: "/Admin/Categories", icon: faFolder, label: "Categories" },
        // { to: "/Admin/Inbox", icon: faInbox, label: "Inbox" }, 
        // { to: "/Admin/Setting", icon: faCog, label: "Settings" },
        // { to: "/Logout", icon: faSignOutAlt, label: "Logout" },

    ];

    return (
        <>
            <nav className="border-r bg-white h-screen p-4 w-64 pt-10">
                {links.map((link) => (
                    <Link key={link.to} href={link.to} aria-label={link.label}>
                        <div
                            className={`flex items-center text-black-300 hover:text-blue-500 cursor-pointer rounded-md p-2 mb-2 ${location.pathname === link.to ||
                                (location.pathname === "/Admin" && link.to === "/Admin/Dashboard") ? "bg-gray-200" : ""
                                }`}
                        >
                            {/* <FontAwesomeIcon icon={link.icon} className="mr-3 text-indigo-500" /> */}
                            <span>{link.label}</span>
                        </div>
                    </Link>
                ))}
                {/* <p onClick={handleLogout}>Logout</p> */}

                <div
                    className={`flex items-center text-black-300 hover:text-blue-500 cursor-pointer rounded-md p-2 mb-2`}
                >
                    {/* <FontAwesomeIcon icon={faSignOutAlt} className="mr-3 text-indigo-500" /> */}
                    <button onClick={handleLogout}>{"Logout"}</button>
                    {/* {islogout ? <Navigate to="/Login" /> :''} */}
                </div>
            </nav>
            <main className="flex-1 overflow-x-hidden overflow-y-auto p-4">
                {Content || children}
            </main>
        </>
    );
}

export default CommonLayout;
