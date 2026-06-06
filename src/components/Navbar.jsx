import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.jpeg";

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const links = [
        { name: "Home", path: "/" },
        { name: "Platform", path: "/platform" },
        { name: "Services", path: "/services" },
        { name: "Industries", path: "/industries" },
        { name: "About", path: "/about" },
    ];

    return (
        <header className="fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-[var(--color-border)]">
            <div className="max-w-7xl mx-auto px-6">
                <div className="h-20 flex items-center justify-between">

                    {/* Logo */}
                    <Link to="/" className="flex items-center">
                        <img src={logo} alt="Innovexa" className="h-16 w-auto" />
                    </Link>

                    {/* Desktop Menu */}
                    <nav className="hidden lg:flex items-center gap-8">
                        {links.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className="font-medium text-[var(--color-dark)] hover:text-[var(--color-primary)] transition-all duration-200"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </nav>

                    {/* Desktop Buttons */}
                    <div className="hidden lg:flex items-center gap-3">
                        <Link
                            to="/contact"
                            className="btn-secondary border border-[var(--color-border)] px-5 py-2 rounded-xl hover:bg-gray-100 hover:text-[var(--color-primary)] transition-all duration-200"
                        >
                            Contact Us
                        </Link>

                        <Link
                            to="/quote"
                            className="bg-[var(--color-primary)] text-white px-5 py-2 rounded-xl hover:opacity-90 transition-all duration-200"
                        >
                            Get a Quote
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="lg:hidden text-3xl"
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        {menuOpen ? "✕" : "☰"}
                    </button>
                </div>

                {/* Mobile Menu */}
                {menuOpen && (
                    <div className="lg:hidden pb-6">
                        <div className="flex flex-col gap-4 pt-4">

                            {links.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    onClick={() => setMenuOpen(false)}
                                    className="font-medium text-[var(--color-dark)] hover:text-[var(--color-primary)] transition"
                                >
                                    {link.name}
                                </Link>
                            ))}

                            <Link
                                to="/contact"
                                onClick={() => setMenuOpen(false)}
                                className="btn-secondary border border-[var(--color-border)] py-3 rounded-xl text-center text-[var(--color-dark)] "
                            >
                                Contact Us
                            </Link>

                            <Link
                                to="/quote"
                                onClick={() => setMenuOpen(false)}
                                className="btn-primary border border-[var(--color-border)] py-3 rounded-xl text-center text-[var(--color-dark)] hover:bg-[var(--color-primary)] hover:text-white    transition-all duration-200"
                            >
                                Get a Quote
                            </Link>

                        </div>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Navbar;