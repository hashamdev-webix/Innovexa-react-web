import Aos from 'aos';
import 'aos/dist/aos.css'
import { useEffect } from 'react';






const values = [
  "Reliability",
  "Accessibility",
  "Simplicity",
  "Security & Control",
  "Canadian Growth",
];

export default function OurValues() {
  useEffect(()=>{
    Aos.init({duration:1000,once:true})
  },[])
  return (
    <section className="section">

      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold">
            Our Values
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6" data-aos="fade-down">

          {values.map((value) => (
            <div key={value} className="card text-center">
              <h3 className="font-semibold">
                {value}
              </h3>
            </div>
          ))}

        </div>

      </div>

    </section>
  );
}