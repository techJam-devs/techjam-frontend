import React from "react";

interface BlankLayoutProps {
  children: React.ReactNode;
}

const BlankLayout: React.FC<BlankLayoutProps> = ({ children }) => {
  return (
    <div className="flex items-center justify-center min-h-screen h-screen w-full bg-gray-50 relative overflow-hidden">
      {children}
    </div>
  );
};

export default BlankLayout;
