/**
 *@description This creates The dashboard layout
 *              - A header at the top taking the logo and status ...
 *              - A sub header displaying a welcome message and a motivational quote
 *              - The navigator bar that helps user nav the dashboard
 *
 * @returns A component that serves as the layout of our dashboard
 */

import { Outlet } from "react-router-dom";
import DashNav from "./components/DashNav";
import DashSubNav from "./components/DashSubNav";
import DashNavigator from "./components/DashNavigator";
import RightPanel from "./components/RightPanel";

const Layout = () => {
  return (
    <div className="flex flex-col h-screen">
      {/** Top Nav */}
      <DashNav />

      {/** Dash sub Nav welcome message + Navigation */}
      <div className="px-4 mb-16 w-full">
        {/** welcome nav */}
        <div className="mb-4 hidden md:block">
          <DashSubNav />
        </div>
        <>
          <DashNavigator />
        </>
      </div>

      {/** 3 col body */}
      <div className="flex flex-1 overflow-hidden">
        {/* Empty Left side */}
        <aside className="w-1/6 hidden xl:block"></aside>
        {/** main content area */}
        <main className="flex-1 border-l border-border-color overflow-y-auto">
          <Outlet />
        </main>
        {/** Right side */}

        <aside className="hidden lg:flex flex-col lg:w-70 xl:w-96 overflow-y-auto">
          <RightPanel />
        </aside>
      </div>
    </div>
  );
};

export default Layout;
