import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import SearchBar from "../common/searchBar";
import SignUpModal from "../authModals/signUpModal";
import SignInModal from "../authModals/signInModal";
import Button from "../common/Button";
import MobileMenu from "../common/MobileMenu";

const Navbar = () => {
  const [openModal, setOpenModal] = useState<"signin" | "signup" | null>(null);
  useEffect(() => {
    if (openModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [openModal]);
  const navlink = [
    { title: "Home", link: "/" },
    { title: "About Us", link: "/about-us" },
    { title: "Services", link: "/services" },
    { title: "Contact Us", link: "/contact-us" },
  ];

  return (
    <header className="fixed top-0 w-full z-50">
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

        {/* CTA buttons */}
        <div className="hidden lg:flex items-center gap-3 py-1">
          <Button
            text="Log in"
            variant="ghost"
            size="sm"
            className="border-none"
            onClick={() => setOpenModal("signin")}
          />
          <Button
            text="Get Started"
            variant="primary"
            size="sm"
            onClick={() => setOpenModal("signup")}
          />
        </div>

        {/* Mobile menu */}
        <div className="lg:hidden">
          <MobileMenu />
        </div>
      </nav>

      {/* Sign In Modal */}
      <SignInModal
        isOpen={openModal === "signin"}
        onClose={() => setOpenModal(null)}
        onSwitchToSignUp={() => setOpenModal("signup")}
      />

      {/* Sign Up Modal */}
      <SignUpModal
        isOpen={openModal === "signup"}
        onClose={() => setOpenModal(null)}
        onSwitchToSignIn={() => setOpenModal("signin")}
      />
    </header>
  );
};

export default Navbar;
