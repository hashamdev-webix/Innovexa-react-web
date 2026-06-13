import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Ticket, Mail, Phone, User, LogOut, LayoutDashboard, FileText } from "lucide-react";
import logo from "../assets/images/logo.jpeg";

const Navbar = () => {
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");

    useEffect(() => {
        checkAuthStatus();
        window.addEventListener("storage", checkAuthStatus);
        return () => window.removeEventListener("storage", checkAuthStatus);
    }, []);

    const checkAuthStatus = () => {
        const userToken = localStorage.getItem("userToken");
        const adminToken = localStorage.getItem("adminToken");
        const userRole = localStorage.getItem("userRole");
        const userData = localStorage.getItem("userData");
        const adminData = localStorage.getItem("adminData");
        
        const loggedIn = !!(userToken || adminToken);
        setIsLoggedIn(loggedIn);
        
        const isUserAdmin = userRole === "admin";
        setIsAdmin(isUserAdmin);
        
        if (userData) {
            try {
                const data = JSON.parse(userData);
                setUserName(data.name || data.fullName || "User");
                setUserEmail(data.email || "");
            } catch (e) {}
        } else if (adminData) {
            try {
                const data = JSON.parse(adminData);
                setUserName(data.name || data.adminName || "Admin");
                setUserEmail(data.email || "");
            } catch (e) {}
        } else {
            setUserName("");
            setUserEmail("");
        }
    };

    const handleLogout = () => {
        localStorage.clear();
        setIsLoggedIn(false);
        setIsAdmin(false);
        setUserName("");
        setUserEmail("");
        navigate("/");
        setMenuOpen(false);
    };

    const handleDashboardClick = (e) => {
        if (e) e.preventDefault();
        const adminToken = localStorage.getItem("adminToken");
        const userRole = localStorage.getItem("userRole");
        
        if (adminToken && userRole === "admin") {
            navigate("/admin-dashboard");
        } else {
            alert("Access denied. Admin only.");
            navigate("/login");
        }
        setMenuOpen(false);
    };

    const getAvatarLetter = () => {
        if (userName && userName.length > 0) {
            return userName.charAt(0).toUpperCase();
        }
        return "U";
    };

    const getAvatarGradient = () => {
        if (isAdmin) {
            return "linear-gradient(135deg, #1a3a8f, #cc2222)";
        }
        return "linear-gradient(135deg, #2563EB, #1a3a8f)";
    };

    const links = [
        { name: "Home", path: "/" },
        { name: "Platform", path: "/platform" },
        { name: "Services", path: "/services" },
        { name: "Industries", path: "/industries" },
        { name: "About", path: "/about" },
        { name: "Contact Us", path: "/contact" },
     
    ];

    return (
        <header className="top-0 left-0 w-full z-50 sticky md:sticky bg-white/90 backdrop-blur-md border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-6">
                <div className="h-20 flex items-center justify-between">

                    {/* Logo */}
                    <Link to="/" className="flex items-center">
                        <img src={logo} alt="Innovexa" className="h-16 w-auto" />
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-8">
                        {links.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className="font-medium text-gray-700 hover:text-blue-600 transition-all duration-200"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </nav>

                    {/* Desktop Buttons */}
                    <div className="hidden lg:flex items-center gap-3">
                       

                        {isLoggedIn ? (
                            <>
                                {/* Dashboard button - only for admin */}
                                {isAdmin && (
                                    <button
                                        onClick={handleDashboardClick}
                                        className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-xl hover:bg-blue-700 transition-all duration-200 cursor-pointer"
                                    >
                                        <LayoutDashboard size={18} />
                                        Dashboard
                                    </button>
                                )}
                                
                                {/* User Avatar */}
                                <div className="flex items-center gap-3">
                                    <div 
                                        className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md"
                                        style={{ background: getAvatarGradient() }}
                                    >
                                        {getAvatarLetter()}
                                    </div>
                                    <div className="hidden md:block">
                                        <p className="text-sm font-semibold text-gray-700 leading-tight">
                                            {userName}
                                        </p>
                                        {isAdmin ? (
                                            <p className="text-xs text-red-500 leading-tight font-medium">
                                                Administrator
                                            </p>
                                        ) : (
                                            <p className="text-xs text-gray-500 leading-tight">
                                                {userEmail}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                
                                {/* Logout Button */}
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center gap-2 border border-red-500 text-red-500 px-5 py-2 rounded-xl hover:bg-red-50 transition-all duration-200"
                                >
                                    <LogOut size={18} />
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className="border border-gray-300 text-gray-700 px-5 py-2 rounded-xl hover:bg-gray-50 hover:text-blue-600 transition-all duration-200"
                                >
                                    Login
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="lg:hidden text-3xl text-gray-700"
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        {menuOpen ? "✕" : "☰"}
                    </button>
                </div>

                {/* Mobile Menu */}
                {menuOpen && (
                    <div className="lg:hidden pb-6">
                        <div className="flex flex-col gap-4 pt-4">
                            {links.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    onClick={() => setMenuOpen(false)}
                                    className="font-medium text-gray-700 hover:text-blue-600 transition py-2"
                                >
                                    {link.name}
                                </Link>
                            ))}
                            
                            
                            
                            {isLoggedIn ? (
                                <>
                                    {/* User Info */}
                                    <div className="flex items-center gap-3 py-4 border-t border-b border-gray-100 my-2">
                                        <div 
                                            className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm"
                                            style={{ background: getAvatarGradient() }}
                                        >
                                            {getAvatarLetter()}
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-700">{userName}</p>
                                            <p className="text-xs text-gray-500">{userEmail}</p>
                                            {isAdmin && (
                                                <p className="text-xs text-red-500 font-medium">Administrator</p>
                                            )}
                                        </div>
                                    </div>
                                    
                                    {/* Mobile Dashboard button - only for admin */}
                                    {isAdmin && (
                                        <button
                                            onClick={handleDashboardClick}
                                            className="flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-xl text-center cursor-pointer"
                                        >
                                            <LayoutDashboard size={18} />
                                            Dashboard
                                        </button>
                                    )}
                                    
                                    {/* Mobile Logout Button */}
                                    <button
                                        onClick={handleLogout}
                                        className="flex items-center justify-center gap-2 border border-red-500 text-red-500 py-3 rounded-xl text-center"
                                    >
                                        <LogOut size={18} />
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link
                                        to="/login"
                                        onClick={() => setMenuOpen(false)}
                                        className="border border-gray-300 text-gray-700 py-3 rounded-xl text-center"
                                    >
                                        Login
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Navbar;