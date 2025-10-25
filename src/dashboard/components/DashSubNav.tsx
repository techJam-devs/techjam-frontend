/**
 * @description This returns the sub nav welcome message of our dashboard
 */

import { Link } from "react-router-dom";

const DashSubNav = () => {
  return (
    <div className="flex item-center gap-4 p-4 text-sm max-w-6xl mx-auto">
      <h3 className="py-4"> Welcome Back!</h3>
      <div className="flex flex-1 items-center justify-between bg-[#ECF2FF] p-4">
        <p>Learning never exhausts the mind, it only fuels the future. </p>

        {/** analytics */}
        <Link
          to="view-analytics"
          className="underline cursor-pointer hover:text-blue"
        >
          View Analytics
        </Link>
      </div>
    </div>
  );
};

export default DashSubNav;
