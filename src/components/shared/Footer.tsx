import { Link } from "react-router-dom";
import { FaFacebookF, FaWhatsapp, FaLinkedinIn } from "react-icons/fa";
import { useDarkMode } from "@/hooks/useDarkMode"; // Adjust the path if needed

export default function Footer() {
  const { darkMode } = useDarkMode();

  return (
    <footer
      className={`px-6 pt-12 pb-6 transition-all duration-300 ${
        darkMode
          ? 'bg-[var(--primary-darkbackground)] text-[var(--primary-foreground)]'
          : 'bg-[var(--primary-foreground)] text-[var(--primary-darkbackground)]'
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4">About Us</h3>
            <p className="text-sm leading-relaxed">
              We are passionate about providing top-quality bikes and accessories to our
              customers. Visit us for the best riding experience.
            </p>
            <div className="mt-5 flex gap-4">
              <a
                href="https://www.facebook.com/devrakibmia"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary-red transition-colors"
              >
                <FaFacebookF className="w-6 h-6" />
              </a>
              <a
                href="https://wa.me/+8801913547448"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary-red transition-colors"
              >
                <FaWhatsapp className="w-6 h-6" />
              </a>
              <a
                href="https://www.linkedin.com/in/md-rakib-mia"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary-red transition-colors"
              >
                <FaLinkedinIn className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Shop Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Shop</h3>
            <ul className="space-y-3 text-sm">
              <li className="hover:text-primary-red cursor-pointer transition-colors">Mountain Bikes</li>
              <li className="hover:text-primary-red cursor-pointer transition-colors">Road Bikes</li>
              <li className="hover:text-primary-red cursor-pointer transition-colors">Electric Bikes</li>
              <li className="hover:text-primary-red cursor-pointer transition-colors">Accessories</li>
            </ul>
          </div>

          {/* Customer Service Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/contact" className="hover:text-primary-red transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/faqs" className="hover:text-primary-red transition-colors">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-3 text-sm">
              <li>📍 Debidwar,Cumilla</li>
              <li>📞 (+880) 1967276648</li>
              <li>
                ✉️ Email:{" "}
                <a
                  href="mailto:rakibmia.dev@.com"
                  className="hover:text-primary-red transition-colors"
                >
                  sultanazakia711@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div
          className={`mt-10 pt-6 border-t text-center text-sm ${
            darkMode
              ? 'border-[var(--primary-darkborder)] text-[var(--primary-darktext)]'
              : 'border-[var(--primary-lightborder)] text-[var(--primary-lighttext)]'
          }`}
        >
          &copy; {new Date().getFullYear()} <strong>ROYAL KNIGHT</strong> Bike Shop. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
