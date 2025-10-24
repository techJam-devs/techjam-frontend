/***
 * @description This are routes that needs no authentication
 *              Open and accessible to everyone
 *              landing page, about, services, contact us
 */

import { lazy } from "react";
import { Route } from "react-router-dom";

const LandingPage = lazy(() => import("../pages/LandingPage"));
const AboutPAge = lazy(() => import("../pages/AboutUs"));
const ServicePAge = lazy(() => import("../pages/Services"));
const ContactPAge = lazy(() => import("../pages/ContactUs"));

const PublicRoutes = (
  <>
    <Route path="/" element={<LandingPage />} />
    <Route path="/about-us" element={<AboutPAge />} />
    <Route path="/services" element={<ServicePAge />} />
    <Route path="/contact-us" element={<ContactPAge />} />
  </>
);

export default PublicRoutes;
