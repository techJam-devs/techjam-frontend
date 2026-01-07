/***
 * @description This are routes that needs no authentication
 *              Open and accessible to everyone
 *              landing page, about, services, contact us
 * @access a publicRouteGuard is added as protections
 *        - no logged in user can access these routes
 */

import { lazy } from "react";
import { Route } from "react-router-dom";

import PublicRouteGuard from "./Guard/PublicRouteGuard";

const LandingPage = lazy(() => import("../pages/LandingPage"));
const AboutPage = lazy(() => import("../pages/AboutUs"));
const ServicePage = lazy(() => import("../pages/Services"));
const ContactPage = lazy(() => import("../pages/ContactUs"));

const PublicRoutes = (
  <Route element={<PublicRouteGuard />}>
    <Route path="/" element={<LandingPage />} />
    <Route path="/about-us" element={<AboutPage />} />
    <Route path="/services" element={<ServicePage />} />
    <Route path="/contact-us" element={<ContactPage />} />
  </Route>
);

export default PublicRoutes;
