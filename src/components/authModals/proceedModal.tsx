/**
 * @description Displays only after user registration is successful
 */

import { Link } from "react-router-dom";

const ProceedModal = () => {
  return (
    <div className="max-w-4xl bg-blue flex flex-col items-center justify-center gap-8 rounded-2xl h-[400px] sm:h-[450px] text-center shadow-xl mx-auto">
      {/* Welcome Text */}
      <h3 className="text-white font-semibold tracking-wide text-2xl sm:text-3xl">
        Welcome
      </h3>

      {/* Logo */}
      <img
        src="/logo-white.png"
        alt="TechJam logo"
        className="w-40 object-contain"
      />

      {/* Proceed Button */}
      <Link
        to="/dashboard"
        className="bg-white text-blue/80 rounded-full py-3 sm:py-4 px-12 sm:px-16 shadow-md hover:bg-gradient-to-t from-gray-300 hover:text-blue text-base sm:text-lg font-semibold transition-all duration-300"
      >
        Proceed to Profile
      </Link>
    </div>
  );
};

export default ProceedModal;
