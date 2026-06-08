export default function MapSection() {
  return (
    <section className="section bg-white">
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold">
            Our Location
          </h2>
        </div>

        <div className="card">
          <div className="h-[400px] w-full rounded-xl overflow-hidden">

            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2886.515!2d-79.4403!3d43.6366!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b34d5f2b7c5e7%3A0x0!2s112C-219%20Dufferin%20St%2C%20Toronto%2C%20ON%20M6K%203J1%2C%20Canada!5e0!3m2!1sen!2s!4v1710000000000"
              className="h-full w-full border-0"
              loading="lazy"
              title="Innovexa Softwares Location"
              allowFullScreen
            />

          </div>
        </div>

      </div>
    </section>
  );
}