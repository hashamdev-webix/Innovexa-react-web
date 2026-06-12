import { useState } from "react";
import { Mail, Phone, MapPin, Clock, Send, AlertCircle, CheckCircle, User, Briefcase, Building, MessageCircle } from "lucide-react";
import { submitContact } from "../../services/contact.api";

export default function Contact() {
  const [formData, setFormData] = useState({
    fullName: "",
    businessName: "",
    email: "",
    phone: "",
    city: "",
    inquiryType: "",
    businessType: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [validationErrors, setValidationErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear error for this field
    if (validationErrors[e.target.name]) {
      setValidationErrors({ ...validationErrors, [e.target.name]: null });
    }
    setError("");
    setSuccess("");
  };

  const validateForm = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!formData.fullName.trim()) {
      errors.fullName = "Full name is required";
    }
    if (!emailRegex.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }
    if (formData.phone && !/^[\d\s+()-]{10,}$/.test(formData.phone)) {
      errors.phone = "Please enter a valid phone number (minimum 10 digits)";
    }
    if (!formData.inquiryType) {
      errors.inquiryType = "Please select an inquiry type";
    }
    if (!formData.message.trim()) {
      errors.message = "Please enter your message";
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    setError("");
    
    if (!validateForm()) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    
    setLoading(true);

    try {
      const response = await submitContact(formData);
      
      if (response.success) {
        setSuccess(response.message || "Message sent successfully! We'll get back to you shortly.");
        
        // Reset form
        setFormData({
          fullName: "",
          businessName: "",
          email: "",
          phone: "",
          city: "",
          inquiryType: "",
          businessType: "",
          message: "",
        });
        
        // Clear success message after 5 seconds
        setTimeout(() => setSuccess(""), 5000);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        setError(response.message || "Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error("Contact form error:", err);
      
      if (err.errors) {
        setValidationErrors(err.errors);
        setError("Please fix the validation errors below.");
      } else if (err.message) {
        setError(err.message);
      } else {
        setError("Failed to send message. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 ">
          {/* Contact Info Cards */}
          <div className="lg:col-span-1 space-y-6 ">
            <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Phone className="text-blue-600" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Phone</h3>
                  <p className="text-gray-600">+1 (555) 123-4567</p>
                  <p className="text-sm text-gray-500">Mon-Fri, 9am-6pm EST</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow my-3">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Mail className="text-blue-600" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                  <p className="text-gray-600">info@innovexasoftwares.com</p>
                  <p className="text-sm text-gray-500">support@innovexasoftwares.com</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow my-3">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="text-blue-600" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Office</h3>
                  <p className="text-gray-600">
                    123 Innovation Drive<br />
                    Toronto, ON M5V 2T6<br />
                    Canada
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Clock className="text-blue-600" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Hours</h3>
                  <p className="text-gray-600">Monday - Friday: 9am - 6pm</p>
                  <p className="text-sm text-gray-500">Saturday - Sunday: Closed</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>

              {/* Success Message */}
              {success && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-start gap-3">
                  <CheckCircle size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-green-800 font-medium">Success!</p>
                    <p className="text-green-700 text-sm">{success}</p>
                  </div>
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
                  <AlertCircle size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-red-800 font-medium">Error</p>
                    <p className="text-red-700 text-sm">{error}</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name and Business */}
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <div className="relative my-2">
                      <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="Full Name *"
                        className={`w-full pl-12 pr-4 py-4 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition ${
                          validationErrors.fullName ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                    </div>
                    {validationErrors.fullName && (
                      <p className="text-red-500 text-xs mt-1">{validationErrors.fullName}</p>
                    )}
                  </div>
                  <div>
                    <div className="relative my-2">
                      <Briefcase size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        name="businessName"
                        value={formData.businessName}
                        onChange={handleChange}
                        placeholder="Business Name"
                        className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                      />
                    </div>
                  </div>
                </div>

                {/* Email and Phone */}
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <div className="relative my-2">
                      <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email Address *"
                        className={`w-full pl-12 pr-4 py-4 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition ${
                          validationErrors.email ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                    </div>
                    {validationErrors.email && (
                      <p className="text-red-500 text-xs mt-1">{validationErrors.email}</p>
                    )}
                  </div>
                  <div>
                    <div className="relative my-2">
                      <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Phone Number"
                        className={`w-full pl-12 pr-4 py-4 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition ${
                          validationErrors.phone ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                    </div>
                    {validationErrors.phone && (
                      <p className="text-red-500 text-xs mt-1">{validationErrors.phone}</p>
                    )}
                  </div>
                </div>

                {/* City and Inquiry Type */}
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <div className="relative my-2">
                      <MapPin size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="City / Province"
                        className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                      />
                    </div>
                  </div>
                  <div>
                    <select
                      name="inquiryType"
                      value={formData.inquiryType}
                      onChange={handleChange}
                      className={`w-full px-4 py-4 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white transition ${
                        validationErrors.inquiryType ? 'border-red-500' : 'border-gray-300'
                      }`}
                    >
                      <option value="">Select Inquiry Type *</option>
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="AI IT Troubleshooting">AI IT Troubleshooting</option>
                      <option value="Network Monitoring">Network Monitoring</option>
                      <option value="Internet & Wi-Fi Issues">Internet & Wi-Fi Issues</option>
                      <option value="Printer & Device Support">Printer & Device Support</option>
                      <option value="Onboarding & Setup">Onboarding & Setup</option>
                      <option value="Monthly Technology Reports">Monthly Technology Reports</option>
                      <option value="Quote Request">Quote Request</option>
                      <option value="Partnership Inquiry">Partnership Inquiry</option>
                      <option value="Other">Other</option>
                    </select>
                    {validationErrors.inquiryType && (
                      <p className="text-red-500 text-xs mt-1">{validationErrors.inquiryType}</p>
                    )}
                  </div>
                </div>

                {/* Business Type */}
                <div>
                  <div className="relative my-2">
                    <Building size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <select
                      name="businessType"
                      value={formData.businessType}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white transition"
                    >
                      <option value="">Business Type</option>
                      <option value="Dental Clinic">Dental Clinic</option>
                      <option value="Law Firm">Law Firm</option>
                      <option value="Accounting Firm">Accounting Firm</option>
                      <option value="Medical Office">Medical Office</option>
                      <option value="Real Estate Office">Real Estate Office</option>
                      <option value="Service-Based Business">Service-Based Business</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <div className="relative my-2">
                    <MessageCircle size={18} className="absolute left-4 top-4 text-gray-400" />
                    <textarea
                      name="message"
                      rows="6"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us how we can help your business. *"
                      className={`w-full pl-12 pr-4 py-4 border rounded-xl resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition ${
                        validationErrors.message ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                  </div>
                  {validationErrors.message && (
                    <p className="text-red-500 text-xs mt-1">{validationErrors.message}</p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}