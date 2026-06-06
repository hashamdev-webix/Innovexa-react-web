
import BusinessBenefitsImage from '../../assets/images/BussinessBenifites.png';  




const benefits = [
  "Reduce Downtime",
  "Improve Visibility",
  "Speed Up Diagnosis",
  "Create Better Support Tickets",
  "Monitor Business Technology",
];

export default function ServiceHelp() {
  return (
    <section className="section bg-white">

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">

        {/* LEFT CONTENT */}
        <div className="flex-1">

          <span className="text-blue-600 font-semibold">
            Business Benefits
          </span>

          <h2 className="text-4xl font-bold mt-3 mb-6">
            How Our Services Help Your Business
          </h2>

          <p className="text-gray-600 mb-8 leading-relaxed">
            Our services are designed to help organizations reduce
            technology disruptions, improve visibility and create a
            better support experience for employees.
          </p>

          <div className="space-y-4">

            {benefits.map((item) => (
              <div
                key={item}
                className="flex items-center gap-4 card"
              >
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  ✓
                </div>

                <h3 className="font-semibold">
                  {item}
                </h3>
              </div>
            ))}

          </div>

        </div>

        {/* RIGHT IMAGE */}
        <div className="flex-1">

          <div className="bg-gray-100 rounded-2xl p-6 shadow-lg">

            <img
              src={BusinessBenefitsImage} 
              alt="Business Benefits"
              className="w-full rounded-xl"
            />

          </div>

        </div>

      </div>

    </section>
  );
}