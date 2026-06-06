export default function QuoteFormSection() {
  return (
    <section className="section bg-white">

      <div className="max-w-6xl mx-auto">

        <div className="text-center mb-12">

          <h2 className="text-4xl font-bold mb-4">
            Request Your Custom Quote
          </h2>

          <p className="text-[var(--color-gray)]">
            Complete the form below and our team will contact you.
          </p>

        </div>

        <div className="card">

          <form className="grid md:grid-cols-2 gap-5">

            <input
              type="text"
              placeholder="Business Name"
              className="p-4 border-default rounded-xl"
            />

            <input
              type="text"
              placeholder="Contact Person Full Name"
              className="p-4 border-default rounded-xl"
            />

            <input
              type="email"
              placeholder="Email Address"
              className="p-4 border-default rounded-xl"
            />

            <input
              type="tel"
              placeholder="Phone Number"
              className="p-4 border-default rounded-xl"
            />

            <input
              type="text"
              placeholder="City / Province"
              className="p-4 border-default rounded-xl"
            />

            <input
              type="text"
              placeholder="Business Website"
              className="p-4 border-default rounded-xl"
            />

            <select className="p-4 border-default rounded-xl">

              <option>Business Type</option>
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
              placeholder="Number of Employees"
              className="p-4 border-default rounded-xl"
            />

            <input
              type="number"
              placeholder="Number of Office Locations"
              className="p-4 border-default rounded-xl"
            />

            <input
              type="number"
              placeholder="Number of Computers / Laptops"
              className="p-4 border-default rounded-xl"
            />

            <input
              type="number"
              placeholder="Number of Printers"
              className="p-4 border-default rounded-xl"
            />

            <select className="p-4 border-default rounded-xl">

              <option>
                Do you currently have an internal IT team?
              </option>

              <option>Yes</option>
              <option>No</option>

            </select>

            <textarea
              rows="5"
              placeholder="Tell us about your IT challenges or requirements..."
              className="md:col-span-2 p-4 border-default rounded-xl resize-none"
            ></textarea>

            <button
              type="submit"
              className="btn-primary md:col-span-2"
            >
              Submit Quote Request
            </button>

          </form>

        </div>

      </div>

    </section>
  );
}