import Aos from  "aos";
import "aos/dist/aos.css";
import { useEffect } from 'react';






const modules = [
  "AI Troubleshooting Chatbot",
  "SaaS Monitoring Dashboard",
  "Local Monitoring Agent",
  "Internet & Wi-Fi Monitoring",
  "Printer & Device Diagnostics",
  "Support Ticket Creation",
  "Alerts & Notifications",
  "Monthly Technology Reports",
];

const PlatformModules = () => {
  useEffect(() => {
    Aos.init({ duration: 1000, once: true });
  }, []);
  
  return (
    <section className="section">
      <div className="max-w-7xl mx-auto">

        <h2 className="text-4xl font-bold text-center mb-12">
          Platform Modules
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6" data-aos="fade-up">

          {modules.map((item) => (
            <div key={item} className="card">
              <h3 className="font-semibold text-xl mb-3">
                {item}
              </h3>

              <p className="text-[var(--color-gray)]">
                Powerful tools to improve IT support and visibility.
              </p>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default PlatformModules;