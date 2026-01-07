/**
 * @description This is where only auth users can access. i.e all dashboard routes
 */

import { lazy, Suspense } from "react";
import { Route } from "react-router-dom";
import { AuthGuard } from "./Guard/authGuard";
import PageLoader from "../components/common/PageLoader";
import Dashboard404 from "../pages/Dashboard404";

const Dashboard = lazy(() => import("../dashboard/layout"));
const Home = lazy(() => import("../dashboard/index"));
const MostRecent = lazy(() => import("../dashboard/most-recent"));
const SavedProjects = lazy(() => import("../dashboard/saved-projects"));
const MyProjects = lazy(() => import("../dashboard/my-projects"));
const ViewAnalytics = lazy(() => import("../dashboard/view-analytics"));
const MobileRequestPage = lazy(() => import("../dashboard/mobile-request"));

const AuthRoutes = (
  <Route element={<AuthGuard />}>
    <Route
      path="/dashboard"
      element={
        <Suspense fallback={<PageLoader />}>
          <Dashboard />
        </Suspense>
      }
    >
      <Route index element={<Home />} />
      <Route path="most-recent" element={<MostRecent />} />
      <Route path="saved-projects" element={<SavedProjects />} />
      <Route path="my-projects" element={<MyProjects />} />
      <Route path="view-analytics" element={<ViewAnalytics />} />
      <Route path="requests" element={<MobileRequestPage />} />
      <Route path="*" element={<Dashboard404 />} />
    </Route>
  </Route>
);

export default AuthRoutes;
