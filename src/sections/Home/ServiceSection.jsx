
import Card from "../../components/Card";
import { useNavigate } from "react-router-dom";

function ServicesSection() {
  const navigate = useNavigate()
  const services = [
    {
      title: "AI-Assisted IT Troubleshooting",
      description:
        "Plain-language chatbot support for common internet, Wi-Fi, printer, device, and workplace technology issues.",
    },
    {
      title: "Internet & Wi-Fi Monitoring",
      description:
        "Monitor outages, weak connectivity, DNS issues, router problems, and Wi-Fi reliability.",
    },
    {
      title: "Printer & Device Support",
      description:
        "Identify offline printers, disconnected devices, and common office technology issues.",
    },
    {
      title: "Support Ticket Creation",
      description:
        "Create structured support tickets with diagnostic information and escalation details.",
    },
    {
      title: "Monthly Technology Reports",
      description:
        "Track recurring issues, outages, device health, and overall technology performance.",
    },
    {
      title: "Onboarding & Setup Support",
      description:
        "Get help setting up dashboards, monitoring tools, users, alerts, and support workflows.",
    },
  ];

  return (
    <section className="section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-10 lg:mb-14">

          <h2
            className="
        gradient-text
        font-bold
        text-3xl
        sm:text-4xl
        md:text-5xl
        "
          >
            What Innovexa Helps Businesses Manage
          </h2>

          <p
            className="
        mt-4
        max-w-3xl
        mx-auto
        text-sm
        sm:text-base
        lg:text-lg
        text-gray-600
        "
          >
            Smart IT support services designed to reduce downtime,
            improve visibility, and simplify troubleshooting.
          </p>

        </div>

        <div
          className="
      grid
      grid-cols-1
      sm:grid-cols-2
      lg:grid-cols-3
      gap-6
      "
        >
          {services.map((service, index) => (
            <Card
              key={index}
              title={service.title}
              description={service.description}
              onClick={() => navigate('/quote')}
              children="Get a Quote"
            />
          ))}
        </div>

      </div>
    </section>
  );
}

export default ServicesSection;