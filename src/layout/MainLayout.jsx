import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import ScrollToTop from "./ScrollOnTop";


export default function MainLayout({ children }) {
    return (
        <>
            <ScrollToTop />
            <Navbar />
            {children}
            <Footer />
        </>
    );
}