'use client';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function LogoutButton() {
    const router = useRouter();
    return (
        <button
            onClick={() => {
                localStorage.removeItem("token");
                delete axios.defaults.headers.common["Authorization"];
                router.push("/login");
            }}
        >
            Logout
        </button>
    )
}