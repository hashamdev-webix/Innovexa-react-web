const industries = [
  {
    title: "Dental Clinics",
    desc: "Reliable technology support for patient-focused practices.",
  },
  {
    title: "Law Firms",
    desc: "Maintain productivity and secure operations.",
  },
  {
    title: "Accounting Firms",
    desc: "Reduce interruptions during critical business periods.",
  },
  {
    title: "Medical Offices",
    desc: "Improve visibility across devices and connectivity.",
  },
  {
    title: "Real Estate Offices",
    desc: "Support agents and staff with dependable IT services.",
  },
  {
    title: "Service-Based Businesses",
    desc: "Simplify troubleshooting and technology management.",
  },
];

export default function IndustriesServe() {
  return (
    <section className="section">

      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-14">

          <span className="text-blue-600 font-semibold">
            Industries We Serve
          </span>

          <h2 className="text-4xl font-bold mt-3">
            Supporting Businesses Across Multiple Industries
          </h2>

          <p className="text-gray-600 mt-4 max-w-3xl mx-auto">
            Innovexa is designed for organizations that depend on
            technology but may not have large internal IT teams.
          </p>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {industries.map((industry) => (
            <div key={industry.title} className="card">

              <h3 className="text-xl font-semibold mb-3">
                {industry.title}
              </h3>

              <p className="text-gray-600">
                {industry.desc}
              </p>

            </div>
          ))}

        </div>

      </div>

    </section>
  );
}