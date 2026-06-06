import ContactImage from "../../assets/ContactImage.png";



export default function ContactHero() {
  return (
    <section className="w-full min-h-[80vh] flex items-center bg-white px-10 md:px-16">

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">

        <div className="flex-1">

          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Contact Innovexa
          </h1>

          <p className="mt-5 text-[var(--color-gray)] text-lg leading-relaxed">
            Have questions about our platform, services or solutions?
            We'd love to hear from you.
          </p>

          <p className="mt-4 text-[var(--color-gray)]">
            Get in touch with our team and discover how Innovexa can help your business.
          </p>

          <div className="mt-8">
            <button className="btn-primary">
              Get a Quote
            </button>
          </div>

        </div>

        <div className="flex-1">

          <div className="bg-gray-100 rounded-2xl p-6 shadow-lg">

            <img
              src={ContactImage}
              alt="Contact Innovexa"
              className="w-full rounded-xl"
            />

          </div>

        </div>

      </div>

    </section>
  );
}