import Aos from "aos";
import 'aos/dist/aos.css'
import { useEffect } from "react";









const steps = [
  "IT Issue Occurs",
  "Employee Asks AI",
  "System Checks Data",
  "AI Explains Cause",
  "Issue Resolved",
  "Business Saves Time",
];

export default function HowWeWork() {
  useEffect(()=>{
    Aos.init({duration:1000,once:true})
  },[])
  return (
    <section className="section bg-white">

      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold"  data-aos="fade-down">
            How We Work
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" data-aos="fade-up">

          {steps.map((step) => (
            <div key={step} className="card text-center">
              <h3 className="font-semibold text-lg">
                {step}
              </h3>
            </div>
          ))}

        </div>

      </div>

    </section>
  );
}