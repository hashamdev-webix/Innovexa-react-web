import Hero from "../sections/Home/HeroSection";
import HowItWorks from "../sections/Home/HowItWorks";
import Industries from "../sections/Home/IndustriesSection";
import ServicesSection from "../sections/Home/ServiceSection";


export default function Home() {
  return (
    <>
      <Hero />
      <ServicesSection />
      <HowItWorks />
      <Industries />
    </>
  );
};