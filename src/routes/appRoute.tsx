/**
 * @description Main entry for all our app routes
 *              Public and authenticated routes will be imported here
 *              This app route will be mounted in the app.tsx file
 */

import { Routes } from "react-router-dom";
import PublicRoutes from "./publicRoutes";
import AuthRoutes from "./AuthRoutes";

const AppRoute = () => {
  return (
    <Routes>
      {PublicRoutes}
      {AuthRoutes}
    </Routes>
  );
};

export default AppRoute;
