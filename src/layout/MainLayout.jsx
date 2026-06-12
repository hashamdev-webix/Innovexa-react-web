import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useLocation } from "react-router-dom";

export default function MainLayout({ children }) {
  const location = useLocation();

  // pages jahan Navbar/Footer hide karna hai
  const hideLayout =
    location.pathname === "/login" ||
    location.pathname === "/signup" ||  location.pathname==="/admin-dashboard" ||  location.pathname==="/forgot-password"||  location.pathname==="/reset-password"

  return (
    <>
      {!hideLayout && <Navbar />}

      {children}

      {!hideLayout && <Footer />}
    </>
  );
}