// src/pages/ForgotPassword.js
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, ArrowLeft, AlertCircle, CheckCircle, Shield } from "lucide-react";
import logo from "../assets/images/logo.jpeg";
import api, { API_URL, API_ENDPOINTS } from "../services/api"; // ← Import api instance and endpoints

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      setError("Please enter your email address");
      return;
    }

    if (!email.match(/^\S+@\S+\.\S+$/)) {
      setError("Please enter a valid email address");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      // Using api instance instead of axios directly
      const debugRes = await api.get(API_ENDPOINTS.DEBUG_RESET(email));
      
      if (debugRes.data.success && debugRes.data.resetUrl) {
        setSuccess("Reset link generated! Redirecting to reset password page...");
        
        // Extract token from resetUrl and navigate properly
        const urlParts = debugRes.data.resetUrl.split('/');
        const token = urlParts[urlParts.length - 1];
        
        // 2 second baad reset page par redirect using navigate
        setTimeout(() => {
          navigate(`/reset-password/${token}`);
        }, 1500);
      } else {
        setError(debugRes.data.message || "Email not found. Please check your email address.");
      }
    } catch (err) {
      console.error("Forgot password error:", err);
      setError(err.response?.data?.message || "Unable to process request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-blue-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <img src={logo} alt="Innovexa" className="h-16 mx-auto" />
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="h-1 bg-gradient-to-r from-blue-500 to-blue-600"></div>
          
          <div className="p-8">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <Shield size={28} className="text-blue-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Forgot Password?</h1>
              <p className="text-gray-500 text-sm mt-2">
                Enter your email address to reset your password.
              </p>
              {/* Debug info - shows which API is being used */}
              <p className="text-xs text-gray-400 mt-2">
                Backend API: {API_URL}
              </p>
            </div>

            {success && (
              <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-xl">
                <div className="flex items-start gap-3">
                  <CheckCircle size={18} className="text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-green-800 font-medium">{success}</p>
                    <p className="text-green-600 text-sm mt-1">Redirecting...</p>
                  </div>
                </div>
              </div>
            )}

            {error && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl">
                <div className="flex items-start gap-3">
                  <AlertCircle size={18} className="text-red-600 flex-shrink-0 mt-0.5" />
                  <p className="text-red-700">{error}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <div className="relative">
                  <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="starshahzaib2@gmail.com"
                    className="w-full h-12 pl-12 pr-4 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none transition"
                    required
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Available emails: starshahzaib2@gmail.com, ahmad@gmail.com
                </p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="my-3 w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  "Send Reset Link"
                )}
              </button>

              <div className="text-center">
                <Link to="/login" className="text-sm text-gray-600 hover:text-blue-600 inline-flex items-center gap-1">
                  <ArrowLeft size={14} />
                  Back to Login
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}