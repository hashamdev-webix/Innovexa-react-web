import AboutCTA from "../sections/About/AboutCTA";
import AboutHero from "../sections/About/AboutHero";
import FounderSection from "../sections/About/FounderSection";
import HowWeWork from "../sections/About/HowWeWork";
import OurMission from "../sections/About/OurMission";
import OurValues from "../sections/About/OurValues";
import OurVision from "../sections/About/OurVission";
import WhoWeAre from "../sections/About/WhoWeAre";



export default function About() {
  return (
    <>
      <AboutHero />
      <WhoWeAre />
      <OurMission />
      <OurVision />
      <FounderSection />
      <HowWeWork />
      <OurValues />
      <AboutCTA/>
    </>
  );
}