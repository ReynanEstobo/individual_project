import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          {/* About */}
          <div>
            <h3 className="text-2xl font-bold mb-4">About JobHub</h3>
            <p className="text-gray-400 leading-relaxed">
              Connecting talented professionals with their dream careers since
              2020.
            </p>
            <div className="flex space-x-4 mt-4">
              {[FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram].map(
                (Icon, idx) => (
                  <a
                    key={idx}
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors duration-300"
                    aria-label="Social Link"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                )
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-2xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {["Home", "Browse Jobs", "Companies", "About Us"].map((link) => (
                <li key={link}>
                  <Link
                    to={
                      link === "Home"
                        ? "/"
                        : `/${link.toLowerCase().replace(/\s/g, "")}`
                    }
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-2xl font-bold mb-4">Contact</h3>
            <p className="text-gray-400 mb-2">
              Email:{" "}
              <a href="mailto:contact@jobhub.com" className="hover:text-white">
                contact@jobhub.com
              </a>
            </p>
            <p className="text-gray-400 mb-2">
              Phone:{" "}
              <a href="tel:+15551234567" className="hover:text-white">
                (+63) 991-389-2842
              </a>
            </p>
            <p className="text-gray-400">123 Job Street, Quezon City, 10001</p>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-2xl font-bold mb-4">Newsletter</h3>
            <p className="text-gray-400 mb-4">
              Subscribe for job alerts and updates
            </p>
            <form className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2 rounded-lg w-full bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
              <button
                type="submit"
                className="bg-blue-600 px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-700 mt-12 pt-6 text-center text-gray-500 text-sm">
          &copy; 2025 Reynan Estobo. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
