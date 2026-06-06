import CTA from "../sections/Platform/CTA";
import Hero from "../sections/Platform/HeroSection";
import HowItWorks from "../sections/Platform/HowItsWorks";
import PlatformModules from "../sections/Platform/PlatformModules";
import Overview from "../sections/Platform/PlatformOverview";
import Security from "../sections/Platform/SecurityControl";

const Platform = () => {
  return (
    <>
      <Hero />
      <Overview/>
      <PlatformModules />
      <HowItWorks />
      <Security />
      <CTA/>
    </>
  );
};

export default Platform;