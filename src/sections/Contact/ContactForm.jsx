export default function ContactForm() {
  return (
    <section className="section">

      <div className="max-w-4xl mx-auto card">

        <h2 className="text-3xl font-bold text-center mb-8">
          Send Us a Message
        </h2>

        <form className="space-y-5">

          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-4 border border-[var(--color-border)] rounded-xl"
          />

          <input
            type="email"
            placeholder="Email Address"
            className="w-full p-4 border border-[var(--color-border)] rounded-xl"
          />

          <input
            type="text"
            placeholder="Company Name"
            className="w-full p-4 border border-[var(--color-border)] rounded-xl"
          />

          <textarea
            rows="6"
            placeholder="Your Message"
            className="w-full p-4 border border-[var(--color-border)] rounded-xl resize-none"
          ></textarea>

          <button
            type="submit"
            className="btn-primary w-full"
          >
            Send Message
          </button>

        </form>

      </div>

    </section>
  );
}