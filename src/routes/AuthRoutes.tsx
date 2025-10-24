/**
 * @description This is where only auth users can access. i.e all dashboard routes
 */

import { lazy } from "react";
import { Route } from "react-router-dom";

const Dashboard = lazy(() => import("../dashboard/layout"));
const Settings = lazy(() => import("../dashboard/settings"));
const Home = lazy(() => import("../dashboard/index"));
const MostRecent = lazy(() => import("../dashboard/most-recent"));
const SavedProjects = lazy(() => import("../dashboard/saved-projects"));
const MyProjects = lazy(() => import("../dashboard/my-projects"));
const ViewAnalytics = lazy(() => import("../dashboard/view-analytics"));
const MobileRequestPage = lazy(() => import("../dashboard/mobile-request"));

const AuthRoutes = (
  <>
    <Route path="/dashboard" element={<Dashboard />}>
      <Route index element={<Home />} />
      <Route path="settings" element={<Settings />} />
      <Route path="most-recent" element={<MostRecent />} />
      <Route path="saved-projects" element={<SavedProjects />} />
      <Route path="my-projects" element={<MyProjects />} />
      <Route path="view-analytics" element={<ViewAnalytics />} />
      <Route path="requests" element={<MobileRequestPage />} />
    </Route>
  </>
);

export default AuthRoutes;
