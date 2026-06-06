import AboutHeroImage from '../../assets/AboutHeroImage.png';




export default function AboutHero() {
  return (
    <section className="w-full min-h-screen flex items-center bg-white px-10 md:px-16">

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">

        {/* LEFT */}
        <div className="flex-1">

          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            About Innovexa Softwares
          </h1>

          <p className="mt-5 text-[var(--color-gray)] text-lg leading-relaxed">
            Innovexa Softwares is building AI-powered IT support solutions
            that help businesses diagnose technology issues faster,
            improve visibility and simplify support processes.
          </p>

          <p className="mt-4 text-[var(--color-gray)]">
            Our mission is to make IT support more accessible,
            efficient and practical for Canadian service-based businesses.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4">

            <button className="btn-primary">
              Get a Quote
            </button>

            <button className="btn-secondary">
              Contact Us
            </button>

          </div>

        </div>

        {/* RIGHT */}
        <div className="flex-1">

          <div className="bg-gray-100 rounded-2xl p-6 shadow-lg">

            <img
              src={AboutHeroImage}
              alt="About Innovexa"
              className="w-full rounded-xl"
            />

          </div>

        </div>

      </div>

    </section>
  );
}