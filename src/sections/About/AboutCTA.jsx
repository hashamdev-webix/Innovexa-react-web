import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button";

export default function AboutCTA() {
  const navigate=useNavigate()
  return (
    <section className="section">

      <div className="max-w-5xl mx-auto card text-center">

        <h2 className="text-5xl font-bold mb-6">
          Build Smarter IT Support with Innovexa
        </h2>

        <p className="text-[var(--color-gray)] mb-8">
          Discover how AI-powered troubleshooting and monitoring
          can help your organization reduce downtime and improve efficiency.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">

       
          <Button 
          className="btn-primary"
          children="Get a Quote"
          omnClick={()=>{navigate('/quote')}}
          />

         <Button 
          className="btn-secondary"
          children="Contact Us"
          omnClick={()=>{navigate('/contact')}}
          />

        </div>

      </div>

    </section>
  );
}