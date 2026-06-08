import { useNavigate } from 'react-router-dom';
import heroimgae from '../../assets/images/innovexa_hero_banner.svg';
export default function Hero() {
  const navigate = useNavigate();


  return (
    <section className="w-full min-h-[90vh] lg:min-h-screen flex items-center bg-white px-4 sm:px-6 md:px-10 lg:px-16 py-12">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-10 lg:gap-16">

        {/* LEFT SIDE */}
        <div className="flex-1 text-center lg:text-left">

          <h1 className="font-bold leading-tight text-gray-900
      text-3xl
      sm:text-4xl
      md:text-5xl
      lg:text-6xl">
            AI-Powered IT Support for Small Businesses in Canada
          </h1>

          <p className="mt-5 text-gray-600 leading-relaxed
      text-base
      sm:text-lg
      lg:text-xl">
            Innovexa helps small and mid-sized businesses diagnose internet, Wi-Fi,
            printer, device, and common IT issues faster through an AI chatbot,
            SaaS dashboard, monitoring tools, and support guidance.
          </p>

          <p className="mt-4 text-gray-500
      text-sm
      sm:text-base
      lg:text-lg">
            Built for dental clinics, law firms, accounting firms, medical offices,
            real estate offices, and service-based businesses without dedicated
            internal IT teams.
          </p>

          {/* BUTTONS */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">

            <button
              className="w-full sm:w-auto bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
              onClick={() => navigate('/quote')}
            >
              Get a Quote
            </button>

            <button
              className="w-full sm:w-auto btn-secondary px-6 py-3 rounded-lg transition"
              onClick={() => navigate('/contact')}
            >
              Contact Us
            </button>

          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex-1 w-full">

          <div className="bg-gray-100 rounded-2xl p-4 sm:p-6 shadow-lg">

            <img
              src={heroimgae}
              alt="Innovexa SaaS Dashboard"
              className="
          w-full
          h-auto
          max-h-[600px]
          object-contain
          rounded-xl
          "
            />

          </div>

        </div>

      </div>
    </section>
  );
}