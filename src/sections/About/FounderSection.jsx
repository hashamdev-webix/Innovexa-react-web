import Aos from "aos";
import 'aos/dist/aos.css'


import LeaderShipImage from "../../assets/images/LeaderShipImage.png";
import { useEffect } from "react";
import { Button } from "../../components/Button";
import { useNavigate } from "react-router-dom";





export default function FounderSection() {
  useEffect(()=>{
    Aos.init({duration:1000,once:true})
  },[]);
  const navigate=useNavigate();
  return (
    <section className="section">

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">

        <div className="flex-1" data-aos="fade-left">

          <img
            src={LeaderShipImage}
            alt="Founder"
            className="rounded-2xl shadow-lg"
          />

        </div>

        <div className="flex-1" data-aos="fade-right">

          <h2 className="text-4xl font-bold mb-6">
            Leadership & Vision
          </h2>

          <p className="text-[var(--color-gray)] mb-6">
            Innovexa is guided by a vision of simplifying
            IT support through technology, automation
            and practical business solutions.
          </p>

          
          <Button className="btn-secondary" children="Contact Us" onClick={()=>{navigate('/contact')}} />

        </div>

      </div>

    </section>
  );
}