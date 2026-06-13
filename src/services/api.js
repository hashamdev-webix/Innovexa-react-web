// src/services/api.js
import axios from "axios";

const API_BASE_URL = "http://localhost:5008";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000,
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("adminToken") || localStorage.getItem("userToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log(`📡 API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error("Request interceptor error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    console.log(`✅ API Response: ${response.config.url} - Status: ${response.status}`);
    return response;
  },
  (error) => {
    console.error(`❌ API Error: ${error.config?.url} -`, error.message);
    
    if (error.code === 'ERR_NETWORK') {
      console.error('⚠️ Backend server is not running!');
    }
    
    if (error.response?.status === 401) {
      localStorage.clear();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// API Endpoints
export const API_ENDPOINTS = {
  // Auth
  LOGIN: "/api/auth/login",
  REGISTER: "/api/auth/register",
  REGISTER_ADMIN: "/api/auth/register-admin",
  GET_USERS: "/api/auth/users",
  DELETE_USER: (id) => `/api/auth/users/${id}`,
  
  // Forgot Password
  FORGOT_PASSWORD: "/api/auth/forgot-password",
  RESET_PASSWORD: (token) => `/api/auth/reset-password/${token}`,
  DEBUG_RESET: (email) => `/api/auth/debug-reset/${email}`,
  VALIDATE_RESET_TOKEN: (token) => `/api/auth/validate-reset-token/${token}`,
  
  // Tickets
  GET_TICKETS: (params) => {
    if (params && Object.keys(params).length) {
      const query = new URLSearchParams(params).toString();
      return `/api/tickets?${query}`;
    }
    return "/api/tickets";
  },
  GET_TICKET: (id) => `/api/tickets/${id}`,
  CREATE_TICKET: "/api/tickets",
  UPDATE_TICKET: (id) => `/api/tickets/${id}`,
  DELETE_TICKET: (id) => `/api/tickets/${id}`,
  
  // Quotes
  GET_QUOTES: "/api/quotes",
  CREATE_QUOTE: "/api/quotes",
  UPDATE_QUOTE_STATUS: (id) => `/api/quotes/${id}/status`,
  DELETE_QUOTE: (id) => `/api/quotes/${id}`,
  
  // Contacts
  GET_CONTACTS: "/api/contact",
  CREATE_CONTACT: "/api/contact",
  UPDATE_CONTACT_STATUS: (id) => `/api/contact/${id}/status`,
  DELETE_CONTACT: (id) => `/api/contact/${id}`,
  
  // Monitor
  GET_MONITOR_STATUS: (businessId) => `/api/monitor/status/${businessId}`,
  ADD_MONITOR_SAMPLE: "/api/monitor/sample-data",
  MONITOR_AGENT: "/api/monitor/agent",
  GET_MONITOR_ALERTS: (businessId) => `/api/monitor/alerts/${businessId}`,
  RESOLVE_MONITOR_ALERT: "/api/monitor/alert/resolve",
  DELETE_MONITOR_DEVICE: (deviceId) => `/api/monitor/device/${deviceId}`,
  
  // Reports
  GET_REPORTS: "/api/reports",
  CREATE_REPORT: "/api/reports",
  GENERATE_REPORT: "/api/reports/generate",
  DELETE_REPORT: (id) => `/api/reports/${id}`,
};

export default api;