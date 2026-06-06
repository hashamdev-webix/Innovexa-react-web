
import ServicesHero from '../../assets/images/ServicesHero.png';




export default function HeroServices() {
  return (
    <section className="w-full min-h-screen flex items-center bg-white px-10 md:px-16">

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">

        {/* LEFT SIDE */}
        <div className="flex-1">

          <h1 className="text-4xl md:text-5xl font-bold leading-tight text-gray-900">
            AI-Powered IT Support Services for Canadian Businesses
          </h1>

          <p className="mt-5 text-gray-600 text-lg leading-relaxed">
            Innovexa provides practical IT support services that help
            businesses diagnose technology problems, improve visibility,
            reduce downtime, and simplify support processes.
          </p>

          <p className="mt-4 text-gray-500">
            From AI-assisted troubleshooting and network monitoring to
            printer diagnostics, support tickets, onboarding and monthly
            reporting, Innovexa helps organizations stay productive and connected.
          </p>

          {/* BUTTONS */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4">

            <button className="btn-primary">
              Get a Quote
            </button>

            <button className="btn-secondary">
              Contact Us
            </button>

          </div>

          {/* SERVICES TAGS */}
          <div className="mt-10 flex flex-wrap gap-3">

            <span className="px-4 py-2 bg-gray-100 rounded-full text-sm">
              AI Troubleshooting
            </span>

            <span className="px-4 py-2 bg-gray-100 rounded-full text-sm">
              Network Monitoring
            </span>

            <span className="px-4 py-2 bg-gray-100 rounded-full text-sm">
              Device Support
            </span>

            <span className="px-4 py-2 bg-gray-100 rounded-full text-sm">
              Ticket Creation
            </span>

          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="flex-1">

          <div className="bg-gray-100 rounded-2xl p-6 shadow-lg">

            <img
              src={ServicesHero}
              alt="Innovexa Services"
              className="w-full rounded-xl"
            />

          </div>

        </div>

      </div>

    </section>
  );
}