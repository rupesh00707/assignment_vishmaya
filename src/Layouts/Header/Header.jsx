// components/ClientHeader.js
"use client";

import { useRouter,usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Header() {
    const pathname = usePathname();
    const router = useRouter();
    const showLogoutButton = pathname === "/quotes";

    const [isMounted, setIsMounted] = useState(false);
    // Ensure the component renders after the router is mounted
    useEffect(() => {
        setIsMounted(true);
    }, []);


    const handleLogout = () => {
        axios.defaults.headers.common["Authorization"] = "";
        localStorage.removeItem("token");
        router.push("/login");
    };

    return (
        <header className="bg-gray-100 text-white p-4 flex justify-between items-center">
            <h1 className="text-xl font-bold  text-black ">Quotes</h1>
            {showLogoutButton && (
                <button
                    onClick={handleLogout}
                    className="bg-gray-100 border-1 rounded-2xl	  px-4 py-2 text-black"
                >
                    Logout
                </button>
            )}
        </header>
    );
}
