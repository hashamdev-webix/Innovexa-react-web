import api from "./api";

// Create support ticket (Public)
export const createTicket = async (formData) => {
  const response = await api.post("/api/tickets", formData);
  return response.data;
};

// Get all tickets (Admin only)
export const getAllTickets = async (params = {}) => {
  const response = await api.get("/api/tickets", { params });
  return response.data;
};

// Get single ticket (Admin only)
export const getTicketById = async (id) => {
  const response = await api.get(`/api/tickets/${id}`);
  return response.data;
};

// Update ticket (Admin only)
export const updateTicket = async (id, updateData) => {
  const response = await api.patch(`/api/tickets/${id}`, updateData);
  return response.data;
};

// Update ticket status (Admin only)
export const updateTicketStatus = async (id, status) => {
  const response = await api.patch(`/api/tickets/${id}/status`, { status });
  return response.data;
};

// Delete ticket (Admin only)
export const deleteTicket = async (id) => {
  const response = await api.delete(`/api/tickets/${id}`);
  return response.data;
};

// Add comment to ticket (Admin only)
export const addTicketComment = async (id, comment, userId, userName) => {
  const response = await api.post(`/api/tickets/${id}/comments`, {
    comment,
    userId,
    userName,
  });
  return response.data;
};