// src/pages/AdminDashboard.js
import { useState, useEffect } from "react";
import {
  LayoutDashboard, Ticket, FileText, Mail, Quote, Users,
  Wifi, Printer, AlertTriangle, CheckCircle, Clock,
  TrendingUp, Activity, Bell, Search, ChevronDown,
  Menu, X, LogOut, Settings, BarChart3, Shield, Eye, Edit,
  Phone, Calendar, DollarSign, Server, Database, Cloud,
  Monitor, Cpu, WifiOff, PrinterCheck, MessageCircle
} from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line
} from "recharts";
import api, { API_URL, API_ENDPOINTS } from "../services/api";

// Brand Colors
const C = {
  blue:       "#1a3a8f",
  blueMid:    "#4a7fd4",
  blueLight:  "#e8f0fc",
  red:        "#cc2222",
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

// Responsive Breakpoints
const breakpoints = {
  mobile: "@media (max-width: 640px)",
  tablet: "@media (max-width: 768px)",
  desktop: "@media (min-width: 1024px)",
};

// Helper Functions
const priorityStyle = (p) => ({
  high:     { bg: C.redLight,    color: C.red,     label: "High" },
  medium:   { bg: C.warningBg,   color: C.warning, label: "Medium" },
  low:      { bg: C.blueLight,   color: C.blueMid, label: "Low" },
  critical: { bg: C.redLight,    color: C.red,     label: "Critical" },
}[p?.toLowerCase()] || { bg: C.gray100, color: C.gray500, label: p || "N/A" });

const statusStyle = (s) => ({
  "new":         { bg: C.blueLight,   color: C.blue,    label: "New" },
  "open":        { bg: C.redLight,    color: C.red,     label: "Open" },
  "in-progress": { bg: C.warningBg,   color: C.warning, label: "In Progress" },
  "resolved":    { bg: C.successBg,   color: C.success, label: "Resolved" },
  "closed":      { bg: C.gray100,     color: C.gray500, label: "Closed" },
  "reviewed":    { bg: C.warningBg,   color: C.warning, label: "Reviewed" },
  "contacted":   { bg: C.successBg,   color: C.success, label: "Contacted" },
  "quoted":      { bg: C.blueLight,   color: C.blue,    label: "Quoted" },
  "pending":     { bg: C.warningBg,   color: C.warning, label: "Pending" },
}[s?.toLowerCase()] || { bg: C.gray100, color: C.gray500, label: s || "Unknown" });

// Components
const Badge = ({ style }) => (
  <span style={{
    background: style.bg, color: style.color,
    padding: "4px 10px", borderRadius: 20,
    fontSize: 11, fontWeight: 700, whiteSpace: "nowrap",
  }}>{style.label}</span>
);

const StatCard = ({ icon: Icon, label, value, sub, accent, trend }) => (
  <div style={{
    background: C.white, borderRadius: 14, padding: "16px 18px",
    boxShadow: "0 2px 12px rgba(26,58,143,0.08)",
    borderTop: `3px solid ${accent}`, flex: "1 1 200px", minWidth: 140,
  }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
      <div>
        <p style={{ fontSize: 11, color: C.gray500, fontWeight: 600, marginBottom: 4, textTransform: "uppercase", letterSpacing: 0.5 }}>{label}</p>
        <p style={{ fontSize: { xs: 24, sm: 30 }, fontWeight: 800, color: C.navy, lineHeight: 1 }}>{value}</p>
        {sub && <p style={{ fontSize: 10, color: C.gray500, marginTop: 4 }}>{sub}</p>}
      </div>
      <div style={{ background: accent + "18", borderRadius: 10, padding: 8 }}>
        <Icon size={18} color={accent} />
      </div>
    </div>
    {trend && <div style={{ marginTop: 8, fontSize: 11, color: C.success, fontWeight: 600 }}>▲ {trend}</div>}
  </div>
);

const SectionCard = ({ title, children, action, onAction }) => (
  <div style={{
    background: C.white, borderRadius: 14,
    boxShadow: "0 2px 12px rgba(26,58,143,0.07)",
    overflow: "hidden"
  }}>
    <div style={{
      padding: "12px 16px", borderBottom: `1px solid ${C.gray100}`,
      display: "flex", justifyContent: "space-between", alignItems: "center",
      flexWrap: "wrap", gap: 10,
    }}>
      <h3 style={{ fontSize: 15, fontWeight: 700, color: C.navy, margin: 0 }}>{title}</h3>
      {action && (
        <button onClick={onAction} style={{
          fontSize: 12, color: C.blueMid, fontWeight: 600,
          background: "none", border: "none", cursor: "pointer"
        }}>{action}</button>
      )}
    </div>
    <div style={{ padding: "16px", overflowX: "auto" }}>{children}</div>
  </div>
);

// Responsive Table Component
const ResponsiveTable = ({ headers, data, renderRow }) => (
  <div style={{ overflowX: "auto", WebkitOverflowScrolling: "touch" }}>
    <table style={{
      width: "100%", borderCollapse: "collapse", fontSize: 13,
      minWidth: { xs: 500, sm: 600, md: "100%" }
    }}>
      <thead>
        <tr style={{ borderBottom: `1px solid ${C.gray100}` }}>
          {headers.map((header, idx) => (
            <th key={idx} style={{ textAlign: "left", padding: "12px 8px", color: C.gray500, fontWeight: 600, fontSize: 12 }}>
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, idx) => renderRow(item, idx))}
      </tbody>
    </table>
  </div>
);

// Dashboard Page
const DashboardPage = ({ stats, chartData }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
    {/* Stats Row - Responsive Grid */}
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
      gap: 12,
    }}>
      <StatCard icon={Ticket} label="Open Tickets" value={stats?.openTickets || 0} sub="Needs attention" accent={C.red} />
      <StatCard icon={CheckCircle} label="Resolved" value={stats?.resolvedTickets || 0} sub="This month" accent={C.success} />
      <StatCard icon={Quote} label="New Quotes" value={stats?.newQuotes || 0} sub="Awaiting review" accent={C.blue} />
      <StatCard icon={Mail} label="New Contacts" value={stats?.newContacts || 0} sub="Unread" accent={C.warning} />
      <StatCard icon={Monitor} label="Devices" value={stats?.monitoredDevices || 0} sub="Active" accent={C.navy} />
      <StatCard icon={Activity} label="Uptime" value={stats?.avgUptime || "99.1%"} sub="Last 7 days" accent={C.success} />
    </div>

    {/* Charts Row - Responsive */}
    <div style={{
      display: "flex", flexDirection: { xs: "column", lg: "row" },
      gap: 20, flexWrap: "wrap",
    }}>
      <div style={{ flex: 2, background: C.white, borderRadius: 14, padding: 16 }}>
        <h3 style={{ fontSize: 14, fontWeight: 700, color: C.navy, marginBottom: 16 }}>Ticket Trends (Last 7 Days)</h3>
        <ResponsiveContainer width="100%" height={250}>
          <AreaChart data={chartData?.ticketTrends || []}>
            <CartesianGrid strokeDasharray="3 3" stroke={C.gray100} />
            <XAxis dataKey="name" stroke={C.gray500} fontSize={12} />
            <YAxis stroke={C.gray500} fontSize={12} />
            <Tooltip />
            <Area type="monotone" dataKey="tickets" stroke={C.blue} fill={`${C.blue}20`} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div style={{ flex: 1, background: C.white, borderRadius: 14, padding: 16 }}>
        <h3 style={{ fontSize: 14, fontWeight: 700, color: C.navy, marginBottom: 16 }}>Tickets by Priority</h3>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie data={chartData?.priorityDistribution || []} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
              {chartData?.priorityDistribution?.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={[C.red, C.warning, C.blueMid, C.success][index % 4]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>

    {/* Recent Activity - Responsive */}
    <div style={{
      display: "flex", flexDirection: { xs: "column", md: "row" },
      gap: 20,
    }}>
      <div style={{ flex: 1, background: C.white, borderRadius: 14, padding: 16 }}>
        <h3 style={{ fontSize: 14, fontWeight: 700, color: C.navy, marginBottom: 16 }}>Recent Tickets</h3>
        {stats?.recentTickets?.slice(0, 5).map((ticket, idx) => (
          <div key={idx} style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            padding: "12px 0", borderBottom: `1px solid ${C.gray100}`,
            flexWrap: "wrap", gap: 8,
          }}>
            <div>
              <p style={{ fontSize: 13, fontWeight: 600, color: C.gray700, margin: 0 }}>{ticket.issueTitle}</p>
              <p style={{ fontSize: 11, color: C.gray500, margin: 4 }}>{ticket.businessName}</p>
            </div>
            <Badge style={priorityStyle(ticket.priority)} />
          </div>
        ))}
      </div>
      <div style={{ flex: 1, background: C.white, borderRadius: 14, padding: 16 }}>
        <h3 style={{ fontSize: 14, fontWeight: 700, color: C.navy, marginBottom: 16 }}>Device Health</h3>
        {stats?.deviceHealth?.map((device, idx) => (
          <div key={idx} style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            padding: "12px 0", borderBottom: `1px solid ${C.gray100}`,
          }}>
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
);

// Tickets Page - Responsive
const TicketsPage = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({ status: "all", priority: "all" });
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [mobileView, setMobileView] = useState(false);

  useEffect(() => {
    const checkMobile = () => setMobileView(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const fetchTickets = async () => {
    try {
      setLoading(true);
      const params = {};
      if (filter.status !== "all") params.status = filter.status;
      if (filter.priority !== "all") params.priority = filter.priority;
      const response = await api.get(API_ENDPOINTS.GET_TICKETS(params));
      setTickets(response.data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchTickets(); }, [filter]);

  const updateStatus = async (id, status) => {
    await api.patch(API_ENDPOINTS.UPDATE_TICKET(id), { status });
    fetchTickets();
  };

  if (loading) return <div style={{ textAlign: "center", padding: 40 }}>Loading tickets...</div>;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {/* Filters - Responsive */}
      <div style={{
        display: "flex", flexDirection: { xs: "column", sm: "row" },
        gap: 10, alignItems: { xs: "stretch", sm: "center" },
      }}>
        <select value={filter.status} onChange={(e) => setFilter({...filter, status: e.target.value})}
          style={{ padding: "8px 12px", borderRadius: 8, border: `1px solid ${C.gray300}`, flex: 1 }}>
          <option value="all">All Status</option>
          <option value="new">New</option>
          <option value="open">Open</option>
          <option value="in-progress">In Progress</option>
          <option value="resolved">Resolved</option>
        </select>
        <select value={filter.priority} onChange={(e) => setFilter({...filter, priority: e.target.value})}
          style={{ padding: "8px 12px", borderRadius: 8, border: `1px solid ${C.gray300}`, flex: 1 }}>
          <option value="all">All Priority</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
          <option value="critical">Critical</option>
        </select>
        <button onClick={fetchTickets} style={{
          padding: "8px 16px", background: C.blue, color: C.white,
          border: "none", borderRadius: 8, cursor: "pointer",
        }}>Refresh</button>
      </div>

      <SectionCard title="All Support Tickets">
        {mobileView ? (
          // Mobile Card View
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {tickets.map((ticket) => (
              <div key={ticket._id} style={{
                background: C.gray50, borderRadius: 12, padding: 12,
                border: `1px solid ${C.gray100}`,
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                  <span style={{ fontWeight: 700, color: C.blue }}>#{ticket.ticketId || ticket._id.slice(-6)}</span>
                  <Badge style={priorityStyle(ticket.priority)} />
                </div>
                <p style={{ fontWeight: 600, margin: "4px 0" }}>{ticket.issueTitle}</p>
                <p style={{ fontSize: 12, color: C.gray500, margin: "4px 0" }}>{ticket.businessName}</p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 8 }}>
                  <select value={ticket.status} onChange={(e) => updateStatus(ticket._id, e.target.value)}
                    style={{ padding: "6px 10px", borderRadius: 6, border: `1px solid ${C.gray300}`, fontSize: 12 }}>
                    <option value="new">New</option>
                    <option value="open">Open</option>
                    <option value="in-progress">In Progress</option>
                    <option value="resolved">Resolved</option>
                  </select>
                  <button onClick={() => setSelectedTicket(ticket)} style={{ background: "none", border: "none", cursor: "pointer" }}>
                    <Eye size={18} color={C.blueMid} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Desktop Table View
          <ResponsiveTable
            headers={["ID", "Business", "Issue", "Priority", "Status", "Created", "Actions"]}
            data={tickets}
            renderRow={(ticket) => (
              <tr key={ticket._id} style={{ borderBottom: `1px solid ${C.gray50}` }}>
                <td style={{ padding: "12px 8px", color: C.blue, fontWeight: 700 }}>{ticket.ticketId || ticket._id.slice(-6)}</td>
                <td style={{ padding: "12px 8px" }}>{ticket.businessName}</td>
                <td style={{ padding: "12px 8px" }}>{ticket.issueTitle}</td>
                <td style={{ padding: "12px 8px" }}><Badge style={priorityStyle(ticket.priority)} /></td>
                <td style={{ padding: "12px 8px" }}>
                  <select value={ticket.status} onChange={(e) => updateStatus(ticket._id, e.target.value)}
                    style={{ padding: "4px 8px", borderRadius: 4, border: `1px solid ${C.gray300}`, fontSize: 11 }}>
                    <option value="new">New</option>
                    <option value="open">Open</option>
                    <option value="in-progress">In Progress</option>
                    <option value="resolved">Resolved</option>
                  </select>
                </td>
                <td style={{ padding: "12px 8px" }}>{new Date(ticket.createdAt).toLocaleDateString()}</td>
                <td style={{ padding: "12px 8px", textAlign: "center" }}>
                  <button onClick={() => setSelectedTicket(ticket)} style={{ background: "none", border: "none", cursor: "pointer" }}>
                    <Eye size={16} color={C.blueMid} />
                  </button>
                </td>
              </tr>
            )}
          />
        )}
      </SectionCard>

      {/* Ticket Details Modal - Responsive */}
      {selectedTicket && (
        <div style={{
          position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
          background: "rgba(0,0,0,0.5)", display: "flex",
          alignItems: "center", justifyContent: "center", zIndex: 1000,
          padding: 16,
        }}>
          <div style={{
            background: C.white, borderRadius: 16, padding: 20,
            maxWidth: 500, width: "100%", maxHeight: "80%", overflow: "auto",
          }}>
            <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>Ticket Details</h3>
            <p><strong>Business:</strong> {selectedTicket.businessName}</p>
            <p><strong>Contact:</strong> {selectedTicket.contactName}</p>
            <p><strong>Email:</strong> {selectedTicket.email}</p>
            <p><strong>Issue:</strong> {selectedTicket.issueTitle}</p>
            <p><strong>Description:</strong> {selectedTicket.issueDescription}</p>
            <button onClick={() => setSelectedTicket(null)} style={{
              marginTop: 16, padding: "10px 20px", background: C.blue,
              color: C.white, border: "none", borderRadius: 8, cursor: "pointer",
              width: "100%",
            }}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

// Quotes Page - Responsive
const QuotesPage = () => {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mobileView, setMobileView] = useState(false);

  useEffect(() => {
    const checkMobile = () => setMobileView(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const fetchQuotes = async () => {
    try {
      const response = await api.get(API_ENDPOINTS.GET_QUOTES);
      setQuotes(response.data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchQuotes(); }, []);

  if (loading) return <div style={{ textAlign: "center", padding: 40 }}>Loading quotes...</div>;

  return (
    <SectionCard title="Quote Requests" action="Refresh" onAction={fetchQuotes}>
      {mobileView ? (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {quotes.map((quote) => (
            <div key={quote._id} style={{
              background: C.gray50, borderRadius: 12, padding: 12,
              border: `1px solid ${C.gray100}`,
            }}>
              <p style={{ fontWeight: 700, margin: 0 }}>{quote.businessName}</p>
              <p style={{ fontSize: 12, color: C.gray500, margin: "4px 0" }}>{quote.contactPerson}</p>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 8 }}>
                <span style={{ fontSize: 12 }}>{quote.businessType}</span>
                <Badge style={statusStyle(quote.status)} />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <ResponsiveTable
          headers={["Business", "Contact", "Type", "Status", "Received"]}
          data={quotes}
          renderRow={(quote) => (
            <tr key={quote._id} style={{ borderBottom: `1px solid ${C.gray50}` }}>
              <td style={{ padding: "12px 8px", fontWeight: 600 }}>{quote.businessName}</td>
              <td style={{ padding: "12px 8px" }}>{quote.contactPerson}</td>
              <td style={{ padding: "12px 8px" }}>{quote.businessType}</td>
              <td style={{ padding: "12px 8px" }}><Badge style={statusStyle(quote.status)} /></td>
              <td style={{ padding: "12px 8px" }}>{new Date(quote.createdAt).toLocaleDateString()}</td>
            </tr>
          )}
        />
      )}
    </SectionCard>
  );
};

// Contacts Page - Responsive
const ContactsPage = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mobileView, setMobileView] = useState(false);

  useEffect(() => {
    const checkMobile = () => setMobileView(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await api.get(API_ENDPOINTS.GET_CONTACTS);
      setContacts(response.data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchContacts(); }, []);

  if (loading) return <div style={{ textAlign: "center", padding: 40 }}>Loading contacts...</div>;

  return (
    <SectionCard title="Contact Messages" action="Refresh" onAction={fetchContacts}>
      {mobileView ? (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {contacts.map((contact) => (
            <div key={contact._id} style={{
              background: C.gray50, borderRadius: 12, padding: 12,
              border: `1px solid ${C.gray100}`,
            }}>
              <p style={{ fontWeight: 700, margin: 0 }}>{contact.fullName}</p>
              <p style={{ fontSize: 12, color: C.gray500, margin: "4px 0" }}>{contact.email}</p>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 8 }}>
                <span style={{ fontSize: 12 }}>{contact.inquiryType}</span>
                <Badge style={statusStyle(contact.status)} />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <ResponsiveTable
          headers={["Name", "Email", "Inquiry", "Status", "Received"]}
          data={contacts}
          renderRow={(contact) => (
            <tr key={contact._id} style={{ borderBottom: `1px solid ${C.gray50}` }}>
              <td style={{ padding: "12px 8px", fontWeight: 600 }}>{contact.fullName}</td>
              <td style={{ padding: "12px 8px" }}>{contact.email}</td>
              <td style={{ padding: "12px 8px" }}>{contact.inquiryType}</td>
              <td style={{ padding: "12px 8px" }}><Badge style={statusStyle(contact.status)} /></td>
              <td style={{ padding: "12px 8px" }}>{new Date(contact.createdAt).toLocaleDateString()}</td>
            </tr>
          )}
        />
      )}
    </SectionCard>
  );
};

// Monitoring Page - Responsive
const MonitoringPage = () => {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [businessId, setBusinessId] = useState("BUSINESS_001");

  const fetchDevices = async () => {
    try {
      setLoading(true);
      const response = await api.get(API_ENDPOINTS.GET_DEVICES(businessId));
      setDevices(response.data.devices || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchDevices(); }, [businessId]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{
        display: "flex", flexDirection: { xs: "column", sm: "row" },
        gap: 10,
      }}>
        <input
          type="text"
          value={businessId}
          onChange={(e) => setBusinessId(e.target.value)}
          placeholder="Business ID"
          style={{
            padding: "10px 12px", borderRadius: 8,
            border: `1px solid ${C.gray300}`,
            flex: 1,
          }}
        />
        <button onClick={fetchDevices} style={{
          padding: "10px 20px", background: C.blue,
          color: C.white, border: "none", borderRadius: 8,
          cursor: "pointer",
        }}>Load Devices</button>
      </div>

      <SectionCard title="Device Monitoring">
        {loading ? (
          <div style={{ textAlign: "center", padding: 40 }}>Loading...</div>
        ) : devices.length === 0 ? (
          <div style={{ textAlign: "center", padding: 40, color: C.gray500 }}>No devices found</div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {devices.map((device) => (
              <div key={device.id} style={{
                display: "flex", flexDirection: { xs: "column", sm: "row" },
                justifyContent: "space-between", alignItems: { xs: "flex-start", sm: "center" },
                padding: 12, background: C.gray50, borderRadius: 8,
                gap: 8,
              }}>
                <div>
                  <p style={{ fontWeight: 700, margin: 0 }}>{device.deviceName}</p>
                  <p style={{ fontSize: 12, color: C.gray500, margin: "4px 0 0" }}>IP: {device.ipAddress}</p>
                </div>
                <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                  <span style={{ fontSize: 12 }}>
                    Network: <strong style={{ color: device.networkStatus === "up" ? C.success : C.red }}>
                      {device.networkStatus}
                    </strong>
                  </span>
                  <span style={{ fontSize: 12 }}>
                    Printer: <strong>{device.printerStatus}</strong>
                  </span>
                  {device.wifiStrength && (
                    <span style={{ fontSize: 12 }}>WiFi: {device.wifiStrength}%</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </SectionCard>
    </div>
  );
};

// Reports Page - Responsive
const ReportsPage = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mobileView, setMobileView] = useState(false);

  useEffect(() => {
    const checkMobile = () => setMobileView(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const fetchReports = async () => {
    try {
      const response = await api.get(API_ENDPOINTS.GET_REPORTS);
      setReports(response.data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchReports(); }, []);

  if (loading) return <div style={{ textAlign: "center", padding: 40 }}>Loading reports...</div>;

  return (
    <SectionCard title="Monthly Reports" action="Refresh" onAction={fetchReports}>
      {mobileView ? (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {reports.map((report) => (
            <div key={report._id} style={{
              background: C.gray50, borderRadius: 12, padding: 12,
              border: `1px solid ${C.gray100}`,
            }}>
              <p style={{ fontWeight: 700, margin: 0 }}>{report.reportTitle}</p>
              <p style={{ fontSize: 12, color: C.gray500, margin: "4px 0" }}>{report.businessName}</p>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 8 }}>
                <span style={{ fontSize: 12 }}>{report.reportMonth}</span>
                <span style={{ padding: "4px 8px", background: C.blueLight, borderRadius: 4, fontSize: 12 }}>
                  Uptime: {report.uptimePercentage}%
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <ResponsiveTable
          headers={["Report Title", "Business", "Month", "Uptime"]}
          data={reports}
          renderRow={(report) => (
            <tr key={report._id} style={{ borderBottom: `1px solid ${C.gray50}` }}>
              <td style={{ padding: "12px 8px", fontWeight: 600 }}>{report.reportTitle}</td>
              <td style={{ padding: "12px 8px" }}>{report.businessName}</td>
              <td style={{ padding: "12px 8px" }}>{report.reportMonth}</td>
              <td style={{ padding: "12px 8px" }}>
                <span style={{ padding: "4px 8px", background: C.blueLight, borderRadius: 4 }}>
                  {report.uptimePercentage}%
                </span>
              </td>
            </tr>
          )}
        />
      )}
    </SectionCard>
  );
};

// Main Dashboard Component - Responsive Sidebar
export default function InnovexaDashboard() {
  const [activePage, setActivePage] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [stats, setStats] = useState({});
  const [chartData, setChartData] = useState({});
  const [adminName, setAdminName] = useState("Admin");

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) setSidebarOpen(false);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    fetchDashboardData();
    const adminData = localStorage.getItem("adminData");
    if (adminData) setAdminName(JSON.parse(adminData).name || "Admin");
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [ticketsRes, quotesRes, contactsRes] = await Promise.all([
        api.get(API_ENDPOINTS.GET_TICKETS({})),
        api.get(API_ENDPOINTS.GET_QUOTES),
        api.get(API_ENDPOINTS.GET_CONTACTS)
      ]);
      
      const tickets = ticketsRes.data.data || [];
      const quotes = quotesRes.data.data || [];
      const contacts = contactsRes.data.data || [];
      
      setStats({
        openTickets: tickets.filter(t => ["new", "open", "in-progress"].includes(t.status)).length,
        resolvedTickets: tickets.filter(t => t.status === "resolved").length,
        newQuotes: quotes.filter(q => q.status === "new").length,
        newContacts: contacts.filter(c => c.status === "new").length,
        monitoredDevices: 24,
        avgUptime: "99.1%",
        recentTickets: tickets.slice(0, 5),
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
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
    }
  };

  const pageContent = {
    dashboard: <DashboardPage stats={stats} chartData={chartData} />,
    tickets: <TicketsPage />,
    quotes: <QuotesPage />,
    contact: <ContactsPage />,
    monitor: <MonitoringPage />,
    reports: <ReportsPage />,
  };

  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", id: "dashboard" },
    { icon: Ticket, label: "Tickets", id: "tickets" },
    { icon: Quote, label: "Quotes", id: "quotes" },
    { icon: Mail, label: "Contact", id: "contact" },
    { icon: Activity, label: "Monitoring", id: "monitor" },
    { icon: FileText, label: "Reports", id: "reports" },
  ];

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: C.gray50, minHeight: "100vh" }}>
      {/* Mobile Menu Button */}
      {isMobile && (
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          style={{
            position: "fixed", top: 16, left: 16, zIndex: 1001,
            background: C.navy, border: "none", borderRadius: 8,
            padding: 10, cursor: "pointer", boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
          }}
        >
          <Menu size={20} color={C.white} />
        </button>
      )}

      {/* Sidebar - Responsive */}
      <div style={{
        width: 250,
        background: C.navy,
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        position: "fixed",
        left: 0,
        top: 0,
        zIndex: 1000,
        transform: isMobile && !sidebarOpen ? "translateX(-100%)" : "translateX(0)",
        transition: "transform 0.3s ease",
        boxShadow: "4px 0 20px rgba(13,31,92,0.18)",
      }}>
        <div style={{
          padding: "20px",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              background: C.red, borderRadius: 8, width: 32, height: 32,
              display: "flex", alignItems: "center", justifyContent: "center"
            }}>
              <span style={{ color: C.white, fontWeight: 900, fontSize: 14 }}>IX</span>
            </div>
            <div>
              <p style={{ color: C.white, fontWeight: 800, fontSize: 14, margin: 0 }}>Innovexa</p>
              <p style={{ color: C.blueMid, fontSize: 10, margin: 0 }}>SOFTWARES</p>
            </div>
          </div>
          {isMobile && (
            <button onClick={() => setSidebarOpen(false)} style={{ background: "none", border: "none", cursor: "pointer" }}>
              <X size={18} color={C.gray300} />
            </button>
          )}
        </div>

        <nav style={{ flex: 1, padding: "12px 8px", overflowY: "auto" }}>
          {navItems.map(({ icon: Icon, label, id }) => (
            <button
              key={id}
              onClick={() => {
                setActivePage(id);
                if (isMobile) setSidebarOpen(false);
              }}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "12px 14px",
                borderRadius: 8,
                marginBottom: 2,
                cursor: "pointer",
                border: "none",
                background: activePage === id ? C.blue : "transparent",
                color: activePage === id ? C.white : C.gray300,
                fontWeight: activePage === id ? 700 : 400,
                fontSize: 13,
                textAlign: "left",
                transition: "all 0.15s",
              }}
            >
              <Icon size={18} style={{ flexShrink: 0 }} />
              {label}
            </button>
          ))}
        </nav>

        <div style={{ padding: "12px 8px", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          <button
            onClick={() => {
              localStorage.clear();
              window.location.href = "/login";
            }}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "12px 14px",
              borderRadius: 8,
              cursor: "pointer",
              border: "none",
              background: "transparent",
              color: C.gray300,
              fontSize: 13,
            }}
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div style={{
        marginLeft: isMobile ? 0 : 250,
        transition: "margin-left 0.3s ease",
      }}>
        {/* Top Bar - Responsive */}
        <div style={{
          background: C.white,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: isMobile ? "12px 16px 12px 60px" : "12px 24px",
          gap: 12,
          flexWrap: "wrap",
          boxShadow: "0 1px 8px rgba(26,58,143,0.07)",
          position: "sticky",
          top: 0,
          zIndex: 50,
        }}>
          <h1 style={{
            fontSize: isMobile ? 18 : 20,
            fontWeight: 800,
            color: C.navy,
            margin: 0,
            textTransform: "capitalize",
          }}>{activePage}</h1>

          <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
            {/* Search Bar - Hide on very small */}
            {!isMobile && (
              <div style={{
                display: "flex", alignItems: "center",
                background: C.gray50, borderRadius: 8,
                padding: "6px 12px", gap: 8,
              }}>
                <Search size={14} color={C.gray500} />
                <input
                  placeholder="Search..."
                  style={{
                    border: "none", background: "none",
                    outline: "none", fontSize: 13, width: 160,
                  }}
                />
              </div>
            )}

            <div style={{ position: "relative" }}>
              <Bell size={18} color={C.gray500} />
              <div style={{
                position: "absolute", top: -3, right: -3,
                width: 8, height: 8, borderRadius: "50%",
                background: C.red,
              }} />
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{
                width: 32, height: 32, borderRadius: "50%",
                background: `linear-gradient(135deg, ${C.blue}, ${C.red})`,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <span style={{ color: C.white, fontSize: 12, fontWeight: 700 }}>
                  {adminName.charAt(0).toUpperCase()}
                </span>
              </div>
              {!isMobile && (
                <div>
                  <p style={{ fontSize: 12, fontWeight: 700, color: C.navy, margin: 0 }}>{adminName}</p>
                  <p style={{ fontSize: 10, color: C.gray500, margin: 0 }}>Administrator</p>
                </div>
              )}
              <ChevronDown size={12} color={C.gray500} />
            </div>
          </div>
        </div>

        {/* Page Content */}
        <main style={{ padding: isMobile ? 16 : 24 }}>
          {pageContent[activePage] || pageContent.dashboard}
        </main>
      </div>

      {/* Overlay for mobile sidebar */}
      {isMobile && sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{
            position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
            background: "rgba(0,0,0,0.5)", zIndex: 999,
          }}
        />
      )}
    </div>
  );
}