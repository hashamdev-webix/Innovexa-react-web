import { useNavigate } from "react-router-dom";
import Card from "../../components/Card";

const industries = [
  {
    title: "Dental Clinics",
    problem: "Internet, printer and device issues affect patient operations.",
  },
  {
    title: "Law Firms",
    problem: "Downtime impacts communication and document access.",
  },
  {
    title: "Accounting Firms",
    problem: "Technology disruptions affect productivity and deadlines.",
  },
  {
    title: "Medical Offices",
    problem: "Reliable connectivity and devices are essential.",
  },
  {
    title: "Real Estate Offices",
    problem: "Agents require dependable technology access.",
  },
  {
    title: "Small Businesses",
    problem: "Limited IT resources make troubleshooting difficult.",
  },
];

export default function IndustryCards() {
  const navigate=useNavigate();
  return (
    <section className="section">

      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold">
            Industries We Support
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                 {industries.map((service, index) => (
                  <Card 
                   key={index}
                   title={service.title}
                   description={service.problem}
                   onClick={()=>{navigate('/about')}}
                   children="Learn More"
                  />
                 ))}
               </div>

      </div>

    </section>
  );
}