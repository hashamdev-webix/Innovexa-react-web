import Aos from "aos";
import 'aos/dist/aos.css';
import { useEffect } from "react";







const services = [
  {
    title: "AI IT Troubleshooting",
    desc: "AI-powered support for common technology problems."
  },
  {
    title: "Internet & Wi-Fi Monitoring",
    desc: "Monitor connectivity, outages and network performance."
  },
  {
    title: "Printer & Device Support",
    desc: "Diagnose printer, workstation and device issues."
  },
  {
    title: "Support Ticket Creation",
    desc: "Generate structured support tickets automatically."
  },
  {
    title: "Monthly Technology Reports",
    desc: "Receive insights into recurring technology issues."
  },
  {
    title: "Onboarding & Setup Support",
    desc: "Guidance for deployment and platform setup."
  }
];

export default function QuoteServices() {
  useEffect(()=>{
    Aos.init({duration:1000,once:true})
  },[])
  return (
    <section className="section">

      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-14">

          <h2 className="text-4xl font-bold mb-4">
            Services Included
          </h2>

          <p className="text-[var(--color-gray)]">
            Solutions available through the Innovexa platform.
          </p>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" dat-aos='fade-down'>

          {services.map((service) => (
            <div key={service.title} className="card">

              <h3 className="text-xl font-semibold mb-3">
                {service.title}
              </h3>

              <p className="text-[var(--color-gray)]">
                {service.desc}
              </p>

            </div>
          ))}

        </div>

      </div>

    </section>
  );
}