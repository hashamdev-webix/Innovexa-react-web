import heroimage from '../../assets/images/platformhero.png';
import { useNavigate } from "react-router-dom";
import { Button } from '../../components/Button';
import Aos from  "aos";
import "aos/dist/aos.css";
import { useEffect } from 'react';



export default function Hero() {
  useEffect(() => {
    Aos.init({ duration: 1000, once: true });
  }, []);
  const navigate=useNavigate();
  return (
    <section className="w-full min-h-screen flex items-center bg-white px-10 md:px-16">

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">

        {/* LEFT SIDE */}
        <div className="flex-1" data-aos="fade-right">

          <h1 className="text-4xl md:text-5xl font-bold leading-tight text-gray-900">
            AI-Powered IT Support Platform for Canadian Businesses
          </h1>

          <p className="mt-5 text-gray-600 text-lg leading-relaxed">
            Innovexa provides a centralized platform that combines AI-assisted
            troubleshooting, network monitoring, printer diagnostics,
            support ticket creation, alerts and reporting.
          </p>

          <p className="mt-4 text-gray-500">
            Built for businesses that need better visibility into their
            technology environment without maintaining a large internal
            IT department.
          </p>

          {/* BUTTONS */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4">

            <Button
            className='btn-primary'
            children="Get a Quote"
            onClick={()=>(navigate('/quote'))}
            />

           <Button
            className='btn-secondary'
            children="Contact Us"
            onClick={()=>(navigate('/contact'))}
            />

          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="flex-1" data-aos="fade-left">

          <div className="bg-gray-100 rounded-2xl p-6 shadow-lg">

            <img
              src={heroimage}
              alt="Innovexa Platform Dashboard"
              className="w-full rounded-xl"
            />

          </div>

        </div>

      </div>

    </section>
  );
}