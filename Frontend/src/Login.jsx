import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
    FaUser, FaLock, FaSignInAlt, FaUserCog, FaHardHat,
    FaClipboardList
} from 'react-icons/fa'; // Import icons
import RegistrationCard from './RegistrationCard';

function Login() {
    const [userId, setUserId] = useState("");
    const [email, setEmail] = useState(""); // Changed to 'email' for consistency
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [showRegister, setShowRegister] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const role = location.state?.role || "User"; // Default to "User" if no role is passed

    // Determine icon and color based on role
    let roleIcon;
    let iconColorClass;
    let headingColorClass;
    let buttonBgClass;

    switch (role) {
        case "Admin":
            roleIcon = <FaUserCog />;
            iconColorClass = "text-teal-600";
            headingColorClass = "text-teal-700";
            buttonBgClass = "bg-teal-500 hover:bg-teal-600";
            break;
        case "Worker":
            roleIcon = <FaHardHat />;
            iconColorClass = "text-orange-500";
            headingColorClass = "text-orange-600";
            buttonBgClass = "bg-orange-500 hover:bg-orange-600";
            break;
        case "Supervisor":
            roleIcon = <FaClipboardList />;
            iconColorClass = "text-purple-600";
            headingColorClass = "text-purple-700";
            buttonBgClass = "bg-purple-500 hover:bg-purple-600";
            break;
        default:
            roleIcon = <FaSignInAlt />; // Default icon for "User" or unknown
            iconColorClass = "text-gray-500";
            headingColorClass = "text-gray-700";
            buttonBgClass = "bg-blue-500 hover:bg-blue-600"; // Default button color
            break;
    }

    const apiUrl = "http://localhost:5000/api/Home/login";

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (email === "" || password === "") { // Changed to 'email'
            setError("Please enter both User ID and Password.");
            return;
        }
        setError("");
        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }), // Changed to 'email'
            });

            if (!response.ok) {
                // Attempt to read error message from backend if available
                const errorData = await response.json();
                throw new Error(errorData.message || 'Network response was not ok');
            }

            const data = await response.json();
            console.log("loginResponse:", data);

            if (data.userId) {
                setUserId(data.userId);
                localStorage.setItem("userId", data.userId); // Store userId in localStorage
            }

            if (data.role) { // Check if data.role exists
                console.log("Login successful. Role:", data.role);
                // Store token or user info if provided by API, e.g., localStorage.setItem('token', data.token);
                if (data.role === "Admin") {
                    navigate("/admin");
                } else if (data.role === "Supervisor") {
                    navigate("/supervisor");
                } else if (data.role === "Worker") {
                    navigate("/worker");
                } else {
                    setError("Unknown role received from server.");
                }
            } else {
                setError("Login successful, but no role received from server.");
            }
        } catch (err) {
            console.error("Login error:", err);
            setError(err.message || "Login failed. Please try again later.");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-teal-50 to-amber-50 animate-gradient-xy">
            {/* Show RegistrationCard above the login card if toggled */}
            {showRegister && (
                <div className="mb-6 w-96 max-w-md">
                    <RegistrationCard />
                </div>
            )}
            <div className="bg-white p-8 rounded-2xl shadow-xl w-96 max-w-md transform transition-all duration-300 hover:shadow-2xl hover:scale-[1.01]">
                <div className="flex flex-col items-center mb-8">
                    <span className={`text-6xl mb-4 ${iconColorClass}`}>
                        {roleIcon}
                    </span>
                    <h2 className={`text-4xl font-extrabold
${headingColorClass} tracking-tight`}>
                        {role} Login
                    </h2>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label htmlFor="email" className="block
text-gray-700 text-sm font-semibold mb-2">
                            <FaUser className="inline-block mr-2
text-gray-500" /> User ID (Email)
                        </label>
                        <input
                            type="email" // Changed type to email for
                            better input validation
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border
border-gray-300 rounded-lg focus:outline-none
                                       focus:ring-2
focus:ring-blue-300 focus:border-transparent transition-all
duration-200"
                            autoFocus
                            placeholder="your.email@example.com"
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-gray-700 text-sm font-semibold mb-2">
                            <FaLock className="inline-block mr-2 text-gray-500" /> Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all duration-200"
                            placeholder="••••••••"
                        />
                    </div>
                    {/* Register new worker link */}
                    {role === "Worker" && (
                        <div className="mb-6 text-right">
                            <button
                                type="button"
                                className="text-blue-600 hover:underline text-sm"
                                onClick={() => setShowRegister((prev) => !prev)}
                            >
                                {showRegister ? "Hide Registration" : "Register new worker"}
                            </button>
                        </div>
                    )}
                    {error && (
                        <div className="bg-red-100 border
border-red-400 text-red-700 px-4 py-3 rounded relative mb-6"
                            role="alert">
                            <span className="block sm:inline">{error}</span>
                        </div>
                    )}
                    <button
                        type="submit"
                        className={`w-full py-3 rounded-lg text-white
font-bold text-lg
                                   ${buttonBgClass} transition-all duration-300
                                   focus:outline-none focus:ring-4
focus:ring-blue-300 focus:ring-opacity-50`}
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login