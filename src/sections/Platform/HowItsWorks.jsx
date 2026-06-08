import Aos from  "aos";
import "aos/dist/aos.css";
import { useEffect } from 'react';






const steps = [
  "Issue Occurs",
  "Ask AI",
  "Analyze Data",
  "Find Cause",
  "Resolve Issue",
];

const HowItWorks = () => {
  useEffect(() => {
    Aos.init({ duration: 1000, once: true });
  }
  , []);
  return (
    <section className="section bg-white">
      <div className="max-w-7xl mx-auto">

        <h2 className="text-4xl font-bold text-center mb-12" data-aos="fade-down">
          How It Works
        </h2>

        <div className="grid md:grid-cols-5 gap-6" data-aos="fade-up">

          {steps.map((step) => (
            <div
              key={step}
              className="card text-center font-semibold"
            >
              {step}
            </div>
          ))}

        </div>

      </div>
    </section>
  );
};

export default HowItWorks;