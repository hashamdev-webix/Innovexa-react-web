import { useState } from "react";
import { Mail, Phone, MapPin, Clock, Send, AlertCircle, CheckCircle, User, Briefcase, MessageCircle, Ticket, Loader } from "lucide-react";
import axios from "axios";

const API_URL = "http://localhost:5007";

export default function Contact() {
  const [formType, setFormType] = useState("contact");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [validationErrors, setValidationErrors] = useState({});

  // Contact Form State (Simple - jaisa pehle tha)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
  });

  // Ticket Form State
  const [ticketData, setTicketData] = useState({
    businessName: "",
    contactName: "",
    email: "",
    phone: "",
    issueCategory: "Network Issue",
    issueTitle: "",
    issueDescription: "",
    priority: "medium"
  });

  const issueCategories = [
    "Network Issue", "Hardware Problem", "Software Issue", "Printer Problem",
    "Security Concern", "Email Issue", "Data Backup", "Other"
  ];

  const priorityOptions = [
    { value: "low", label: "Low - Minor issue" },
    { value: "medium", label: "Medium - Affecting work" },
    { value: "high", label: "High - Urgent attention" },
    { value: "critical", label: "Critical - System down" }
  ];

  // Handle Contact Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (validationErrors[e.target.name]) {
      setValidationErrors({ ...validationErrors, [e.target.name]: null });
    }
    setError("");
    setSuccess("");
  };

  // Handle Ticket Change
  const handleTicketChange = (e) => {
    setTicketData({ ...ticketData, [e.target.name]: e.target.value });
    if (validationErrors[e.target.name]) {
      setValidationErrors({ ...validationErrors, [e.target.name]: null });
    }
    setError("");
    setSuccess("");
  };

  // Validate Contact Form
  const validateContactForm = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!formData.fullName.trim()) errors.fullName = "Full name is required";
    if (!emailRegex.test(formData.email)) errors.email = "Please enter a valid email address";
    if (!formData.message.trim()) errors.message = "Please enter your message";
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Validate Ticket Form
  const validateTicketForm = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!ticketData.businessName.trim()) errors.businessName = "Business name is required";
    if (!ticketData.contactName.trim()) errors.contactName = "Contact name is required";
    if (!emailRegex.test(ticketData.email)) errors.email = "Please enter a valid email address";
    if (!ticketData.issueTitle.trim()) errors.issueTitle = "Issue title is required";
    if (!ticketData.issueDescription.trim()) errors.issueDescription = "Issue description is required";
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Submit Contact Form
  const handleContactSubmit = async (e) => {
    e.preventDefault();
    if (!validateContactForm()) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setLoading(true);
    setSuccess("");
    setError("");

    try {
      const response = await axios.post(`${API_URL}/api/contact`, formData);
      if (response.data.success) {
        setSuccess("Message sent successfully! We'll get back to you shortly.");
        setFormData({ fullName: "", email: "", phone: "", message: "" });
        setTimeout(() => setSuccess(""), 5000);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Submit Ticket Form
  const handleTicketSubmit = async (e) => {
    e.preventDefault();
    if (!validateTicketForm()) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setLoading(true);
    setSuccess("");
    setError("");

    try {
      const response = await axios.post(`${API_URL}/api/tickets`, ticketData);
      if (response.data.success) {
        setSuccess(`Ticket #${response.data.data?.ticketId || "created"} successfully! Support team will contact you.`);
        setTicketData({
          businessName: "", contactName: "", email: "", phone: "",
          issueCategory: "Network Issue", issueTitle: "", issueDescription: "", priority: "medium"
        });
        setTimeout(() => setSuccess(""), 5000);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create ticket. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    if (formType === "contact") {
      handleContactSubmit(e);
    } else {
      handleTicketSubmit(e);
    }
  };

  return (
    <section className="py-16 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Have questions? We'd love to hear from you. Choose an option below to get in touch.
          </p>
        </div>

        {/* Form Type Selector */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => { setFormType("contact"); setError(""); setSuccess(""); setValidationErrors({}); }}
            className={`px-6 py-3 rounded-xl font-semibold transition-all flex items-center gap-2 ${
              formType === "contact" ? "bg-blue-600 text-white shadow-lg" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            <Mail size={20} />
            General Inquiry
          </button>
          <button
            onClick={() => { setFormType("ticket"); setError(""); setSuccess(""); setValidationErrors({}); }}
            className={`px-6 py-3 rounded-xl font-semibold transition-all flex items-center gap-2 ${
              formType === "ticket" ? "bg-green-600 text-white shadow-lg" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            <Ticket size={20} />
            Support Ticket
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Info Cards */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Phone className="text-blue-600" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Phone</h3>
                  <p className="text-gray-600">+1 (555) 123-4567</p>
                  <p className="text-sm text-gray-500">Mon-Fri, 9am-6pm EST</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Mail className="text-blue-600" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                  <p className="text-gray-600">info@innovexasoftwares.com</p>
                  <p className="text-sm text-gray-500">support@innovexasoftwares.com</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
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

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
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

          {/* Forms */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {formType === "contact" ? "Send us a Message" : "Create Support Ticket"}
              </h2>

              {/* Success Message */}
              {success && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-start gap-3">
                  <CheckCircle size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
                  <p className="text-green-700">{success}</p>
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
                  <AlertCircle size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
                  <p className="text-red-700">{error}</p>
                </div>
              )}

              {/* CONTACT FORM - Simple */}
              {formType === "contact" && (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <div className="relative">
                      <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="Full Name *"
                        className={`w-full pl-12 pr-4 py-4 border rounded-xl outline-none transition ${
                          validationErrors.fullName ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                    </div>
                    {validationErrors.fullName && <p className="text-red-500 text-xs mt-1">{validationErrors.fullName}</p>}
                  </div>

                  <div>
                    <div className="relative">
                      <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email Address *"
                        className={`w-full pl-12 pr-4 py-4 border rounded-xl outline-none transition ${
                          validationErrors.email ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                    </div>
                    {validationErrors.email && <p className="text-red-500 text-xs mt-1">{validationErrors.email}</p>}
                  </div>

                  <div>
                    <div className="relative">
                      <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Phone Number"
                        className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl outline-none transition"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="relative">
                      <MessageCircle size={18} className="absolute left-4 top-4 text-gray-400" />
                      <textarea
                        name="message"
                        rows="5"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Your Message *"
                        className={`w-full pl-12 pr-4 py-4 border rounded-xl resize-none outline-none transition ${
                          validationErrors.message ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                    </div>
                    {validationErrors.message && <p className="text-red-500 text-xs mt-1">{validationErrors.message}</p>}
                  </div>

                  <button type="submit" disabled={loading}
                    className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition disabled:opacity-50 flex items-center justify-center gap-2">
                    {loading ? <Loader className="animate-spin h-5 w-5" /> : <Send size={18} />}
                    {loading ? "Sending..." : "Send Message"}
                  </button>
                </form>
              )}

              {/* TICKET FORM - As it is */}
              {formType === "ticket" && (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <input type="text" name="businessName" value={ticketData.businessName} onChange={handleTicketChange}
                        placeholder="Business Name *" className={`w-full p-4 border rounded-xl outline-none transition ${
                          validationErrors.businessName ? 'border-red-500' : 'border-gray-300'
                        }`} />
                      {validationErrors.businessName && <p className="text-red-500 text-xs mt-1">{validationErrors.businessName}</p>}
                    </div>
                    <div>
                      <input type="text" name="contactName" value={ticketData.contactName} onChange={handleTicketChange}
                        placeholder="Contact Person *" className={`w-full p-4 border rounded-xl outline-none transition ${
                          validationErrors.contactName ? 'border-red-500' : 'border-gray-300'
                        }`} />
                      {validationErrors.contactName && <p className="text-red-500 text-xs mt-1">{validationErrors.contactName}</p>}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <input type="email" name="email" value={ticketData.email} onChange={handleTicketChange}
                        placeholder="Email Address *" className={`w-full p-4 border rounded-xl outline-none transition ${
                          validationErrors.email ? 'border-red-500' : 'border-gray-300'
                        }`} />
                      {validationErrors.email && <p className="text-red-500 text-xs mt-1">{validationErrors.email}</p>}
                    </div>
                    <div>
                      <input type="tel" name="phone" value={ticketData.phone} onChange={handleTicketChange}
                        placeholder="Phone Number" className="w-full p-4 border border-gray-300 rounded-xl outline-none transition" />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <select name="issueCategory" value={ticketData.issueCategory} onChange={handleTicketChange}
                        className="w-full p-4 border border-gray-300 rounded-xl outline-none bg-white">
                        {issueCategories.map(cat => <option key={cat}>{cat}</option>)}
                      </select>
                    </div>
                    <div>
                      <select name="priority" value={ticketData.priority} onChange={handleTicketChange}
                        className="w-full p-4 border border-gray-300 rounded-xl outline-none bg-white">
                        {priorityOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                      </select>
                    </div>
                  </div>

                  <div>
                    <input type="text" name="issueTitle" value={ticketData.issueTitle} onChange={handleTicketChange}
                      placeholder="Issue Title *" className={`w-full p-4 border rounded-xl outline-none transition ${
                        validationErrors.issueTitle ? 'border-red-500' : 'border-gray-300'
                      }`} />
                    {validationErrors.issueTitle && <p className="text-red-500 text-xs mt-1">{validationErrors.issueTitle}</p>}
                  </div>

                  <div>
                    <textarea name="issueDescription" value={ticketData.issueDescription} onChange={handleTicketChange}
                      rows="5" placeholder="Please describe your issue in detail *" className={`w-full p-4 border rounded-xl resize-none outline-none transition ${
                        validationErrors.issueDescription ? 'border-red-500' : 'border-gray-300'
                      }`} />
                    {validationErrors.issueDescription && <p className="text-red-500 text-xs mt-1">{validationErrors.issueDescription}</p>}
                  </div>

                  <button type="submit" disabled={loading}
                    className="w-full py-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition disabled:opacity-50 flex items-center justify-center gap-2">
                    {loading ? <Loader className="animate-spin h-5 w-5" /> : <Ticket size={18} />}
                    {loading ? "Creating Ticket..." : "Submit Support Ticket"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}