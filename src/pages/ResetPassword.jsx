import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { Lock, Eye, EyeOff, AlertCircle, CheckCircle, ArrowLeft, Shield } from "lucide-react";
import logo from "../assets/images/logo.jpeg";

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [validating, setValidating] = useState(true);
  const [isValidToken, setIsValidToken] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [passwordStrength, setPasswordStrength] = useState(0);

  const API_URL = "http://localhost:5007";

  useEffect(() => {
    if (token) {
      validateToken();
    } else {
      setError("Invalid reset link. Token not found.");
      setValidating(false);
    }
  }, [token]);

  useEffect(() => {
    let strength = 0;
    if (password.length >= 6) strength++;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    setPasswordStrength(Math.min(strength, 4));
  }, [password]);

  const validateToken = async () => {
    try {
      setValidating(true);
      const response = await axios.get(`${API_URL}/api/auth/validate-reset-token/${token}`);
      
      if (response.data.success) {
        setIsValidToken(true);
        setError("");
      } else {
        setIsValidToken(false);
        setError(response.data.message || "Invalid or expired reset link. Please request a new one.");
      }
    } catch (err) {
      console.error("Token validation error:", err);
      setIsValidToken(false);
      setError("Invalid or expired reset link. Please request a new one.");
    } finally {
      setValidating(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await axios.post(`${API_URL}/api/auth/reset-password/${token}`, {
        password,
        confirmPassword,
      });

      if (response.data.success) {
        setSuccess("Password reset successful! Redirecting to login...");
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      } else {
        setError(response.data.message || "Failed to reset password");
      }
    } catch (err) {
      console.error("Reset password error:", err);
      setError(err.response?.data?.message || "Failed to reset password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getStrengthText = () => {
    switch(passwordStrength) {
      case 1: return { text: "Weak", color: "text-red-500", bg: "bg-red-500" };
      case 2: return { text: "Fair", color: "text-yellow-500", bg: "bg-yellow-500" };
      case 3: return { text: "Good", color: "text-blue-500", bg: "bg-blue-500" };
      case 4: return { text: "Strong", color: "text-green-500", bg: "bg-green-500" };
      default: return { text: "", color: "", bg: "bg-gray-200" };
    }
  };

  const strength = getStrengthText();

  if (validating) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Validating reset link...</p>
        </div>
      </div>
    );
  }

  if (!isValidToken) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-blue-50 flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="text-red-500 mb-4">
              <AlertCircle size={48} className="mx-auto" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Invalid Reset Link</h2>
            <p className="text-gray-500 mb-6">{error}</p>
            <Link
              to="/forgot-password"
              className="inline-block py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition"
            >
              Request New Link
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-blue-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <img src={logo} alt="Innovexa" className="h-16 mx-auto" />
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="h-1 bg-gradient-to-r from-green-500 to-green-600"></div>
          
          <div className="p-8">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <Shield size={28} className="text-green-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Create New Password</h1>
              <p className="text-gray-500 text-sm mt-2">Please enter your new password below.</p>
            </div>

            {success && (
              <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-xl flex items-start gap-3">
                <CheckCircle size={18} className="text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-green-800 font-medium">Password Reset Successful!</p>
                  <p className="text-sm text-green-700 mt-1">{success}</p>
                </div>
              </div>
            )}

            {error && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
                <AlertCircle size={18} className="text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-red-800 font-medium">Error</p>
                  <p className="text-sm text-red-700 mt-1">{error}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                <div className="relative">
                  <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter new password"
                    className="w-full h-12 pl-12 pr-12 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none transition"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>

                {password && (
                  <div className="mt-2">
                    <div className="flex gap-1 h-1.5">
                      {[1, 2, 3, 4].map((level) => (
                        <div key={level} className={`flex-1 rounded-full transition ${level <= passwordStrength ? strength.bg : "bg-gray-200"}`} />
                      ))}
                    </div>
                    {passwordStrength > 0 && (
                      <p className={`text-xs mt-1 ${strength.color}`}>Password Strength: {strength.text}</p>
                    )}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                <div className="relative">
                  <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm your new password"
                    className="w-full h-12 pl-12 pr-4 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none transition"
                    required
                  />
                </div>
                {confirmPassword && password !== confirmPassword && (
                  <p className="text-red-500 text-xs mt-1">Passwords do not match</p>
                )}
              </div>

              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-xs font-medium text-gray-700 mb-2">Password Requirements:</p>
                <ul className="text-xs text-gray-500 space-y-1">
                  <li className={password.length >= 6 ? "text-green-600" : ""}>✓ At least 6 characters</li>
                  <li className={/[A-Z]/.test(password) ? "text-green-600" : ""}>✓ At least one uppercase letter</li>
                  <li className={/[0-9]/.test(password) ? "text-green-600" : ""}>✓ At least one number</li>
                </ul>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Resetting Password...
                  </>
                ) : (
                  "Reset Password"
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