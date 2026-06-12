import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, LockIcon, Shield, Eye, EyeOff, AlertCircle } from "lucide-react";
import axios from "axios";
import logo from "../assets/images/logo.jpeg";

export default function Signup() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
    secretKey: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
    setSuccess("");
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError("Full name is required");
      return false;
    }
    if (!formData.email.match(/^\S+@\S+\.\S+$/)) {
      setError("Please enter a valid email address");
      return false;
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return false;
    }
    
    // Only admin role requires secret key
    if (formData.role === "admin" && !formData.secretKey) {
      setError("Secret key is required for admin registration");
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
      setSuccess("");

      const API_URL = "http://localhost:5007"; // Changed to 5007 to match your backend
      
      let response;
      
      // Different endpoints for user and admin registration
      if (formData.role === "admin") {
        // Admin registration
        response = await axios.post(`${API_URL}/api/auth/register-admin`, {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          secretKey: formData.secretKey,
        });
      } else {
        // User registration
        response = await axios.post(`${API_URL}/api/auth/register`, {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        });
      }

      if (response.data.success) {
        if (formData.role === "admin") {
          setSuccess("Admin account created successfully! Redirecting to dashboard...");
          // Store token for admin
          if (response.data.token) {
            localStorage.setItem("adminToken", response.data.token);
            localStorage.setItem("adminData", JSON.stringify(response.data.admin || response.data.data));
          }
          setTimeout(() => {
            navigate("/admin-dashboard");
          }, 2000);
        } else {
          setSuccess("Account created successfully! Redirecting to login...");
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        }

        // Reset form
        setFormData({
          name: "",
          email: "",
          password: "",
          role: "user",
          secretKey: "",
        });
      }
    } catch (error) {
      console.error("Signup error:", error);
      
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else if (error.response?.data?.errors) {
        // Handle validation errors
        const errors = error.response.data.errors;
        if (Array.isArray(errors)) {
          setError(errors[0].msg || "Validation failed");
        } else {
          setError("Validation failed. Please check your inputs.");
        }
      } else if (error.request) {
        setError("Unable to connect to server. Please check if backend is running on port 5007");
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-blue-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-6xl bg-white rounded-[32px] shadow-2xl overflow-hidden grid lg:grid-cols-2">
        {/* LEFT SIDE */}
        <div className="p-8 md:p-12 lg:p-14">
          <img src={logo} alt="Innovexa" className="h-16 mb-10" />

          <h1 className="text-4xl font-bold text-[#0D47A1] mb-3">
            Create Your Account
          </h1>

          <p className="text-gray-500 mb-10">
            Join Innovexa Softwares and start managing your
            projects, support tickets, and business operations.
          </p>

          {/* Success Message */}
          {success && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded-xl text-sm flex items-start gap-2">
              <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
              <span>{success}</span>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm flex items-start gap-2">
              <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div className="relative py-2">
              <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full Name"
                className="w-full h-14 pl-12 pr-4 rounded-xl border border-gray-200 focus:border-[#0D47A1] outline-none focus:ring-2 focus:ring-[#0D47A1]/20 transition-all"
                required
              />
            </div>

            {/* Email */}
            <div className="relative py-2">
              <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address"
                className="w-full h-14 pl-12 pr-4 rounded-xl border border-gray-200 focus:border-[#0D47A1] outline-none focus:ring-2 focus:ring-[#0D47A1]/20 transition-all"
                required
              />
            </div>

            {/* Password */}
            <div className="relative py-2">
              <LockIcon size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password (min 6 characters)"
                className="w-full h-14 pl-12 pr-12 rounded-xl border border-gray-200 focus:border-[#0D47A1] outline-none focus:ring-2 focus:ring-[#0D47A1]/20 transition-all"
                required
                minLength="6"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* Role Selection */}
            <div className="relative py-2">
              <Shield size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full h-14 pl-12 pr-4 rounded-xl border border-gray-200 focus:border-[#0D47A1] outline-none bg-white cursor-pointer focus:ring-2 focus:ring-[#0D47A1]/20 transition-all"
              >
                <option value="user">Register as User</option>
                <option value="admin">Register as Admin</option>
              </select>
            </div>

            {/* Secret Key - ONLY for Admin Role */}
            {formData.role === "admin" && (
              <div className="relative py-2">
                <Shield size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  name="secretKey"
                  value={formData.secretKey}
                  onChange={handleChange}
                  placeholder="Admin Secret Key *"
                  className="w-full h-14 pl-12 pr-4 rounded-xl border border-gray-200 focus:border-[#0D47A1] outline-none focus:ring-2 focus:ring-[#0D47A1]/20 transition-all"
                  required={formData.role === "admin"}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Only required for admin registration. Contact system administrator for secret key.
                </p>
              </div>
            )}

            {/* Terms */}
            <label className="flex items-center gap-3 text-sm py-2 text-gray-600">
              <input type="checkbox" required className="w-4 h-4" />
              I agree to the Terms & Conditions
            </label>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-14 rounded-xl bg-[#0D47A1] hover:bg-[#08357F] text-white font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating Account...
                </span>
              ) : (
                formData.role === "admin" ? "Register as Admin" : "Create Account"
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-gray-600">
            Already have an account?
            <Link to="/login" className="ml-2 text-[#E53935] font-semibold hover:underline">
              Login
            </Link>
          </p>
        </div>

        {/* RIGHT SIDE - Preview */}
        <div className="hidden lg:flex relative overflow-hidden bg-gradient-to-br from-[#0D47A1] via-[#1565C0] to-[#0D47A1] items-center justify-center">
          <div className="absolute top-0 right-0 w-72 h-72 bg-[#E53935]/30 blur-3xl rounded-full" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-white/10 blur-3xl rounded-full" />
          <div className="relative z-10 w-[85%] bg-white rounded-3xl shadow-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-[#0D47A1]">Innovexa Dashboard</h3>
              <div className="h-3 w-3 rounded-full bg-[#E53935]" />
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-blue-50 rounded-2xl p-5">
                <h4 className="text-3xl font-bold text-[#0D47A1]">128</h4>
                <p className="text-sm text-gray-500">Active Projects</p>
              </div>
              <div className="bg-red-50 rounded-2xl p-5">
                <h4 className="text-3xl font-bold text-[#E53935]">56</h4>
                <p className="text-sm text-gray-500">Support Tickets</p>
              </div>
            </div>
            <div className="bg-gray-100 rounded-2xl h-40 mb-4 flex items-end gap-3 p-5">
              <div className="bg-[#0D47A1] w-6 h-16 rounded-t" />
              <div className="bg-[#0D47A1] w-6 h-24 rounded-t" />
              <div className="bg-[#E53935] w-6 h-32 rounded-t" />
              <div className="bg-[#0D47A1] w-6 h-20 rounded-t" />
              <div className="bg-[#E53935] w-6 h-28 rounded-t" />
              <div className="bg-[#0D47A1] w-6 h-36 rounded-t" />
            </div>
            <p className="text-xs text-gray-400 text-center">Real-time analytics dashboard</p>
          </div>
        </div>
      </div>
    </section>
  );
}