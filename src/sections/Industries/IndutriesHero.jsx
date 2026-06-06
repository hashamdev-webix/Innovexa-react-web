import { useNavigate } from 'react-router-dom';
import IndustriesHeroImage from '../../assets/images/IndustriesHeroImage.png';
import { Button } from '../../components/Button';




export default function IndustriesHero() {
  const navigate=useNavigate();
  return (
    <section className="w-full min-h-screen flex items-center bg-white px-10 md:px-16">

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">

        {/* LEFT */}
        <div className="flex-1">

          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            AI IT Support for Canadian Service-Based Businesses
          </h1>

          <p className="mt-5 text-[var(--color-gray)] text-lg leading-relaxed">
            Innovexa helps service-based businesses diagnose common
            technology issues faster through AI-powered troubleshooting,
            monitoring, reporting and support tools.
          </p>

          <p className="mt-4 text-[var(--color-gray)]">
            Designed for dental clinics, law firms, accounting firms,
            medical offices, real estate offices and growing businesses.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <Button 
          children="Get a Quote"
          onClick={()=>{navigate('/quote')}}
          />

           <Button 
          children="Contact Us"
          className='btn-secondary'
          onClick={()=>{navigate('/contact')}}
          />
          </div>

        </div>

        {/* RIGHT */}
        <div className="flex-1">

          <div className="bg-gray-100 rounded-2xl p-6 shadow-lg">

            <img
              src={IndustriesHeroImage} 
              alt="Industries"
              className="w-full rounded-xl"
            />

          </div>

        </div>

      </div>

    </section>
  );
}