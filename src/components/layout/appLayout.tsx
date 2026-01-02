import React from "react";
import Navbar from "./navbar";
import Footer from "./Footer";
import { useLocation } from "react-router-dom";

interface appLayout {
  children: React.ReactNode;
}

const AppLayout: React.FC<appLayout> = ({ children }) => {
  const location = useLocation();

  // list of routes nav and footer shouldn't display in
  const hiddenRoutes = ["/dashboard"];

  const hideNav = hiddenRoutes.some((path) =>
    location.pathname.startsWith(path),
  );
  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      {!hideNav && <Navbar />}
      <main>{children}</main>
      {!hideNav && <Footer />}
    </div>
  );
};

export default AppLayout;
