import React from "react";
import { useNavigate } from "react-router-dom";
import BlankLayout from "../components/common/BlankLayout";

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <BlankLayout>
      <div className="text-center px-4 relative z-20">
        <h1 className="text-8xl font-extrabold text-gray-200 mb-6">404</h1>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Page Not Found
        </h2>
        <p className="text-gray-500 mb-8">
          The page you are looking for does not exist or has been moved.
        </p>
        <button
          onClick={() => navigate("/")}
          className="bg-blue text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800 transition"
        >
          Go Back Home
        </button>

        {/* background effect */}
        <div className="absolute top-0 left-0 w-full h-full -z-10">
          <div className="w-80 h-80 bg-blue-100 rounded-full absolute -top-20 -left-20 opacity-20 animate-pulse"></div>
          <div className="w-60 h-60 bg-blue-200 rounded-full absolute -bottom-20 -right-10 opacity-30 animate-pulse"></div>
        </div>
      </div>
    </BlankLayout>
  );
};

export default NotFound;
