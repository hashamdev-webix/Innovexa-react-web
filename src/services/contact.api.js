// src/services/contact.api.js
import api, { API_ENDPOINTS } from "./api";

// Submit contact form (Public)
export const submitContact = async (formData) => {
  try {
    // Map form fields to match your model
    const payload = {
      fullName: formData.fullName,
      businessName: formData.businessName || "",
      email: formData.email,
      phone: formData.phone || "",
      cityProvince: formData.city || formData.cityProvince || "",
      inquiryType: formData.inquiryType,
      businessType: formData.businessType || "",
      message: formData.message,
    };
    
    const response = await api.post(API_ENDPOINTS.CREATE_CONTACT, payload);
    return {
      success: true,
      message: "Message sent successfully! We'll get back to you shortly.",
      data: response.data
    };
  } catch (error) {
    console.error("Submit contact error:", error);
    
    if (error.response?.data?.errors) {
      return {
        success: false,
        errors: error.response.data.errors,
        message: "Please fix the validation errors."
      };
    }
    
    return {
      success: false,
      message: error.response?.data?.message || "Failed to send message. Please try again."
    };
  }
};

// Get all contacts (Admin only)
export const getContacts = async () => {
  const response = await api.get(API_ENDPOINTS.GET_CONTACTS);
  return response.data;
};

// Update contact status (Admin only)
export const updateContactStatus = async (id, status) => {
  const response = await api.patch(API_ENDPOINTS.UPDATE_CONTACT_STATUS(id), { status });
  return response.data;
};

// Delete contact (Admin only)
export const deleteContact = async (id) => {
  const response = await api.delete(API_ENDPOINTS.DELETE_CONTACT(id));
  return response.data;
};

// Get single contact (Admin only)
export const getContact = async (id) => {
  const response = await api.get(API_ENDPOINTS.GET_CONTACT(id));
  return response.data;
};