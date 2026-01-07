/**
 * @description Dashboard 404 Page
 */

import { Link } from "react-router-dom";
import { FiHome } from "react-icons/fi";

const Dashboard404 = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full p-8 text-center">
      <h1 className="text-6xl font-extrabold text-gray-200 mb-4">404</h1>
      <h2 className="text-2xl md:text-3xl font-semibold mb-2">
        Page Not Found
      </h2>
      <p className="text-gray-400 mb-6">
        Oops! The page you are looking for does not exist in your dashboard.
      </p>
      <Link
        to="/dashboard"
        className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition"
      >
        <FiHome className="w-5 h-5" />
        Go to Dashboard Home
      </Link>
    </div>
  );
};

export default Dashboard404;
