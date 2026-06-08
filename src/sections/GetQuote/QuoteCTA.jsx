import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button";

export default function QuoteCTA() {
  const navigate = useNavigate();

  return (
    <section className="section">

      <div className="max-w-5xl mx-auto card text-center">

        <h2 className="text-5xl font-bold mb-6">
          Ready to Discuss Your IT Support Needs?
        </h2>

        <p className="text-[var(--color-gray)] mb-8">
          Let our team evaluate your environment and recommend
          the right AI-powered support solution.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">

          <Button
            className="btn-primary"
            onClick={() => navigate('/quote')}
          >
            Submit Quote Request
          </Button>

          <Button
            className="btn-secondary"
            onClick={() => navigate('/contact')}
          >
            Contact Us
          </Button>

        </div>

      </div>

    </section>
  );
}