// src/dashboard/InnovexaDashboard.jsx
import { useState, useEffect } from "react";
import {
  LayoutDashboard, Ticket, FileText, Mail, Quote, Users,
  Wifi, Printer, AlertTriangle, CheckCircle, Clock,
  TrendingUp, Activity, Bell, Search, ChevronDown,
  Menu, X, LogOut, Settings, BarChart3, Shield, Eye, Edit,
  Phone, Calendar, DollarSign, Server, Database, Cloud,
  Monitor, Cpu, WifiOff, PrinterCheck, MessageCircle, Trash2, RefreshCw, XCircle
} from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line
} from "recharts";
import api, { API_ENDPOINTS } from "../services/api";

// Brand Colors - Logo ke colors
const C = {
  blue:       "#1a3a8f",   // Logo ka blue
  blueMid:    "#4a7fd4",
  blueLight:  "#e8f0fc",
  red:        "#cc2222",   // Logo ka red
  redLight:   "#fdeaea",
  navy:       "#0d1f5c",
  white:      "#ffffff",
  gray50:     "#f8faff",
  gray100:    "#f0f4ff",
  gray300:    "#c8d4e8",
  gray500:    "#6b7fa8",
  gray700:    "#2d3a5a",
  success:    "#16a34a",
  successBg:  "#dcfce7",
  warning:    "#d97706",
  warningBg:  "#fef3c7",
};

// Chart Colors - Logo colors ke according
const CHART_COLORS = [C.blue, C.red, C.blueMid, C.warning];

const priorityStyle = (p) => {
  const styles = {
    high:     { bg: C.redLight,    color: C.red,     label: "High" },
    medium:   { bg: C.warningBg,   color: C.warning, label: "Medium" },
    low:      { bg: C.blueLight,   color: C.blueMid, label: "Low" },
    critical: { bg: C.redLight,    color: C.red,     label: "Critical" },
  };
  return styles[p?.toLowerCase()] || { bg: C.gray100, color: C.gray500, label: p || "N/A" };
};

const statusStyle = (s) => {
  const styles = {
    "new":         { bg: C.blueLight,   color: C.blue,    label: "New" },
    "open":        { bg: C.redLight,    color: C.red,     label: "Open" },
    "in-progress": { bg: C.warningBg,   color: C.warning, label: "In Progress" },
    "resolved":    { bg: C.successBg,   color: C.success, label: "Resolved" },
    "closed":      { bg: C.gray100,     color: C.gray500, label: "Closed" },
  };
  return styles[s?.toLowerCase()] || { bg: C.gray100, color: C.gray500, label: s || "Unknown" };
};

const Badge = ({ style }) => (
  <span style={{
    background: style.bg, color: style.color,
    padding: "2px 10px", borderRadius: 20,
    fontSize: 11, fontWeight: 700,
  }}>{style.label}</span>
);

