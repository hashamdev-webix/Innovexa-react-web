import { useState } from "react";
// import axios from "axios";

export default function ContactForm() {

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    company: "",
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
      // const res = await axios.post(
      //   "https://your-api-url.com/contact",  //api attachment point
      //   formData
      // );

      setSuccess("Message sent successfully!");
      setFormData({
        fullName: "",
        email: "",
        company: "",
        message: "",
      });

    } catch (err) {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section">

      <div className="max-w-4xl mx-auto card">

        <h2 className="text-3xl font-bold text-center mb-8">
          Send Us a Message
        </h2>

        {/* SUCCESS / ERROR */}
        {success && (
          <p className="text-green-600 text-center mb-4">{success}</p>
        )}
        {error && (
          <p className="text-red-600 text-center mb-4">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">

          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full p-4 border border-[var(--color-border)] rounded-xl my-2"
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-4 border border-[var(--color-border)] rounded-xl my-2"
          />

          <input
            type="text"
            name="company"
            placeholder="Company Name"
            value={formData.company}
            onChange={handleChange}
            className="w-full p-4 border border-[var(--color-border)] rounded-xl my-2"
          />

          <textarea
            rows="6"
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            className="w-full p-4 border border-[var(--color-border)] rounded-xl my-2 resize-none"
          ></textarea>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full my-2"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>

        </form>

      </div>

    </section>
  );
}