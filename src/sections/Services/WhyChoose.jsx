const reasons = [
  {
    title: "AI-Powered Support",
    desc: "Modern troubleshooting powered by AI technology.",
  },
  {
    title: "Easy to Use",
    desc: "Simple workflows and user-friendly dashboards.",
  },
  {
    title: "Business Focused",
    desc: "Designed for real business technology challenges.",
  },
  {
    title: "Scalable",
    desc: "Supports growing organizations and teams.",
  },
];

export default function WhyChoose() {
  return (
    <section className="section bg-white">

      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold">
            Why Choose Innovexa
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

          {reasons.map((reason) => (
            <div key={reason.title} className="card">

              <h3 className="text-xl font-semibold mb-3">
                {reason.title}
              </h3>

              <p className="text-gray-600">
                {reason.desc}
              </p>

            </div>
          ))}

        </div>

      </div>

    </section>
  );
}