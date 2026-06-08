import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button";

export default function CTA() {
  const navigate=useNavigate();
  return (
    <section className="section">

      <div className="max-w-5xl mx-auto card text-center">

        <h2 className="text-5xl font-bold mb-6">
          Ready to Improve Your IT Support?
        </h2>

        <p className="text-gray-600 mb-8">
          Discover how Innovexa can help your business reduce downtime,
          improve visibility and simplify support processes.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">

        <Button 
        className="btn-primary"
        children="Get a Quote"
        onClick={()=>{ navigate('/quote')}}
        />

     <Button 
        className="btn-secondary"
        children="Contact Us"
        onClick={()=>{ navigate('/contact')}}
        />

        </div>

      </div>

    </section>
  );
}