/**
 * @description Navabar mobile menu
 */

import { useState } from "react";
import { Link } from "react-router-dom";
import { MenuIcon, X } from "lucide-react";
import SearchBar from "./searchBar";
import SignInModal from "./signInModal";
import Button from "./Button";

const MobileMenu = () => {
  const [show, setShow] = useState(false);
  const [signIn, setSignIn] = useState(false);

  const navlink = [
    { title: "Home", link: "/" },
    { title: "About Us", link: "/about-us" },
    { title: "Services", link: "/services" },
    { title: "Contact Us", link: "/contact-us" },
  ];

  return (
    <>
      {/** Hamburger menu icon */}
      <button
        type="button"
        aria-label="menu hamburger"
        onClick={() => setShow(true)}
      >
        <MenuIcon />
      </button>

      {/** Menu display */}
      {show && (
        <div className="absolute top-0 left-0 w-full bg-gray-50 flex flex-col items-center gap-6 py-4 transition-all duration-500 ease-out">
          {/** logo + close menu */}
          <div className="grid grid-cols-3 items-center w-full p-4 mt-4">
            {/* Logo */}
            <div className="col-start-2 flex justify-center">
              <img
                src="/logo.png"
                alt="logo"
                className="w-16 sm:w-20 md:w-24 h-auto object-contain"
              />
            </div>

            {/* Close button */}
            <div className="col-start-3 justify-self-end">
              <button
                type="button"
                onClick={() => setShow(false)}
                className="hover:text-gray-300 transition"
              >
                <X size={24} />
              </button>
            </div>
          </div>

          {/** search bar  */}
          <SearchBar />

          {/** nav links */}
          <ul className="flex flex-col gap-4 items-center">
            {navlink.map((n) => (
              <li
                key={n.title}
                onClick={() => setShow(false)}
                className="text-sm text-gray-700 p-4 hover:text-blue transition-colors"
              >
                <Link to={n.link}>{n.title}</Link>
              </li>
            ))}
          </ul>

          {/** Login btn */}
          <Button
            text="Log in"
            variant="ghost"
            className="border-none"
            size="lg"
            onClick={() => setSignIn(true)}
          />
        </div>
      )}

      {/** sign in modal */}
      <SignInModal isOpen={signIn} onClose={() => setSignIn(false)} />
    </>
  );
};

export default MobileMenu;
