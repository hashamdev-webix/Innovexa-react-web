
import WhoWeAreImage from '../../assets/images/WhoWEAreImage.png';




export default function WhoWeAre() {
  return (
    <section className="section bg-white">

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">

        <div className="flex-1">

          <img
            src={WhoWeAreImage}
            alt="Who We Are"
            className="rounded-2xl shadow-lg"
          />

        </div>

        <div className="flex-1">

          <h2 className="text-4xl font-bold mb-6">
            Who We Are
          </h2>

          <p className="text-[var(--color-gray)] mb-5">
            Innovexa is focused on delivering practical IT support
            solutions powered by artificial intelligence, monitoring
            technologies and modern support workflows.
          </p>

          <p className="text-[var(--color-gray)] mb-8">
            We help organizations better understand technology issues,
            improve response times and reduce operational disruptions.
          </p>

          <button className="btn-primary">
            Get a Quote
          </button>

        </div>

      </div>

    </section>
  );
}