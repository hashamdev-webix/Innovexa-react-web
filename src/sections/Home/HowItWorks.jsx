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
      <div className="max-w-7xl mx-auto px-5">

        <div className="text-center mb-12">
          <h2 className="gradient-text text-4xl font-bold">
            How Innovexa Works
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {steps.map((step, index) => (
            <div key={index} className="relative">

              <div className="card border-default text-center">
                <span className="text-2xl font-bold block mb-3">
                  {index + 1}
                </span>

                <h3 className="font-semibold">
                  {step}
                </h3>
              </div>

              {index !== steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 -translate-y-1/2 text-2xl">
                  →
                </div>
              )}

            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Button
          children="Contact Us"
          className="btn-secondary"
          type="button"
          onClick={()=>{navigate('/contact')}}
          />
        
        </div>

      </div>
    </section>
  );
}

export default HowItWorks;