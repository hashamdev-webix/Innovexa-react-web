
import LeaderShipImage from "../../assets/LeaderShipImage.png";





export default function FounderSection() {
  return (
    <section className="section">

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">

        <div className="flex-1">

          <img
            src={LeaderShipImage}
            alt="Founder"
            className="rounded-2xl shadow-lg"
          />

        </div>

        <div className="flex-1">

          <h2 className="text-4xl font-bold mb-6">
            Leadership & Vision
          </h2>

          <p className="text-[var(--color-gray)] mb-6">
            Innovexa is guided by a vision of simplifying
            IT support through technology, automation
            and practical business solutions.
          </p>

          <button className="btn-secondary">
            Contact Us
          </button>

        </div>

      </div>

    </section>
  );
}