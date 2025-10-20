/**
 * @description Nav bar for our app
 */

import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import SearchBar from "../common/searchBar";
import Button from "../common/Button";
import MobileMenu from "../common/MobileMenu";
import Modal from "../authModals/AuthModal";
import type { AuthPortal } from "../../types/authModel.types";

const Navbar = () => {
  const [openModal, setOpenModal] = useState<AuthPortal | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50); // trigger after 50px scroll
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  //nav links
  const navlink = [
    { title: "Home", link: "/" },
    { title: "About Us", link: "/about-us" },
    { title: "Services", link: "/services" },
    { title: "Contact Us", link: "/contact-us" },
  ];

  return (
    <header
      className={`fixed top-0 w-full bg-gray-50 z-50 ${scrolled ? "bg-blue border-b-2 border-gray-200 shadow-sm" : " border-b-0"}`}
    >
      <nav className="relative container mx-auto flex items-center justify-between px-4 lg:px-8 py-2">
        {/* Logo */}
        <div className="flex items-center">
          <img
            src="/logo.png"
            alt="logo"
            className="h-10 md:h-12 w-auto object-contain relative top-[1px]"
          />
        </div>

        {/* Middle content */}
        <div className="hidden lg:flex items-center gap-6 py-1">
          <ul className="flex gap-6 items-center">
            {navlink.map((n) => (
              <li
                key={n.title}
                className="text-sm text-gray-700 font-medium hover:text-blue transition-colors"
              >
                <NavLink
                  to={n.link}
                  className={({ isActive }) =>
                    `text-sm transition-colors duration-200 ${
                      isActive
                        ? "text-black font-semibold"
                        : "text-gray-700 hover:text-blue"
                    }`
                  }
                >
                  {n.title}
                </NavLink>
              </li>
            ))}
          </ul>
          <SearchBar />
        </div>

        {/* CTA buttons  login + sign up*/}
        <div className="hidden lg:flex items-center gap-3 py-1">
          <Button
            text="Log in"
            variant="ghost"
            size="sm"
            className="border-none"
            onClick={() => setOpenModal("signIn")}
          />

          {/** sign up button */}
          <Button
            text="Get Started"
            variant="primary"
            size="sm"
            onClick={() => setOpenModal("signUp")}
          />
        </div>

        {/* Mobile menu */}
        <div className="lg:hidden">
          <MobileMenu />
        </div>
      </nav>

      {/** Modal */}
      <Modal
        isOpen={!!openModal}
        onClose={() => setOpenModal(null)}
        switchPortal={openModal ?? "signIn"}
        onSwitch={setOpenModal}
      />
    </header>
  );
};

export default Navbar;
