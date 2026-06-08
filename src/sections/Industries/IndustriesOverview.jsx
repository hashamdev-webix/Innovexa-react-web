
import Aos from 'aos';
import "aos/dist/aos.css"
import IndustriesOverviewImage from '../../assets/images/IndustriesOverview.png';
import { useEffect } from 'react';





export default function IndustriesOverview() {
  useEffect(()=>{
    Aos.init({duration:1000,once:true})
  },[])
  return (
    <section className="section bg-white">

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">

        <div className="flex-1" data-aos="fade-left">

          <img
            src={IndustriesOverviewImage} 
            alt="Overview"
            className="rounded-2xl shadow-lg"
          />

        </div>

        <div className="flex-1" data-aos="fade-right">

          <h2 className="text-4xl font-bold mb-6">
            Built for Canadian Service-Based Businesses
          </h2>

          <p className="text-[var(--color-gray)] mb-6">
            Innovexa supports organizations that rely on technology
            every day but may not have dedicated internal IT teams.
          </p>

          <div className="grid grid-cols-2 gap-4" data-aos="fade-down">

            <div className="card">Dental Clinics</div>
            <div className="card">Law Firms</div>
            <div className="card">Accounting Firms</div>
            <div className="card">Medical Offices</div>
            <div className="card">Real Estate Offices</div>
            <div className="card">Small Businesses</div>

          </div>

        </div>

      </div>

    </section>
  );
}