const StatCard = ({ icon: Icon, label, value, sub, accent, trend }) => (
  <div style={{
    background: C.white, borderRadius: 14, padding: "20px 22px",
    boxShadow: "0 2px 12px rgba(26,58,143,0.08)",
    borderTop: `3px solid ${accent}`, flex: 1, minWidth: 160,
  }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
      <div>
        <p style={{ fontSize: 12, color: C.gray500, fontWeight: 600, marginBottom: 4 }}>{label}</p>
        <p style={{ fontSize: 30, fontWeight: 800, color: C.navy }}>{value}</p>
        {sub && <p style={{ fontSize: 12, color: C.gray500, marginTop: 6 }}>{sub}</p>}
      </div>
      <div style={{ background: accent + "18", borderRadius: 10, padding: 10 }}>
        <Icon size={22} color={accent} />
      </div>
    </div>
    {trend && <div style={{ marginTop: 10, fontSize: 12, color: C.success, fontWeight: 600 }}>▲ {trend}</div>}
  </div>
);

// Main Dashboard Component
export default function InnovexaDashboard() {
  const [activePage, setActivePage] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [stats, setStats] = useState({});
  const [chartData, setChartData] = useState({});
  const [adminName, setAdminName] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [adminRole, setAdminRole] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [tickets, setTickets] = useState([]);
  const [quotes, setQuotes] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Check if user is admin on mount
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    const userRole = localStorage.getItem("userRole");
    const adminData = localStorage.getItem("adminData");
    
    // Agar admin token nahi hai ya role admin nahi hai to redirect
    if (!token) {
      window.location.href = "/admin-login";
      return;
    }
    
    if (adminData) {
      try {
        const data = JSON.parse(adminData);
        if (data.role !== "admin") {
          window.location.href = "/login";
          return;
        }
        setAdminName(data.name || data.adminName || "Admin");
        setAdminEmail(data.email || "");
        setAdminRole(data.role || "admin");
      } catch (e) {
        setAdminName("Admin");
      }
    } else {
      setAdminName("Admin");
    }
    
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) setSidebarOpen(false);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    
    fetchAllData();
    
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const [ticketsRes, quotesRes, contactsRes] = await Promise.all([
        api.get(API_ENDPOINTS.GET_TICKETS({})).catch(() => ({ data: { data: [] } })),
        api.get(API_ENDPOINTS.GET_QUOTES).catch(() => ({ data: { data: [] } })),
        api.get(API_ENDPOINTS.GET_CONTACTS).catch(() => ({ data: { data: [] } }))
      ]);
      
      const ticketsData = ticketsRes.data?.data || [];
      const quotesData = quotesRes.data?.data || [];
      const contactsData = contactsRes.data?.data || [];
      
      setTickets(ticketsData);
      setQuotes(quotesData);
      setContacts(contactsData);
      
      setStats({
        openTickets: ticketsData.filter(t => ["new", "open", "in-progress"].includes(t.status)).length,
        resolvedTickets: ticketsData.filter(t => t.status === "resolved").length,
        newQuotes: quotesData.filter(q => q.status === "new").length,
        newContacts: contactsData.filter(c => c.status === "new").length,
        monitoredDevices: 24,
        avgUptime: "99.1%",
        recentTickets: ticketsData.slice(0, 5),
        deviceHealth: [
          { name: "Main Office Printer", type: "printer", status: "online" },
          { name: "Downtown Router", type: "router", status: "online" },
          { name: "Front Desk PC", type: "computer", status: "offline" },
          { name: "WiFi Access Point", type: "wifi", status: "online" },
        ]
      });
      
      setChartData({
        ticketTrends: [
          { name: "Mon", tickets: 12 }, { name: "Tue", tickets: 18 },
          { name: "Wed", tickets: 14 }, { name: "Thu", tickets: 22 },
          { name: "Fri", tickets: 16 }, { name: "Sat", tickets: 8 }, { name: "Sun", tickets: 5 }
        ],
        priorityDistribution: [
          { name: "Critical", value: 5 }, { name: "High", value: 12 },
          { name: "Medium", value: 18 }, { name: "Low", value: 8 }
        ]
      });
      
      // Create notifications from new data
      const newTickets = ticketsData.filter(t => t.status === "new");
      const newQuotes = quotesData.filter(q => q.status === "new");
      const newContacts = contactsData.filter(c => c.status === "new");
      
      const notificationList = [
        ...newTickets.map(t => ({ id: t._id, type: "ticket", title: "New Ticket", message: `New ticket from ${t.businessName}`, time: new Date(t.createdAt), read: false })),
        ...newQuotes.map(q => ({ id: q._id, type: "quote", title: "New Quote", message: `Quote request from ${q.businessName}`, time: new Date(q.createdAt), read: false })),
        ...newContacts.map(c => ({ id: c._id, type: "contact", title: "New Contact", message: `Message from ${c.fullName}`, time: new Date(c.createdAt), read: false }))
      ];
      
      notificationList.sort((a, b) => b.time - a.time);
      setNotifications(notificationList.slice(0, 10));
      setUnreadCount(notificationList.length);
      
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  // Search functionality
  const handleSearch = (query) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setSearchResults([]);
      setShowSearchResults(false);
      return;
    }
    
    const lowerQuery = query.toLowerCase();
    const results = [];
    
    tickets.forEach(ticket => {
      if (ticket.businessName?.toLowerCase().includes(lowerQuery) ||
          ticket.issueTitle?.toLowerCase().includes(lowerQuery) ||
          ticket.ticketId?.toLowerCase().includes(lowerQuery)) {
        results.push({ type: "ticket", data: ticket, label: `🎫 Ticket: ${ticket.issueTitle}`, id: ticket._id });
      }
    });
    
    quotes.forEach(quote => {
      if (quote.businessName?.toLowerCase().includes(lowerQuery) ||
          quote.contactPerson?.toLowerCase().includes(lowerQuery)) {
        results.push({ type: "quote", data: quote, label: `📄 Quote: ${quote.businessName}`, id: quote._id });
      }
    });
    
    contacts.forEach(contact => {
      if (contact.fullName?.toLowerCase().includes(lowerQuery) ||
          contact.email?.toLowerCase().includes(lowerQuery) ||
          contact.businessName?.toLowerCase().includes(lowerQuery)) {
        results.push({ type: "contact", data: contact, label: `✉️ Contact: ${contact.fullName}`, id: contact._id });
      }
    });
    
    setSearchResults(results.slice(0, 10));
    setShowSearchResults(true);
  };

  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", id: "dashboard" },
    { icon: Ticket, label: "Tickets", id: "tickets" },
    { icon: Quote, label: "Quotes", id: "quotes" },
    { icon: Mail, label: "Contact", id: "contact" },
    { icon: Activity, label: "Monitoring", id: "monitor" },
    { icon: FileText, label: "Reports", id: "reports" },
  ];

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", background: C.gray50 }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ width: 40, height: 40, border: `3px solid ${C.gray300}`, borderTopColor: C.blue, borderRadius: "50%", animation: "spin 1s linear infinite", margin: "0 auto 16px" }} />
          <p style={{ color: C.gray500 }}>Loading dashboard...</p>
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: C.gray50, minHeight: "100vh", display: "flex" }}>
      {/* Mobile Menu Button */}
      {isMobile && (
        <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{
          position: "fixed", top: 16, left: 16, zIndex: 1001,
          background: C.navy, border: "none", borderRadius: 8,
          padding: 10, cursor: "pointer", boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
        }}>
          <Menu size={20} color={C.white} />
        </button>
      )}

      {/* Sidebar */}
      <div style={{
        width: isMobile ? 250 : (collapsed ? 70 : 250),
        background: C.navy,
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
        zIndex: 1000,
        transform: isMobile && !sidebarOpen ? "translateX(-100%)" : "translateX(0)",
        transition: "transform 0.3s ease, width 0.3s ease",
        boxShadow: "4px 0 20px rgba(13,31,92,0.18)",
        display: "flex",
        flexDirection: "column",
      }}>
        <div style={{
          padding: "20px",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ background: C.red, borderRadius: 8, width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: C.white, fontWeight: 900, fontSize: 14 }}>IX</span>
            </div>
            {(!isMobile && !collapsed) && (
              <div>
                <p style={{ color: C.white, fontWeight: 800, fontSize: 14, margin: 0 }}>Innovexa</p>
                <p style={{ color: C.blueMid, fontSize: 10, margin: 0 }}>SOFTWARES</p>
              </div>
            )}
          </div>
          {!isMobile && (
            <button onClick={() => setCollapsed(!collapsed)} style={{ background: "none", border: "none", cursor: "pointer", color: C.gray300 }}>
              <Menu size={16} />
            </button>
          )}
          {isMobile && (
            <button onClick={() => setSidebarOpen(false)} style={{ background: "none", border: "none", cursor: "pointer", color: C.gray300 }}>
              <X size={18} />
            </button>
          )}
        </div>

        <nav style={{ flex: 1, padding: "12px 8px", overflowY: "auto" }}>
          {navItems.map(({ icon: Icon, label, id }) => (
            <button key={id} onClick={() => { setActivePage(id); if (isMobile) setSidebarOpen(false); }} style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: (collapsed && !isMobile) ? "center" : "flex-start",
              gap: 12,
              padding: (collapsed && !isMobile) ? "12px" : "12px 14px",
              borderRadius: 8,
              marginBottom: 2,
              cursor: "pointer",
              border: "none",
              background: activePage === id ? C.blue : "transparent",
              color: activePage === id ? C.white : C.gray300,
              fontSize: 13,
            }}>
              <Icon size={18} />
              {((!collapsed || isMobile) && label)}
            </button>
          ))}
        </nav>

        <div style={{ padding: "12px 8px", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          <button onClick={() => { localStorage.clear(); window.location.href = "/admin-login"; }} style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: (collapsed && !isMobile) ? "center" : "flex-start",
            gap: 12,
            padding: (collapsed && !isMobile) ? "12px" : "12px 14px",
            borderRadius: 8,
            cursor: "pointer",
            border: "none",
            background: "transparent",
            color: C.gray300,
            fontSize: 13,
          }}>
            <LogOut size={18} />
            {((!collapsed || isMobile) && <span>Logout</span>)}
          </button>
        </div>
      </div>

      {/* Sidebar Overlay */}
      {isMobile && sidebarOpen && (
        <div onClick={() => setSidebarOpen(false)} style={{
          position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
          background: "rgba(0,0,0,0.5)", zIndex: 999,
        }} />
      )}

      {/* Main Content */}
      <div style={{
        marginLeft: isMobile ? 0 : (collapsed ? 70 : 250),
        flex: 1,
        transition: "margin-left 0.3s ease",
        width: isMobile ? "100%" : `calc(100% - ${collapsed ? 70 : 250}px)`,
      }}>
        {/* Top Bar */}
        <div style={{
          height: 60, background: C.white, display: "flex", alignItems: "center",
          padding: isMobile ? "0 16px 0 60px" : "0 24px",
          gap: 16, position: "sticky", top: 0, zIndex: 50,
          boxShadow: "0 1px 8px rgba(26,58,143,0.07)",
          flexWrap: "wrap",
        }}>
          <div style={{ flex: 1 }}>
            <h1 style={{ fontSize: isMobile ? 16 : 20, fontWeight: 800, color: C.navy, margin: 0, textTransform: "capitalize" }}>{activePage}</h1>
          </div>
          
          {/* Search Bar - Working */}
          <div style={{ position: "relative" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, background: C.gray50, borderRadius: 8, padding: "6px 12px", border: `1px solid ${C.gray100}` }}>
              <Search size={14} color={C.gray500} />
              <input 
                type="text" 
                placeholder="Search tickets, quotes, contacts..." 
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                onFocus={() => searchQuery && setShowSearchResults(true)}
                style={{ border: "none", background: "none", outline: "none", fontSize: 13, width: isMobile ? 140 : 220 }} 
              />
              {searchQuery && (
                <button onClick={() => { setSearchQuery(""); setSearchResults([]); setShowSearchResults(false); }} style={{ background: "none", border: "none", cursor: "pointer" }}>
                  <XCircle size={14} color={C.gray500} />
                </button>
              )}
            </div>
            
            {/* Search Results Dropdown */}
            {showSearchResults && (
              <div style={{
                position: "absolute", top: "100%", right: 0, marginTop: 8,
                background: C.white, borderRadius: 12, boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
                width: isMobile ? 300 : 350, maxHeight: 300, overflowY: "auto", zIndex: 100,
                border: `1px solid ${C.gray100}`
              }}>
                {searchResults.length === 0 ? (
                  <div style={{ padding: "16px", textAlign: "center", color: C.gray500 }}>
                    No results found for "{searchQuery}"
                  </div>
                ) : (
                  searchResults.map((result, idx) => (
                    <div key={idx} style={{ 
                      padding: "12px 16px", 
                      borderBottom: `1px solid ${C.gray100}`, 
                      cursor: "pointer",
                      transition: "background 0.15s"
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = C.gray50}
                    onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                    onClick={() => { 
                      setActivePage(result.type === "ticket" ? "tickets" : result.type === "quote" ? "quotes" : "contact"); 
                      setShowSearchResults(false);
                      setSearchQuery("");
                    }}>
                      <div style={{ fontSize: 13, color: C.gray700 }}>{result.label}</div>
                      <div style={{ fontSize: 10, color: C.gray500, marginTop: 4 }}>Click to view in {result.type}s section</div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
          
          {/* Notifications */}
          <div style={{ position: "relative" }}>
            <button onClick={() => setShowNotifications(!showNotifications)} style={{ background: "none", border: "none", cursor: "pointer", position: "relative" }}>
              <Bell size={18} color={C.gray500} />
              {unreadCount > 0 && (
                <div style={{
                  position: "absolute", top: -5, right: -8, background: C.red, color: C.white,
                  fontSize: 9, fontWeight: 700, padding: "2px 5px", borderRadius: 10, minWidth: 16, textAlign: "center"
                }}>{unreadCount}</div>
              )}
            </button>
            
            {showNotifications && (
              <div style={{
                position: "absolute", top: "100%", right: 0, marginTop: 8,
                background: C.white, borderRadius: 12, boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
                width: isMobile ? 300 : 350, maxHeight: 400, overflowY: "auto", zIndex: 100,
              }}>
                <div style={{ padding: "12px 16px", borderBottom: `1px solid ${C.gray100}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <h4 style={{ fontSize: 14, fontWeight: 700, color: C.navy }}>Notifications</h4>
                  <button onClick={() => setShowNotifications(false)} style={{ fontSize: 11, color: C.blueMid, background: "none", border: "none", cursor: "pointer" }}>Close</button>
                </div>
                {notifications.length === 0 ? (
                  <div style={{ padding: "30px 16px", textAlign: "center" }}>
                    <Bell size={24} color={C.gray300} />
                    <p style={{ fontSize: 12, color: C.gray500, marginTop: 8 }}>No new notifications</p>
                  </div>
                ) : (
                  notifications.map((notif, idx) => (
                    <div key={idx} style={{ 
                      padding: "12px 16px", 
                      borderBottom: `1px solid ${C.gray100}`, 
                      background: notif.read ? "transparent" : C.blueLight,
                      cursor: "pointer"
                    }}
                    onClick={() => { 
                      setActivePage(notif.type === "ticket" ? "tickets" : notif.type === "quote" ? "quotes" : "contact"); 
                      setShowNotifications(false);
                    }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        {notif.type === "ticket" && <Ticket size={12} color={C.blue} />}
                        {notif.type === "quote" && <Quote size={12} color={C.blue} />}
                        {notif.type === "contact" && <Mail size={12} color={C.blue} />}
                        <span style={{ fontSize: 12, fontWeight: 600, color: C.gray700 }}>{notif.title}</span>
                        {!notif.read && <span style={{ fontSize: 8, color: C.red, background: C.redLight, padding: "2px 6px", borderRadius: 10 }}>NEW</span>}
                      </div>
                      <p style={{ fontSize: 11, color: C.gray500, marginTop: 4 }}>{notif.message}</p>
                      <p style={{ fontSize: 9, color: C.gray400, marginTop: 4 }}>{new Date(notif.time).toLocaleString()}</p>
                    </div>
                  ))
                )}
                <div style={{ padding: "8px 16px", borderTop: `1px solid ${C.gray100}`, textAlign: "center" }}>
                  <button onClick={fetchAllData} style={{ fontSize: 11, color: C.blueMid, background: "none", border: "none", cursor: "pointer" }}>Refresh</button>
                </div>
              </div>
            )}
          </div>
          
          {/* User Info - Admin */}
          <div style={{ display: "flex", alignItems: "center", gap: isMobile ? 8 : 16 }}>
            <div style={{
              width: 32, height: 32, borderRadius: "50%",
              background: `linear-gradient(135deg, ${C.blue}, ${C.red})`,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <span style={{ color: C.white, fontSize: 12, fontWeight: 700 }}>{adminName?.charAt(0)?.toUpperCase() || "A"}</span>
            </div>
            {!isMobile && (
              <div>
                <p style={{ fontSize: 12, fontWeight: 700, color: C.navy, margin: 0 }}>{adminName}</p>
                <p style={{ fontSize: 10, color: C.gray500, margin: 0 }}>{adminEmail || "Administrator"}</p>
              </div>
            )}
            <ChevronDown size={12} color={C.gray500} />
          </div>
        </div>

        {/* Page Content */}
        <main style={{ padding: isMobile ? 16 : 24 }}>
          {activePage === "dashboard" && (
            <div>
              {/* Stats Cards */}
              <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 24 }}>
                <StatCard icon={Ticket} label="Open Tickets" value={stats.openTickets || 0} sub="Needs attention" accent={C.red} />
                <StatCard icon={CheckCircle} label="Resolved Tickets" value={stats.resolvedTickets || 0} sub="This month" accent={C.success} />
                <StatCard icon={Quote} label="New Quotes" value={stats.newQuotes || 0} sub="Awaiting review" accent={C.blue} />
                <StatCard icon={Mail} label="New Contacts" value={stats.newContacts || 0} sub="Unread" accent={C.warning} />
                <StatCard icon={Monitor} label="Devices" value={stats.monitoredDevices || 0} sub="Active" accent={C.navy} />
                <StatCard icon={Activity} label="Uptime" value={stats.avgUptime || "99.1%"} sub="Last 7 days" accent={C.success} />
              </div>
              
              {/* Charts with Logo Colors */}
              <div style={{ display: "flex", gap: 20, flexWrap: "wrap", marginBottom: 24 }}>
                <div style={{ flex: 2, background: C.white, borderRadius: 14, padding: 20, boxShadow: "0 2px 12px rgba(0,0,0,0.07)" }}>
                  <h3 style={{ fontSize: 14, fontWeight: 700, color: C.navy, marginBottom: 16 }}>Ticket Trends (Last 7 Days)</h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <AreaChart data={chartData.ticketTrends || []}>
                      <CartesianGrid strokeDasharray="3 3" stroke={C.gray100} />
                      <XAxis dataKey="name" stroke={C.gray500} fontSize={12} />
                      <YAxis stroke={C.gray500} fontSize={12} />
                      <Tooltip />
                      <Area type="monotone" dataKey="tickets" stroke={C.blue} fill={`${C.blue}20`} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <div style={{ flex: 1, background: C.white, borderRadius: 14, padding: 20, boxShadow: "0 2px 12px rgba(0,0,0,0.07)" }}>
                  <h3 style={{ fontSize: 14, fontWeight: 700, color: C.navy, marginBottom: 16 }}>Tickets by Priority</h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie data={chartData.priorityDistribution || []} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                        {chartData.priorityDistribution?.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              {/* Recent Activity */}
              <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
                <div style={{ flex: 1, background: C.white, borderRadius: 14, padding: 20 }}>
                  <h3 style={{ fontSize: 14, fontWeight: 700, color: C.navy, marginBottom: 16 }}>Recent Tickets</h3>
                  {stats.recentTickets?.slice(0, 5).map((ticket, idx) => (
                    <div key={idx} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: `1px solid ${C.gray100}` }}>
                      <div>
                        <p style={{ fontSize: 13, fontWeight: 600, color: C.gray700 }}>{ticket.issueTitle}</p>
                        <p style={{ fontSize: 11, color: C.gray500 }}>{ticket.businessName}</p>
                      </div>
                      <Badge style={priorityStyle(ticket.priority)} />
                    </div>
                  ))}
                </div>
                <div style={{ flex: 1, background: C.white, borderRadius: 14, padding: 20 }}>
                  <h3 style={{ fontSize: 14, fontWeight: 700, color: C.navy, marginBottom: 16 }}>Device Health</h3>
                  {stats.deviceHealth?.map((device, idx) => (
                    <div key={idx} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: `1px solid ${C.gray100}` }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        {device.type === "printer" ? <Printer size={16} color={C.gray500} /> : <Wifi size={16} color={C.gray500} />}
                        <span style={{ fontSize: 13, color: C.gray700 }}>{device.name}</span>
                      </div>
                      <span style={{ fontSize: 12, color: device.status === "online" ? C.success : C.red }}>
                        {device.status === "online" ? "● Online" : "○ Offline"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {activePage === "tickets" && (
            <div style={{ background: C.white, borderRadius: 14, padding: 20 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, flexWrap: "wrap", gap: 12 }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: C.navy }}>All Support Tickets</h3>
                <button onClick={fetchAllData} style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 12px", background: C.blue, color: C.white, border: "none", borderRadius: 6, fontSize: 12, cursor: "pointer" }}>
                  <RefreshCw size={12} /> Refresh
                </button>
              </div>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, minWidth: 600 }}>
                  <thead>
                    <tr style={{ borderBottom: `1px solid ${C.gray100}` }}>
                      <th style={{ textAlign: "left", padding: "12px 8px" }}>ID</th>
                      <th style={{ textAlign: "left", padding: "12px 8px" }}>Business</th>
                      <th style={{ textAlign: "left", padding: "12px 8px" }}>Issue</th>
                      <th style={{ textAlign: "left", padding: "12px 8px" }}>Priority</th>
                      <th style={{ textAlign: "left", padding: "12px 8px" }}>Status</th>
                      <th style={{ textAlign: "left", padding: "12px 8px" }}>Created</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tickets.map((ticket) => (
                      <tr key={ticket._id} style={{ borderBottom: `1px solid ${C.gray50}` }}>
                        <td style={{ padding: "12px 8px", color: C.blue, fontWeight: 700 }}>{ticket.ticketId || ticket._id?.slice(-6)}</td>
                        <td style={{ padding: "12px 8px" }}>{ticket.businessName}</td>
                        <td style={{ padding: "12px 8px" }}>{ticket.issueTitle}</td>
                        <td style={{ padding: "12px 8px" }}><Badge style={priorityStyle(ticket.priority)} /></td>
                        <td style={{ padding: "12px 8px" }}><Badge style={statusStyle(ticket.status)} /></td>
                        <td style={{ padding: "12px 8px" }}>{new Date(ticket.createdAt).toLocaleDateString()}</td>
                      </tr>
                    ))}
                    {tickets.length === 0 && (
                      <tr>
                        <td colSpan="6" style={{ textAlign: "center", padding: 40, color: C.gray500 }}>No tickets found</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          
          {activePage === "quotes" && (
            <div style={{ background: C.white, borderRadius: 14, padding: 20 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, flexWrap: "wrap", gap: 12 }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: C.navy }}>Quote Requests</h3>
                <button onClick={fetchAllData} style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 12px", background: C.blue, color: C.white, border: "none", borderRadius: 6, fontSize: 12, cursor: "pointer" }}>
                  <RefreshCw size={12} /> Refresh
                </button>
              </div>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, minWidth: 600 }}>
                  <thead>
                    <tr style={{ borderBottom: `1px solid ${C.gray100}` }}>
                      <th style={{ textAlign: "left", padding: "12px 8px" }}>Business</th>
                      <th style={{ textAlign: "left", padding: "12px 8px" }}>Contact</th>
                      <th style={{ textAlign: "left", padding: "12px 8px" }}>Type</th>
                      <th style={{ textAlign: "left", padding: "12px 8px" }}>Status</th>
                      <th style={{ textAlign: "left", padding: "12px 8px" }}>Received</th>
                    </tr>
                  </thead>
                  <tbody>
                    {quotes.map((quote) => (
                      <tr key={quote._id} style={{ borderBottom: `1px solid ${C.gray50}` }}>
                        <td style={{ padding: "12px 8px", fontWeight: 600 }}>{quote.businessName}</td>
                        <td style={{ padding: "12px 8px" }}>{quote.contactPerson}</td>
                        <td style={{ padding: "12px 8px" }}>{quote.businessType}</td>
                        <td style={{ padding: "12px 8px" }}><Badge style={statusStyle(quote.status)} /></td>
                        <td style={{ padding: "12px 8px" }}>{new Date(quote.createdAt).toLocaleDateString()}</td>
                      </tr>
                    ))}
                    {quotes.length === 0 && (
                      <tr>
                        <td colSpan="5" style={{ textAlign: "center", padding: 40, color: C.gray500 }}>No quotes found</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          
          {activePage === "contact" && (
            <div style={{ background: C.white, borderRadius: 14, padding: 20 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, flexWrap: "wrap", gap: 12 }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: C.navy }}>Contact Messages</h3>
                <button onClick={fetchAllData} style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 12px", background: C.blue, color: C.white, border: "none", borderRadius: 6, fontSize: 12, cursor: "pointer" }}>
                  <RefreshCw size={12} /> Refresh
                </button>
              </div>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, minWidth: 600 }}>
                  <thead>
                    <tr style={{ borderBottom: `1px solid ${C.gray100}` }}>
                      <th style={{ textAlign: "left", padding: "12px 8px" }}>Name</th>
                      <th style={{ textAlign: "left", padding: "12px 8px" }}>Email</th>
                      <th style={{ textAlign: "left", padding: "12px 8px" }}>Inquiry</th>
                      <th style={{ textAlign: "left", padding: "12px 8px" }}>Status</th>
                      <th style={{ textAlign: "left", padding: "12px 8px" }}>Received</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contacts.map((contact) => (
                      <tr key={contact._id} style={{ borderBottom: `1px solid ${C.gray50}` }}>
                        <td style={{ padding: "12px 8px", fontWeight: 600 }}>{contact.fullName}</td>
                        <td style={{ padding: "12px 8px" }}>{contact.email}</td>
                        <td style={{ padding: "12px 8px" }}>{contact.inquiryType}</td>
                        <td style={{ padding: "12px 8px" }}><Badge style={statusStyle(contact.status)} /></td>
                        <td style={{ padding: "12px 8px" }}>{new Date(contact.createdAt).toLocaleDateString()}</td>
                      </tr>
                    ))}
                    {contacts.length === 0 && (
                      <tr>
                        <td colSpan="5" style={{ textAlign: "center", padding: 40, color: C.gray500 }}>No contacts found</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          
          {(activePage === "monitor" || activePage === "reports") && (
            <div style={{ background: C.white, borderRadius: 14, padding: 60, textAlign: "center" }}>
              <div style={{ background: C.blueLight, width: 60, height: 60, borderRadius: 30, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
                <Activity size={30} color={C.blue} />
              </div>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: C.navy, marginBottom: 8 }}>Coming Soon</h3>
              <p style={{ color: C.gray500 }}>{activePage === "monitor" ? "Device monitoring page is under development." : "Reports page is under development."}</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}