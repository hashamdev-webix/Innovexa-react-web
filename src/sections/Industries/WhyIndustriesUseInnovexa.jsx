

import DashbordImage from '../../assets/DashbordImage.png';








export default function WhyIndustriesUseInnovexa() {
  return (
    <section className="section">

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">

        <div className="flex-1">

          <h2 className="text-4xl font-bold mb-6">
            Practical IT Visibility for Everyday Business Operations
          </h2>

          <div className="space-y-4">

            <div className="card">✓ Faster issue diagnosis</div>
            <div className="card">✓ Better network visibility</div>
            <div className="card">✓ Improved support tickets</div>
            <div className="card">✓ Monthly technology reports</div>
            <div className="card">✓ Easier first-line support</div>

          </div>

        </div>

        <div className="flex-1">

          <img
            src={DashbordImage}
            alt="Dashboard"
            className="rounded-2xl shadow-lg"
          />

        </div>

      </div>

    </section>
  );
}