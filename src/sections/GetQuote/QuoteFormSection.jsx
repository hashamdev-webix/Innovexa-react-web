import { useState } from "react";
import axios from "axios";

export default function QuoteFormSection() {

  const [formData, setFormData] = useState({
    businessName: "",
    contactName: "",
    email: "",
    phone: "",
    city: "",
    website: "",
    businessType: "",
    employees: "",
    locations: "",
    computers: "",
    printers: "",
    itTeam: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setSuccess("");
    setError("");

    try {
      const res = await axios.post(
        "https://your-api-url.com/quote", // 👈 API URL yahan change karna
        formData
      );

      setSuccess("Quote request submitted successfully!");

      // reset form
      setFormData({
        businessName: "",
        contactName: "",
        email: "",
        phone: "",
        city: "",
        website: "",
        businessType: "",
        employees: "",
        locations: "",
        computers: "",
        printers: "",
        itTeam: "",
        message: "",
      });

    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section bg-white">

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* HEADER */}
        <div className="text-center mb-10 lg:mb-14">

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
            Request Your Custom Quote
          </h2>

          <p className="mt-4 text-gray-600">
            Complete the form below and our team will contact you.
          </p>

        </div>

        {/* CARD */}
        <div className="card">

          {/* messages */}
          {success && (
            <p className="text-green-600 mb-4 text-center">{success}</p>
          )}
          {error && (
            <p className="text-red-600 mb-4 text-center">{error}</p>
          )}

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 sm:grid-cols-2 gap-5"
          >

            <input
              name="businessName"
              value={formData.businessName}
              onChange={handleChange}
              placeholder="Business Name"
              className="w-full p-3 sm:p-4 border-default rounded-xl"
            />

            <input
              name="contactName"
              value={formData.contactName}
              onChange={handleChange}
              placeholder="Contact Person Full Name"
              className="w-full p-3 sm:p-4 border-default rounded-xl"
            />

            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              className="w-full p-3 sm:p-4 border-default rounded-xl"
            />

            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              className="w-full p-3 sm:p-4 border-default rounded-xl"
            />

            <input
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="City / Province"
              className="w-full p-3 sm:p-4 border-default rounded-xl"
            />

            <input
              name="website"
              value={formData.website}
              onChange={handleChange}
              placeholder="Business Website"
              className="w-full p-3 sm:p-4 border-default rounded-xl"
            />

            <select
              name="businessType"
              value={formData.businessType}
              onChange={handleChange}
              className="w-full p-3 sm:p-4 border-default rounded-xl"
            >
              <option value="">Business Type</option>
              <option>Dental Clinic</option>
              <option>Law Firm</option>
              <option>Accounting Firm</option>
              <option>Medical Office</option>
              <option>Real Estate Office</option>
              <option>Service-Based Business</option>
              <option>Other</option>
            </select>

            <input
              name="employees"
              value={formData.employees}
              onChange={handleChange}
              placeholder="Number of Employees"
              className="w-full p-3 sm:p-4 border-default rounded-xl"
            />

            <input
              name="locations"
              value={formData.locations}
              onChange={handleChange}
              placeholder="Number of Office Locations"
              className="w-full p-3 sm:p-4 border-default rounded-xl"
            />

            <input
              name="computers"
              value={formData.computers}
              onChange={handleChange}
              placeholder="Number of Computers / Laptops"
              className="w-full p-3 sm:p-4 border-default rounded-xl"
            />

            <input
              name="printers"
              value={formData.printers}
              onChange={handleChange}
              placeholder="Number of Printers"
              className="w-full p-3 sm:p-4 border-default rounded-xl"
            />

            <select
              name="itTeam"
              value={formData.itTeam}
              onChange={handleChange}
              className="w-full p-3 sm:p-4 border-default rounded-xl sm:col-span-2"
            >
              <option value="">
                Do you currently have an internal IT team?
              </option>
              <option>Yes</option>
              <option>No</option>
            </select>

            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="5"
              placeholder="Tell us about your IT challenges or requirements..."
              className="w-full p-3 sm:p-4 border-default rounded-xl resize-none sm:col-span-2"
            />

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full sm:col-span-2 py-3"
            >
              {loading ? "Submitting..." : "Submit Quote Request"}
            </button>

          </form>

        </div>

      </div>
    </section>
  );
}