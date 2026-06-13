// src/services/auth.api.js
import api from "./api";

export const LoginPage = async (email, password) => {
  try {
    // ✅ FIXED: Add /api prefix
    const response = await api.post("/api/auth/login", { email, password });
    
    if (response.data.success) {
      return {
        success: true,
        data: response.data.user || response.data.data,
        token: response.data.token,
        role: response.data.user?.role || response.data.role || "user",
        message: response.data.message,
      };
    }
    
    return {
      success: false,
      message: response.data.message || "Login failed",
    };
  } catch (error) {
    console.error("Login API error:", error);
    return {
      success: false,
      message: error.response?.data?.message || "Network error. Please try again.",
    };
  }
};

export const RegisterUser = async (userData) => {
  try {
    const response = await api.post("/api/auth/register", userData);
    return response.data;
  } catch (error) {
    console.error("Register error:", error);
    throw error;
  }
};

export const RegisterAdmin = async (adminData) => {
  try {
    const response = await api.post("/api/auth/register-admin", adminData);
    return response.data;
  } catch (error) {
    console.error("Admin register error:", error);
    throw error;
  }
};