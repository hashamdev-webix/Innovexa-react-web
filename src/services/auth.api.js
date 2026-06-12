// src/services/auth.api.js
import api, { API_ENDPOINTS } from "./api";

export const LoginPage = async (email, password) => {
    try {
        const response = await api.post(API_ENDPOINTS.ADMIN_LOGIN, {
            email,
            password
        });
        
        console.log("Login Response:", response.data); // Debug log
        
        if (response.data.success) {
            // Extract user data correctly
            const userData = response.data.user || response.data.data;
            const token = response.data.token;
            
            // Get role from response - IMPORTANT
            const userRole = userData?.role || response.data.role || "user";
            
            console.log("User Role from API:", userRole); // Debug log
            
            return {
                success: true,
                token: token,
                data: userData,
                role: userRole
            };
        } else {
            return {
                success: false,
                message: response.data.message || "Login failed"
            };
        }
    } catch (error) {
        console.error("Login API error:", error);
        
        if (error.response?.data?.message) {
            return {
                success: false,
                message: error.response.data.message
            };
        }
        
        return {
            success: false,
            message: "Network error. Please try again."
        };
    }
};

// Get current user role
export const getCurrentUserRole = () => {
    const adminToken = localStorage.getItem("adminToken");
    const userToken = localStorage.getItem("userToken");
    const userRole = localStorage.getItem("userRole");
    
    if (adminToken && userRole === "admin") {
        return { role: "admin", isLoggedIn: true };
    }
    
    if (userToken && userRole === "user") {
        return { role: "user", isLoggedIn: true };
    }
    
    return { role: null, isLoggedIn: false };
};

// Logout function
export const logout = () => {
    localStorage.clear();
    window.location.href = "/";
};