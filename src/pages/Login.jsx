// src/pages/Login.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, AlertCircle } from "lucide-react";
import { LoginPage } from "../services/auth.api";
import logo from "../assets/images/logo.jpeg";

export default function Login() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        setError("");
    };

    const validateForm = () => {
        if (!formData.email.match(/^\S+@\S+\.\S+$/)) {
            setError("Please enter a valid email address");
            return false;
        }
        if (!formData.password) {
            setError("Password is required");
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            setLoading(true);
            setError("");

            const response = await LoginPage(formData.email, formData.password);

            console.log("Full Response:", response); // Debug

            if (response.success) {
                const userData = response.data;
                const token = response.token;
                const userRole = response.role || userData?.role || "user";
                
                console.log("Detected Role:", userRole); // Debug
                
                if (userRole === "admin") {
                    // ✅ ADMIN
                    localStorage.setItem("adminToken", token);
                    localStorage.setItem("adminData", JSON.stringify(userData));
                    localStorage.setItem("userRole", "admin");
                    
                    console.log("Admin logged in, redirecting to /admin-dashboard");
                    navigate("/admin-dashboard");
                    
                } else {
                    // ✅ USER - Fixed redirect
                    localStorage.setItem("userToken", token);
                    localStorage.setItem("userData", JSON.stringify(userData));
                    localStorage.setItem("userRole", "user");
                    
                    console.log(`User logged in, redirecting to home page`);
                    navigate("/home"); // Redirect to home page
                }
                
            } else {
                setError(response.message || "Login failed");
            }

        } catch (error) {
            console.error("Login error:", error);
            setError(error.message || "Invalid email or password. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-blue-50 flex items-center justify-center px-4 py-10">
            <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden grid lg:grid-cols-2">
                {/* Left Side */}
                <div className="hidden lg:flex flex-col justify-center bg-gradient-to-br from-blue-700 to-blue-900 p-12 text-white relative">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/10 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>

                    <img
                        src={logo}
                        alt="Innovexa"
                        className="w-72 bg-white rounded-2xl p-4 mb-8 relative z-10"
                    />

                    <h1 className="text-4xl font-bold mb-4 relative z-10">
                        Welcome Back
                    </h1>

                    <p className="text-blue-100 leading-relaxed relative z-10">
                        Access your Innovexa dashboard, manage support
                        requests, monitor systems, and stay connected
                        with your IT infrastructure.
                    </p>

                    <div className="mt-8 space-y-3 relative z-10">
                        <div className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                            <span className="text-sm text-blue-100">Real-time monitoring</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                            <span className="text-sm text-blue-100">Support ticket management</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                            <span className="text-sm text-blue-100">IT analytics & reports</span>
                        </div>
                    </div>
                </div>

                {/* Right Side */}
                <div className="p-8 md:p-12 flex flex-col justify-center">
                    <div className="lg:hidden flex justify-center mb-8">
                        <img
                            src={logo}
                            alt="Innovexa"
                            className="w-56"
                        />
                    </div>

                    <div className="mb-8">
                        <h2 className="text-3xl font-bold text-gray-900">
                            Sign In
                        </h2>
                        <p className="text-gray-500 mt-2">
                            Enter your credentials to continue
                        </p>
                    </div>

                    {error && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm flex items-start gap-2">
                            <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
                            <span>{error}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-700">
                                Email Address
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="admin@innovexa.com"
                                className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                                required
                            />
                        </div>

                        <div>
                            <div className="flex justify-between mb-2">
                                <label className="text-sm font-medium text-gray-700">
                                    Password
                                </label>
                                <Link
                                    to="/forgot-password"
                                    className="text-sm text-red-600 hover:text-red-700 transition"
                                >
                                    Forgot Password?
                                </Link>
                            </div>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                    className="w-full p-4 pr-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <label className="flex items-center gap-2 py-2 text-sm text-gray-600 cursor-pointer">
                                <input 
                                    type="checkbox" 
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                    className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                />
                                Remember Me
                            </label>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-4 rounded-xl transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Signing In...
                                </span>
                            ) : (
                                "Sign In"
                            )}
                        </button>

                        <div className="text-center pt-2">
                            <p className="text-gray-600">
                                Don't have an account?{" "}
                                <Link
                                    to="/signup"
                                    className="font-semibold text-red-600 hover:text-red-700 transition"
                                >
                                    Sign Up
                                </Link>
                            </p>
                        </div>

                    </form>

                    <div className="mt-8 text-center text-gray-500 text-sm">
                        © 2026 Innovexa Softwares. All rights reserved.
                    </div>
                </div>
            </div>
        </section>
    );
}