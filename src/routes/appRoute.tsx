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
      <Route element={<AppLayout />}>{PublicRoutes}</Route>
      <Route
        path="/reset-password"
        element={
          <PublicRouteGuard>
            <ResetPassword />
          </PublicRouteGuard>
        }
      />
      {AuthRoutes}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoute;
