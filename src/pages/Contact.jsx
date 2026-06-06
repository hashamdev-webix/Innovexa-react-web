import ContactCTA from "../sections/Contact/ContactCTA";
import ContactForm from "../sections/Contact/ContactForm";
import ContactHero from "../sections/Contact/ContactHero";
import ContactInfo from "../sections/Contact/ContactInfo";
import MapSection from "../sections/Contact/MapSection";



export default function Contact() {
  return (
    <>
      <ContactHero />
      <ContactInfo />
      <ContactForm />
      <MapSection />
      <ContactCTA />
    </>
  );
}