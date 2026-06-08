import  Aos from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';






const services = [
  {
    title: "AI IT Troubleshooting",
    description:
      "Chatbot-based support for common workplace technology issues and first-line diagnostics.",
  },
  {
    title: "Internet & Wi-Fi Monitoring",
    description:
      "Monitor connectivity, outages, DNS issues, routers and wireless network performance.",
  },
  {
    title: "Printer & Device Support",
    description:
      "Identify offline printers, disconnected devices and common hardware-related problems.",
  },
  {
    title: "Support Ticket Creation",
    description:
      "Generate structured support tickets with diagnostic details and issue tracking.",
  },
  {
    title: "Monthly Technology Reports",
    description:
      "Receive reports covering outages, recurring issues, support activity and device health.",
  },
  {
    title: "Onboarding & Setup Support",
    description:
      "Assistance with platform setup, user onboarding, dashboard configuration and alerts.",
  },
];

export default function MainServiceCards() {
  useEffect(()=>{
    Aos.init({duration:1000,once:true})
  },[])
  return (
    <section className="section">

      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-14">

          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Our IT Support Services
          </h2>

          <p className="text-gray-600 max-w-3xl mx-auto">
            Innovexa provides practical support services designed to
            improve visibility, reduce downtime and simplify technology
            management for growing businesses.
          </p>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" >

          {services.map((service) => (
            <div key={service.title} className="card" data-aos="fade-down">

              <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center mb-5">
                <span className="text-2xl">⚡</span>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {service.title}
              </h3>

              <p className="text-gray-600 leading-relaxed">
                {service.description}
              </p>

              <button className="mt-6 text-blue-600 font-medium">
                Learn More →
              </button>

            </div>
          ))}

        </div>

      </div>

    </section>
  );
}