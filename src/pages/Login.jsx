import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const user = JSON.parse(localStorage.getItem("user"));

    function handleLogin() {
        // Simulasi login sederhana
        if (username === user?.username && password === user?.password) {
            localStorage.setItem("isAuthenticated", "true");
            localStorage.setItem("role", user.role);

            if (user.role === "admin") {
                navigate("/admin/dashboard");
            } else {
                navigate("/dashboard");
            }
            } else {
                navigate("/401");
            }
    }

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-96">
                <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
                <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                            placeholder="Enter your username"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Login
                        </button>
                        <p className="text-sm text-center mt-4">
                            Belum punya akun? <a href="/signup" className="text-blue-600 hover:underline">Daftar</a>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}
