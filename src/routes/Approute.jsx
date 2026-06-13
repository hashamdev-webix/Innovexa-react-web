import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "../pages/Home";
import Services from "../pages/Services";
import Industries from "../pages/Industries";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Quote from "../pages/Quote";
import Platform from "../pages/Platform";
import Login from "../pages/Login";
import InnovexaDashboard from "../dashboard/InnovexaDashboard";
import Signup from "../pages/SignUp";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";

// ============ PROTECTED ROUTE FOR ADMIN ONLY ============
const AdminRoute = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const adminToken = localStorage.getItem("adminToken");
    const userRole = localStorage.getItem("userRole");
    
    // Sirf admin ko access dena hai
    if (adminToken && userRole === "admin") {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return isAdmin ? children : <Navigate to="/" replace />;
};

// ============ PROTECTED ROUTE FOR AUTHENTICATED USERS (Admin + User) ============
const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const adminToken = localStorage.getItem("adminToken");
    const userToken = localStorage.getItem("userToken");
    const hasToken = !!(adminToken || userToken);
    
    setIsAuthenticated(hasToken);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

// ============ PUBLIC ROUTE (Redirect if already logged in) ============
const PublicRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const adminToken = localStorage.getItem("adminToken");
    const userToken = localStorage.getItem("userToken");
    const role = localStorage.getItem("userRole");
    
    const isAuth = !!(adminToken || userToken);
    setIsAuthenticated(isAuth);
    setUserRole(role);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Agar already logged in hai to redirect
  if (isAuthenticated) {
    // Admin hai to dashboard, user hai to home page
    if (userRole === "admin") {
      return <Navigate to="/admin-dashboard" replace />;
    } else {
      return <Navigate to="/" replace />;
    }
  }

  return children;
};

export default function AppRoutes() {
  return (
    <Routes>
      {/* ============ PUBLIC ROUTES (Sab ke liye accessible) ============ */}
      <Route path="/" element={<Home />} />
      <Route path="/platform" element={<Platform />} />
      <Route path="/services" element={<Services />} />
      <Route path="/industries" element={<Industries />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/quote" element={<Quote />} />
      
      
      {/* ============ AUTH ROUTES (Redirect if already logged in) ============ */}
      <Route 
        path="/login" 
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        } 
      />
      <Route 
        path="/signup" 
        element={
          <PublicRoute>
            <Signup />
          </PublicRoute>
        } 
      />

      {/* ============ PASSWORD RESET ROUTES (Public) ============ */}
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
      
      {/* ============ ADMIN ONLY ROUTES ============ */}
      <Route 
        path="/admin-dashboard" 
        element={
          <AdminRoute>
            <InnovexaDashboard />
          </AdminRoute>
        } 
      />
      <Route 
        path="/admin/*" 
        element={
          <AdminRoute>
            <InnovexaDashboard />
          </AdminRoute>
        } 
      />
      
      {/* ============ USER PROTECTED ROUTES (Future use) ============ */}
      <Route 
        path="/user-dashboard" 
        element={
          <ProtectedRoute>
            <div>User Dashboard (Coming Soon)</div>
          </ProtectedRoute>
        } 
      />
      
      {/* ============ FALLBACK ROUTE - 404 ============ */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}