'use client';
import { useState } from "react";
import { useRouter } from 'next/navigation'
import axios from "axios";

export default function LoginForm() {
    const [username, setUsername] = useState("");
    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post("https://assignment.stage.crafto.app/login", {
                username,
                otp,
            });
            if(response.status !== 200) {
                throw new Error("Login failed. Check your credentials.");
            }
            localStorage.setItem("token", response.data.token);
            axios.defaults.headers.common['Authorization'] = `${response.data.token}`;
            router.push("/quotes");
        } catch (error) {
            alert("Login failed. Check your credentials.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                    Username
                </label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="mt-1 p-2 w-full border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    required
                />
            </div>
            <div className="mb-6">
                <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
                    OTP
                </label>
                <input
                    type="password"
                    id="otp"
                    name="otp"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="mt-1 p-2 w-full border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    required
                />
            </div>
            <button
                type="submit"
                disabled={loading}
                className={`w-full py-2 px-4 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition ${
                    loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
            >
                {loading ? "Logging in..." : "Login"}
            </button>
        </form>
    );
}
