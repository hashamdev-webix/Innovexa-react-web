import api from "./api";

// Send agent data (Public - Agent)
export const sendAgentData = async (data) => {
  const response = await api.post("/api/monitor/agent", data);
  return response.data;
};

// Get business status (Admin only)
export const getBusinessStatus = async (businessId, params = {}) => {
  const response = await api.get(`/api/monitor/status/${businessId}`, { params });
  return response.data;
};

// Get active alerts (Admin only)
export const getActiveAlerts = async (businessId) => {
  const response = await api.get(`/api/monitor/alerts/${businessId}`);
  return response.data;
};

// Resolve alert (Admin only)
export const resolveAlert = async (businessId, deviceName) => {
  const response = await api.post("/api/monitor/alert/resolve", {
    businessId,
    deviceName,
  });
  return response.data;
};

// Delete device (Admin only)
export const deleteDevice = async (deviceId) => {
  const response = await api.delete(`/api/monitor/device/${deviceId}`);
  return response.data;
};