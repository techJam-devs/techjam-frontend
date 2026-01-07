/**
 * @description Main entry for all our app routes
 *              Public and authenticated routes will be imported here
 *              This app route will be mounted in the app.tsx file
 */

import { Route, Routes } from "react-router-dom";
import PublicRoutes from "./publicRoutes";
import AuthRoutes from "./AuthRoutes";
import NotFound from "../pages/NotFound";
import AppLayout from "../components/layout/appLayout";
import ResetPassword from "../pages/ResetPassword";
import PublicRouteGuard from "./Guard/PublicRouteGuard";

const AppRoute = () => {
  return (
    <Routes>
      {/* Public pages with layout */}
      <Route element={<AppLayout />}>
        {PublicRoutes}

        {/* Reset password is also public */}
        <Route element={<PublicRouteGuard />}>
          <Route path="/reset-password" element={<ResetPassword />} />
        </Route>
      </Route>

      {/* Authenticated routes */}
      {AuthRoutes}

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoute;
