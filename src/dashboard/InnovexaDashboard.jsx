// src/dashboard/InnovexaDashboard.jsx
import { useState, useEffect } from "react";
import {
  LayoutDashboard, Ticket, FileText, Mail, Quote, Users,
  Wifi, Printer, AlertTriangle, CheckCircle, Clock,
  TrendingUp, Activity, Bell, Search, ChevronDown,
  Menu, X, LogOut, Settings, BarChart3, Shield, Eye, Edit,
  Phone, Calendar, DollarSign, Server, Database, Cloud,
  Monitor, Cpu, WifiOff, PrinterCheck, MessageCircle, Trash2, RefreshCw, XCircle,
  User, Globe, ExternalLink
} from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell
} from "recharts";
import api from "../services/api";

// Brand Colors
const C = {
  blue: "#1a3a8f",
  blueMid: "#4a7fd4",
  blueLight: "#e8f0fc",
  red: "#cc2222",
  redLight: "#fdeaea",
  navy: "#0d1f5c",
  white: "#ffffff",
  gray50: "#f8faff",
  gray100: "#f0f4ff",
  gray300: "#c8d4e8",
  gray500: "#6b7fa8",
  gray700: "#2d3a5a",
  success: "#16a34a",
  successBg: "#dcfce7",
  warning: "#d97706",
  warningBg: "#fef3c7",
};

const CHART_COLORS = [C.blue, C.red, C.blueMid, C.warning];

const priorityStyle = (p) => {
  const styles = {
    high: { bg: C.redLight, color: C.red, label: "High" },
    medium: { bg: C.warningBg, color: C.warning, label: "Medium" },
    low: { bg: C.blueLight, color: C.blueMid, label: "Low" },
    critical: { bg: C.redLight, color: C.red, label: "Critical" },
  };
  return styles[p?.toLowerCase()] || { bg: C.gray100, color: C.gray500, label: p || "N/A" };
};

