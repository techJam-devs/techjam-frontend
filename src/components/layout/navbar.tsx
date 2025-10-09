import { useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from "../common/searchBar";
import SignUpModal from "../common/signUpModal";
import SignInModal from "../common/signInModal";
import Button from "../common/Button";
import MobileMenu from "../common/MobileMenu";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

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
                className="text-sm text-gray-700 hover:text-blue transition-colors"
              >
                <Link to={n.link}>{n.title}</Link>
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
            onClick={() => setShow(true)}
          />
          <Button
            text="Get Started"
            variant="primary"
            size="sm"
            onClick={() => setShowSignUp(true)}
          />
        </div>

        {/* Mobile menu */}
        <div className="lg:hidden">
          <MobileMenu />
        </div>
      </nav>

      {/**  auth modal pop up */}
      <SignInModal isOpen={show} onClose={() => setShow(false)} />

      {/** sign up */}
      <SignUpModal isOpen={showSignUp} onClose={() => setShowSignUp(false)} />
    </header>
  );
};

export default Navbar;
