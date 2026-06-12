import api from "./api";

// Submit quote request (Public)
export const submitQuote = async (formData) => {
  const response = await api.post("/api/quotes", formData);
  return response.data;
};

// Get all quotes (Admin only)
export const getAllQuotes = async (params = {}) => {
  const response = await api.get("/api/quotes", { params });
  return response.data;
};

// Get single quote (Admin only)
export const getQuoteById = async (id) => {
  const response = await api.get(`/api/quotes/${id}`);
  return response.data;
};

// Update quote status (Admin only)
export const updateQuoteStatus = async (id, status, adminNotes) => {
  const response = await api.patch(`/api/quotes/${id}/status`, {
    status,
    adminNotes,
  });
  return response.data;
};

// Delete quote (Admin only)
export const deleteQuote = async (id) => {
  const response = await api.delete(`/api/quotes/${id}`);
  return response.data;
};