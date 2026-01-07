import React from "react";
import Navbar from "./navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom"; // important

const AppLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      <Navbar />
      <main>
        <Outlet /> {/* renders child routes */}
      </main>
      <Footer />
    </div>
  );
};

export default AppLayout;
