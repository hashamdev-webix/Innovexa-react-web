import api from "./api";

// Get all reports (Admin only)
export const getAllReports = async (params = {}) => {
  const response = await api.get("/api/reports", { params });
  return response.data;
};

// Create report (Admin only)
export const createReport = async (reportData) => {
  const response = await api.post("/api/reports", reportData);
  return response.data;
};

// Get report by ID (Admin only)
export const getReportById = async (id) => {
  const response = await api.get(`/api/reports/${id}`);
  return response.data;
};

// Update report (Admin only)
export const updateReport = async (id, reportData) => {
  const response = await api.put(`/api/reports/${id}`, reportData);
  return response.data;
};

// Delete report (Admin only)
export const deleteReport = async (id) => {
  const response = await api.delete(`/api/reports/${id}`);
  return response.data;
};