import { Routes, Route } from "react-router-dom";
import  Home  from "../pages/Home";
import  Services  from "../pages/Services";
import  Industries  from "../pages/Industries";
import About from "../pages/About";
import Contact from "../pages/Contact";
import  Quote  from "../pages/Quote";
import Platform from "../pages/Platform";



export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/platform" element={<Platform/>} />
      <Route path="/services" element={<Services/>} />
      <Route path="/industries" element={<Industries />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/quote" element={<Quote />} />
    </Routes>
  );
}