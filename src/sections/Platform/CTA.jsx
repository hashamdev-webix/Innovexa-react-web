import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button";

const CTA = () => {
  const navigate = useNavigate();
  return (
    <section className="section">
      <div className="max-w-5xl mx-auto card text-center">

        <h2 className="text-5xl font-bold mb-6">
          Ready to Explore the Innovexa Platform?
        </h2>

        <p className="text-[var(--color-gray)] mb-8">
          Get started with AI-powered IT support today.
        </p>

        <div className="flex justify-center gap-4">
          <Button
            className="btn-primary"
            children="Get a Quote"
            onClick={() => { navigate('/quote') }}
          />

          <Button
            className="btn-secondary"
            children="Contact Us"
            onClick={() => { navigate('/contact') }}
          />
        </div>

      </div>
    </section>
  );
};

export default CTA;