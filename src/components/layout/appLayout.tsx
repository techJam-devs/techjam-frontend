import React from "react";
import Navbar from "./navbar";
import Footer from "./Footer";

interface appLayout {
  children: React.ReactNode;
}

const appLayout: React.FC<appLayout> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="mt-[2rem]">{children}</main>
      <Footer />
    </div>
  );
};

export default appLayout;
