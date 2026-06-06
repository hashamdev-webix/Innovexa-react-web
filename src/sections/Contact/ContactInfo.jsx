export default function ContactInfo() {
  return (
    <section className="section bg-white">

      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold">
            Contact Information
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">

          <div className="card text-center">
            <h3 className="font-semibold text-xl mb-3">
              Email
            </h3>

            <p className="text-[var(--color-gray)]">
              info@innovexa.ca
            </p>
          </div>

          <div className="card text-center">
            <h3 className="font-semibold text-xl mb-3">
              Phone
            </h3>

            <p className="text-[var(--color-gray)]">
              +1 (000) 000-0000
            </p>
          </div>

          <div className="card text-center">
            <h3 className="font-semibold text-xl mb-3">
              Location
            </h3>

            <p className="text-[var(--color-gray)]">
              Ontario, Canada
            </p>
          </div>

        </div>

      </div>

    </section>
  );
}