const statusStyle = (s) => {
  const styles = {
    "new": { bg: C.blueLight, color: C.blue, label: "New" },
    "open": { bg: C.redLight, color: C.red, label: "Open" },
    "in-progress": { bg: C.warningBg, color: C.warning, label: "In Progress" },
    "resolved": { bg: C.successBg, color: C.success, label: "Resolved" },
    "closed": { bg: C.gray100, color: C.gray500, label: "Closed" },
    "pending": { bg: C.warningBg, color: C.warning, label: "Pending" },
    "read": { bg: C.blueLight, color: C.blue, label: "Read" },
    "replied": { bg: C.successBg, color: C.success, label: "Replied" },
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

// Monitoring Page Component
const MonitoringPage = ({ C, StatCard, Monitor, Wifi, WifiOff, AlertTriangle, Printer, Server, RefreshCw }) => {
  const [devices, setDevices] = useState([]);
  const [summary, setSummary] = useState({});
  const [loading, setLoading] = useState(true);
  const [businessId, setBusinessId] = useState(() => {
    return localStorage.getItem("monitorBusinessId") || "BUSINESS_001";
  });

  const fetchDevices = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/api/monitor/status/${businessId}`);
      if (response.data.success) {
        setDevices(response.data.devices || []);
        setSummary(response.data.summary || {});
      }
    } catch (err) {
      console.error("Monitor error:", err);
    } finally {
      setLoading(false);
    }
  };

  const addSampleData = async () => {
    try {
      await api.post("/api/monitor/sample-data", { businessId });
      fetchDevices();
    } catch (err) {
      console.error("Add sample data error:", err);
    }
  };

  useEffect(() => {
    fetchDevices();
  }, [businessId]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
        <input
          type="text"
          value={businessId}
          onChange={(e) => {
            setBusinessId(e.target.value);
            localStorage.setItem("monitorBusinessId", e.target.value);
          }}
          placeholder="Business ID (e.g., BUSINESS_001)"
          style={{
            padding: "10px 15px",
            borderRadius: 8,
            border: `1px solid ${C.gray300}`,
            flex: 1,
            minWidth: 200,
            outline: "none"
          }}
        />
        <button onClick={fetchDevices} style={{ padding: "10px 20px", background: C.blue, color: "white", border: "none", borderRadius: 8, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
          <RefreshCw size={16} /> Load Devices
        </button>
        <button onClick={addSampleData} style={{ padding: "10px 20px", background: C.success, color: "white", border: "none", borderRadius: 8, cursor: "pointer" }}>
          Add Sample Data
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 12 }}>
        <StatCard icon={Monitor} label="Total Devices" value={summary.totalDevices || 0} sub="Monitored" accent={C.blue} />
        <StatCard icon={Wifi} label="Online" value={summary.onlineDevices || 0} sub="Connected" accent={C.success} />
        <StatCard icon={WifiOff} label="Offline" value={summary.offlineDevices || 0} sub="Disconnected" accent={C.red} />
        <StatCard icon={AlertTriangle} label="Alerts" value={summary.activeAlerts || 0} sub="Need attention" accent={C.warning} />
      </div>

      <div style={{ background: C.white, borderRadius: 14, padding: 20 }}>
        <h3 style={{ fontSize: 16, fontWeight: 700, color: C.navy, marginBottom: 16 }}>Device Status</h3>
        {loading ? (
          <div style={{ textAlign: "center", padding: 40 }}>Loading devices...</div>
        ) : devices.length === 0 ? (
          <div style={{ textAlign: "center", padding: 40, color: C.gray500 }}>
            <Monitor size={48} style={{ marginBottom: 16, opacity: 0.5 }} />
            <p>No devices found for Business ID: <strong>{businessId}</strong></p>
            <p style={{ fontSize: 12, marginTop: 8 }}>Click "Add Sample Data" to create test devices.</p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {devices.map((device) => (
              <div key={device._id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 20px", background: C.gray50, borderRadius: 12, flexWrap: "wrap", gap: 12, borderLeft: `4px solid ${device.networkStatus === "up" ? C.success : C.red}` }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    {device.deviceType === "printer" ? <Printer size={20} color={C.gray700} /> : device.deviceType === "server" ? <Server size={20} color={C.gray700} /> : <Monitor size={20} color={C.gray700} />}
                    <p style={{ fontWeight: 700, margin: 0 }}>{device.deviceName}</p>
                    {device.alertTriggered && <span style={{ fontSize: 10, background: C.redLight, color: C.red, padding: "2px 8px", borderRadius: 12 }}>Alert</span>}
                  </div>
                  <p style={{ fontSize: 12, color: C.gray500, margin: "4px 0 0" }}>IP: {device.ipAddress || "N/A"} | Last Seen: {device.lastSeen ? new Date(device.lastSeen).toLocaleString() : "N/A"}</p>
                </div>
                <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
                  <span style={{ fontSize: 13 }}>Network: <strong style={{ color: device.networkStatus === "up" ? C.success : C.red, marginLeft: 4 }}>{device.networkStatus === "up" ? "● Online" : "○ Offline"}</strong></span>
                  {device.printerStatus && <span style={{ fontSize: 13 }}>Printer: <strong>{device.printerStatus}</strong></span>}
                  {device.wifiStrength && <span style={{ fontSize: 13 }}>WiFi: <strong>{device.wifiStrength}%</strong></span>}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Reports Page Component
const ReportsPage = ({ C }) => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);

  const fetchReports = async () => {
    try {
      const response = await api.get("/api/reports");
      setReports(response.data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const generateReport = async () => {
    setGenerating(true);
    try {
      await api.post("/api/reports/generate", {
        businessId: "BUSINESS_001",
        businessName: "Test Business",
        reportMonth: new Date().toISOString().slice(0, 7),
      });
      fetchReports();
    } catch (err) {
      console.error(err);
    } finally {
      setGenerating(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  if (loading) return <div style={{ textAlign: "center", padding: 40 }}>Loading reports...</div>;

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <button onClick={generateReport} disabled={generating} style={{ padding: "10px 20px", background: C.blue, color: "white", border: "none", borderRadius: 8, cursor: "pointer" }}>
          {generating ? "Generating..." : "Generate Monthly Report"}
        </button>
      </div>
      <div style={{ background: C.white, borderRadius: 14, padding: 20 }}>
        <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Monthly Reports</h3>
        {reports.length === 0 ? (
          <p style={{ textAlign: "center", color: C.gray500 }}>No reports yet. Click "Generate Monthly Report" to create one.</p>
        ) : (
          reports.map((report) => (
            <div key={report._id} style={{ borderBottom: `1px solid ${C.gray100}`, padding: 12 }}>
              <p><strong>{report.businessName}</strong> - {report.reportMonth}</p>
              <p style={{ fontSize: 12, color: C.gray500 }}>Uptime: {report.uptimePercentage}% | Tickets: {report.totalTickets} | Resolved: {report.resolvedTickets}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default function InnovexaDashboard() {
  const [activePage, setActivePage] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [stats, setStats] = useState({});
  const [chartData, setChartData] = useState({});
  const [adminName, setAdminName] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [tickets, setTickets] = useState([]);
  const [quotes, setQuotes] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    const adminData = localStorage.getItem("adminData");
    
    if (!token) {
      window.location.href = "/admin-login";
      return;
    }
    
    if (adminData) {
      try {
        const data = JSON.parse(adminData);
        setAdminName(data.name || data.adminName || "Admin");
        setAdminEmail(data.email || "");
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
    setRefreshing(true);
    try {
      console.log("🔄 Fetching dashboard data...");
      
      let ticketsData = [];
      try {
        const ticketsRes = await api.get('/api/tickets');
        ticketsData = ticketsRes.data?.data || ticketsRes.data?.tickets || [];
        console.log(`✅ Tickets: ${ticketsData.length}`);
      } catch (err) {
        console.error('❌ Tickets fetch error:', err.message);
      }
      
      let quotesData = [];
      try {
        const quotesRes = await api.get('/api/quotes');
        quotesData = quotesRes.data?.data || quotesRes.data?.quotes || [];
        console.log(`✅ Quotes: ${quotesData.length}`);
      } catch (err) {
        console.error('❌ Quotes fetch error:', err.message);
      }
      
      let contactsData = [];
      try {
        const contactsRes = await api.get('/api/contact');
        contactsData = contactsRes.data?.data || contactsRes.data?.contacts || [];
        console.log(`✅ Contacts: ${contactsData.length}`);
      } catch (err) {
        console.error('❌ Contacts fetch error:', err.message);
      }
      
      let usersData = [];
      try {
        const usersRes = await api.get('/api/auth/users');
        if (usersRes.data?.users) {
          usersData = usersRes.data.users;
        } else if (usersRes.data?.data) {
          usersData = usersRes.data.data;
        }
        console.log(`✅ Users: ${usersData.length}`);
      } catch (err) {
        console.error('❌ Users fetch error:', err.message);
      }
      
      setTickets(ticketsData);
      setQuotes(quotesData);
      setContacts(contactsData);
      setUsers(usersData);
      
      const openTickets = ticketsData.filter(t => ["new", "open", "in-progress"].includes(t.status)).length;
      const resolvedTickets = ticketsData.filter(t => t.status === "resolved").length;
      const newQuotes = quotesData.filter(q => q.status === "new" || !q.status).length;
      const newContacts = contactsData.filter(c => c.status === "new" || !c.status).length;
      const totalUsers = usersData.length;
      const newUsers = usersData.filter(u => {
        const createdAt = new Date(u.createdAt);
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        return createdAt > weekAgo;
      }).length;
      
      setStats({
        openTickets,
        resolvedTickets,
        newQuotes,
        newContacts,
        totalUsers,
        newUsers,
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
      
      const last7Days = Array.from({ length: 7 }, (_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - i);
        return d.toISOString().split('T')[0];
      }).reverse();
      
      const ticketTrends = last7Days.map(date => ({
        name: new Date(date).toLocaleDateString('en-US', { weekday: 'short' }),
        tickets: ticketsData.filter(t => t.createdAt?.split('T')[0] === date).length
      }));
      
      const priorityCount = { critical: 0, high: 0, medium: 0, low: 0 };
      ticketsData.forEach(t => {
        const p = t.priority?.toLowerCase();
        if (priorityCount[p] !== undefined) priorityCount[p]++;
      });
      
      const priorityDistribution = [
        { name: "Critical", value: priorityCount.critical },
        { name: "High", value: priorityCount.high },
        { name: "Medium", value: priorityCount.medium },
        { name: "Low", value: priorityCount.low }
      ].filter(p => p.value > 0);
      
      setChartData({
        ticketTrends,
        priorityDistribution: priorityDistribution.length ? priorityDistribution : [
          { name: "Critical", value: 5 }, { name: "High", value: 12 },
          { name: "Medium", value: 18 }, { name: "Low", value: 8 }
        ]
      });
      
      const notificationList = [
        ...ticketsData.filter(t => t.status === "new").slice(0, 3).map(t => ({ 
          id: t._id, type: "ticket", title: "New Ticket", 
          message: `New ticket from ${t.businessName || t.contactName || "Unknown"}`, 
          time: new Date(t.createdAt), read: false 
        })),
        ...quotesData.filter(q => q.status === "new").slice(0, 2).map(q => ({ 
          id: q._id, type: "quote", title: "New Quote Request", 
          message: `Quote request from ${q.businessName || q.contactPerson}`, 
          time: new Date(q.createdAt), read: false 
        })),
        ...contactsData.filter(c => c.status === "new").slice(0, 2).map(c => ({ 
          id: c._id, type: "contact", title: "New Contact Message", 
          message: `Message from ${c.fullName || c.name}`, 
          time: new Date(c.createdAt), read: false 
        })),
        ...usersData.filter(u => {
          const createdAt = new Date(u.createdAt);
          const dayAgo = new Date();
          dayAgo.setDate(dayAgo.getDate() - 1);
          return createdAt > dayAgo;
        }).map(u => ({
          id: u._id, type: "user", title: "New User Registered",
          message: `${u.name || u.email} joined the platform`,
          time: new Date(u.createdAt), read: false
        }))
      ];
      
      notificationList.sort((a, b) => b.time - a.time);
      setNotifications(notificationList.slice(0, 10));
      setUnreadCount(notificationList.length);
      
    } catch (err) {
      console.error("❌ Error fetching data:", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const updateTicketStatus = async (ticketId, newStatus) => {
    try {
      await api.patch(`/api/tickets/${ticketId}`, { status: newStatus });
      fetchAllData();
    } catch (err) {
      console.error("Error updating ticket:", err);
    }
  };

  const deleteTicket = async (ticketId) => {
    if (window.confirm("Are you sure you want to delete this ticket?")) {
      try {
        await api.delete(`/api/tickets/${ticketId}`);
        fetchAllData();
      } catch (err) {
        console.error("Error deleting ticket:", err);
      }
    }
  };

  const deleteUser = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await api.delete(`/api/auth/users/${userId}`);
        fetchAllData();
      } catch (err) {
        console.error("Error deleting user:", err);
      }
    }
  };

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
        results.push({ type: "ticket", data: ticket, label: `🎫 Ticket: ${ticket.issueTitle || ticket.businessName}`, id: ticket._id });
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
          contact.email?.toLowerCase().includes(lowerQuery)) {
        results.push({ type: "contact", data: contact, label: `✉️ Contact: ${contact.fullName || contact.name}`, id: contact._id });
      }
    });
    
    users.forEach(user => {
      if (user.name?.toLowerCase().includes(lowerQuery) ||
          user.email?.toLowerCase().includes(lowerQuery)) {
        results.push({ type: "user", data: user, label: `👤 User: ${user.name || user.email}`, id: user._id });
      }
    });
    
    setSearchResults(results.slice(0, 10));
    setShowSearchResults(true);
  };

  const viewWebsite = () => {
    window.open('http://localhost:5173', '_blank');
  };

  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", id: "dashboard" },
    { icon: Ticket, label: "Tickets", id: "tickets" },
    { icon: Quote, label: "Quotes", id: "quotes" },
    { icon: Mail, label: "Contact", id: "contact" },
    { icon: Users, label: "Users", id: "users" },
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
              transition: "all 0.2s ease",
            }}>
              <Icon size={18} />
              {((!collapsed || isMobile) && label)}
            </button>
          ))}
        </nav>

        <div style={{ padding: "12px 8px", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          <button onClick={viewWebsite} style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: (collapsed && !isMobile) ? "center" : "flex-start",
            gap: 12,
            padding: (collapsed && !isMobile) ? "12px" : "12px 14px",
            borderRadius: 8,
            marginBottom: 8,
            cursor: "pointer",
            border: "none",
            background: C.blue,
            color: C.white,
            fontSize: 13,
          }}>
            <Globe size={18} />
            {((!collapsed || isMobile) && <span>View Website</span>)}
            <ExternalLink size={14} style={{ marginLeft: "auto" }} />
          </button>

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
        overflowX: "hidden",
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
          
          {/* Search Bar */}
          <div style={{ position: "relative" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, background: C.gray50, borderRadius: 8, padding: "6px 12px", border: `1px solid ${C.gray100}` }}>
              <Search size={14} color={C.gray500} />
              <input 
                type="text" 
                placeholder="Search..." 
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                onFocus={() => searchQuery && setShowSearchResults(true)}
                style={{ border: "none", background: "none", outline: "none", fontSize: 13, width: isMobile ? 140 : 200 }} 
              />
              {searchQuery && (
                <button onClick={() => { setSearchQuery(""); setSearchResults([]); setShowSearchResults(false); }} style={{ background: "none", border: "none", cursor: "pointer" }}>
                  <XCircle size={14} color={C.gray500} />
                </button>
              )}
            </div>
            
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
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = C.gray50}
                    onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                    onClick={() => { 
                      setActivePage(result.type === "ticket" ? "tickets" : result.type === "quote" ? "quotes" : result.type === "contact" ? "contact" : "users"); 
                      setShowSearchResults(false);
                      setSearchQuery("");
                    }}>
                      <div style={{ fontSize: 13, color: C.gray700 }}>{result.label}</div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
          
          {/* Refresh Button */}
          <button onClick={fetchAllData} disabled={refreshing} style={{
            background: C.blueLight, border: "none", borderRadius: 8,
            padding: "6px 12px", cursor: "pointer", display: "flex", alignItems: "center", gap: 6
          }}>
            <RefreshCw size={14} color={C.blue} style={{ animation: refreshing ? "spin 1s linear infinite" : "none" }} />
            <span style={{ fontSize: 12, color: C.blue }}>{refreshing ? "Refreshing..." : "Refresh"}</span>
          </button>
          
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
                      setActivePage(notif.type === "ticket" ? "tickets" : notif.type === "quote" ? "quotes" : notif.type === "contact" ? "contact" : "users"); 
                      setShowNotifications(false);
                    }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        {notif.type === "ticket" && <Ticket size={12} color={C.blue} />}
                        {notif.type === "quote" && <Quote size={12} color={C.blue} />}
                        {notif.type === "contact" && <Mail size={12} color={C.blue} />}
                        {notif.type === "user" && <User size={12} color={C.blue} />}
                        <span style={{ fontSize: 12, fontWeight: 600, color: C.gray700 }}>{notif.title}</span>
                        {!notif.read && <span style={{ fontSize: 8, color: C.red, background: C.redLight, padding: "2px 6px", borderRadius: 10 }}>NEW</span>}
                      </div>
                      <p style={{ fontSize: 11, color: C.gray500, marginTop: 4 }}>{notif.message}</p>
                      <p style={{ fontSize: 9, color: C.gray400, marginTop: 4 }}>{new Date(notif.time).toLocaleString()}</p>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
          
          {/* User Info */}
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
          {/* DASHBOARD */}
          {activePage === "dashboard" && (
            <div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 24 }}>
                <StatCard icon={Ticket} label="Open Tickets" value={stats.openTickets || 0} sub="Needs attention" accent={C.red} />
                <StatCard icon={CheckCircle} label="Resolved Tickets" value={stats.resolvedTickets || 0} sub="This month" accent={C.success} />
                <StatCard icon={Quote} label="New Quotes" value={stats.newQuotes || 0} sub="Awaiting review" accent={C.blue} />
                <StatCard icon={Mail} label="New Contacts" value={stats.newContacts || 0} sub="Unread" accent={C.warning} />
                <StatCard icon={Users} label="Total Users" value={stats.totalUsers || 0} sub={`${stats.newUsers || 0} new this week`} accent={C.navy} />
                <StatCard icon={Activity} label="Uptime" value={stats.avgUptime || "99.1%"} sub="Last 7 days" accent={C.success} />
              </div>
              
              <div style={{ display: "flex", gap: 20, flexWrap: "wrap", marginBottom: 24 }}>
                <div style={{ flex: 2, background: C.white, borderRadius: 14, padding: 20, boxShadow: "0 2px 12px rgba(0,0,0,0.07)", overflowX: "auto" }}>
                  <h3 style={{ fontSize: 14, fontWeight: 700, color: C.navy, marginBottom: 16 }}>Ticket Trends (Last 7 Days)</h3>
                  <div style={{ minWidth: 300, height: 250 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={chartData.ticketTrends || []}>
                        <CartesianGrid strokeDasharray="3 3" stroke={C.gray100} />
                        <XAxis dataKey="name" stroke={C.gray500} fontSize={12} />
                        <YAxis stroke={C.gray500} fontSize={12} />
                        <Tooltip />
                        <Area type="monotone" dataKey="tickets" stroke={C.blue} fill={`${C.blue}20`} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                <div style={{ flex: 1, background: C.white, borderRadius: 14, padding: 20, boxShadow: "0 2px 12px rgba(0,0,0,0.07)" }}>
                  <h3 style={{ fontSize: 14, fontWeight: 700, color: C.navy, marginBottom: 16 }}>Tickets by Priority</h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie data={chartData.priorityDistribution || []} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                        {(chartData.priorityDistribution || []).map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
                <div style={{ flex: 1, background: C.white, borderRadius: 14, padding: 20, overflowX: "auto" }}>
                  <h3 style={{ fontSize: 14, fontWeight: 700, color: C.navy, marginBottom: 16 }}>Recent Tickets</h3>
                  {stats.recentTickets?.slice(0, 5).map((ticket, idx) => (
                    <div key={idx} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: `1px solid ${C.gray100}`, flexWrap: "wrap", gap: 8 }}>
                      <div>
                        <p style={{ fontSize: 13, fontWeight: 600, color: C.gray700 }}>{ticket.issueTitle || ticket.businessName}</p>
                        <p style={{ fontSize: 11, color: C.gray500 }}>{ticket.businessName || ticket.contactName}</p>
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
          
          {/* TICKETS PAGE */}
          {activePage === "tickets" && (
            <div style={{ background: C.white, borderRadius: 14, padding: 20, overflowX: "auto" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, flexWrap: "wrap", gap: 12 }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: C.navy }}>All Support Tickets</h3>
                <button onClick={fetchAllData} style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 12px", background: C.blue, color: C.white, border: "none", borderRadius: 6, fontSize: 12, cursor: "pointer" }}>
                  <RefreshCw size={12} /> Refresh
                </button>
              </div>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, minWidth: 700 }}>
                <thead>
                  <tr style={{ borderBottom: `1px solid ${C.gray100}` }}>
                    <th style={{ textAlign: "left", padding: "12px 8px" }}>ID</th>
                    <th style={{ textAlign: "left", padding: "12px 8px" }}>Business/Contact</th>
                    <th style={{ textAlign: "left", padding: "12px 8px" }}>Issue</th>
                    <th style={{ textAlign: "left", padding: "12px 8px" }}>Priority</th>
                    <th style={{ textAlign: "left", padding: "12px 8px" }}>Status</th>
                    <th style={{ textAlign: "left", padding: "12px 8px" }}>Created</th>
                    <th style={{ textAlign: "left", padding: "12px 8px" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {tickets.map((ticket) => (
                    <tr key={ticket._id} style={{ borderBottom: `1px solid ${C.gray50}` }}>
                      <td style={{ padding: "12px 8px", color: C.blue, fontWeight: 700 }}>{ticket.ticketId || ticket._id?.slice(-6)}</td>
                      <td style={{ padding: "12px 8px" }}>{ticket.businessName || ticket.contactName}</td>
                      <td style={{ padding: "12px 8px" }}>{ticket.issueTitle?.substring(0, 40) || "N/A"}</td>
                      <td style={{ padding: "12px 8px" }}><Badge style={priorityStyle(ticket.priority)} /></td>
                      <td style={{ padding: "12px 8px" }}>
                        <select 
                          value={ticket.status || "new"} 
                          onChange={(e) => updateTicketStatus(ticket._id, e.target.value)}
                          style={{ padding: "4px 8px", borderRadius: 6, border: `1px solid ${C.gray300}`, fontSize: 11, cursor: "pointer" }}
                        >
                          <option value="new">New</option>
                          <option value="open">Open</option>
                          <option value="in-progress">In Progress</option>
                          <option value="resolved">Resolved</option>
                          <option value="closed">Closed</option>
                        </select>
                      </td>
                      <td style={{ padding: "12px 8px" }}>{new Date(ticket.createdAt).toLocaleDateString()}</td>
                      <td style={{ padding: "12px 8px" }}>
                        <button onClick={() => deleteTicket(ticket._id)} style={{ background: "none", border: "none", cursor: "pointer", color: C.red }}>
                          <Trash2 size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {tickets.length === 0 && (
                    <tr>
                      <td colSpan="7" style={{ textAlign: "center", padding: 40, color: C.gray500 }}>No tickets found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
          
          {/* QUOTES PAGE - WITH BUSINESS ID COLUMN */}
          {activePage === "quotes" && (
            <div style={{ background: C.white, borderRadius: 14, padding: 20, overflowX: "auto" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, flexWrap: "wrap", gap: 12 }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: C.navy }}>Quote Requests</h3>
                <button onClick={fetchAllData} style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 12px", background: C.blue, color: C.white, border: "none", borderRadius: 6, fontSize: 12, cursor: "pointer" }}>
                  <RefreshCw size={12} /> Refresh
                </button>
              </div>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, minWidth: 800 }}>
                <thead>
                  <tr style={{ borderBottom: `1px solid ${C.gray100}` }}>
                    <th style={{ textAlign: "left", padding: "12px 8px" }}>Business ID</th>
                    <th style={{ textAlign: "left", padding: "12px 8px" }}>Business</th>
                    <th style={{ textAlign: "left", padding: "12px 8px" }}>Contact</th>
                    <th style={{ textAlign: "left", padding: "12px 8px" }}>Type</th>
                    <th style={{ textAlign: "left", padding: "12px 8px" }}>Status</th>
                    <th style={{ textAlign: "left", padding: "12px 8px" }}>Received</th>
                    <th style={{ textAlign: "left", padding: "12px 8px" }}>Monitor</th>
                  </tr>
                </thead>
                <tbody>
                  {quotes.map((quote) => (
                    <tr key={quote._id} style={{ borderBottom: `1px solid ${C.gray50}` }}>
                      <td style={{ padding: "12px 8px", fontSize: 12, color: C.blue, fontWeight: 500 }}>
                        {quote.businessId || "N/A"}
                      </td>
                      <td style={{ padding: "12px 8px", fontWeight: 600 }}>{quote.businessName}</td>
                      <td style={{ padding: "12px 8px" }}>{quote.contactPerson}</td>
                      <td style={{ padding: "12px 8px" }}>{quote.businessType}</td>
                      <td style={{ padding: "12px 8px" }}><Badge style={statusStyle(quote.status)} /></td>
                      <td style={{ padding: "12px 8px" }}>{new Date(quote.createdAt).toLocaleDateString()}</td>
                      <td style={{ padding: "12px 8px" }}>
                        {quote.businessId && (
                          <button
                            onClick={() => {
                              localStorage.setItem("monitorBusinessId", quote.businessId);
                              setActivePage("monitor");
                            }}
                            style={{
                              background: C.blueLight,
                              border: "none",
                              borderRadius: 6,
                              padding: "4px 10px",
                              cursor: "pointer",
                              fontSize: 11,
                              color: C.blue,
                              display: "flex",
                              alignItems: "center",
                              gap: 4
                            }}
                          >
                            <Monitor size={12} /> View
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                  {quotes.length === 0 && (
                    <tr>
                      <td colSpan="7" style={{ textAlign: "center", padding: 40, color: C.gray500 }}>No quotes found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
          
          {/* CONTACT PAGE */}
          {activePage === "contact" && (
            <div style={{ background: C.white, borderRadius: 14, padding: 20, overflowX: "auto" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, flexWrap: "wrap", gap: 12 }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: C.navy }}>Contact Messages</h3>
                <button onClick={fetchAllData} style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 12px", background: C.blue, color: C.white, border: "none", borderRadius: 6, fontSize: 12, cursor: "pointer" }}>
                  <RefreshCw size={12} /> Refresh
                </button>
              </div>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, minWidth: 700 }}>
                <thead>
                  <tr style={{ borderBottom: `1px solid ${C.gray100}` }}>
                    <th style={{ textAlign: "left", padding: "12px 8px" }}>Name</th>
                    <th style={{ textAlign: "left", padding: "12px 8px" }}>Email</th>
                    <th style={{ textAlign: "left", padding: "12px 8px" }}>Inquiry</th>
                    <th style={{ textAlign: "left", padding: "12px 8px" }}>Message</th>
                    <th style={{ textAlign: "left", padding: "12px 8px" }}>Status</th>
                    <th style={{ textAlign: "left", padding: "12px 8px" }}>Received</th>
                  </tr>
                </thead>
                <tbody>
                  {contacts.map((contact) => (
                    <tr key={contact._id} style={{ borderBottom: `1px solid ${C.gray50}` }}>
                      <td style={{ padding: "12px 8px", fontWeight: 600 }}>{contact.fullName || contact.name}</td>
                      <td style={{ padding: "12px 8px" }}>{contact.email}</td>
                      <td style={{ padding: "12px 8px" }}>{contact.inquiryType}</td>
                      <td style={{ padding: "12px 8px", maxWidth: 250, wordBreak: "break-word" }}>{contact.message?.substring(0, 60)}...</td>
                      <td style={{ padding: "12px 8px" }}><Badge style={statusStyle(contact.status)} /></td>
                      <td style={{ padding: "12px 8px" }}>{new Date(contact.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                  {contacts.length === 0 && (
                    <tr>
                      <td colSpan="6" style={{ textAlign: "center", padding: 40, color: C.gray500 }}>No contacts found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
          
          {/* USERS PAGE */}
          {activePage === "users" && (
            <div style={{ background: C.white, borderRadius: 14, padding: 20, overflowX: "auto" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, flexWrap: "wrap", gap: 12 }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: C.navy }}>Registered Users</h3>
                <button onClick={fetchAllData} style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 12px", background: C.blue, color: C.white, border: "none", borderRadius: 6, fontSize: 12, cursor: "pointer" }}>
                  <RefreshCw size={12} /> Refresh
                </button>
              </div>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, minWidth: 600 }}>
                <thead>
                  <tr style={{ borderBottom: `1px solid ${C.gray100}` }}>
                    <th style={{ textAlign: "left", padding: "12px 8px" }}>Name</th>
                    <th style={{ textAlign: "left", padding: "12px 8px" }}>Email</th>
                    <th style={{ textAlign: "left", padding: "12px 8px" }}>Role</th>
                    <th style={{ textAlign: "left", padding: "12px 8px" }}>Status</th>
                    <th style={{ textAlign: "left", padding: "12px 8px" }}>Joined</th>
                    <th style={{ textAlign: "left", padding: "12px 8px" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user._id} style={{ borderBottom: `1px solid ${C.gray50}` }}>
                      <td style={{ padding: "12px 8px", fontWeight: 600 }}>{user.name || "N/A"}</td>
                      <td style={{ padding: "12px 8px" }}>{user.email}</td>
                      <td style={{ padding: "12px 8px" }}>
                        <Badge style={user.role === "admin" ? { bg: C.redLight, color: C.red, label: "Admin" } : { bg: C.blueLight, color: C.blue, label: "User" }} />
                      </td>
                      <td style={{ padding: "12px 8px" }}>
                        <Badge style={user.isActive !== false ? { bg: C.successBg, color: C.success, label: "Active" } : { bg: C.gray100, color: C.gray500, label: "Inactive" }} />
                      </td>
                      <td style={{ padding: "12px 8px" }}>{new Date(user.createdAt).toLocaleDateString()}</td>
                      <td style={{ padding: "12px 8px" }}>
                        {user.role !== "admin" && (
                          <button onClick={() => deleteUser(user._id)} style={{ background: "none", border: "none", cursor: "pointer", color: C.red }}>
                            <Trash2 size={14} />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                  {users.length === 0 && (
                    <tr>
                      <td colSpan="6" style={{ textAlign: "center", padding: 40, color: C.gray500 }}>No users found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
          
          {/* MONITORING PAGE */}
          {activePage === "monitor" && (
            <MonitoringPage C={C} StatCard={StatCard} Monitor={Monitor} Wifi={Wifi} WifiOff={WifiOff} AlertTriangle={AlertTriangle} Printer={Printer} Server={Server} RefreshCw={RefreshCw} />
          )}
          
          {/* REPORTS PAGE */}
          {activePage === "reports" && (
            <ReportsPage C={C} />
          )}
        </main>
      </div>
    </div>
  );
}