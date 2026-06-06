

import { useNavigate } from "react-router-dom";
import Card from "../../components/Card";
import { Children } from "react";

function Industries() {
  const navigate = useNavigate();
  const industries = [
    {
      title: "Dental Clinics",
      problem:
        "Depend on stable front-desk systems, Wi-Fi, printers, and scheduling tools.",
      solution:
        "Monitor connectivity, device availability, printer issues, and support tickets.",
    },
    {
      title: "Law Firms",
      problem:
        "Rely on document systems, secure communication, printers, and cloud apps.",
      solution:
        "Identify technology disruptions faster and improve support escalation.",
    },
    {
      title: "Accounting Firms",
      problem:
        "Need reliable access to cloud tools, client files, printers, and Wi-Fi.",
      solution:
        "Track recurring issues and support faster troubleshooting.",
    },
    {
      title: "Medical Offices",
      problem:
        "Depend on internet, printers, front-desk devices, and appointment systems.",
      solution:
        "Understand network and device issues before downtime increases.",
    },
    {
      title: "Real Estate Offices",
      problem:
        "Rely on phones, Wi-Fi, printers, devices, and shared files.",
      solution:
        "Monitor office technology and simplify issue reporting.",
    },
    {
      title: "Small Businesses",
      problem:
        "Often struggle with internet, Wi-Fi, printer, and device issues.",
      solution:
        "AI troubleshooting, monitoring, ticket creation, and reporting.",
    },
  ];

  return (
    <section className="section">
      <div className="max-w-7xl mx-auto px-5">

        <div className="text-center mb-12">
          <h2 className="gradient-text text-4xl font-bold">
            Industries Innovexa Serves
          </h2>

          <p className="mt-4 text-[var(--color-gray)] max-w-3xl mx-auto">
            Built for businesses that rely on stable technology but do
            not have dedicated internal IT teams.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {industries.map((industry) => (
            <Card
              key={industry.title}
              title={industry.title}
              children="Get a Quote"
              description={industry.problem}
              solutions={industry.solution}
              onClick={() => {
                navigate('/quote')
              }}
         
            />
          ))}
        </div>

      </div>
    </section>
  );
}

export default Industries;