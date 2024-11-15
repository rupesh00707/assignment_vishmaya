import LoginForm from "@/components/LoginForm/LoginForm";

export default function  LoginPage () {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg">
                <h1 className="text-2xl font-semibold text-gray-800 text-center mb-6">Login</h1>
                <LoginForm/>
            </div>
        </div>
    )
}
