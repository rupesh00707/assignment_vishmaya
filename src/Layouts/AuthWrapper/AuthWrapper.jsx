"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function AuthWrapper({ children }) {
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            axios.defaults.headers.common["Authorization"] = token;
        } else {
            router.push("/login");
        }
    }, [router]);


    return <>{children}</>;
}
