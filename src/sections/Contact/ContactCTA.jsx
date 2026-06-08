import { Button } from "../../components/Button";
import { useNavigate } from "react-router-dom";
export default function ContactCTA() {
  const navigate = useNavigate();
  return (
    <section className="section">

      <div className="max-w-5xl mx-auto card text-center">

        <h2 className="text-5xl font-bold mb-6">
          Ready to Transform Your IT Support?
        </h2>

        <p className="text-[var(--color-gray)] mb-8">
          Talk with our team and learn how Innovexa can help your business.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">

          {/* <button className="btn-primary">
            Get a Quote
          </button> */}
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