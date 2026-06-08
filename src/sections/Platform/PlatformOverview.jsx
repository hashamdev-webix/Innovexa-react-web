
import { useNavigate } from 'react-router-dom';
import overviewImage from '../../assets/images/platform-hero.png';
import { Button } from '../../components/Button';
import Aos from  "aos";
import "aos/dist/aos.css";
import { useEffect } from 'react';


const Overview = () => {
  useEffect(() => {
    Aos.init({ duration: 1000, once: true });
  }
  , []);
  const navigate=useNavigate();
  return (
    <section className="section bg-white">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center" data-aos="fade-right">

        <img  
          src={overviewImage}
          alt="Overview"
          className="rounded-3xl shadow-lg"
        />

        <div className="text-center lg:text-left" data-aos="fade-left">
          <h2 className="text-4xl font-bold mb-6">
            One Platform for First-Line IT Troubleshooting
          </h2>

          <p className="text-[var(--color-gray)] mb-6">
            Innovexa combines monitoring, AI troubleshooting,
            reporting and support workflows in one platform.
          </p>

        <Button
        className='btn-primary'
        children="Learn More"
        onClick={()=>(navigate('/about'))}
        />
        </div>

      </div>
    </section>
  );
};

export default Overview;