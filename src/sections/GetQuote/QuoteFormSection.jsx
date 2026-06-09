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

    servicesNeeded: [],
    currentProblems: [],
    preferredContactMethod: "",

    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // Handle Inputs
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle Checkboxes
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

  // Submit Form
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setSuccess("");
    setError("");

    try {
      await axios.post(
        "https://your-api-url.com/quote",
        formData
      );

      setSuccess(
        "Quote request submitted successfully!"
      );

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

        servicesNeeded: [],
        currentProblems: [],
        preferredContactMethod: "",

        message: "",
      });
    } catch (err) {
      setError(
        "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-10 lg:mb-14">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
            Request Your Innovexa Quote
          </h2>

          <p className="mt-4 text-gray-600">
            Complete the form below so our team can
            understand your business size, technology
            needs, current IT challenges, and support
            goals.
          </p>
        </div>

        {/* Card */}
        <div className="card p-6 md:p-10">

          {success && (
            <p className="text-green-600 mb-5 text-center">
              {success}
            </p>
          )}

          {error && (
            <p className="text-red-600 mb-5 text-center">
              {error}
            </p>
          )}

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 sm:grid-cols-2 gap-5"
          >

            {/* Business Info */}

            <input
              type="text"
              name="businessName"
              value={formData.businessName}
              onChange={handleChange}
              placeholder="Business Name"
              required
              className="w-full p-4 border-default rounded-xl"
            />

            <input
              type="text"
              name="contactName"
              value={formData.contactName}
              onChange={handleChange}
              placeholder="Contact Person Full Name"
              required
              className="w-full p-4 border-default rounded-xl"
            />

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              required
              className="w-full p-4 border-default rounded-xl"
            />

            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              required
              className="w-full p-4 border-default rounded-xl"
            />

            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="City / Province"
              className="w-full p-4 border-default rounded-xl"
            />

            <input
              type="url"
              name="website"
              value={formData.website}
              onChange={handleChange}
              placeholder="Business Website"
              className="w-full p-4 border-default rounded-xl"
            />

            <select
              name="businessType"
              value={formData.businessType}
              onChange={handleChange}
              required
              className="w-full p-4 border-default rounded-xl"
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

            <input
              type="number"
              name="employees"
              value={formData.employees}
              onChange={handleChange}
              placeholder="Number of Employees"
              className="w-full p-4 border-default rounded-xl"
            />

            <input
              type="number"
              name="locations"
              value={formData.locations}
              onChange={handleChange}
              placeholder="Number of Office Locations"
              className="w-full p-4 border-default rounded-xl"
            />

            <input
              type="number"
              name="computers"
              value={formData.computers}
              onChange={handleChange}
              placeholder="Number of Computers / Laptops"
              className="w-full p-4 border-default rounded-xl"
            />

            <input
              type="number"
              name="printers"
              value={formData.printers}
              onChange={handleChange}
              placeholder="Number of Printers"
              className="w-full p-4 border-default rounded-xl"
            />

            <select
              name="itTeam"
              value={formData.itTeam}
              onChange={handleChange}
              className="w-full p-4 border-default rounded-xl sm:col-span-2"
            >
              <option value="">
                Do you currently have an internal IT team?
              </option>
              <option>Yes</option>
              <option>No</option>
            </select>

            {/* Services Needed */}

            <div className="sm:col-span-2">
              <h3 className="font-semibold text-lg mb-4">
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
                  <label
                    key={service}
                    className="flex items-center gap-2"
                  >
                    <input
                      type="checkbox"
                      value={service}
                      checked={formData.servicesNeeded.includes(
                        service
                      )}
                      onChange={(e) =>
                        handleCheckboxChange(
                          e,
                          "servicesNeeded"
                        )
                      }
                    />
                    {service}
                  </label>
                ))}

              </div>
            </div>

            {/* Current Problems */}

            <div className="sm:col-span-2">
              <h3 className="font-semibold text-lg mb-4">
                Current IT Problems
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

                {[
                  "Internet Outages",
                  "Weak or Unstable Wi-Fi",
                  "Printer Not Working",
                  "Devices Disconnecting",
                  "Slow Systems",
                  "No Clear IT Support Process",
                  "Recurring Technology Downtime",
                  "Other",
                ].map((problem) => (
                  <label
                    key={problem}
                    className="flex items-center gap-2"
                  >
                    <input
                      type="checkbox"
                      value={problem}
                      checked={formData.currentProblems.includes(
                        problem
                      )}
                      onChange={(e) =>
                        handleCheckboxChange(
                          e,
                          "currentProblems"
                        )
                      }
                    />
                    {problem}
                  </label>
                ))}

              </div>
            </div>

            {/* Preferred Contact Method */}

            <div className="sm:col-span-2">
              <h3 className="font-semibold text-lg mb-4">
                Preferred Contact Method
              </h3>

              <div className="flex flex-wrap gap-6">

                {[
                  "Email",
                  "Phone",
                  "Video Call",
                ].map((method) => (
                  <label
                    key={method}
                    className="flex items-center gap-2"
                  >
                    <input
                      type="radio"
                      name="preferredContactMethod"
                      value={method}
                      checked={
                        formData.preferredContactMethod ===
                        method
                      }
                      onChange={handleChange}
                    />
                    {method}
                  </label>
                ))}

              </div>
            </div>

            {/* Message */}

            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="5"
              placeholder="Tell us about your current IT challenges, business needs, or goals."
              className="w-full p-4 border-default rounded-xl resize-none sm:col-span-2"
            />

            {/* Submit */}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full sm:col-span-2 py-3"
            >
              {loading
                ? "Submitting..."
                : "Submit Quote Request"}
            </button>

          </form>
        </div>
      </div>
    </section>
  );
}