import { useState } from "react";
import axios from "axios";

export default function QuoteFormSection() {
  const [formData, setFormData] = useState({
    businessName: "",
    contactPerson: "",
    email: "",
    phone: "",
    businessType: "",
    cityProvince: "",
    website: "",
    numberOfEmployees: "",
    numberOfLocations: "",
    numberOfComputers: "",
    numberOfPrinters: "",
    hasInternalIT: false,
    servicesNeeded: [],
    currentITProblems: [],
    preferredContact: "",
    message: "",
    budgetRange: "Not sure",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [validationErrors, setValidationErrors] = useState({});

  // ✅ FIXED: API URL - port 5007 (not 5000)
  const API_URL = "http://localhost:5007";

  // Handle Inputs
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
    
    if (validationErrors[name]) {
      setValidationErrors({
        ...validationErrors,
        [name]: null,
      });
    }
  };

  // Handle Checkboxes for arrays
  const handleCheckboxChange = (e, field) => {
    const { value, checked } = e.target;

    if (checked) {
      setFormData({
        ...formData,
        [field]: [...formData[field], value],
      });
    } else {
      setFormData({
        ...formData,
        [field]: formData[field].filter(
          (item) => item !== value
        ),
      });
    }
  };

  // Validate form before submit
  const validateForm = () => {
    const errors = {};
    
    if (!formData.businessName.trim()) errors.businessName = "Business name is required";
    if (!formData.contactPerson.trim()) errors.contactPerson = "Contact person name is required";
    if (!formData.email.match(/^\S+@\S+\.\S+$/)) errors.email = "Valid email is required";
    if (!formData.phone.trim()) errors.phone = "Phone number is required";
    if (!formData.businessType) errors.businessType = "Business type is required";
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Submit Form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setError("Please fix the validation errors below.");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setLoading(true);
    setSuccess("");
    setError("");
    setValidationErrors({});

    const submitData = {
      businessName: formData.businessName,
      contactPerson: formData.contactPerson,
      email: formData.email,
      phone: formData.phone,
      businessType: formData.businessType,
      cityProvince: formData.cityProvince || null,
      website: formData.website || null,
      numberOfEmployees: formData.numberOfEmployees ? parseInt(formData.numberOfEmployees) : null,
      numberOfLocations: formData.numberOfLocations ? parseInt(formData.numberOfLocations) : 1,
      numberOfComputers: formData.numberOfComputers ? parseInt(formData.numberOfComputers) : null,
      numberOfPrinters: formData.numberOfPrinters ? parseInt(formData.numberOfPrinters) : null,
      hasInternalIT: formData.hasInternalIT,
      servicesNeeded: formData.servicesNeeded,
      currentITProblems: formData.currentITProblems,
      preferredContact: formData.preferredContact || "Email",
      message: formData.message || "",
      budgetRange: formData.budgetRange,
    };

    try {
      // ✅ FIXED: Correct API endpoint
      const response = await axios.post(`${API_URL}/api/quotes`, submitData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.data.success) {
        setSuccess(response.data.message || "Quote request submitted successfully! Our team will contact you within 24 hours.");

        setFormData({
          businessName: "",
          contactPerson: "",
          email: "",
          phone: "",
          businessType: "",
          cityProvince: "",
          website: "",
          numberOfEmployees: "",
          numberOfLocations: "",
          numberOfComputers: "",
          numberOfPrinters: "",
          hasInternalIT: false,
          servicesNeeded: [],
          currentITProblems: [],
          preferredContact: "",
          message: "",
          budgetRange: "Not sure",
        });

        window.scrollTo({ top: 0, behavior: "smooth" });
        setTimeout(() => setSuccess(""), 5000);
      }
    } catch (err) {
      console.error("Quote submission error:", err);
      
      if (err.code === 'ERR_NETWORK') {
        setError("Cannot connect to server. Please make sure backend is running on port 5007");
      } else if (err.response?.data?.errors) {
        const errors = {};
        err.response.data.errors.forEach((error) => {
          errors[error.path] = error.msg;
        });
        setValidationErrors(errors);
        setError("Please fix the validation errors below.");
      } else if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
      
      window.scrollTo({ top: 0, behavior: "smooth" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-10 lg:mb-14">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">
            Request Your Innovexa Quote
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Complete the form below so our team can understand your business size, technology
            needs, current IT challenges, and support goals.
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-10">

          {/* Success Message */}
          {success && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-xl">
              <p className="font-medium">✓ {success}</p>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl">
              <p className="font-medium">⚠ {error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-5">

            {/* Business Info */}
            <div className="sm:col-span-2">
              <h3 className="font-semibold text-lg mb-3 text-gray-800">Business Information</h3>
            </div>

            {/* Business Name */}
            <div>
              <input
                type="text"
                name="businessName"
                value={formData.businessName}
                onChange={handleChange}
                placeholder="Business Name *"
                className={`w-full p-4 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition ${
                  validationErrors.businessName ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {validationErrors.businessName && (
                <p className="text-red-500 text-xs mt-1">{validationErrors.businessName}</p>
              )}
            </div>

            {/* Contact Person */}
            <div>
              <input
                type="text"
                name="contactPerson"
                value={formData.contactPerson}
                onChange={handleChange}
                placeholder="Contact Person Full Name *"
                className={`w-full p-4 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition ${
                  validationErrors.contactPerson ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {validationErrors.contactPerson && (
                <p className="text-red-500 text-xs mt-1">{validationErrors.contactPerson}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address *"
                className={`w-full p-4 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition ${
                  validationErrors.email ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {validationErrors.email && (
                <p className="text-red-500 text-xs mt-1">{validationErrors.email}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone Number *"
                className={`w-full p-4 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition ${
                  validationErrors.phone ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {validationErrors.phone && (
                <p className="text-red-500 text-xs mt-1">{validationErrors.phone}</p>
              )}
            </div>

            {/* Business Type */}
            <div>
              <select
                name="businessType"
                value={formData.businessType}
                onChange={handleChange}
                className={`w-full p-4 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition ${
                  validationErrors.businessType ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Business Type *</option>
                <option value="Dental Clinic">Dental Clinic</option>
                <option value="Law Firm">Law Firm</option>
                <option value="Accounting Firm">Accounting Firm</option>
                <option value="Medical Office">Medical Office</option>
                <option value="Real Estate Office">Real Estate Office</option>
                <option value="Service-Based Business">Service-Based Business</option>
                <option value="Other">Other</option>
              </select>
              {validationErrors.businessType && (
                <p className="text-red-500 text-xs mt-1">{validationErrors.businessType}</p>
              )}
            </div>

            {/* Optional Fields */}
            <input
              type="text"
              name="cityProvince"
              value={formData.cityProvince}
              onChange={handleChange}
              placeholder="City / Province"
              className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            />

            <input
              type="url"
              name="website"
              value={formData.website}
              onChange={handleChange}
              placeholder="Business Website"
              className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            />

            <input
              type="number"
              name="numberOfEmployees"
              value={formData.numberOfEmployees}
              onChange={handleChange}
              placeholder="Number of Employees"
              className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            />

            <input
              type="number"
              name="numberOfLocations"
              value={formData.numberOfLocations}
              onChange={handleChange}
              placeholder="Number of Office Locations"
              className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            />

            <input
              type="number"
              name="numberOfComputers"
              value={formData.numberOfComputers}
              onChange={handleChange}
              placeholder="Number of Computers / Laptops"
              className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            />

            <input
              type="number"
              name="numberOfPrinters"
              value={formData.numberOfPrinters}
              onChange={handleChange}
              placeholder="Number of Printers"
              className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            />

            {/* Internal IT Team */}
            <div className="sm:col-span-2">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="hasInternalIT"
                  checked={formData.hasInternalIT}
                  onChange={handleChange}
                  className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                />
                <span className="text-gray-700">We have an internal IT team</span>
              </label>
            </div>

            {/* Budget Range */}
            <div className="sm:col-span-2">
              <select
                name="budgetRange"
                value={formData.budgetRange}
                onChange={handleChange}
                className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              >
                <option value="Not sure">Budget Range (Optional)</option>
                <option value="Under $500">Under $500</option>
                <option value="$500 - $1000">$500 - $1000</option>
                <option value="$1000 - $5000">$1000 - $5000</option>
                <option value="$5000+">$5000+</option>
              </select>
            </div>

            {/* Services Needed */}
            <div className="sm:col-span-2">
              <h3 className="font-semibold text-lg mb-4 text-gray-800">
                Services Needed
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  "AI-Assisted IT Troubleshooting",
                  "Internet & Wi-Fi Monitoring",
                  "Printer & Device Troubleshooting",
                  "Support Ticket Creation",
                  "Monthly Technology Reports",
                  "Onboarding & Setup Support",
                  "Not Sure / Need Recommendation",
                ].map((service) => (
                  <label key={service} className="flex items-center gap-2 text-gray-700 cursor-pointer">
                    <input
                      type="checkbox"
                      value={service}
                      checked={formData.servicesNeeded.includes(service)}
                      onChange={(e) => handleCheckboxChange(e, "servicesNeeded")}
                      className="w-4 h-4 text-blue-600 rounded"
                    />
                    <span>{service}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Current IT Problems */}
            <div className="sm:col-span-2">
              <h3 className="font-semibold text-lg mb-4 text-gray-800">
                Current IT Problems
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  "Internet outages",
                  "Weak or unstable Wi-Fi",
                  "Printer not working",
                  "Devices disconnecting",
                  "Slow systems",
                  "No clear IT support process",
                  "Recurring technology downtime",
                  "Other",
                ].map((problem) => (
                  <label key={problem} className="flex items-center gap-2 text-gray-700 cursor-pointer">
                    <input
                      type="checkbox"
                      value={problem}
                      checked={formData.currentITProblems.includes(problem)}
                      onChange={(e) => handleCheckboxChange(e, "currentITProblems")}
                      className="w-4 h-4 text-blue-600 rounded"
                    />
                    <span>{problem}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Preferred Contact Method */}
            <div className="sm:col-span-2">
              <h3 className="font-semibold text-lg mb-4 text-gray-800">
                Preferred Contact Method
              </h3>
              <div className="flex flex-wrap gap-6">
                {["Email", "Phone", "Video Call"].map((method) => (
                  <label key={method} className="flex items-center gap-2 text-gray-700 cursor-pointer">
                    <input
                      type="radio"
                      name="preferredContact"
                      value={method}
                      checked={formData.preferredContact === method}
                      onChange={handleChange}
                      className="w-4 h-4 text-blue-600"
                    />
                    <span>{method}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Message */}
            <div className="sm:col-span-2">
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="5"
                placeholder="Tell us about your current IT challenges, business needs, or goals."
                className="w-full p-4 border border-gray-300 rounded-xl resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full sm:col-span-2 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting...
                </span>
              ) : (
                "Submit Quote Request"
              )}
            </button>

          </form>
        </div>
      </div>
    </section>
  );
}