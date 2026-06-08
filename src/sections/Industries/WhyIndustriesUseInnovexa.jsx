import Aos from 'aos';
import "aos/dist/aos.css"
import DashbordImage from '../../assets/images/DashbordImage.png';
import { useEffect } from 'react';








export default function WhyIndustriesUseInnovexa() {
  useEffect(()=>{
    Aos.init({duration:1000,once:true})
  },[])
  return (
    <section className="section">

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">

        <div className="flex-1" data-aos="fade-left">

          <h2 className="text-4xl font-bold mb-6">
            Practical IT Visibility for Everyday Business Operations
          </h2>

          <div className="space-y-4">

            <div className="card " data-aos="fade-down">✓ Faster issue diagnosis</div>
            <div className="card" data-aos="fade-down">✓ Better network visibility</div>
            <div className="card" data-aos="fade-down">✓ Improved support tickets</div>
            <div className="card" data-aos="fade-down">✓ Monthly technology reports</div>
            <div className="card" data-aos="fade-down">✓ Easier first-line support</div>

          </div>

        </div>

        <div className="flex-1" data-aos="fade-right">

          <img
            src={DashbordImage}
            alt="Dashboard"
            className="rounded-2xl shadow-lg"
          />

        </div>

      </div>

    </section>
  );
}