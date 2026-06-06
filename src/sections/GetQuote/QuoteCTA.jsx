export default function QuoteCTA() {
  return (
    <section className="section">

      <div className="max-w-5xl mx-auto card text-center">

        <h2 className="text-5xl font-bold mb-6">
          Ready to Discuss Your IT Support Needs?
        </h2>

        <p className="text-[var(--color-gray)] mb-8">
          Let our team evaluate your environment and recommend
          the right AI-powered support solution.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">

          <button className="btn-primary">
            Submit Quote Request
          </button>

          <button className="btn-secondary">
            Contact Us
          </button>

        </div>

      </div>

    </section>
  );
}