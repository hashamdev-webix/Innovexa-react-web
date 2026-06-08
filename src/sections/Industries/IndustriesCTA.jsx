import { Button } from "../../components/Button";
import { useNavigate } from "react-router-dom";
export default function IndustriesCTA() {
  const navigate = useNavigate();
  return (
    <section className="section">

      <div className="max-w-5xl mx-auto card text-center">

        <h2 className="text-5xl font-bold mb-6">
          Need Reliable IT Support for Your Business?
        </h2>

        <p className="text-[var(--color-gray)] mb-8">
          Discover how Innovexa helps businesses reduce downtime,
          improve visibility and simplify support.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">

         <Button
            className="btn-primary"
            children="Get a Quote"
            onClick={()=>{navigate('/quote')}}
          />

          <Button
            className="btn-secondary"
            children="Contact Us"
            onClick={()=>{navigate('/contact')}}
          />

        </div>

      </div>

    </section>
  );
}