import { Link } from 'react-router-dom';
import logo from '../assets/images/logo.jpeg';
import  FaFacebookF  from '../assets/icons/facebook.png';
import  insta  from '../assets/icons/instagram.png';
import  twiter from '../assets/icons/twitter.png';

function Footer() {
     const links = [
        { name: "Home", path: "/" },
        { name: "Platform", path: "/platform" },
        { name: "Services", path: "/services" },
        { name: "Industries", path: "/industries" },
        { name: "About", path: "/about" },
    ];
  return (
    <>
      <footer className="bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

            {/* Brand */}
            <div>
              <img
                src={logo}
                alt="Innovexa"
                className="h-20 w-auto"
              />

              <p className="mt-5 text-slate-600 leading-7">
                AI-powered IT troubleshooting, network monitoring,
                device diagnostics, support tickets and reporting
                for Canadian businesses.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold text-slate-900 mb-5">
                Quick Links
              </h3>

              <ul className="space-y-3">
                {links.map(
                  (link,i) => (
                    <li key={i}>
                      <Link
                        to={link.path}
                        className="text-slate-600 hover:text-blue-600 transition"
                      >
                        {link.name}
                      </Link>
                    </li>
                  )
                )}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="font-semibold text-slate-900 mb-5">
                Services
              </h3>

              <ul className="space-y-3 text-slate-600">
                <li>AI Troubleshooting</li>
                <li>Network Monitoring</li>
                <li>Wi-Fi Diagnostics</li>
                <li>Device Support</li>
                <li>Support Tickets</li>
                <li>Monthly Reports</li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-semibold text-slate-900 mb-5">
                Contact Us
              </h3>

              <div className="space-y-4 text-slate-600">
                <p>Info@innovexasoftwares.com</p>
                <p>587-849-4612</p>
                <p>
                  112C-219 Dufferin St,
                  Toronto, ON, M6K 3J1,
                  Canada
                </p>
              </div>

              {/* Social */}
              <div className="flex gap-3 mt-6">
                <a
                  href="https://facebook.com/innovexasoftwares"
                  className="w-10 h-10 rounded-full flex items-center justify-center hover:scale-110 transition"
                >
                  <img src={FaFacebookF} alt="Facebook" />
                </a>

                <a
                  href="https://instagram.com/innovexasoftwares"
                  className="w-10 h-10 rounded-full flex items-center justify-center hover:scale-110 transition"
                >
                  <img src={insta} alt="" />
                </a>

                <a
                  href="https://x.com/innovexasoftwares"
                  className="w-10 h-10 rounded-full  flex items-center justify-center hover:scale-110 transition"
                >
                  <img src={twiter} alt="" />
                </a>
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div className="border-t border-slate-200 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-500 text-sm">
              © 2026 Innovexa Softwares Ltd. All Rights Reserved.
            </p>

            <div className="flex items-center gap-6">
              <a
                href="#"
                className="text-slate-500 hover:text-blue-600 transition"
              >
                Privacy Policy
              </a>

              <a
                href="#"
                className="text-slate-500 hover:text-red-500 transition"
              >
                Terms & Conditions
              </a>
            </div>
          </div>
        </div>
      </footer>





    </>
  )
}

export default Footer