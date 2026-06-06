import CommonProblems from "../sections/Industries/CommanProblems";
import IndustryCards from "../sections/Industries/IndustriesCards";
import IndustriesCTA from "../sections/Industries/IndustriesCTA";
import IndustriesOverview from "../sections/Industries/IndustriesOverview";
import IndustriesHero from "../sections/Industries/IndutriesHero";
import WhyIndustriesUseInnovexa from "../sections/Industries/WhyIndustriesUseInnovexa";

export default function Industries() {
  return (
    <>
      <IndustriesHero />
      <IndustriesOverview />
      <IndustryCards />
      <CommonProblems />
      <WhyIndustriesUseInnovexa />
      <IndustriesCTA />
    </>
  );
}