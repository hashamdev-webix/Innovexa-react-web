import { useState } from "react";
// import axios from "axios";

export default function ContactForm() {
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
      // await axios.post(
      //   "https://your-api-url.com/contact",
      //   formData
      // );

      setSuccess("Message sent successfully!");

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

    } catch (err) {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16">

      <div className="max-w-4xl mx-auto card">

        <h2 className="text-3xl font-bold text-center mb-8">
          Send Us a Message
        </h2>

        {/* SUCCESS / ERROR */}
        {success && (
          <p className="text-green-600 text-center mb-4">
            {success}
          </p>
        )}

        {error && (
          <p className="text-red-600 text-center mb-4">
            {error}
          </p>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            required
            className="w-full p-4 border border-[var(--color-border)] rounded-xl my-2"
          />

          <input
            type="text"
            name="businessName"
            placeholder="Business Name"
            value={formData.businessName}
            onChange={handleChange}
            className="w-full p-4 border border-[var(--color-border)] rounded-xl my-2"
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-4 border border-[var(--color-border)] rounded-xl my-2"
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-4 border border-[var(--color-border)] rounded-xl my-2"
          />

          <input
            type="text"
            name="city"
            placeholder="City / Province"
            value={formData.city}
            onChange={handleChange}
            className="w-full p-4 border border-[var(--color-border)] rounded-xl my-2"
          />

          <select
            name="inquiryType"
            value={formData.inquiryType}
            onChange={handleChange}
            className="w-full p-4 border border-[var(--color-border)] rounded-xl my-2"
          >
            <option value="">
              Select Inquiry Type
            </option>
            <option>General Inquiry</option>
            <option>AI IT Troubleshooting</option>
            <option>Network Monitoring</option>
            <option>Internet & Wi-Fi Issues</option>
            <option>Printer & Device Support</option>
            <option>Onboarding & Setup</option>
            <option>Monthly Technology Reports</option>
            <option>Quote Request</option>
            <option>Partnership Inquiry</option>
            <option>Other</option>
          </select>

          <select
            name="businessType"
            value={formData.businessType}
            onChange={handleChange}
            className="w-full p-4 border border-[var(--color-border)] rounded-xl my-2"
          >
            <option value="">
              Business Type
            </option>
            <option>Dental Clinic</option>
            <option>Law Firm</option>
            <option>Accounting Firm</option>
            <option>Medical Office</option>
            <option>Real Estate Office</option>
            <option>Service-Based Business</option>
            <option>Other</option>
          </select>

          <textarea
            rows="6"
            name="message"
            placeholder="Tell us how we can help your business."
            value={formData.message}
            onChange={handleChange}
            required
            className="w-full p-4 border border-[var(--color-border)] rounded-xl my-2 resize-none"
          ></textarea>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full my-2"
          >
            {loading ? "Sending..." : "Submit Message"}
          </button>

        </form>

      </div>

    </section>
  );
}