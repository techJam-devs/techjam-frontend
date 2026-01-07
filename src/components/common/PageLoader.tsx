/**
 * @description This is a custom page loader
 */

import logo from "/logo.png";

const PageLoader = () => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gray-50 z-50">
      {/* Logo */}
      <img src={logo} alt="App Logo" className="w-48 h-auto mb-8" />

      {/* Loading indicator */}
      <div className="flex space-x-2">
        <span className="w-3 h-3 bg-blue-500 rounded-full animate-bounceDelay1"></span>
        <span className="w-3 h-3 bg-blue-500 rounded-full animate-bounceDelay2"></span>
        <span className="w-3 h-3 bg-blue-500 rounded-full animate-bounceDelay3"></span>
      </div>
    </div>
  );
};

export default PageLoader;
