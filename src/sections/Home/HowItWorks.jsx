import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button";

function HowItWorks() {
  const navigate=useNavigate();
  const steps = [
    "IT Issue Occurs",
    "Employee Asks AI Chatbot",
    "System Checks Network/Device Data",
    "AI Explains Likely Cause",
    "Issue is Resolved or Escalated",
  ];

  return (
   <section className="section">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

    <div className="text-center mb-10 lg:mb-14">
      <h2
        className="
        gradient-text
        font-bold
        text-3xl
        sm:text-4xl
        md:text-5xl
        "
      >
        How Innovexa Works
      </h2>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">

      {steps.map((step, index) => (
        <div key={index} className="relative">

          <div className="card border-default text-center h-full">

            <span
              className="
              block
              mb-3
              font-bold
              text-2xl
              md:text-3xl
              "
            >
              {index + 1}
            </span>

            <h3
              className="
              font-semibold
              text-base
              sm:text-lg
              lg:text-xl
              "
            >
              {step}
            </h3>

          </div>

          {index !== steps.length - 1 && (
            <div
              className="
              hidden
              lg:block
              absolute
              top-1/2
              -right-4
              -translate-y-1/2
              text-2xl
              "
            >
              →
            </div>
          )}

        </div>
      ))}
    </div>

    <div className="text-center mt-8 lg:mt-12">

      <Button
        children="Contact Us"
        className="
        btn-secondary
        w-full
        sm:w-auto
        px-6
        py-3
        "
        type="button"
        onClick={() => navigate('/contact')}
      />

    </div>

  </div>
</section>
  );
}

export default HowItWorks;