
import { useNavigate } from 'react-router-dom';
import ServicesHero from '../../assets/images/ServicesHero.png';
import { Button } from '../../components/Button';
import Aos from 'aos';
import "aos/dist/aos.css"
import { useEffect } from 'react';


export default function HeroServices() {
  useEffect(()=>{
Aos.init({ duration: 1000, once: true })

  },[])
  const navigate = useNavigate();
  return (
    <section className="w-full min-h-screen flex items-center bg-white px-10 md:px-16 py-5">

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">

        {/* LEFT SIDE */}
        <div className="flex-1" data-aos="fade-left">

          <h1 className="text-4xl md:text-5xl font-bold leading-tight text-gray-900">
            AI-Powered IT Support Services for Canadian Businesses
          </h1>

          <p className="mt-5 text-gray-600 text-lg leading-relaxed">
            Innovexa provides practical IT support services that help
            businesses diagnose technology problems, improve visibility,
            reduce downtime, and simplify support processes.
          </p>

          <p className="mt-4 text-gray-500">
            From AI-assisted troubleshooting and network monitoring to
            printer diagnostics, support tickets, onboarding and monthly
            reporting, Innovexa helps organizations stay productive and connected.
          </p>

          {/* BUTTONS */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4">


            <Button className='btn-primary'
              children="Get a Quote"
              onClick={() => { navigate('/quote') }}
            />
           <Button className='btn-secondary'
              children="Contact Us"
              onClick={() => { navigate('/contact') }}
            />

          </div>

          {/* SERVICES TAGS */}
          <div className="mt-10 flex flex-wrap gap-3">

            <span className="px-4 py-2 bg-gray-100 rounded-full text-sm" data-aos="fade-up" >
              AI Troubleshooting
            </span>

            <span className="px-4 py-2 bg-gray-100 rounded-full text-sm" data-aos="fade-up">
              Network Monitoring
            </span>

            <span className="px-4 py-2 bg-gray-100 rounded-full text-sm" data-aos="fade-up">
              Device Support
            </span>

            <span className="px-4 py-2 bg-gray-100 rounded-full text-sm" data-aos="fade-up">
              Ticket Creation
            </span>

          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="flex-1">

          <div className="bg-gray-100 rounded-2xl p-6 shadow-lg" data-aos="fade-right">

            <img
              src={ServicesHero}
              alt="Innovexa Services"
              className="w-full rounded-xl"
            />

          </div>

        </div>

      </div>

    </section>
  );
}