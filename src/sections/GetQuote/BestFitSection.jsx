import BussinessSupportImage from "../../assets/images/BussinessSupport.png";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
const industries = [
  "Dental Clinics",
  "Law Firms",
  "Accounting Firms",
  "Medical Offices",
  "Real Estate Offices",
  "Service-Based Businesses",
];

export default function BestFitSection() {
    useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-in-out",
    });
  }, []);
  return (
    <section
      className="section bg-white"
      data-aos="fade-up"
      data-aos-duration="1000"
    >
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">

        {/* LEFT */}
        <div
          className="flex-1"
          data-aos="fade-right"
          data-aos-delay="100"
        >
          <h2 className="text-4xl font-bold mb-6">
            Built for Businesses That Need Simple First-Line IT Support
          </h2>

          <p className="text-[var(--color-gray)] mb-8">
            Innovexa is designed for organizations that rely on technology
            every day but may not have a dedicated internal IT department.
          </p>

          <div className="grid grid-cols-2 gap-4">
            {industries.map((industry, index) => (
              <div
                key={industry}
                className="card text-center"
                data-aos="zoom-in"
                data-aos-delay={200 + index * 100}
              >
                {industry}
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT */}
        <div
          className="flex-1"
          data-aos="fade-left"
          data-aos-delay="300"
        >
          <div className="card">
            <img
              src={BussinessSupportImage}
              alt="Business Support"
              className="w-full rounded-xl"
            />
          </div>
        </div>

      </div>
    </section>
  );
}