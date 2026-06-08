import ServicesOverviewImage from '../../assets/images/servicesOverview.png';
import Aos from 'aos';
import 'aos/dist/aos.css'
import { useEffect } from 'react';



export default function ServicesOverview() {
  useEffect(()=>{
    Aos.init({duration:1000 , once:true})
  },[])
  return (
    <section className="section bg-white">

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">

        {/* IMAGE */}
        <div className="flex-1">

          <div className="bg-gray-100 rounded-2xl p-6 shadow-lg" data-aos="fade-left">

            <img
              src={ServicesOverviewImage}
              alt="Innovexa Services Overview"
              className="w-full rounded-xl"
            />

          </div>

        </div>

        {/* CONTENT */}
        <div className="flex-1">

          <h2 className="text-4xl font-bold text-gray-900 mb-6" data-aos="fade-right">
            Comprehensive IT Support Services for Modern Businesses
          </h2>

          <p className="text-gray-600 text-lg leading-relaxed mb-5" data-aos="fade-left">
            Innovexa combines AI-powered troubleshooting, monitoring,
            diagnostics, reporting and support workflows into a practical
            service offering designed for small and mid-sized businesses.
          </p>

          <p className="text-gray-500 mb-8" data-aos="fade-left">
            Our services help organizations identify technology issues
            faster, improve visibility across devices and networks,
            and create a more structured support process.
          </p>

          <div className="grid grid-cols-2 gap-4" >

            <div className="card" data-aos="fade-down">
              <h3 className="font-semibold mb-2">
                Faster Diagnosis
              </h3>

              <p className="text-sm text-gray-500" >
                Identify common IT issues quickly.
              </p>
            </div>

            <div className="card" data-aos="fade-down">
              <h3 className="font-semibold mb-2">
                Better Visibility
              </h3>

              <p className="text-sm text-gray-500">
                Monitor devices and connectivity.
              </p>
            </div>

            <div className="card " data-aos="fade-down">
              <h3 className="font-semibold mb-2">
                Reduced Downtime
              </h3>

              <p className="text-sm text-gray-500">
                Resolve issues before they grow.
              </p>
            </div>

            <div className="card" data-aos="fade-down">
              <h3 className="font-semibold mb-2">
                Structured Support
              </h3>

              <p className="text-sm text-gray-500">
                Better ticketing and reporting.
              </p>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}