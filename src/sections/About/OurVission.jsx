import Aos from "aos";
import 'aos/dist/aos.css'
import OurVissionImage from "../../assets/images/OurVissionImage.png";

export default function OurVision() {
  Aos.init({duration:1000,once:true})
  return (
    <section className="section bg-white">

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">

        <div className="flex-1" data-aos="fade-left">

          <img
            src={OurVissionImage}
            alt="Our Vision"
            className="rounded-2xl shadow-lg "
          />

        </div>

        <div className="flex-1" data-aos="fade-right">

          <h2 className="text-4xl font-bold mb-6">
            Our Vision
          </h2>

          <p className="text-[var(--color-gray)] leading-relaxed">
            To become a trusted provider of AI-assisted IT support
            platforms that help businesses improve productivity,
            visibility and technology management.
          </p>

        </div>

      </div>

    </section>
  );
}