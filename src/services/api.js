// src/services/api.js
import axios from "axios";

const API_URL = "http://localhost:5007";

const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

// Request interceptor
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("adminToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("adminToken");
      localStorage.removeItem("adminData");
      window.location.href = "/admin-login";
    }
    return Promise.reject(error);
  }
);

// API Endpoints - Updated for Admin model
export const API_ENDPOINTS = {
  // ========== AUTH (Admin) ==========
  ADMIN_LOGIN: `${API_URL}/api/auth/login`,  // Your login endpoint
  ADMIN_LOGOUT: `${API_URL}/api/auth/logout`,
  GET_ME: `${API_URL}/api/auth/me`,
  
  // ========== ADMIN MANAGEMENT ==========
  GET_ADMINS: `${API_URL}/api/auth/admins`,
  GET_ADMIN: (id) => `${API_URL}/api/auth/admin/${id}`,
  CREATE_ADMIN: `${API_URL}/api/auth/admin/create`,
  DELETE_ADMIN: (id) => `${API_URL}/api/auth/admin/${id}`,
  UPDATE_ADMIN_ROLE: (id) => `${API_URL}/api/auth/admin/${id}/role`,
  
  // ========== TICKETS (Need to create these endpoints) ==========
  GET_TICKETS: (params) => `${API_URL}/api/tickets${params ? `?${new URLSearchParams(params)}` : ''}`,
  GET_TICKET: (id) => `${API_URL}/api/tickets/${id}`,
  CREATE_TICKET: `${API_URL}/api/tickets`,
  UPDATE_TICKET: (id) => `${API_URL}/api/tickets/${id}`,
  DELETE_TICKET: (id) => `${API_URL}/api/tickets/${id}`,
  UPDATE_TICKET_STATUS: (id) => `${API_URL}/api/tickets/${id}/status`,
  UPDATE_TICKET_PRIORITY: (id) => `${API_URL}/api/tickets/${id}/priority`,
  
  // ========== QUOTES ==========
  GET_QUOTES: `${API_URL}/api/quotes`,
  GET_QUOTE: (id) => `${API_URL}/api/quotes/${id}`,
  CREATE_QUOTE: `${API_URL}/api/quotes`,
  UPDATE_QUOTE_STATUS: (id) => `${API_URL}/api/quotes/${id}/status`,
  DELETE_QUOTE: (id) => `${API_URL}/api/quotes/${id}`,
  
  // ========== CONTACTS ==========
  GET_CONTACTS: `${API_URL}/api/contact`,
  GET_CONTACT: (id) => `${API_URL}/api/contact/${id}`,
  UPDATE_CONTACT_STATUS: (id) => `${API_URL}/api/contact/${id}/status`,
  DELETE_CONTACT: (id) => `${API_URL}/api/contact/${id}`,
  
  // ========== MONITORING ==========
  GET_DEVICES: (businessId) => `${API_URL}/api/monitor/status/${businessId}`,
  UPDATE_DEVICE_STATUS: (deviceId) => `${API_URL}/api/monitor/device/${deviceId}/status`,
  
  // ========== REPORTS ==========
  GET_REPORTS: `${API_URL}/api/reports`,
  DOWNLOAD_REPORT: (id) => `${API_URL}/api/reports/${id}/download`,
  
  // ========== DEBUG ==========
  DEBUG_RESET: (email) => `${API_URL}/api/auth/debug-reset/${email}`,
  DEBUG_EMAILS: `${API_URL}/api/auth/debug-emails`,
};

export default api;
export { API_URL };