import { useNavigate } from 'react-router-dom';
import heroimgae from '../../assets/innovexa_hero_banner.svg';
export default function Hero() {
const navigate=useNavigate();

  
  return (
    <section className="w-full min-h-screen flex items-center  bg-white px-10 md:px-16">
      
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">

        {/* LEFT SIDE */}
        <div className="flex-1">
          
          <h1 className="text-4xl md:text-5xl font-bold leading-tight text-gray-900">
            AI-Powered IT Support for Small Businesses in Canada
          </h1>

          <p className="mt-5 text-gray-600 text-lg leading-relaxed">
            Innovexa helps small and mid-sized businesses diagnose internet, Wi-Fi,
            printer, device, and common IT issues faster through an AI chatbot,
            SaaS dashboard, monitoring tools, and support guidance.
          </p>

          <p className="mt-4 text-gray-500">
            Built for dental clinics, law firms, accounting firms, medical offices,
            real estate offices, and service-based businesses without dedicated internal IT teams.
          </p>

          {/* BUTTONS */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            
            <button
             className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
             onClick={()=>{navigate('/quote')}}
             
             >
              Get a Quote
            </button>

            <button 
            className="btn-secondary border border-gray-300 p-5 py-3 rounded-lg hover:bg-gray-100 transition"
            onClick={()=>{navigate('./contact')}}
            
            >
              Contact Us
            </button>

          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex-1 w-full">
          <div className="bg-gray-100 rounded-2xl p-6 shadow-lg">
            
            <img
              src={heroimgae}
              alt="Innovexa SaaS Dashboard"
              className="w-full rounded-xl h-60 object-cover bg-center"
            />

          </div>
        </div>

      </div>
    </section>
  );
}