/**
 * @description Footer component of the page (refactored with mapping + better scaling)
 */

import {
  Mail,
  Globe,
  Facebook,
  TwitterIcon,
  GithubIcon,
  ArrowUp,
} from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  // footer columns
  const footerLinks = [
    {
      title: "Product",
      links: [
        { name: "Home", path: "/" },
        { name: "About us", path: "/about" },
        { name: "Services", path: "/services" },
        { name: "Contact us", path: "/contact" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "Community", path: "/community" },
        { name: "Projects", path: "/projects" },
        { name: "Pricing", path: "/pricing" },
        { name: "Blogs", path: "/blogs" },
      ],
    },
    {
      title: "Learn",
      links: [
        { name: "Research Updates", path: "/research" },
        { name: "Articles", path: "/articles" },
        { name: "Newsletters", path: "/newsletters" },
        { name: "Help Center", path: "/help" },
      ],
    },
    {
      title: "Legal",
      links: [
        { name: "Careers", path: "/careers" },
        { name: "Legal", path: "/legal" },
        { name: "Privacy Policy", path: "/privacy" },
        { name: "Terms & Condition", path: "/terms" },
      ],
    },
  ];

  const socialLinks = [
    { icon: Facebook, path: "/facebook" },
    { icon: TwitterIcon, path: "/twitter" },
    { icon: Globe, path: "/website" },
    { icon: GithubIcon, path: "/github" },
  ];

  return (
    <footer className="bg-black text-white py-20">
      <div className="px-6 lg:px-20">
        {/* Main grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-10 lg:gap-16">
          {/* Company Info */}
          <div className="col-span-1 lg:col-span-2">
            <img
              src="/logo-white.png"
              alt="TechJam Logo"
              className="w-28 mb-4"
            />

            <div className="flex items-center gap-2 mb-4">
              <Mail className="h-4 w-4" />
              <span className="text-sm">TechJam2025@gmail.com</span>
            </div>

            {/* Socials */}
            <div className="flex gap-4 mt-6">
              {socialLinks.map(({ icon: Icon, path }, i) => (
                <Link
                  key={i}
                  to={path}
                  className="text-white hover:text-gray-300 transition-colors"
                >
                  <Icon className="w-5 h-5" />
                </Link>
              ))}
            </div>
          </div>

          {/*  */}
          {footerLinks.map((section, i) => (
            <div key={i}>
              <h3 className="font-semibold text-white mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, j) => (
                  <li key={j}>
                    <Link
                      to={link.path}
                      className="text-gray-300 hover:text-white transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Decorative right side */}
          <div className="hidden lg:flex flex-col gap-2 items-center justify-center">
            <span className="bg-white h-12 w-1 rounded-full"></span>
            <span className="bg-white h-1 w-1 rounded-full"></span>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8 relative flex items-center justify-center">
          {/* Centered text */}
          <p className="text-gray-400 text-center text-sm mx-auto">
            © 2025 TechJam Company. All rights reserved.
          </p>

          {/* Right-aligned button */}
          <button
            onClick={scrollToTop}
            className="absolute right-0 bg-blue-600 hover:bg-blue-700 text-white rounded-full w-10 h-10 flex items-center justify-center transition"
          >
            <ArrowUp className="h-4 w-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
