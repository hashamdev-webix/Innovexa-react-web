import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.jpeg";
import { Button } from "../components/Button";

export default function LoginPage() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(formData);
    };

    return (
        <>

           
            <section className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-blue-50 flex items-center justify-center px-4 py-10 over">

                <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden grid lg:grid-cols-2">

                    {/* Left Side */}
                    <div className="hidden lg:flex flex-col justify-center bg-gradient-to-br from-blue-700 to-blue-900 p-12 text-white relative">

                        <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/10 rounded-full blur-3xl"></div>

                        <img
                            src={logo}
                            alt="Innovexa"
                            className="w-72 bg-white rounded-2xl p-4 mb-8"
                        />

                        <h1 className="text-4xl font-bold mb-4">
                            Welcome Back
                        </h1>

                        <p className="text-blue-100 leading-relaxed">
                            Access your Innovexa dashboard, manage support
                            requests, monitor systems, and stay connected
                            with your IT infrastructure.
                        </p>

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

                        <form
                            onSubmit={handleSubmit}
                            className="space-y-5"
                        >

                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-700">
                                    Email Address
                                </label>

                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="john@example.com"
                                    className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
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
                                        className="text-sm text-red-600 hover:text-red-700"
                                    >
                                        Forgot Password?
                                    </Link>
                                </div>

                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                    className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
                                    required
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <label className="flex items-center gap-2 py-2 text-sm text-gray-600">
                                    <input type="checkbox" />
                                    Remember Me
                                </label>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-4 rounded-xl transition duration-300"
                            >
                                Sign In
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
        </>
    );
}